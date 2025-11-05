import { useEffect, useState } from 'react';
import supabase from '@/shared/supabase';

export default function CharacterTitleModal({ nameMap, character, allInitials = [], onClose, onSave }) {
  const [titleData, setTitleData] = useState({});

  // 🔹 기존 상호호칭 불러오기
  useEffect(() => {
    const fetchTitles = async () => {
      const { data, error } = await supabase
        .from('titles')
        .select('id, from_initials, to_initials, text, is_spoiler')
        .or(`from_initials.eq.${character.initials},to_initials.eq.${character.initials}`);

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
      data.forEach(row => {
        const entry = { id: row.id, text: row.text, is_spoiler: row.is_spoiler ?? false };
        if (row.from_initials === character.initials) {
          if (!initState[row.to_initials]) initState[row.to_initials] = { calling: [], called: [] };
          initState[row.to_initials].calling.push(entry);
        } else if (row.to_initials === character.initials) {
          if (!initState[row.from_initials]) initState[row.from_initials] = { calling: [], called: [] };
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
  }, [character, allInitials]);

  // 🔹 입력 변경 핸들러
  const handleChange = (init, type, idx, key, value) => {
    setTitleData(prev => {
      const updated = structuredClone(prev);
      updated[init][type][idx][key] = value;
      return updated;
    });
  };

  // 🔹 항목 추가
  const handleAdd = (init, type) => {
    setTitleData(prev => {
      const updated = structuredClone(prev);
      const arr = updated[init][type];
      if (arr.length < 3) arr.push({ id: null, text: '', is_spoiler: false });
      return updated;
    });
  };

  // 🔹 항목 삭제
  const handleRemove = (init, type, idx) => {
    setTitleData(prev => {
      const updated = structuredClone(prev);
      updated[init][type].splice(idx, 1);
      if (updated[init][type].length === 0)
        updated[init][type] = [{ id: null, text: '', is_spoiler: false }];
      return updated;
    });
  };

  // 🔹 저장 (id 기준으로 수정/생성/삭제)
  const handleSave = async () => {
    const payloads = [];
    const deleteIds = [];

    Object.entries(titleData).forEach(([to, { calling, called }]) => {
      calling.forEach(({ id, text, is_spoiler }) => {
        if (text.trim()) {
          payloads.push({
            id: id || undefined,
            from_initials: character.initials,
            to_initials: to,
            text,
            is_spoiler: !!is_spoiler,
          });
        } else if (id) {
          deleteIds.push(id);
        }
      });

      called.forEach(({ id, text, is_spoiler }) => {
        if (text.trim()) {
          payloads.push({
            id: id || undefined,
            from_initials: to,
            to_initials: character.initials,
            text,
            is_spoiler: !!is_spoiler,
          });
        } else if (id) {
          deleteIds.push(id);
        }
      });
    });

    // 1️⃣ 삭제
    if (deleteIds.length > 0) {
      const { error: delError } = await supabase
        .from('titles')
        .delete()
        .in('id', deleteIds);
      if (delError) console.error('❌ 삭제 실패:', delError);
    }

    // 2️⃣ 저장/수정
    if (payloads.length > 0) {
      const { error } = await supabase
        .from('titles')
        .upsert(payloads, { onConflict: 'id' });
      if (error) {
        console.error('❌ 저장 실패:', error);
        alert('저장 실패');
        return;
      }
    }

    onSave?.();
    onClose();
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
                <div className="text-sm font-medium mb-2">{init}</div>

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
                        >
                        −
                        </button>
                    )}
                    </div>

                    {/* ✅ 한 줄 정렬 버전 */}
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
                            handleChange(init, 'calling', idx, 'is_spoiler', e.target.checked)
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
                        >
                        −
                        </button>
                    )}
                    </div>

                    {/* ✅ 동일하게 한 줄 정렬 적용 */}
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
                            handleChange(init, 'called', idx, 'is_spoiler', e.target.checked)
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
                >
                    + 추가
                </button>
                )}

              </div>
            ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 border rounded" onClick={onClose}>
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
