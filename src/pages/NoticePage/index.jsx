import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import { Link } from 'react-router';

function NoticePage() {
  return (
    <MainLayout>
      <PageLayout
        title="공지사항"
        sidebar={MENU_PROPS['유니온 소식']}
      >
        <div className="grid grid-cols-10 lg:grid-cols-12 text-sm font-semibold text-gray-700 border-b border-gray-400 pb-4">
          <div className="col-span-1 text-center">번호</div>
          <div className="col-span-7 text-center">제목</div>
          <div className="col-span-2 text-center">작성자</div>
          <div className="hidden lg:block col-span-2 text-center">작성일</div>
        </div>

        {/* 게시글 목록 */}
        {[
          { link: "notice", id: 10, title: "[사회공헌팀] 스타레인 실버 교육 컴퓨터 교실 신청 안내", author: "이글아이", date: "2025.06.08" },
          { link: "monthlyMember", id: 9, title: "이달의 우수 사원", author: "이글아이", date: "2025.06.08" },
          { link: "notice", id: 8, title: "인사 이동 공지", author: "이글아이", date: "2025.05.01" },
          { link: "notice", id: 7, title: "상반기 신입 사원 오리엔테이션", author: "드라칼", date: "2025.04.30" },
          { link: "notice", id: 6, title: "1분기 게이트 현황 공식 발표", author: "헌터즈", date: "2025.04.30" },
          { link: "notice", id: 5, title: "울프독 합동 장례식 배차 공지", author: "울프독", date: "2025.04.29" },
          { link: "notice", id: 4, title: "유니온 어린이집 원아 모집", author: "이글아이", date: "2025.04.28" },
          { link: "siteintro", id: 3, title: "유니온 사이트 안내", author: "이글아이", date: "2025.04.28" },
          { link: "notice", id: 2, title: "5월 단체 상담 프로그램 모집", author: "심리센터", date: "2025.04.25" },
          { link: "notice", id: 1, title: "서버 점검 일정 안내 (5/1)", author: "이글아이", date: "2025.04.20" },
        ].map((post) => (
          <Link
            key={post.id}
            to={`/${post.link}`}
            // to={`/posts/${post.id}`}
            className="grid grid-cols-10 lg:grid-cols-12 items-center text-sm text-gray-800 hover:bg-gray-100 py-4 border-b border-gray-200 transition"
          >
            <div className="col-span-1 text-center">{post.id}</div>
            <div className="col-span-7 truncate text-left text-[#1a202c] hover:underline">{post.title}</div>
            <div className="col-span-2 text-center">{post.author}</div>
            <div className="col-span-2 text-center hidden lg:block">{post.date}</div>
          </Link>
        ))}
      </PageLayout>
    </MainLayout>
  );
}

export default NoticePage;
