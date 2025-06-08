import MainLayout from '@/shared/MainLayout';
import { Link } from 'react-router';

function SitePage() {
  return (
    <MainLayout>
      <div className="w-full flex flex-col items-center px-4 py-12 space-y-12">

        {/* 이미지 */}
        <img
          src="./images/starrain.jpg"
          alt="사이트 이용 안내"
          className="w-full max-w-md mx-auto"
        />

        {/* 안내 섹션 1 */}
        <div className="w-full max-w-3xl text-left space-y-2">
          <h2 className="text-xl font-bold text-[#435373]">유니온 공식 홈페이지</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            이 사이트는 스타레인 세계관을 기반으로 하며, 현실의 인물/사건/배경과 무관합니다.<br/>
            회원가입 문의, 오류 제보, 기능 아이디어 제안은 공홈지기에게 전달해주세요!<br/><br/>

            - 공식 X: <Link to="https://x.com/union_1002" target="_blank">유니온 공홈지기</Link><br/>
            - 기획/개발: <Link to="https://x.com/so_for_so" target="_blank">소소</Link><br/>
            - 디자인: <Link to="https://x.com/HorangE474" target="_blank">호댕</Link><br/>
            - 원작/감수: <Link to="https://x.com/r0binthebird" target="_blank">로빈</Link><br/>
            (닉네임 클릭시 X 계정으로 이동합니다.)
          </p>
        </div>

        {/* 안내 섹션 2 */}
        <div className="w-full max-w-3xl text-left space-y-2">
          <h2 className="text-xl font-bold text-[#435373]">이스터 에그</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            - 로그인 하여 쪽지를 확인하고 게시판을 둘러보세요.<br/>
            - 부서 소개에서 숨겨진 부서를 찾아보세요.<br/>
            - 유니온의 보안을 뚫어보세요. (보안 해제시 스포일러 절대 주의!)<br/>
          </p>
        </div>

        {/* 안내 섹션 3 */}
        <div className="w-full max-w-3xl text-left space-y-2">
          <h2 className="text-xl font-bold text-[#435373]">저작권 표시</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            프리텐다드 <span className='font-gs'>강원교육새음체/강원특별자치도교육청</span> <span className='font-son'>KCC손기정체/한국저작권위원회</span> <span className='font-book'>부크크 명조/(주)부크크</span> <span className='font-song'>코트라 손글씨체/KOTRA</span> <span className='font-ink'>잉크 립퀴드체/더페이스샵</span><br/>

            UI 아이콘 제작자: <a href="https://www.flaticon.com/kr/authors/surang" title="ui 아이콘" target='blank'>surang - Flaticon</a>
          </p>
        </div>

        </div>

    </MainLayout>
  );
}

export default SitePage;
