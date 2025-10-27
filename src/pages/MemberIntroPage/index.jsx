import { useEffect, useState } from 'react';
import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import supabase from '@/shared/supabase';
import { useUser } from '@/shared/user';

function MemberIntroPage() {
  const user = useUser();
  const [employees, setEmployees] = useState([]);
  const [titles, setTitles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [revealedTitles, setRevealedTitles] = useState(new Set());
  const [revealedFields, setRevealedFields] = useState({
    fullname: false,
    nationality: false,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [calling, setCalling] = useState({});
  const [called, setCalled] = useState({});
  const [allInitials, setAllInitials] = useState([]);

  //1️⃣ characters + groups 불러오기
  useEffect(() => {
    const fetchCharacters = async () => {
      const { data, error } = await supabase
        .from('characters')
        .select(`
          *,
          groups (
            group_name,
            color,
            border_color,
            order_index
          )
        `)
        .eq('is_public', true)
        .order('id', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        return;
      }
      let employeesList = data;

      // ✅ 로그인한 사용자가 있을 경우, “나” 추가
      if (user.isLoggedIn && user.uid) {
        // 1️⃣ 내 부서 색상 가져오기 (기존 부서 리스트에서 검색)
        const myGroup = employeesList.find(
          e => e.groups?.group_name === user.part
        )?.groups;

        // 2️⃣ “나” 항목 구성
        const me = {
          id: 'me',
          initials: '나',
          name: user.username,
          fullname: user.fullname,
          engname: user.engname,
          nationality: user.nationality,
          position: user.part,   // 부서명
          birthday: user.birthday,
          age: user.age,
          height: user.height,
          gen: user.gen,
          etc: '',
          groups: myGroup || {
            group_name: user.part,
            color: '#f0f0f0',
            border_color: '#999',
          },
        };

        // 3️⃣ “나”를 기존 부서 캐릭터 바로 뒤에 추가
        employeesList = [...employeesList, me];
      }

      setEmployees(employeesList);
    };


    fetchCharacters();
  }, []);

  // 2️⃣ titles 불러오기
  useEffect(() => {
    const fetchAllTitles = async () => {
      let all = [];
      let from = 0;
      const batch = 1000;
      let done = false;

      while (!done) {
        const { data, error } = await supabase
          .from('titles')
          .select('*')
          .range(from, from + batch - 1);

        if (error) {
          console.error('Supabase error:', error);
          break;
        }

        all = all.concat(data);

        if (data.length < batch) {
          done = true;
        } else {
          from += batch;
        }
      }

      all.sort((a, b) => a.id - b.id);
      setTitles(all);

      // 🔹 기본 titles 로드 완료 후 유저 호칭 추가
      if (user.isLoggedIn) {
        await refreshUserTitles(all);
      }
    };

    fetchAllTitles();
  }, [user.isLoggedIn]);



  // 3️⃣ 유저 개인 호칭 (아직 employees 테이블)
  const refreshUserTitles = async (baseTitles = titles) => {
    if (!user.isLoggedIn) return;

    const { data, error } = await supabase
      .from('employees')
      .select('calling, called')
      .eq('id', user.uid)
      .single();

    if (error) {
      console.error('refreshUserTitles error:', error);
      return;
    }

    const { calling = {}, called = {} } = data;
    const newTitles = [...baseTitles];

    Object.entries(calling).forEach(([to, text]) => {
      if (!newTitles.find(t => t.from_initials === '나' && t.to_initials === to)) {
        newTitles.push({ from_initials: '나', to_initials: to, text, is_spoiler: false });
      }
    });

    Object.entries(called).forEach(([from, text]) => {
      if (!newTitles.find(t => t.from_initials === from && t.to_initials === '나')) {
        newTitles.push({ from_initials: from, to_initials: '나', text, is_spoiler: false });
      }
    });

    console.log('✅ [refreshUserTitles] 최종 titles:', newTitles);
    setTitles(newTitles);
  };


  useEffect(() => {
    if (user.isLoggedIn) refreshUserTitles();
  }, [user.isLoggedIn]);

  // 4️⃣ 스포일러 클릭 시 해제
  const handleReveal = (from, to, idx) => {
    setRevealedTitles(prev => new Set(prev).add(`${from}-${to}-${idx}`));
  };

  // 5️⃣ 그룹별 캐릭터 묶기
  const groupedByGroup = employees.reduce((acc, emp) => {
    const groupName = emp.groups?.group_name || '기타';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(emp);
    return acc;
  }, {});



  // 6️⃣ 두 캐릭터 간 타이틀 추출
  const getTitlesForPair = (from, to) =>
    titles.filter(t => t.from_initials === from && t.to_initials === to);

  

  // 모달 관련

  const handleSave = async () => {
    const { error } = await supabase
      .from("employees")
      .upsert({
        id: user.uid,
        calling,
        called,
      });

    if (error) {
      console.error('호칭 저장 오류:', error);
      return;
    }

    setEditModalOpen(false);
    await refreshUserTitles(); // 타이틀 갱신
  };


  // 모달 수정 불러오기

  useEffect(() => {
    const fetchCallData = async () => {
      if (!editModalOpen || !user.uid) return;

      const { data, error } = await supabase
        .from('employees')
        .select('calling, called')
        .eq('id', user.uid)
        .single();

      if (error) {
        console.error('❌ 호칭 불러오기 실패:', error);
        return;
      }

      setCalling(data.calling || {});
      setCalled(data.called || {});
      console.log('✅ 기존 호칭 불러옴:', data);
    };

    fetchCallData();
  }, [editModalOpen, user.uid]);



  // 이니셜 목록 가져오기

  useEffect(() => {
    const fetchInitials = async () => {
      const { data, error } = await supabase
        .from('characters')
        .select('initials')
        .eq('is_public', true)
        .order('id', { ascending: true });

      if (!error && data) {
        setAllInitials(data.map(c => c.initials));
      }
    };
    fetchInitials();
  }, []);

  

  return (
    <MainLayout>
      <PageLayout title="직원 소개" sidebar={MENU_PROPS['유니온 소개']}>
        <div className="flex flex-col items-center space-y-4 w-full">
          {/* 회원용 버튼 (모달) */}
          {user.isLoggedIn && (
            <button
              className="bg-[#404040] text-white px-2 py-1 rounded mb-10"
              onClick={() => setEditModalOpen(true)}
            >
              ◆
            </button>
          )}
          {editModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow w-[90vw] max-w-xl">
                <h2 className="text-xl font-bold mb-4">상호 호칭 수정</h2>

                <div className="max-h-[60vh] overflow-y-auto space-y-4">
                  {allInitials.map(initial => (
                    <div key={initial}>
                      <div className="text-sm font-medium">{initial}</div>
                      <input
                        className="border w-full rounded px-2 py-1 mt-1 mb-2"
                        placeholder="내가 부르는 호칭"
                        value={calling[initial] || ''}
                        maxLength={10}
                        onChange={e => setCalling({ ...calling, [initial]: e.target.value })}
                      />
                      <input
                        className="border w-full rounded px-2 py-1"
                        placeholder="나를 부르는 호칭"
                        value={called[initial] || ''}
                        maxLength={10}
                        onChange={e => setCalled({ ...called, [initial]: e.target.value })}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    className="px-4 py-2 border rounded"
                    onClick={() => setEditModalOpen(false)}
                  >
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
          )}

          {/* 🔹 그룹별 캐릭터 목록 */}
          {Object.entries(groupedByGroup).map(([groupName, members]) => (
            <div key={groupName} className="mb-8 w-full flex justify-center">
              <div className="flex justify-center flex-wrap max-w-4xl w-full">
                {members.map(emp => (
                  <div
                    key={emp.id}
                    className="flex flex-col items-center"
                    style={{ minWidth: '9rem', maxWidth: '9rem', minHeight: '10rem' }}
                  >
                    <div className="relative">
                      <button
                        onClick={() => {
                          setSelected(emp);
                          setRevealedFields({ fullname: false, nationality: false });
                        }}
                        className="w-20 h-20 flex items-center justify-center text-xl font-bold shadow-md"
                        style={{
                          backgroundColor: emp.groups?.color || '#eee',
                          border: `2px solid ${emp.groups?.border_color || '#999'}`,
                          borderRadius: '9999px',
                        }}
                      >
                        {emp.initials}
                      </button>

                      {/* ✅ 선택된 캐릭터 위에 점 표시 */}
                      {selected?.initials === emp.initials && (
                        <div
                          className="absolute -top-1 left-0.5 w-7 h-7 rounded-full"
                          style={{
                            backgroundColor: emp.groups?.border_color || '#999',
                            border: '2px solid white',
                          }}
                        />
                      )}
                    </div>

                    {/* 선택된 캐릭터와 연결된 호칭 */}
                    {selected && selected.initials !== emp.initials && (
                      <div className="mt-2 text-xs text-gray-700 flex flex-col items-center">
                        {(getTitlesForPair(selected.initials, emp.initials) || [{ text: '-', is_spoiler: false }]).map(
                          (title, idx) => (
                            <div
                              key={`${title.text}-${idx}`}
                              className={`whitespace-pre-line text-center cursor-pointer transition-[filter] duration-300 ease-out ${
                                revealedTitles.has(`${selected.initials}-${emp.initials}-${idx}`) || !title.is_spoiler
                                  ? 'blur-none'
                                  : '[filter:blur(5px)]'
                              }`}
                              onClick={() => handleReveal(selected.initials, emp.initials, idx)}
                            >
                              {title.text}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 캐릭터 상세정보 */}
        {selected && (
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
            <p className="text-lg text-gray-700 mb-6">{selected.position}</p>

            <div className="grid grid-cols-2 lg:max-w-lg mx-auto text-left">
              <div className="border border-gray-300 p-4">
                <p className="text-xs text-gray-500 mb-1">생일</p>
                <p className="text-sm font-medium">{selected.birthday}</p>
              </div>
              <div className="border-b border-r border-t border-gray-300 p-4">
                <p className="text-xs text-gray-500 mb-1">나이</p>
                <p className="text-sm font-medium">{selected.age}세</p>
              </div>
              <div className="border-b border-l border-r border-gray-300 p-4">
                <p className="text-xs text-gray-500 mb-1">키</p>
                <p className="text-sm font-medium">{selected.height}cm</p>
              </div>
              <div className="border-b border-r border-gray-300 p-4">
                <p className="text-xs text-gray-500 mb-1">세대</p>
                <p className="text-sm font-medium">{selected.gen}세대</p>
              </div>
              <div className="border-b border-l border-r border-gray-300 p-4">
                <p className="text-xs text-gray-500 mb-1">본명</p>
                <p
                  className={`text-sm font-medium cursor-pointer ${
                    revealedFields.fullname
                      ? 'transition-[filter] duration-300 ease-out blur-none'
                      : 'transition-none [filter:blur(5px)]'
                  }`}
                  onClick={() => setRevealedFields({ ...revealedFields, fullname: true })}
                >
                  {selected.fullname}<br/>
                  {selected.engname}
                </p>
              </div>
              <div className="border-b border-r border-gray-300 p-4">
                <p className="text-xs text-gray-500 mb-1">출신</p>
                <p
                  className={`text-sm font-medium cursor-pointer ${
                    revealedFields.nationality
                      ? 'transition-[filter] duration-300 ease-out blur-none'
                      : 'transition-none [filter:blur(5px)]'
                  }`}
                  onClick={() => setRevealedFields({ ...revealedFields, nationality: true })}
                >
                  {selected.nationality}
                </p>
              </div>
              <div className="col-span-2 p-4 border-b border-l border-r border-gray-300">
                <p className="text-xs text-gray-500 mb-1">기타</p>
                <p className="text-sm font-medium whitespace-pre-line">{selected.etc}</p>
              </div>
            </div>
          </div>
        )}
      </PageLayout>
    </MainLayout>
  );
}

export default MemberIntroPage;
