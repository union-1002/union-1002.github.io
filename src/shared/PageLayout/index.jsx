import SideNavigationBar from '@/shared/SideNavigationBar';
import AdBottom from "../../components/AdBottom";

function PageLayout({ ref, title, sidebar, children }) {
  return (
    <div ref={ref} className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 lg:px-8 mt-8 gap-8">
      {/* 사이드바 */}
      {sidebar && <SideNavigationBar {...sidebar} />}

      {/* 본문 */}
      <div className="flex-1 flex flex-col items-center space-y-8">

        {/* 제목 */}
        <div className="w-full text-left mt-8 mb-20">
          <h1 className="text-3xl font-bold text-[#435373] mb-2">{title}</h1>
          <div className="w-full h-0.5 bg-[#435373]" />
        </div>

        {/* 본문 내용 */}
        <div className="w-full text-left px-2">{children}</div>

        {/* 광고 */}
        <div className="w-full flex justify-center mt-10 mb-20">
          <AdBottom />
        </div>
      </div>
    </div>

  );
}

export default PageLayout;
