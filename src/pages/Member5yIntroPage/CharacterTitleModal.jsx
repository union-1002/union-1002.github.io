import { useEffect, useState } from 'react';
import supabase from '@/shared/supabase';

export default function CharacterTitleModal({
  nameMap,
  character,
  allInitials = [],
  onClose,
  onSave,
}) {
  const [titleData, setTitleData] = useState({});
  const [deletedIds, setDeletedIds] = useState([]); // ✅ 마이너스 삭제 예약 id들

  // ✅ 닫기: 저장 없이 닫으면 삭제 예약도 무조건 초기화
  const handleClose = () => {
    setDeletedIds([]);
    onClose?.();
  };

  // 🔹 기존 상호호칭 불러오기
  useEffect(() => {
    const fetchTitles = async () => {
      if (!character?.initials) return;

      // ✅ 새로 열릴 때마다 삭제 예약 초기화 (안전)
      setDeletedIds([]);

      const { data, error } = await supabase
        .from('titles')
        .select('id, from_initials, to_initials, text, is_spoiler')
        .eq('era', 'past_5y')
        .or(
          `from_initials.eq.${character.initials},to_initials.eq.${character.initials}`
        );

      if (error) {
        console.error('❌ 상호호칭 로드 실패:', error);
        return;
      }

      // 🔹 모든 캐릭터 기본값 세팅
      const initState = {};
      allInitials.forEach(init => {
        if (init === character.initials) return;
        initState[init] = { calling: [], called: [] };
      });

      // 🔹 기존 데이터 반영 (id + is_spoiler 포함)
      (data || []).forEach(row => {
        const entry = {
          id: row.id,
          text: row.text,
          is_spoiler: row.is_spoiler ?? false,
        };

        if (row.from_initials === character.initials) {
          if (!initState[row.to_initials])
            initState[row.to_initials] = { calling: [], called: [] };
          initState[row.to_initials].calling.push(entry);
        } else if (row.to_initials === character.initials) {
          if (!initState[row.from_initials])
            initState[row.from_initials] = { calling: [], called: [] };
          initState[row.from_initials].called.push(entry);
        }
      });

      // 비어있는 것도 최소 한 칸씩
      Object.keys(initState).forEach(init => {
        if (initState[init].calling.length === 0)
          initState[init].calling = [{ id: null, text: '', is_spoiler: false }];
        if (initState[init].called.length === 0)
          initState[init].called = [{ id: null, text: '', is_spoiler: false }];
      });

      setTitleData(initState);
    };

    fetchTitles();
  }, [character?.initials, allInitials]);

  // 🔹 입력 변경 핸들러
  const handleChange = (init, type, idx, key, value) => {
    setTitleData(prev => {
      const updated = structuredClone(prev);
      if (!updated?.[init]?.[type]?.[idx]) return prev;
      updated[init][type][idx][key] = value;
      return updated;
    });
  };

  // 🔹 항목 추가
  const handleAdd = (init, type) => {
    setTitleData(prev => {
      const updated = structuredClone(prev);
      const arr = updated?.[init]?.[type];
      if (!arr) return prev;
      if (arr.length < 3) arr.push({ id: null, text: '', is_spoiler: false });
      return updated;
    });
  };

  // 🔹 항목 삭제 (UI에서 제거 + ✅ id 있으면 삭제 예약)
  const handleRemove = (init, type, idx) => {
    setTitleData(prev => {
      const updated = structuredClone(prev);
      const arr = updated?.[init]?.[type];
      if (!arr?.[idx]) return prev;

      const removed = arr[idx];
      if (removed?.id) {
        // ✅ functional update로 중복 없이 누적
        setDeletedIds(prevIds =>
          prevIds.includes(removed.id) ? prevIds : [...prevIds, removed.id]
        );
      }

      arr.splice(idx, 1);

      // 최소 1칸 유지
      if (arr.length === 0) {
        updated[init][type] = [{ id: null, text: '', is_spoiler: false }];
      }

      return updated;
    });
  };

  // 🔹 저장 (id 기준으로 수정/생성/삭제)
  const handleSave = async () => {
    if (!character?.initials) return;

    const payloads = [];
    const deleteIds = [...deletedIds]; // ✅ 마이너스로 삭제한 것들 포함

    // 1️⃣ 현재 입력 상태를 payloads로 변환 (빈칸 + id면 삭제로 잡힘)
    Object.entries(titleData).forEach(([to, { calling, called }]) => {
      calling.forEach(({ id, text, is_spoiler }) => {
        if (text.trim()) {
          payloads.push({
            id: id || null,
            from_initials: character.initials,
            to_initials: to,
            text,
            is_spoiler: !!is_spoiler,
            era: 'past_5y',
          });
        } else if (id) {
          deleteIds.push(id); // ✅ 빈칸 삭제
        }
      });

      called.forEach(({ id, text, is_spoiler }) => {
        if (text.trim()) {
          payloads.push({
            id: id || null,
            from_initials: to,
            to_initials: character.initials,
            text,
            is_spoiler: !!is_spoiler,
            era: 'past_5y',
          });
        } else if (id) {
          deleteIds.push(id); // ✅ 빈칸 삭제
        }
      });
    });

    // ✅ deleteIds 중복 제거
    const uniqDeleteIds = Array.from(new Set(deleteIds));

    // 2️⃣ 삭제 먼저
    if (uniqDeleteIds.length > 0) {
      const { error: delErr } = await supabase
        .from('titles')
        .delete()
        .in('id', uniqDeleteIds);

      if (delErr) {
        console.error('❌ 삭제 실패:', delErr);
        alert(`삭제 실패\n${delErr.message}`);
        return;
      }
    }

    // 저장할 게 없으면 그냥 닫기 (삭제만 하고 끝날 수도 있음)
    if (payloads.length === 0) {
      onSave?.();
      handleClose();
      return;
    }

    // 3️⃣ 기존 데이터 가져와서 변경 감지 (dirty check) - ✅ era 필터 꼭!
    const { data: existingRows, error: fetchErr } = await supabase
      .from('titles')
      .select('id, text, is_spoiler')
      .eq('era', 'past_5y')
      .or(
        `from_initials.eq.${character.initials},to_initials.eq.${character.initials}`
      );

    if (fetchErr) {
      console.error('❌ 기존 데이터 로드 실패:', fetchErr);
      // fetch 실패해도 그냥 upsert로 밀어버릴까? -> 여기선 안전하게 중단
      alert(`기존 데이터 로드 실패\n${fetchErr.message}`);
      return;
    }

    // 4️⃣ insert / update 분리 + 변경된 것만 업데이트
    const newRows = payloads.filter(p => !p.id);
    const changedRows = payloads.filter(p => {
      if (!p.id) return false;
      const old = existingRows?.find(r => r.id === p.id);
      return old && (old.text !== p.text || old.is_spoiler !== p.is_spoiler);
    });

    // 🧩 insert
    if (newRows.length > 0) {
      const cleanedNew = newRows.map(({ id, ...rest }) => rest);
      const { error: insertErr } = await supabase.from('titles').insert(cleanedNew);
      if (insertErr) {
        console.error('❌ insert 실패:', insertErr);
        alert(`추가 실패\n${insertErr.message}`);
        return;
      }
    }

    // 🧩 update (변경된 행만)
    if (changedRows.length > 0) {
      const { error: updateErr } = await supabase
        .from('titles')
        .upsert(changedRows, { onConflict: 'id' });

      if (updateErr) {
        console.error('❌ update 실패:', updateErr);
        alert(`수정 실패\n${updateErr.message}`);
        return;
      }
    }

    onSave?.();
    handleClose(); // ✅ 닫기 + deletedIds 초기화
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-[90vw] max-w-xl">
        <h2 className="text-xl font-bold mb-4">{character?.name} 상호호칭 수정</h2>

        <div className="max-h-[60vh] overflow-y-auto space-y-4">
          {allInitials
            .filter(init => init !== character.initials)
            .map(init => (
              <div key={init} className="border-b pb-3">
                <div className="text-sm font-medium mb-2">{nameMap[init]}</div>

                {/* 🔹 내가 상대를 부르는 호칭 */}
                {(titleData[init]?.calling || []).map(({ id, text, is_spoiler }, idx) => (
                  <div key={`call-${init}-${idx}`} className="mb-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-gray-500">
                        {`${character.name} → ${nameMap[init]} ${idx + 1}`}
                      </label>
                      {idx > 0 && (
                        <button
                          onClick={() => handleRemove(init, 'calling', idx)}
                          className="text-red-500 text-xs"
                          type="button"
                        >
                          −
                        </button>
                      )}
                    </div>

                    <div className="flex items-center mt-1">
                      <textarea
                        className="flex-1 border rounded px-2 py-1 mr-2"
                        placeholder="호칭 입력"
                        value={text}
                        onChange={e =>
                          handleChange(init, 'calling', idx, 'text', e.target.value)
                        }
                      />
                      <label className="flex items-center text-xs text-gray-600 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={!!is_spoiler}
                          onChange={e =>
                            handleChange(
                              init,
                              'calling',
                              idx,
                              'is_spoiler',
                              e.target.checked
                            )
                          }
                          className="mr-1"
                        />
                        스포일러
                      </label>
                    </div>
                  </div>
                ))}

                {titleData[init]?.calling?.length < 3 && (
                  <button
                    onClick={() => handleAdd(init, 'calling')}
                    className="text-blue-600 text-xs font-medium"
                    type="button"
                  >
                    + 추가
                  </button>
                )}

                {/* 🔹 상대가 나를 부르는 호칭 */}
                {(titleData[init]?.called || []).map(({ id, text, is_spoiler }, idx) => (
                  <div key={`called-${init}-${idx}`} className="mb-2 mt-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-gray-500">
                        {`${nameMap[init]} → ${character.name} ${idx + 1}`}
                      </label>
                      {idx > 0 && (
                        <button
                          onClick={() => handleRemove(init, 'called', idx)}
                          className="text-red-500 text-xs"
                          type="button"
                        >
                          −
                        </button>
                      )}
                    </div>

                    <div className="flex items-center mt-1">
                      <textarea
                        className="flex-1 border rounded px-2 py-1 mr-2"
                        placeholder="호칭 입력"
                        value={text}
                        onChange={e =>
                          handleChange(init, 'called', idx, 'text', e.target.value)
                        }
                      />
                      <label className="flex items-center text-xs text-gray-600 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={!!is_spoiler}
                          onChange={e =>
                            handleChange(
                              init,
                              'called',
                              idx,
                              'is_spoiler',
                              e.target.checked
                            )
                          }
                          className="mr-1"
                        />
                        스포일러
                      </label>
                    </div>
                  </div>
                ))}

                {titleData[init]?.called?.length < 3 && (
                  <button
                    onClick={() => handleAdd(init, 'called')}
                    className="text-blue-600 text-xs font-medium"
                    type="button"
                  >
                    + 추가
                  </button>
                )}
              </div>
            ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 border rounded" onClick={handleClose} type="button">
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
            type="button"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
