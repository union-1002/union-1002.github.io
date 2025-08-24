import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import { useUser } from '@/shared/user';

function MonthPage() {
  const user = useUser();
  const defaultPosts = [
    {
      id: 7,
      author: "테리",
      text: "아싸 1빠",
      image: "/images/hunters1.png",
      replies: [

      ],
    },
    {
      id: 7,
      author: "테리",
      text: "형 축하해ㅋㅋㅋ 상금으로 나 용돈 주는 거지??",
      image: "/images/hunters1.png",
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "너 하는 거 봐서" },

      ],
    },
    {
      id: 7,
      author: "H",
      text: "인마 너는 게이트에 혼자 좀 들어가지 마라. 네 파트너는 장식이냐?",
      image: "/images/eagleeye1.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "하지만 빨랐죠?" },
        { id: 11, author: "H", image: "/images/eagleeye1.png", text: "말을 말자 내가" },
      ],
    },
    {
      id: 7,
      author: "J",
      text: "수상을 축하합니다. F의 노고에 유니온의 일원으로서 깊은 감사를 표합니다. 앞으로도 변함없는 활약을 기대하겠습니다.",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "주디, 자기야. 여기서까지 그렇게 딱딱하게 굴 필요는 없잖아? 마치 처음 보는 사람한테 말하는 것 같네. 이따 저녁에 시간 비워 둬, 오랜만에 한잔하자고." },
        { id: 11, author: "J", image: "/images/hunters1.png", text: "공적인 공간에서는 예를 갖추는 것이 당연합니다. 저녁 약속은 긍정적으로 검토해 보겠습니다." },
      ],
    },
    {
      id: 7,
      author: "E",
      text: "자네가 항상 헌터즈의 자랑, 나아가 유니온의 명예라는 걸 잊지 말게.",
      image: "/images/hunters1.png", 
      replies: [        
        { id: 11, author: "F", image: "/images/hunters1.png", text: "감사합니다, 형님." },

      ],
    },
    {
      id: 7,
      author: "R",
      text: "이달의 우수 사원 선정을 진심으로 축하드립니다, F. 언제나처럼 눈부신 활약이군요. 시민의 평온한 일상을 위해 스스로를 불태우는 모습은 언제 봐도 감탄스럽습니다. 그 고결한 희생 정신 덕분에, 저희 같은 사람들은 두 발 뻗고 편히 잘 수 있겠습니다.",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "칭찬 고마워, 리하르트. 그렇게 칭찬해주니 쑥스러워서 몸 둘 바를 모르겠는걸. 하지만 걱정 마. 내가 잠 못 이루는 밤을 보내는 만큼, 자기는 아주 깊고 편안한 잠을 잘 수 있을 테니까. 원래 영웅이란 그런 일을 하는 존재 아니겠어? 당신의 안녕을 위해서라면, 기꺼이." },
        { id: 11, author: "R", image: "/images/hunters1.png", text: "제가 그런 깊은 뜻까지 헤아리진 못했습니다. 과연 만인의 영웅은 다르군요. 그 무거운 왕관의 무게를 부디 오래도록 견뎌주시길 바랍니다. 모두를 위해서요." },
        { id: 11, author: "F", image: "/images/hunters1.png", text: "하하, 달링. 걱정해 주는 마음은 고맙지만, 왕관의 무게는 쓰는 사람만이 아는 법이지. 그리고 난 이 무게를 꽤나 즐기고 있거든. 모두를 위해서라… 물론이지. 리하르트, 당신처럼 안락한 소파에 앉아 세상을 걱정하는 고상한 사람들을 위해서라도, 나는 기꺼이 이 먼지 구덩이를 구를 준비가 되어 있어. 그게 내 방식의 고결함이니까." },
        { id: 11, author: "R", image: "/images/hunters1.png", text: "오해는 마시길. 저는 F의 헌신을 의심한 적이 없습니다. 다만, 그토록 빛나는 별은 언젠가 자신의 빛에 타버릴까 염려되었을 뿐입니다. 만인을 위한 영웅은 결국 단 한 사람을 위한 자리는 비워두게 될 테니… 그 공허함이야말로 가장 무거운 대가가 아닐까 싶은데 말이죠. 부디 그 끝이 너무 외롭지 않기를 바랄 뿐." },
        { id: 11, author: "F", image: "/images/hunters1.png", text: "공허함이라. 재미있는 관점이네. 하지만 달링, 별은 혼자 빛나는 게 아니야. 다른 별들과 함께 빛나며 밤하늘을 이루지. 그리고 때로는 단 하나의 달을 위해 빛나기도 하고. 당신처럼 땅에서 하늘만 올려다보는 사람은 결코 이해할 수 없는 세계가 있단 말씀이야. 외로움 운운하기 전에, 가끔은 하늘을 나는 기분이 어떤지 상상이라도 해보는 건 어때? 아, 상상이 안 되려나." },
        { id: 11, author: "R", image: "/images/hunters1.png", text: "땅을 딛고 있기에 하늘의 추락을 걱정할 수 있는 법입니다, F. 모두가 당신처럼 아슬아슬한 창공을 유영하며 살 수는 없으니까요. 누군가는 그 추락의 파편을 맞지 않도록, 아래에서 굳건히 대비하고 있어야 하지 않겠습니까? 그것이 저와 같은 사람들의 역할이겠지요. 당신의 단 하나의 달이라는 것도, 결국은 땅 위에 서 있을 테고." },
        { id: 11, author: "론", image: "/images/wolfdog1.png", text: "좋은 날인데 좋은 말씀만 나눠요~" },
        { id: 11, author: "J", image: "/images/hunters1.png", text: "두 분 모두 그만하십시오. 이곳은 사적인 감정을 배설하는 공간이 아닙니다. F, 저녁 약속은 예정대로 진행하겠습니다. R씨, 불필요한 논쟁은 삼가시길 바랍니다." },
        { id: 11, author: "R", image: "/images/underground1.png", text: "내가 뭐랬습니까" },
      ],
    },
    {
      id: 7,
      author: "론",
      text: "🌟🌟🌟F의 이달사 수상을 진심으로 축하합니다🎉🎉🎉 F! 울프독에도 음료 돌려줘!",
      image: "/images/wolfdog1.png", 
      replies: [
        { id: 11, author: "X", image: "/images/wolfdog1.png", text: "전 아이스 아메리카노요...." },
        { id: 11, author: "M", image: "/images/wolfdog1.png", text: "X, 그런 거 마시지 말라고 말하지 않았습니까." },
        { id: 11, author: "론", image: "/images/wolfdog1.png", text: "내 댓글에서는 싸우기 금지! 둘이 또 화해 의자에 앉아있을 거야?" },
        { id: 11, author: "F", image: "/images/hunters1.png", text: "울프독엔 화해 의자ㅋㅋ가 있어?" },
        { id: 11, author: "비광", image: "/images/wolfdog1.png", text: "안에서 새는 바가지들 또 샜구먼." },
        { id: 11, author: "X", image: "/images/underground1.png", text: "이것도 추억이라면 추억일까요...." },
      ],
    },
    {
      id: 7,
      author: "P",
      text: "축하해요, F. 받을만한 사람이 받아 기쁩니다. 헌터즈 전체 회식은 제가 잡을게요.",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "미카엘", image: "/images/hunters1.png", text: "F 형아 축하해!!! 근데 형 나도 용돈 받고 싶은데" },
        { id: 11, author: "미카엘", image: "/images/dracal1.png", text: "용돈 같은 거 안 줘도 되니까" },
      ],
    },
    {
      id: 7,
      author: "L",
      text: "형🥰🥰🥰🥰 너무너무 축하해요...!! F형이 최고야...!!!!",
      image: "/images/union.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "라비 너도 최고야🥹" },
      ],
    },
    {
      id: 7,
      author: "G",
      text: "맙소사 허니, 이게 무슨 일이니?",
      image: "/images/eagleeye1.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "예상 가능한 일이었잖아 달링." },
      ],
    },
    {
      id: 7,
      author: "T",
      text: "참으로 기쁜 일이외다. F공 덕에 중생들이 평온을 찾고 있으니.",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "엔자기도 항상 평온하길" },
      ],
    },
    {
      id: 7,
      author: "?",
      text: "■■■알 수 없는 오류가 발생하였습니다■■■",
      image: "/images/union.png", 
      replies: [
      ],
    },
    {
      id: 7,
      author: "테리",
      text: "이게 왜 뜬 검까? 뭔데 이거;",
      image: "/images/wolfdog1.png", 
      replies: [
        { id: 11, author: "테리", image: "/images/wolfdog1.png", text: "씨발 진짜 어이가 없네" },
        { id: 11, author: "테리", image: "/images/wolfdog1.png", text: "왜 5년 전 거가 지금 뜨는데요" },
        { id: 11, author: "J", image: "/images/dracal1.png", text: "테리, DB가 잘못 송출되고 있는 것 같은데 이글아이에 정식으로 문의를 넣어야지 욕을 써선 안돼." },
        { id: 11, author: "F", image: "/images/hunters1.png", text: "말뽄새 봐라 로이드" },
        { id: 11, author: "테리", image: "/images/wolfdog1.png", text: "그 계정으로 나한테 답글 달지마" },
      ],
    },
    {
      id: 7,
      author: "N",
      text: "이렇게 된 거 걍 한 번 더 주자ㅋㅋ",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "ㅋㅋㅋㅋㅋㅋ 상금 받으면 술 사줌" },
      ],
    },
    {
      id: 7,
      author: "R",
      text: "금일 오후 3시에 정식으로 항의할 예정입니다.",
      image: "/images/underground1.png", 
      replies: [
        { id: 11, author: "I", image: "/images/wolfdog1.png", text: "같이 가도 되나요?" },
        { id: 11, author: "H", image: "/images/eagleeye1.png", text: "둘 다 오지마 해결중이야" },
      ],
    },
    {
      id: 7,
      author: "미네르바",
      text: "미안하네",
      image: "/images/eagleeye1.png",
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "이제와서" },
      ],
    },
  ];
  
  const grimmerReaperPosts = [
    {
      id: 7,
      author: "테리",
      text: "아싸 1빠",
      image: "/images/hunters1.png",
      replies: [

      ],
    },
    {
      id: 7,
      author: "테리",
      text: "형 축하해ㅋㅋㅋ 상금으로 나 용돈 주는 거지??",
      image: "/images/hunters1.png",
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "너 하는 거 봐서" },

      ],
    },
    {
      id: 7,
      author: "H",
      text: "인마 너는 게이트에 혼자 좀 들어가지 마라. 네 파트너는 장식이냐?",
      image: "/images/eagleeye1.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "하지만 빨랐죠?" },
        { id: 11, author: "H", image: "/images/eagleeye1.png", text: "말을 말자 내가" },
      ],
    },
    {
      id: 7,
      author: "J",
      text: "수상을 축하합니다. F의 노고에 유니온의 일원으로서 깊은 감사를 표합니다. 앞으로도 변함없는 활약을 기대하겠습니다.",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "주디, 자기야. 여기서까지 그렇게 딱딱하게 굴 필요는 없잖아? 마치 처음 보는 사람한테 말하는 것 같네. 이따 저녁에 시간 비워 둬, 오랜만에 한잔하자고." },
        { id: 11, author: "J", image: "/images/hunters1.png", text: "공적인 공간에서는 예를 갖추는 것이 당연합니다. 저녁 약속은 긍정적으로 검토해 보겠습니다." },
      ],
    },
    {
      id: 7,
      author: "E",
      text: "자네가 항상 헌터즈의 자랑, 나아가 유니온의 명예라는 걸 잊지 말게.",
      image: "/images/hunters1.png", 
      replies: [        
        { id: 11, author: "F", image: "/images/hunters1.png", text: "감사합니다, 형님." },

      ],
    },
    {
      id: 7,
      author: "R",
      text: "이달의 우수 사원 선정을 진심으로 축하드립니다, F. 언제나처럼 눈부신 활약이군요. 시민의 평온한 일상을 위해 스스로를 불태우는 모습은 언제 봐도 감탄스럽습니다. 그 고결한 희생 정신 덕분에, 저희 같은 사람들은 두 발 뻗고 편히 잘 수 있겠습니다.",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "칭찬 고마워, 리하르트. 그렇게 칭찬해주니 쑥스러워서 몸 둘 바를 모르겠는걸. 하지만 걱정 마. 내가 잠 못 이루는 밤을 보내는 만큼, 자기는 아주 깊고 편안한 잠을 잘 수 있을 테니까. 원래 영웅이란 그런 일을 하는 존재 아니겠어? 당신의 안녕을 위해서라면, 기꺼이." },
        { id: 11, author: "R", image: "/images/hunters1.png", text: "제가 그런 깊은 뜻까지 헤아리진 못했습니다. 과연 만인의 영웅은 다르군요. 그 무거운 왕관의 무게를 부디 오래도록 견뎌주시길 바랍니다. 모두를 위해서요." },
        { id: 11, author: "F", image: "/images/hunters1.png", text: "하하, 달링. 걱정해 주는 마음은 고맙지만, 왕관의 무게는 쓰는 사람만이 아는 법이지. 그리고 난 이 무게를 꽤나 즐기고 있거든. 모두를 위해서라… 물론이지. 리하르트, 당신처럼 안락한 소파에 앉아 세상을 걱정하는 고상한 사람들을 위해서라도, 나는 기꺼이 이 먼지 구덩이를 구를 준비가 되어 있어. 그게 내 방식의 고결함이니까." },
        { id: 11, author: "R", image: "/images/hunters1.png", text: "오해는 마시길. 저는 F의 헌신을 의심한 적이 없습니다. 다만, 그토록 빛나는 별은 언젠가 자신의 빛에 타버릴까 염려되었을 뿐입니다. 만인을 위한 영웅은 결국 단 한 사람을 위한 자리는 비워두게 될 테니… 그 공허함이야말로 가장 무거운 대가가 아닐까 싶은데 말이죠. 부디 그 끝이 너무 외롭지 않기를 바랄 뿐." },
        { id: 11, author: "F", image: "/images/hunters1.png", text: "공허함이라. 재미있는 관점이네. 하지만 달링, 별은 혼자 빛나는 게 아니야. 다른 별들과 함께 빛나며 밤하늘을 이루지. 그리고 때로는 단 하나의 달을 위해 빛나기도 하고. 당신처럼 땅에서 하늘만 올려다보는 사람은 결코 이해할 수 없는 세계가 있단 말씀이야. 외로움 운운하기 전에, 가끔은 하늘을 나는 기분이 어떤지 상상이라도 해보는 건 어때? 아, 상상이 안 되려나." },
        { id: 11, author: "R", image: "/images/hunters1.png", text: "땅을 딛고 있기에 하늘의 추락을 걱정할 수 있는 법입니다, F. 모두가 당신처럼 아슬아슬한 창공을 유영하며 살 수는 없으니까요. 누군가는 그 추락의 파편을 맞지 않도록, 아래에서 굳건히 대비하고 있어야 하지 않겠습니까? 그것이 저와 같은 사람들의 역할이겠지요. 당신의 단 하나의 달이라는 것도, 결국은 땅 위에 서 있을 테고." },
        { id: 11, author: "론", image: "/images/wolfdog1.png", text: "좋은 날인데 좋은 말씀만 나눠요~" },
        { id: 11, author: "J", image: "/images/hunters1.png", text: "두 분 모두 그만하십시오. 이곳은 사적인 감정을 배설하는 공간이 아닙니다. F, 저녁 약속은 예정대로 진행하겠습니다. R씨, 불필요한 논쟁은 삼가시길 바랍니다." },
        { id: 11, author: "R", image: "/images/underground1.png", text: "내가 뭐랬습니까" },
        { id: 11, author: "하피", image: "/images/gr.png", text: "개새끼" },
      ],
    },
    {
      id: 7,
      author: "론",
      text: "🌟🌟🌟F의 이달사 수상을 진심으로 축하합니다🎉🎉🎉 F! 울프독에도 음료 돌려줘!",
      image: "/images/wolfdog1.png", 
      replies: [
        { id: 11, author: "X", image: "/images/wolfdog1.png", text: "전 아이스 아메리카노요...." },
        { id: 11, author: "M", image: "/images/wolfdog1.png", text: "X, 그런 거 마시지 말라고 말하지 않았습니까." },
        { id: 11, author: "론", image: "/images/wolfdog1.png", text: "내 댓글에서는 싸우기 금지! 둘이 또 화해 의자에 앉아있을 거야?" },
        { id: 11, author: "F", image: "/images/hunters1.png", text: "울프독엔 화해 의자ㅋㅋ가 있어?" },
        { id: 11, author: "비광", image: "/images/wolfdog1.png", text: "안에서 새는 바가지들 또 샜구먼." },
        { id: 11, author: "X", image: "/images/underground1.png", text: "이것도 추억이라면 추억일까요...." },
      ],
    },
    {
      id: 7,
      author: "P",
      text: "축하해요, F. 받을만한 사람이 받아 기쁩니다. 헌터즈 전체 회식은 제가 잡을게요.",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "미카엘", image: "/images/hunters1.png", text: "F 형아 축하해!!! 근데 형 나도 용돈 받고 싶은데" },
        { id: 11, author: "미카엘", image: "/images/dracal1.png", text: "용돈 같은 거 안 줘도 되니까" },
        { id: 11, author: "뽀삐", image: "/images/gr.png", text: "이상하게 익숙해!" },
      ],
    },
    {
      id: 7,
      author: "L",
      text: "형🥰🥰🥰🥰 너무너무 축하해요...!! F형이 최고야...!!!!",
      image: "/images/union.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "라비 너도 최고야🥹" },
      ],
    },
    {
      id: 7,
      author: "G",
      text: "맙소사 허니, 이게 무슨 일이니?",
      image: "/images/eagleeye1.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "예상 가능한 일이었잖아 달링." },
      ],
    },
    {
      id: 7,
      author: "T",
      text: "참으로 기쁜 일이외다. F공 덕에 중생들이 평온을 찾고 있으니.",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "엔자기도 항상 평온하길" },
        { id: 11, author: "하피", image: "/images/gr.png", text: "추억이다 자기야" },
        { id: 11, author: "T", image: "/images/gr.png", text: "모든 것이 화무십일홍이옵니다" },
      ],
    },
    {
      id: 7,
      author: "?",
      text: "■■■알 수 없는 오류가 발생하였습니다■■■",
      image: "/images/union.png", 
      replies: [
      ],
    },
    {
      id: 7,
      author: "테리",
      text: "이게 왜 뜬 검까? 뭔데 이거;",
      image: "/images/wolfdog1.png", 
      replies: [
        { id: 11, author: "테리", image: "/images/wolfdog1.png", text: "씨발 진짜 어이가 없네" },
        { id: 11, author: "테리", image: "/images/wolfdog1.png", text: "왜 5년 전 거가 지금 뜨는데요" },
        { id: 11, author: "J", image: "/images/dracal1.png", text: "테리, DB가 잘못 송출되고 있는 것 같은데 이글아이에 정식으로 문의를 넣어야지 욕을 써선 안돼." },
        { id: 11, author: "F", image: "/images/hunters1.png", text: "말뽄새 봐라 로이드" },
        { id: 11, author: "테리", image: "/images/wolfdog1.png", text: "그 계정으로 나한테 답글 달지마" },
      ],
    },
    {
      id: 7,
      author: "N",
      text: "이렇게 된 거 걍 한 번 더 주자ㅋㅋ",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "ㅋㅋㅋㅋㅋㅋ 상금 받으면 술 사줌" },
      ],
    },
    {
      id: 7,
      author: "R",
      text: "금일 오후 3시에 정식으로 항의할 예정입니다.",
      image: "/images/underground1.png", 
      replies: [
        { id: 11, author: "I", image: "/images/wolfdog1.png", text: "같이 가도 되나요?" },
        { id: 11, author: "H", image: "/images/eagleeye1.png", text: "둘 다 오지마 해결중이야" },
      ],
    },
    {
      id: 7,
      author: "루두스",
      text: "영웅의 찬란한 과거인가요!",
      image: "/images/gr.png",
      replies: [
        { id: 11, author: "하피", image: "/images/gr.png", text: "멍청했던 과거라고 해줄래, 루디?" },
      ],
    },
    {
      id: 7,
      author: "미네르바",
      text: "미안하네",
      image: "/images/eagleeye1.png",
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "이제와서" },
        { id: 11, author: "하피", image: "/images/gr.png", text: "너무 늦지 않았나요" },
      ],
    },
  ];

  const postsToShow = user.part === "새붉은 재앙" ? grimmerReaperPosts : defaultPosts;

  
  return (
    <MainLayout>
      
      <div className="w-full max-w-3xl mx-auto px-2 lg:px-4 py-16 text-center">

        {/* 타이틀 */}
        <h1 className="text-3xl font-extrabold font-book text-[#435373] mb-2">
        👑{user.part === '새붉은 재앙' ? '깨닫지 못했던 시절' : '이달의 우수 사원'}👑
        </h1>
        <p className="text-gray-600 text-sm mb-10">          
          {user.part === '새붉은 재앙' ? '내가 유니온의 개로 있던 시절이야, 자기야' : '매달 유니온의 가장 빛나는 별을 소개합니다.'}
        </p>

        {/* 우수 사원 카드 */}
        <div className='px-2'>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-md mx-auto">
          <img
            src="/images/F.png"
            alt="이달의 우수 사원"
            className="w-full h-180 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#456EBF] mb-1">F</h2>
            <p className="text-sm text-gray-500 mb-2">헌터즈</p>
            <p className="text-sm text-gray-700 leading-relaxed text-left">
              오, 이런. 영광스러운 상을 받게 되었군요. 언제나처럼 당연한 일을 했을 뿐인데, 이렇게 스포트라이트를 비춰주시니 몸 둘 바를 모르겠습니다. 쑥스러워서 선글라스라도 더 짙은 걸로 바꿔 껴야 할까 봐요.<br/><br/>
              물론, 이 모든 영광이 저 혼자만의 것은 아니겠지요. 보이지 않는 곳에서 묵묵히 자신의 역할을 다하는 유니온의 모든 스태프분들, 그리고 언제나 등을 맞대고 싸우는 사랑하는 동료들이 없었다면 불가능했을 겁니다. 특히, 저의 파트너에게는 이 자리를 빌려 특별한 감사를 전하고 싶군요. 달링, 당신이 있기에 나의 창은 길을 잃지 않아.<br/><br/>
              앞으로도 여러분의 가장 화려하고 믿음직한 창이 될 것을 약속드립니다. 하늘이 무너지고 별이 길을 잃는 날이 온다 해도, 제가 여러분의 하늘을 떠받치고 새로운 별자리를 그려 보일 테니, 부디 걱정 없이 오늘을 즐겨주시길.<br/><br/>
              - 여러분의 영웅, F
            </p>
          </div>
        </div>
        </div>

        <div className="grid grid-cols-12 text-sm font-semibold text-gray-700 border-b border-gray-500 mt-20 pb-4">
          <div className="col-span-2 text-center">작성자</div>
          <div className="col-span-10 text-center">내용</div>
        </div>

        {postsToShow.map((post) => (
          <div
            key={post.id}
            className="border-gray-400 border-b border-y-0"
          >
            <div className="grid grid-cols-12 items-start text-sm py-4 hover:bg-gray-50 transition">
              <div className="col-span-2 flex flex-row items-center justify-center gap-1">
                <img
                  src={post.image}
                  alt={post.author}
                  className="w-4 h-4"
                />
                <span className="text-center font-medium">{post.author}</span>
              </div>
              <div className="col-span-10 text-left">
                {typeof post.text === "function" ? post.text(user) : post.text}
              </div>
            </div>

            {post.replies.map((reply) => (
              <div
                key={reply.id}
                className="grid grid-cols-12 items-start text-sm text-gray-600 border-t border-gray-200 py-2"
              >
                <div className="col-span-2 flex flex-row items-center justify-center gap-1">
                  <img
                    src={reply.image}
                    alt={reply.author}
                    className="w-4 h-4"
                  />
                  <span className="text-center font-medium">{reply.author}</span>
                </div>
                <div className="col-span-10 text-left">⤷ {reply.text}</div>
              </div>
            ))}
          </div>
        ))}
      </div>



    </MainLayout>
  );
}

export default MonthPage;
