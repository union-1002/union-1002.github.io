import { useEffect, useState } from 'react';
import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import Papa from "papaparse";
import { useUser } from '@/shared/user';
import supabase from '@/shared/supabase';
// import { Dialog, DialogTitle, DialogContent, DialogFooter } from '@/components/ui/dialog';


const groups = [
  ['E', 'N', 'S', '오'],
  ['H', 'L'],
  ['M', '테', 'A', 'I', '비'],
  ['J', '미'],
  ['R', 'Y', 'X'],
  ['라', '루', 'P', '느', 'T', 'F',],
];

const groupedParts = [
  {
    groupName: "헌터즈",
    parts: ['E', 'N', 'S', '오'],
    color: "#fff9e6",
    borderColor: "#ffc801"
  },
  {
    groupName: "이글아이",
    parts: ['H', 'L'],
    color: "#f2ebfd",
    borderColor: "#7640ee"
  },
  {
    groupName: "울프독",
    parts: ['M', '테', 'A', 'I', '비'],
    color: "#ecf7fb",
    borderColor: "#3ab8de"
  },
  {
    groupName: "드라칼",
    parts: ['J', '미'],
    color: "#ebeffa",
    borderColor: "#2f61d4"
  },
  {
    groupName: "언더 그라운드",
    parts: ['R', 'Y', 'X'],
    color: "#fff0ed",
    borderColor: "#ff7147"
  },
  {
    groupName: "그림 리퍼",
    parts: ['라', '루', 'P', '느', 'T', 'F'],
    color: "#eae9ef",
    borderColor: "#25265e"
  }
];

// circleColors와 borderColors 동시 생성
const circleColors = {};
const borderColors = {};

groupedParts.forEach(group => {
  group.parts.forEach(initial => {
    circleColors[initial] = group.color;
    borderColors[initial] = group.borderColor;
  });
});


const subMenus = ['총장 인사말', '연혁', '부서 소개', '직원 소개'];

const menuLinks = {
  "총장 인사말": "/hello",
  "연혁": "/timeline",
  "부서 소개": "/teamintro",
  "직원 소개": "/memberintro",
};



