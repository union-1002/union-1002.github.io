import React from 'react';
import BannerSlide from './components/BannerSlide';
import MainLayout from '@/shared/MainLayout';
import { Link } from 'react-router';

function MainPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 lg:px-2 mt-8 gap-4 flex flex-col lg:flex-row lg:gap-2">
        {/* 왼쪽 배너 */}
        <div className="w-full lg:max-w-[627px] lg:mb-0">
          <BannerSlide />
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-full xl:flex-1 flex flex-col space-y-8 gap-2">
          {/* 게이트 현황 */}
          <div className="panel gate-status w-full rounded-md">
            <h2 className='text-5xl'>주간 게이트 현황</h2>
            <div className="w-full h-px bg-[#B6C5F2] my-5"></div>
            <div className="status-grid grid grid-cols-3 xl:grid-cols-6 gap-2 justify-items-center">
              {[
                { grade: 'EX', count: 0, className: 'ex' },
                { grade: 'S', count: 1, className: 's' },
                { grade: 'A', count: 2, className: 'a' },
                { grade: 'B', count: 4, className: 'b' },
                { grade: 'C', count: 7, className: 'c' },
                { grade: 'D', count: 6, className: 'd' },
              ].map(({ grade, count, className }, idx) => (
                <div key={idx} className={`status-card ${className}`}>
                  <div className="label-section">{grade}</div>
                  <div className="count-section">{count}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-row">
            <div className="flex-1 h-26 bg-[#B6C5F2] flex flex-col items-center justify-center">
              {/* 왼쪽 아이콘 */}
              <img
                src="./images/phonecall.png" 
                alt="Crime Report"
                className="w-16 h-16 object-contain mb-4"
              />
              {/* 오른쪽 텍스트 */}
              <div className="text-sm font-semibold text-center">
                게이트 발생 제보 →
              </div>
            </div>
            <Link to='/good' className='cursor-pointer flex-1 h-26 bg-[#B6C5F2] flex flex-col items-center justify-center'>
            
              {/* 왼쪽 아이콘 */}
              <img
                src="./images/goodjob.png" 
                alt="Crime Report"
                className="w-16 h-16 object-contain mb-4"
              />
              {/* 오른쪽 텍스트 */}
              <div className="text-sm font-semibold text-center">
                칭찬합니다 →
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-100 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          {/* 하단 내용 */}
          <div className="grid grid-cols-4 xl:grid-cols-8 gap-6 text-center">
            {[
              { icon: "./images/howto.png", label: "사이트 이용 안내", link: "/siteIntro" },
              { icon: "./images/goodmember.png", label: "이달의 우수 사원", link: "/monthlyMember" },
              { icon: "./images/recruit.png", label: "채용 소식", link: "/career" },
              { icon: "./images/group.png", label: "부서 소개", link: "/teamIntro" },
              { icon: "./images/orga.png", label: "직원 소개", link: "/memberIntro" },
              { icon: "./images/calendar.png", label: "일정", link: "/schedule" },
              { icon: "./images/goodexam.png", label: "우수 민원 사례", link: "/minwonList" },
              { icon: "./images/well.png", label: "직원 복지", link: "/wellfare" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <Link to={item.link} key={idx} className="flex flex-col items-center cursor-pointer">
                  <img src={item.icon} alt={item.label} className="w-12 h-12 mb-2 object-contain" />
                  <div className="text-sm font-medium">{item.label}</div>
                </Link>
              </div>
            ))}

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MainPage;
