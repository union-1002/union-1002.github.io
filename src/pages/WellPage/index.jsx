import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';

function WellPage() {
  return (
    <MainLayout>
      <PageLayout
        title="직원 복지"
        sidebar={MENU_PROPS['직원 마당']}
      >
        <p className="text-base text-[#404040] leading-relaxed">
          <span className="text-xl block text-left font-song font-bold">“당신의 헌신이 곧 유니온의 자산입니다.”</span><br/>
          유니온은 시민을 위해 헌신하는 에스퍼와 모든 구성원들이<br/>
          건강하고 지속 가능한 삶을 누릴 수 있도록 다양한 복지제도를 운영하고 있습니다.<br/><br/><br/>

          <span className="text-lg block font-semibold">✅ 경조사 지원 제도</span>
          구성원의 삶에 함께합니다.<br/>
          결혼, 출산, 부모님 회갑, 가족 사망 등 주요 경조사 시 유급 휴가와 경조금이 지급되며,<br/>
          필요 시 긴급 심리지원도 함께 제공합니다.<br/><br/>

          <span className="text-lg block font-semibold">🌿 안식년 제도</span>
          장기 근무로 지친 마음과 몸을 재충전하세요.<br/>
          10년 이상 근속한 직원에게는 최대 6개월간의 유급 안식년을 제공합니다.<br/>
          해당 기간 동안 심리 상담, 국내외 연수, 자기계발을 위한 비용도 일부 지원됩니다.<br/><br/>

          <span className="text-lg block font-semibold">☀️ 여름휴가 및 계절휴가</span>
          계절별 리프레시 기회를 보장합니다.<br/>
          연 1회 여름휴가 외에도, 분기마다 하루씩 사용 가능한 ‘계절휴가제’를 운영하고 있으며,<br/>
          휴양시설 우선 예약과 교통비 지원도 포함됩니다.<br/><br/>

          <span className="text-lg block font-semibold">🎖️ 장기근속 휴가</span>
          유니온의 든든한 뿌리가 되어준 여러분께 감사를 전합니다.<br/>
          5년, 10년, 20년 근속 시 포상휴가와 근속 기념품, 특별 수당이 함께 지급됩니다.<br/><br/>

          <span className="text-lg block font-semibold">🧘 심리상담 및 회복 지원</span>
          에스퍼의 정신건강은 곧 시민의 안전입니다.<br/>
          전문 상담사를 상시 배치하여 심리상담과 트라우마 치료를 지원하며,<br/>
          게이트 출동 후에는 자동 회복 프로그램이 적용됩니다.<br/><br/>

          <span className="text-lg block font-semibold">🏠 주거 및 생계 안정 지원</span>
          거주지 지원과 생계 안정은 기본입니다.<br/>
          근무 지역 외 거주자에게는 주거보조금이 제공되며,<br/>
          직원의 가족 구성원을 위한 교육비 지원 프로그램도 마련되어 있습니다.<br/><br/>

          <span className="text-lg block font-semibold">✈️ 휴양 및 복지 시설</span>
          전용 휴양소 및 협력 복지시설에서 편안한 휴식을 누리세요.<br/>
          산간, 해변 등 다양한 지역의 유니온 전용 시설 이용이 가능하며,<br/>
          연 2회 무료 이용권이 지급됩니다.<br/><br/>

          <span className="text-lg block font-semibold">📚 자기계발 및 전직 지원</span>
          당신의 다음 걸음도 유니온이 함께합니다.<br/>
          희망자에 한해 자기계발비와 외부 교육 이수 지원,<br/>
          전직 희망 시 커리어 코칭 및 재배치 프로그램을 운영합니다.<br/><br/><br/>

          💬 유니온은 구성원의 삶을 보호하는 것이 곧 시민을 지키는 또 다른 방법임을 믿습니다.<br/>
          우리는 당신의 헌신에 응답할 준비가 되어 있습니다.
        </p>
      </PageLayout>
    </MainLayout>
  );
}

export default WellPage;
