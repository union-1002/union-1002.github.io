import { useEffect, useState } from 'react';
import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import Papa from "papaparse";


const groups = [
  ['E', 'N', 'S', '오'],
  ['H', 'L'],
  ['M', '테', 'A', 'I', '비'],
  ['J', '미'],
  ['R', 'Y', 'X'],
  ['라', '루', 'P', '느', 'T', 'F',],
];

const colorGroups = {
  green: ['E', 'N', 'S', '오'],
  purple: ['H', 'L'],
  blue: ['M', '테', 'A', 'I', '비'],
  grayBlue: ['J', '미'],
  red: ['R', 'Y', 'X'],
  gray: ['라', '루', 'P', '느', 'T', 'F',],
};

const colorValues = {
  green: "#a4b778",
  purple: "#af9cb8",
  blue: "#94b0b7",
  grayBlue: "#aabacc",
  red: "#b9a1a3",
  gray: "#d1d5db",
};

const circleColors = {};

Object.entries(colorGroups).forEach(([groupName, initials]) => {
  initials.forEach(initial => {
    circleColors[initial] = colorValues[groupName];
  });
});


const borderColorValues = {
  green: "#595f4b",
  purple: "#683c7a",
  blue: "#316d7d",
  grayBlue: "#5e7185",
  red: "#8c323b",
  gray: "#111111",
};

const borderColors = {};

Object.entries(colorGroups).forEach(([groupName, initials]) => {
  initials.forEach(initial => {
    borderColors[initial] = borderColorValues[groupName];
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

  const [activeMenu, setActiveMenu] = useState('직원 소개'); // 현재 선택된 메뉴

  const [employees, setEmployees] = useState([]);
  const [titles, setTitles] = useState({});

  useEffect(() => {
    const fetchCSVData = async () => {
      const [empRes, titleRes] = await Promise.all([
        fetch('/data/employees.csv'),
        fetch('/data/titles.csv')
      ]);

      const [empText, titleText] = await Promise.all([
        empRes.text(),
        titleRes.text()
      ]);

      // CSV 파싱
      const empResult = Papa.parse(empText, { header: true, skipEmptyLines: true });
      const titleResult = Papa.parse(titleText, { header: true, skipEmptyLines: true });

      const empData = empResult.data;
      const titleData = titleResult.data;

      empData.forEach(emp => {
        if (emp.etc) {
          emp.etc = emp.etc.replace(/\\n/g, '\n');  // 문자열 "\n" → 진짜 줄바꿈
        }
      });

      // titles를 {from: {to: [{text, isSpoiler}]}} 형태로 변환
      const titleMap = {};
      titleData.forEach(({ from, to, text, isSpoiler }) => {
        if (!titleMap[from]) titleMap[from] = {};
        if (!titleMap[from][to]) titleMap[from][to] = [];
        titleMap[from][to].push({
          text,
          isSpoiler: isSpoiler === "TRUE" || isSpoiler === true
        });
      });

      setEmployees(empData);
      setTitles(titleMap);
    };

    fetchCSVData();
  }, []);


  const [selected, setSelected] = useState(null);
  const [revealedTitles, setRevealedTitles] = useState(new Set());
  const handleReveal = (sel, target, idx) => {
    setRevealedTitles(prev => new Set(prev).add(`${sel}-${target}-${idx}`));
  };

  const [revealedFields, setRevealedFields] = useState({
    fullname: false,
    nationality: false,
  });

  


  return (
    <MainLayout>
      <PageLayout
        title="직원 소개"
        sidebar={MENU_PROPS['유니온 소개']}
      >
        <div className="flex flex-col items-center space-y-4 w-full">
          <div className="mb-3"></div>
          {groups.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center flex-wrap max-w-4xl w-full">
            {row.map((initial) => {
              const emp = employees.find(e => e.initials === initial);
              if (!emp) return null;
              return (
                <div key={emp.id} className="flex flex-col items-center" style={{minWidth:"9rem", minHeight:"10rem", alignItems: "center"}}>
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
                    className={`w-20 h-20 flex items-center justify-center text-xl font-bold`}
                    style={{
                      backgroundColor: circleColors[initial],
                      border: selected?.initials === initial ? `3px solid ${borderColors[initial]}` : "none",
                      borderRadius: "9999px",
                    }}
                  >
                    {emp.initials}
                  </button>
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
