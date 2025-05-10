import _ from 'lodash';
import { useSearchParams } from 'react-router';
import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import { usePagination, usePosts } from './hooks';

function GoodPage() {
  // URL 쿼리 파라미터
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number.parseInt(searchParams.get('page') ?? 1);
  // 페이지 목록
  const posts = usePosts();
  const pageSize = 10;  // 한 페이지에 보여질 글 개수
  const { pageItems, totalPages } = usePagination(posts, pageSize, currentPage);
  const pageListRange = 2;  // 현재 페이지 양 옆에 보여줄 번호 수
  const pageListStart = Math.max(1, Math.min(totalPages, currentPage - pageListRange));
  const pageListEnd = Math.max(1, Math.min(totalPages, currentPage + pageListRange));

  const goToPage = (i) => { setSearchParams({ page: i }) };

  return (
    <MainLayout>
      <PageLayout
        title="칭찬합니다"
        sidebar={MENU_PROPS['직원 마당']}
      >
        <div className="flex flex-wrap lg:flex-nowrap items-start text-sm font-semibold border-b border-gray-400 pb-4">
          <div className="w-[50px] lg:w-[60px] text-center shrink-0">번호</div>
          <div className="hidden lg:block w-[60px] text-center font-medium shrink-0">작성자</div>
          <div className="flex justify-center items-center w-[calc(100%-50px)]  lg:flex-grow lg:mt-0 lg:ml-5">내용</div>
        </div>

        {/* 게시글 목록 */}
        {pageItems.map((post, index) => (
          <div
            key={post.id}
            className="border-gray-300 
                       border-b 
                       border-y-0"
          >
            {/* 메인 글 */}
            
            <div className="flex flex-wrap lg:flex-nowrap items-start text-sm py-4 hover:bg-gray-50 transition">
              <div className="w-[50px] lg:w-[60px] text-center shrink-0">{post.id}</div>
              <div className="w-[50px] lg:w-[60px] text-left lg:text-center font-medium shrink-0">{post.author}</div>
              <div className="w-full lg:flex-grow ml-12 mt-1.5 lg:mt-0 lg:ml-5">{typeof post.text === "function" ? post.text() : post.text}</div>
            </div>
        
            {/* 답글들 */}
            {post.replies.map((reply) => (
              <div key={reply.id} className="flex flex-wrap lg:flex-nowrap items-start text-sm text-gray-600 border-t border-gray-200 py-2">
                <div className="w-[50px] lg:w-[60px] text-center shrink-0 text-xs">⤷</div>
                <div className="w-[50px] lg:w-[60px] text-left lg:text-center shrink-0">{reply.author}</div>
                <div className="w-full lg:flex-grow ml-12 mt-1.5 lg:mt-0 lg:ml-5">{reply.text}</div>
              </div>
            ))}
          </div>
        ))}

        {/* 페이지 목록 */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3 py-1 rounded-md border text-sm select-none cursor-pointer disabled:cursor-default bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            이전
          </button>

          {_.range(pageListStart, pageListEnd+1).map((i) =>
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`px-3 py-1 rounded-md border text-sm select-none cursor-pointer disabled:cursor-default ${
                i === currentPage
                  ? "bg-[#435373] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i}
            </button>
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-1 rounded-md border text-sm select-none cursor-pointer disabled:cursor-default bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            다음
          </button>
        </div>
      </PageLayout>
    </MainLayout>
  );
}

export default GoodPage;
