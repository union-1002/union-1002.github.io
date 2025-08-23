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
          { link: "notice", id: 20, title: "[긴급] 게이트 현황 시스템 오류(해결중)", author: "이글아이", date: "2020.08.24" },
          { link: "notice", id: 19, title: "울프독 긴급 신고 번호 신설", author: "울프독", date: "2020.08.23" },
          { link: "monthlyMember", id: 18, title: "이달의 우수 사원 - F", author: "이글아이", date: "2020.08.20" },
          { link: "notice", id: 17, title: "상반기 신입 사원 오리엔테이션", author: "드라칼", date: "2020.08.17" },
          { link: "notice", id: 16, title: "비에스퍼 신입 사원 채용 안내", author: "드라칼", date: "2020.08.15" },
          { link: "notice", id: 15, title: "신입 사원 온보딩 교육(강사: J[헌터즈])", author: "헌터즈", date: "2020.08.05" },
          { link: "notice", id: 14, title: "2분기 게이트 현황 공식 발표", author: "E[헌터즈]", date: "2020.08.05" },
          { link: "siteintro", id: 13, title: "유니온 사이트 안내", author: "이글아이", date: "2020.08.04" },
          { link: "notice", id: 12, title: "8월 단체 상담 프로그램 모집", author: "이글아이", date: "2020.08.03" },
          { link: "notice", id: 11, title: "테리 도버만 생일 파티", author: "테리", date: "2020.08.02" },
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