function MemberIntroPage() {
  const user = useUser();
  const [activeMenu, setActiveMenu] = useState('직원 소개'); // 현재 선택된 메뉴

  const [employees, setEmployees] = useState([]);
  const [titles, setTitles] = useState({});

  const [visibleGroups, setVisibleGroups] = useState(groups.map(g => [...g]));


  useEffect(() => {
  const newGroups = groups.map(group => [...group]);

  const fetchCSVData = async () => {
    const cachedEmpData = sessionStorage.getItem('cachedEmployees');
    const cachedTitleData = sessionStorage.getItem('cachedTitles');

    let empData = [];
    let titleMap = {};

    if (cachedEmpData && cachedTitleData) {
      empData = JSON.parse(cachedEmpData);
      titleMap = JSON.parse(cachedTitleData);
      console.log('여기')
    } else {
      const [empRes, titleRes] = await Promise.all([
        fetch('/data/employees.csv'),
        fetch('/data/titles.csv')
      ]);
      const [empText, titleText] = await Promise.all([
        empRes.text(),
        titleRes.text()
      ]);
      const empResult = Papa.parse(empText, { header: true, skipEmptyLines: true });
      const titleResult = Papa.parse(titleText, { header: true, skipEmptyLines: true });

      empData = empResult.data;
      const titleData = titleResult.data;

      titleData.forEach(({ from, to, text, isSpoiler }) => {
        if (!titleMap[from]) titleMap[from] = {};
        if (!titleMap[from][to]) titleMap[from][to] = [];
        titleMap[from][to].push({
          text,
          isSpoiler: isSpoiler === "TRUE" || isSpoiler === true
        });
      });

      empData.forEach(emp => {
        if (emp.etc) {
          emp.etc = emp.etc.replace(/\\n/g, '\n');
        }
      });

      sessionStorage.setItem('cachedEmployees', JSON.stringify(empData));
      sessionStorage.setItem('cachedTitles', JSON.stringify(titleMap));
    }

    // 로그인 사용자 데이터 반영
    if (user.isLoggedIn && user.uid) {
      empData.push({
        id: 'me',
        initials: '나',
        name: user.username,
        position: user.part,
        birthday: '-',
        age: '-',
        height: '-',
        gen: '-',
        fullname: '-',
        engname: '-',
        nationality: '-',
        etc: '',
      });

      const groupIndex = groupedParts.findIndex(g => g.groupName === user.part);
      circleColors['나'] = groupedParts[groupIndex].color;
      borderColors['나'] = groupedParts[groupIndex].borderColor;
      newGroups[groupIndex].push('나');
      setVisibleGroups(newGroups);

      const { data: callDoc, error } = await supabase
        .from("employees")
        .select("calling, called")
        .eq("id", user.uid)
        .single();

      if (!error && callDoc) {
        const { calling = {}, called = {} } = callDoc;

        Object.entries(calling).forEach(([to, text]) => {
          if (!titleMap['나']) titleMap['나'] = {};
          if (!titleMap['나'][to]) titleMap['나'][to] = [];
          titleMap['나'][to].push({ text, isSpoiler: false });
        });

        Object.entries(called).forEach(([from, text]) => {
          if (!titleMap[from]) titleMap[from] = {};
          if (!titleMap[from]['나']) titleMap[from]['나'] = [];
          titleMap[from]['나'].push({ text, isSpoiler: false });
        });
      }
    }

    setEmployees(empData);
    setTitles(titleMap);
  };

  fetchCSVData();
}, [user.userid]);



  
  const [selected, setSelected] = useState(null);
  const [revealedTitles, setRevealedTitles] = useState(new Set());
  const handleReveal = (sel, target, idx) => {
    setRevealedTitles(prev => new Set(prev).add(`${sel}-${target}-${idx}`));
  };

  const [revealedFields, setRevealedFields] = useState({
    fullname: false,
    nationality: false,
  });

  const [editModalOpen, setEditModalOpen] = useState(false);

  const refreshTitles = async () => {
    const { data: callDoc, error } = await supabase
      .from("employees")
      .select("calling, called")
      .eq("id", user.uid)
      .single();

    if (!error && callDoc) {
      const { calling = {}, called = {} } = callDoc;

      const newTitleMap = { ...titles };

      Object.entries(calling).forEach(([to, text]) => {
        if (!newTitleMap['나']) newTitleMap['나'] = {};
        newTitleMap['나'][to] = [{ text, isSpoiler: false }];
        });

      Object.entries(called).forEach(([from, text]) => {
        if (!newTitleMap[from]) newTitleMap[from] = {};
        newTitleMap[from]['나'] = [{ text, isSpoiler: false }];
      });

      setTitles(newTitleMap);
    }
  };

  const [calling, setCalling] = useState({});
  const [called, setCalled] = useState({});

  useEffect(() => {
    if (!editModalOpen || !user.uid) return;
    const fetchCallData = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("calling, called")
        .eq("id", user.uid)
        .single();
      if (!error && data) {
        setCalling(data.calling || {});
        setCalled(data.called || {});
      } else {
        setCalling({});
        setCalled({});
      }
    };
    fetchCallData();
  }, [editModalOpen, user.uid]);

  const handleSave = async () => {
    const { error } = await supabase
      .from("employees")
      .upsert({
        id: user.uid,
        calling,
        called
      });
    
    if (!error) {
      await refreshTitles();
      setEditModalOpen(false);
    }
  };


  return (
    <MainLayout>
      <PageLayout
        title="직원 소개"
        sidebar={MENU_PROPS['유니온 소개']}
      >
        <div className="flex flex-col items-center space-y-4 w-full">
          {editModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow w-[90vw] max-w-xl">
                <h2 className="text-xl font-bold mb-4">상호 호칭 수정</h2>

                <div className="max-h-[60vh] overflow-y-auto space-y-4">
                  {groups.flat().map(initial => (
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
          {user.isLoggedIn && (
            <button
              className="bg-[#404040] text-white px-2 py-1 rounded mb-10"
              onClick={() => setEditModalOpen(true)}
            >
              ◆
            </button>
          )}

          {visibleGroups.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center flex-wrap max-w-4xl w-full">
            {row.map((initial) => {
              const emp = employees.find(e => e.initials === initial);
              if (!emp) return null;
              return (
                <div key={emp.id} className="flex flex-col items-center" style={{minWidth:"9rem", minHeight:"10rem", alignItems: "center"}}>
                  <div className="relative">
                    <button
                      onClick={() => 
                        {
                          setSelected(emp);
                          setRevealedFields({
                            fullname: false,
                            nationality: false,
                          });    
                        }             
                      }
                      className={`w-20 h-20 flex items-center justify-center text-xl font-bold shadow-md`}
                      style={{
                        backgroundColor: circleColors[initial],
                        border: `2px solid ${borderColors[initial]}`,
                        borderRadius: "9999px",
                      }}
                    >
                      {emp.initials}
                    </button>
                    {/* 선택된 경우 작은 동그라미 표시 */}
                    {selected?.initials === emp.initials && (
                      <div
                        className="absolute -top-1 left-0.5 w-7 h-7 rounded-full"
                        style={{
                          backgroundColor: borderColors[initial],
                          border: "2px solid white",
                        }}
                      />
                    )}
                  </div>
                  
                  {selected && selected.initials !== emp.initials && (
                    <div className="mt-2 text-xs text-gray-700 flex flex-col items-center">
                      {(titles[selected.initials]?.[emp.initials] || [{ text: '-', isSpoiler: false }]).map((title, idx) => (
                        <div
                          key={`${title.text}-${idx}`}
                          className={`cursor-pointer ${revealedTitles.has(`${selected.initials}-${emp.initials}-${idx}`) || !title.isSpoiler
                            ? 'transition-all duration-300 blur-none'
                            : 'transition-none blur-xs'}`}
                          onClick={() => handleReveal(selected.initials, emp.initials, idx)}
                        >
                          {title.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}



        </div>

        {/* 선택한 직원 정보 출력 */}
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