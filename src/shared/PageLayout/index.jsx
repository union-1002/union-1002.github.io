import SideNavigationBar from '@/shared/SideNavigationBar';

function PageLayout({ ref, title, sidebar, children }) {
  return (
    <div ref={ref} className="flex max-w-7xl mx-auto px-4 lg:px-8 mt-8 space-x-8 items-start">
      {sidebar && <SideNavigationBar {...sidebar} />}

      {/* 본문 */}
      <div className="flex-1 flex flex-col items-center space-y-8 mb-20">

        {/* 제목 */}
          <div className="w-full text-left mt-8 mb-20">
            <h1 className="text-3xl font-bold text-[#435373] mb-2">
              {title}
            </h1>
            <div className="w-full h-0.5 bg-[#435373]"></div>
          </div>
        {/* 본문 내용 */}
          <div className="w-full text-left px-2">
            {children}
          </div>
      </div>
    </div>
  );
}

export default PageLayout;
