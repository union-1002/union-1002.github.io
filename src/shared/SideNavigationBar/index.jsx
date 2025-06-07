import { Link } from 'react-router';

export const MENU_PROPS = {
  '유니온 소개': {
    title: '유니온 소개',
    links: {
      "총장 인사말": "/hello",
      "연혁": "/timeline",
      "부서 소개": "/teamIntro",
      "조직도": "/organization",
      "직원 소개": "/memberIntro",
    },
  },
  '유니온 소식': {
    title: '유니온 소식',
    links: {
      "공지사항": "/notice",
      "일정": "/schedule",
      "채용": "/career",
    },
  },
  '직원 마당': {
    title: '직원 마당',
    links: {
      "직원 복지": "/wellfare",
      "칭찬합니다": "/good",
      "노동조합": "/nojo",
    },
  },
  '시민 마당': {
    title: '시민 마당',
    links: {
      "민원 사례": "/minwonList",
      "민원 신청": "/minwonSubmit",
    },
  },
};

function SideNavigationBar({ title, links }) {
  return (
    <div className="hidden lg:flex flex-col w-60 rounded-md border-[0.5px] border-[#435373]">

      {/* 대제목 */}
      <div className=" bg-[#435373] h-40 flex items-center justify-center">
        <h2 className="text-[#ffffff] font-bold text-lg text-center">
          {title}
        </h2>
      </div>

      {/* 소메뉴 */}
      <div className="flex flex-col divide-y divide-gray-300">
        {Object.keys(links).map((menu, idx) => (
          <Link
            key={idx}
            to={links[menu] || "/"}
            className={`text-sm text-left font-semibold px-4 py-4 transition 
              ${
                links[menu] === location.pathname
                  ? 'border-l-4 border-[#456EBF] text-[#456EBF] rounded-md'
                  : 'text-[#404040] hover:text-[#456EBF]'
              }`}
          >
            {menu}
          </Link>
        ))}
      </div>

    </div>
  );
}

export default SideNavigationBar;
