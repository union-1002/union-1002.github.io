import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';

function TimelinePage() {
  return (
    <MainLayout>
      <PageLayout
        title="연혁"
        sidebar={MENU_PROPS['유니온 소개']}
      >
        <div className="w-fit place-self-center">


          <div className="relative pl-8 sm:pl-32 pb-12 group">

              <div className="font-ink font-base text-xl text-indigo-500 mb-1 sm:mb-0">The First</div>

              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                  <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-22 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">10년 전 늦봄</time>
                  <div className="text-xl font-book text-slate-900">첫 게이트 발생</div>
              </div>

              <div className="text-slate-500">
                첫 게이트 각성: J / R / F / L / E / X / P / I / H / T / 비광 / 미카엘<br/>
                번외: 라멘타 각성
              </div>
          </div>
          

          <div className="relative pl-8 sm:pl-32 pb-12 group">
              <div className="font-ink font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">The Rise</div>

              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                  <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-22 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">10년 전 늦가을</time>
                  <div className="text-xl font-book text-slate-900">UNION 설립</div>
              </div>

              <div className="text-slate-500">
                유니온은 게이트 첫 발생 이후 8개월만에 범국가적 기관으로 설립<br/>
                이후 1.5년만에 안정화되어 정착
              </div>
          </div>
          

          <div className="relative pl-8 sm:pl-32 pb-12 group">

              <div className="font-ink font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">The Wolfdog</div>

              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                  <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-22 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">8년 전 초봄</time>
                  <div className="text-xl font-book text-slate-900">
                    울프독 신설
                  </div>
              </div>

              <div className="text-slate-500">
                  각성: M<br/>
                  울프독 원년 멤버: M / X
              </div>
          </div>
          

          <div className="relative pl-8 sm:pl-32 pb-12 group">

              <div className="font-ink font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">The Brother</div>

              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                  <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-22 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">7년 전 초여름</time>
                  <div className="text-xl font-book text-slate-900">
                    1.5세대
                  </div>
              </div>

              <div className="text-slate-500">
                각성: 테리 도버만
              </div>
          </div>

          <div className="relative pl-8 sm:pl-32 pb-12 group">

            <div className="font-ink font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">The Dracal</div>

            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-22 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">6년 전 초가을</time>
                <div className="text-xl font-book text-slate-900">
                  드라칼 신설
                </div>
            </div>

            <div className="text-slate-500">
              
            </div>
          </div>

          <div className="relative pl-8 sm:pl-32 pb-12 group">

            <div className="font-ink font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">The Death Side</div>

            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-22 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">5년 전 08/24</time>
                <div className="text-xl font-book text-slate-900">
                  데스사이드 게이트 발생
                </div>
            </div>

            <div className="text-slate-500">
              데스사이드 발생 / 그림 리퍼의 민간인 학살(제물 의식)<br/>
              각성: A / N / S(2세대의 시작)<br/>
              사망: F / P
            </div>
          </div>

          <div className="relative pl-8 sm:pl-32 pb-12 group">

            <div className="font-ink font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">The Shift</div>

            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-22 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">5년 전 겨울</time>
                <div className="text-xl font-book text-slate-900">
                  그 후
                </div>
            </div>

            <div className="text-slate-500">
              J: 헌터즈 → 드라칼<br/>
              R: 헌터즈 → 언더그라운드<br/>
              테리: 헌터즈 → 울프독<br/>
              L: 격리조치
            </div>
          </div>

          <div className="relative pl-8 sm:pl-32 pb-12 group">

            <div className="font-ink font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">The Breaking</div>

            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-22 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">4년 전</time>
                <div className="text-xl font-book text-slate-900">
                  결렬
                </div>
            </div>

            <div className="text-slate-500">
              A, 테리 이념 다툼<br/>
              페어 강제 해제<br/>
            </div>
          </div>

          <div className="relative pl-8 sm:pl-32 pb-12 group">

            <div className="font-ink font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">The 3rd Generation</div>

            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-22 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">3년 전</time>
                <div className="text-xl font-book text-slate-900">
                  3세대
                </div>
            </div>

            <div className="text-slate-500">
              각성: Y
            </div>
          </div>

          <div className="relative pl-8 sm:pl-32 pb-12 group">

            <div className="font-ink font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">The Change</div>

            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-22 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">2년 전</time>
                <div className="text-xl font-book text-slate-900">
                  변화
                </div>
            </div>

            <div className="text-slate-500">
              각성: 루두스<br/>
              X: 울프독 → 언더그라운드
            </div>
          </div>

          <div className="relative pl-8 sm:pl-32 pb-12 group">

            <div className="font-ink font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">The Resignation</div>

            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-22 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">1년 전</time>
                <div className="text-xl font-book text-slate-900">
                  체념
                </div>
            </div>

            <div className="text-slate-500">
              Y: 울프독 → 언더그라운드
            </div>
          </div>

          <div className="relative pl-8 sm:pl-32 pb-12 group">

            <div className="font-ink font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">The Present</div>

            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-22 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">현재</time>
                <div className="text-xl font-book text-slate-900">
                  유니온은 지금
                </div>
            </div>

            <div className="text-slate-500">
              오르티의 UNION 가입<br/>
              F의 빌런 활동, P의 그림 리퍼 활동 시작
            </div>
          </div>

          

        </div>
      </PageLayout>
    </MainLayout>
  );
}

export default TimelinePage;
