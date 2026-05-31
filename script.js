let FaceLandmarker = null;
let FilesetResolver = null;

/* ==========================================================================
   PHYSIOGNOMY DATABASE (관상 데이터베이스)
   ========================================================================== */
const PHYSIOGNOMY_DB = {
  eyes: [
    {
      name: "봉황안 (鳳凰眼)",
      desc: "눈 모양이 가늘고 길며 끝부분이 칼집처럼 잘려 올라간 모양입니다.",
      interpretation: "전통 관상학에서는 지혜가 극에 달하고 성품이 고결하며, 대의명분을 쫓는 높은 사회적 지위를 얻을 기운으로 해석하기도 합니다.",
      good: ["판단력", "통솔력", "사회운"],
      weak: ["대인운"],
      caution: "스스로에 대한 엄격함으로 인해 주변 이들에게 피로감을 줄 수 있다고 해석하기도 하니 유념하십시오.",
      target: { ratio: 3.8, tilt: 10, symmetry: 0.95 }
    },
    {
      name: "용안 (龍眼)",
      desc: "눈꺼풀에 맑은 주름이 지고 검은동자가 맑게 빛나며 기백이 서려 있는 모양입니다.",
      interpretation: "전통 관상학에서는 일국의 지도자가 되거나 큰 조직을 이끌어갈 제왕적 기운을 품은 상으로 해석하기도 합니다.",
      good: ["통솔력", "결단력", "권력운"],
      weak: ["인간관계운"],
      caution: "의지가 지나치게 강해 타인의 타당한 충고를 외면하기 쉽다고 보기도 하니 귀를 열어두십시오.",
      target: { ratio: 3.0, tilt: 7, symmetry: 0.96 }
    },
    {
      name: "호안 (虎眼)",
      desc: "크고 둥글면서도 부릅뜬 모양새를 지녀 눈동자 주위에 힘이 넘치는 모양입니다.",
      interpretation: "전통 관상학에서는 용맹함과 위엄이 넘쳐 군대나 경찰, 또는 무관의 관직에서 큰 명성을 떨칠 기운으로 해석하기도 합니다.",
      good: ["추진력", "결단력", "권력운"],
      weak: ["대인운"],
      caution: "급하고 과격한 판단으로 뜻밖의 난관을 겪을 수 있다고 해석하기도 하니 온화함을 기르십시오.",
      target: { ratio: 2.3, tilt: -2, symmetry: 0.94 }
    },
    {
      name: "학안 (鶴眼)",
      desc: "맑고 깨끗하며 눈동자가 뚜렷하고 기품 어린 평온함을 유지하는 모양입니다.",
      interpretation: "전통 관상학에서는 청렴하고 고결한 성품을 지녀, 학계나 예술계에서 존경받는 스승의 기운으로 해석하기도 합니다.",
      good: ["판단력", "사회운", "인간관계운"],
      weak: ["추진력"],
      caution: "속세의 물욕이나 경쟁적인 성취를 다소 멀리하여 세속적인 풍요는 적을 수 있다고 해석하기도 합니다.",
      target: { ratio: 3.1, tilt: 1, symmetry: 0.95 }
    },
    {
      name: "사안 (蛇眼)",
      desc: "눈이 다소 납작하고 날카로우며 차가운 안광을 품은 독특한 느낌의 모양입니다.",
      interpretation: "전통 관상학에서는 집요한 집착력과 목적을 이루기 위한 치밀한 지략이 돋보이는 모사의 상으로 해석하기도 합니다.",
      good: ["판단력", "추진력", "결단력"],
      weak: ["대인운"],
      caution: "과도한 독단이나 욕망의 추구로 인간관계에 풍파가 일어날 수 있다고 조언하기도 합니다.",
      target: { ratio: 3.6, tilt: -4, symmetry: 0.92 }
    },
    {
      name: "장안 (豹眼)",
      desc: "눈꼬리가 옆으로 힘 있게 찢어지고 맹수의 날카로운 위세가 엿보이는 모양입니다.",
      interpretation: "전통 관상학에서는 위풍당당하고 결단력이 빨라 개척정신을 가진 신흥 가문의 강인한 상으로 해석하기도 합니다.",
      good: ["추진력", "결단력", "통솔력"],
      weak: ["인간관계운"],
      caution: "적과 동지의 구분이 선명하여 원치 않는 대립을 야기할 수 있다고 보기도 하니 너른 포용력이 필요합니다.",
      target: { ratio: 2.6, tilt: 3, symmetry: 0.94 }
    },
    {
      name: "원안 (圓眼)",
      desc: "동그랗고 맑으며 눈매가 아이처럼 선하고 귀여운 조화를 이루는 모양입니다.",
      interpretation: "전통 관상학에서는 다정다감하고 대인관계가 유연하여 많은 이들의 호감을 사며 화합을 이루는 상으로 해석하기도 합니다.",
      good: ["대인운", "인간관계운", "사회운"],
      weak: ["결단력"],
      caution: "성품이 여려 타인의 부탁을 모질게 거절하지 못하고 손해를 입을 수 있다고 보기도 합니다.",
      target: { ratio: 1.9, tilt: 0, symmetry: 0.97 }
    },
    {
      name: "세안 (細眼)",
      desc: "가늘고 길지만 끝이 부드럽고 눈동자가 조심스레 숨겨진 듯한 모양입니다.",
      interpretation: "전통 관상학에서는 매사에 사려 깊고 돌다리도 두드려 보고 건너는 신중함을 바탕으로 안정을 기르는 상으로 해석하기도 합니다.",
      good: ["판단력", "재물운", "말년운"],
      weak: ["추진력"],
      caution: "기회를 포착해야 할 순간에도 과도하게 숙고하다 실기할 우려가 있다고 해석하기도 합니다.",
      target: { ratio: 4.1, tilt: 0, symmetry: 0.95 }
    }
  ],
  eyebrows: [
    {
      name: "용미 (龍眉)",
      desc: "활처럼 크고 힘차게 굽어지며 눈썹 꼬리가 단정하게 모인 모양입니다.",
      interpretation: "전통 관상학에서는 형제간의 우애가 깊고 귀인의 원조를 얻어 대업을 성취할 조력운이 깃든 상으로 해석하기도 합니다.",
      good: ["대인운", "사회운", "통솔력"],
      weak: ["결단력"],
      caution: "타인을 의식해 자신의 진의를 묵히기 쉬운 성격이라고 보기도 합니다.",
      target: { tilt: 8, length: 1.35 }
    },
    {
      name: "일자미 (一字眉)",
      desc: "한 일(一)자 형태로 굵고 기운 차게 뻗어나간 곧은 모양입니다.",
      interpretation: "전통 관상학에서는 굳센 주관과 올곧은 마음을 지녀 스스로 세운 목표를 향해 우직하게 나아가는 상으로 해석하기도 합니다.",
      good: ["추진력", "결단력", "통솔력"],
      weak: ["인간관계운"],
      caution: "유연성과 융통성이 부족해 주변과 잦은 불화를 자초할 수 있으니 타협의 가치를 새기십시오.",
      target: { tilt: 1, length: 1.25 }
    },
    {
      name: "검미 (劍眉)",
      desc: "칼끝처럼 단정하게 모여 시작하다가 끝부분이 힘 있게 솟아오른 모양입니다.",
      interpretation: "전통 관상학에서는 정의감이 불같고 용맹하여 악조건 속에서도 흔들림 없이 국면을 돌파하는 상으로 해석하기도 합니다.",
      good: ["결단력", "추진력", "권력운"],
      weak: ["대인운"],
      caution: "매사에 비타협적이거나 엄격하여 주위에 적을 만들기 쉬운 기운으로 해석되기도 합니다.",
      target: { tilt: 14, length: 1.2 }
    },
    {
      name: "월미 (月眉)",
      desc: "초승달처럼 부드럽고 맑은 곡선을 그리며 단아하게 뻗은 모양입니다.",
      interpretation: "전통 관상학에서는 감수성이 풍부하고 예능 및 학문에 소질이 있어 평화로운 인간관계를 형성하는 상으로 해석하기도 합니다.",
      good: ["대인운", "인간관계운", "사회운"],
      weak: ["추진력"],
      caution: "치열한 승부처나 거친 갈등 속에서 쉽게 마음의 상처를 입고 회피할 수 있다고 조언합니다.",
      target: { tilt: 6, length: 1.4 }
    },
    {
      name: "팔자미 (八字眉)",
      desc: "여덟 팔(八)자 모양으로 눈썹 끝부분이 아래로 처져 내려간 모양입니다.",
      interpretation: "전통 관상학에서는 세상을 온화하고 유유자적하게 살피며 모나지 않게 사람을 품어내는 기운으로 해석하기도 합니다.",
      good: ["대인운", "인간관계운", "말년운"],
      weak: ["추진력", "결단력"],
      caution: "자기주장을 펼치기 주저하여 주도권을 빼앗기고 남의 의지대로 끌려다니기 쉽다고 봅니다.",
      target: { tilt: -8, length: 1.3 }
    },
    {
      name: "장미 (長眉)",
      desc: "눈의 길이보다 훨씬 길고 무성하여 부드러운 숲처럼 눈을 감싸 안는 모양입니다.",
      interpretation: "전통 관상학에서는 수명이 길고 복록이 두터우며, 형제간의 화목함과 안정적인 가정을 이끌 상으로 해석하기도 합니다.",
      good: ["재물운", "말년운", "대인운"],
      weak: ["결단력"],
      caution: "상황 변화에 대처하는 순발력이 다소 부족하여 보수적인 선택에 갇힐 수 있다고 해석합니다.",
      target: { tilt: 4, length: 1.5 }
    }
  ],
  nose: [
    {
      name: "용골코 (龍骨鼻)",
      desc: "콧대가 이마까지 우뚝하게 솟아 끊어짐이 없고 콧방울이 단정하게 감싼 모양입니다.",
      interpretation: "전통 관상학에서는 하늘의 도움을 받아 명예가 사방에 떨치고 권세가 드높을 귀한 코로 해석하기도 합니다.",
      good: ["권력운", "통솔력", "사회운"],
      weak: ["대인운"],
      caution: "지나치게 고고한 태도로 인해 주변의 평범한 이들과 섞이기 힘들 수 있으니 하심(下心)을 가지십시오.",
      target: { lengthRatio: 0.38, widthRatio: 0.75 }
    },
    {
      name: "사자코 (獅子鼻)",
      desc: "콧대는 약간 낮으나 준두(콧망울)가 풍성하고 콧구멍이 보이지 않는 둥근 모양입니다.",
      interpretation: "전통 관상학에서는 군중을 다스리는 재주가 비범하고 자수성가하여 큰 집단을 일구어낼 재상의 코로 해석하기도 합니다.",
      good: ["통솔력", "추진력", "재물운"],
      weak: ["인간관계운"],
      caution: "한 번 고집을 부리면 타인의 조언이 닿지 않아 독단에 빠지기 쉬운 점을 경계해야 합니다.",
      target: { lengthRatio: 0.32, widthRatio: 0.95 }
    },
    {
      name: "복코 (懸膽鼻)",
      desc: "쓸개를 매달아 놓은 듯이 준두가 크고 풍만하며 둥그스름하게 떨어진 모양입니다.",
      interpretation: "전통 관상학에서는 평생 의식(衣食)이 끊이지 않고 저축에 재능이 있어 큰 부를 축적할 상으로 해석하기도 합니다.",
      good: ["재물운", "말년운", "판단력"],
      weak: ["결단력"],
      caution: "안정을 최우선시하여 새로운 도전이나 변화에 주저하는 경향이 있다고 보기도 합니다.",
      target: { lengthRatio: 0.34, widthRatio: 0.88 }
    },
    {
      name: "재상코 (截筒鼻)",
      desc: "대나무 통을 쪼개어 세워놓은 듯이 반듯하고 넓으며 깨끗한 모양입니다.",
      interpretation: "전통 관상학에서는 성품이 청렴하고 매사에 바른 도리를 지켜 국가나 관직의 중책을 순조로이 수행할 상으로 해석하기도 합니다.",
      good: ["판단력", "사회운", "재물운"],
      weak: ["추진력"],
      caution: "지나친 완벽주의로 부하 직원이나 아랫사람에게 엄격한 기준을 들이대 갈등을 빚을 수 있습니다.",
      target: { lengthRatio: 0.36, widthRatio: 0.80 }
    },
    {
      name: "군자코 (君子鼻)",
      desc: "길이와 콧방울이 적절한 조화를 이루고 지나치게 기묘하지 않은 평범 단정한 모양입니다.",
      interpretation: "전통 관상학에서는 무난하면서도 중용의 미덕을 지녀 학문적 지혜를 닦고 삶을 고요히 성찰하는 상으로 해석하기도 합니다.",
      good: ["판단력", "인간관계운", "말년운"],
      weak: ["권력운"],
      caution: "격동하는 세상의 파도에서 권력을 잡기 위한 투쟁적인 욕심이 적어 큰 다툼 없이 살아간다고 해석합니다.",
      target: { lengthRatio: 0.33, widthRatio: 0.82 }
    }
  ],
  mouth: [
    {
      name: "용구 (龍口)",
      desc: "입술이 두툼하고 길며 단정하고, 입꼬리가 하늘을 향해 힘 있게 솟은 모양입니다.",
      interpretation: "전통 관상학에서는 신의가 두텁고 언행에 절제가 있어 권세 있는 무리 속에서 천하를 논할 큰 상으로 해석하기도 합니다.",
      good: ["통솔력", "사회운", "말년운"],
      weak: ["인간관계운"],
      caution: "본인의 의사 표명이 원체 무거워 아랫사람이 의견을 쉽게 제시하지 못할 수 있음을 아십시오.",
      target: { ratio: 2.8, tilt: 0.08 }
    },
    {
      name: "월형구 (仰月口)",
      desc: "초승달을 뒤집어 놓은 듯 부드럽게 휘어졌으며 항상 미소를 띤 모양입니다.",
      interpretation: "전통 관상학에서는 언변이 유려하고 화술이 뛰어나 사람들 사이에 평화와 인기를 끄는 소통의 달인으로 해석하기도 합니다.",
      good: ["대인운", "인간관계운", "사회운"],
      weak: ["결단력"],
      caution: "말솜씨가 지나치면 신뢰를 잃을 수 있으니 실천이 따르는 약속을 늘 명심하십시오.",
      target: { ratio: 3.2, tilt: 0.12 }
    },
    {
      name: "방형구 (四字口)",
      desc: "입 모양이 한자 넉 사(四)자 모양처럼 단정하며 입꼬리가 굳건하게 닫힌 모양입니다.",
      interpretation: "전통 관상학에서는 약속을 소중히 여기며, 성품이 정직하여 정계나 대기업에서 신망을 쌓고 정진할 상으로 해석하기도 합니다.",
      good: ["결단력", "판단력", "재물운"],
      weak: ["추진력"],
      caution: "때로는 감정 표현이 너무 없어 무뚝뚝하거나 냉정한 인상을 줄 수 있다고 조언하기도 합니다.",
      target: { ratio: 2.4, tilt: 0.02 }
    },
    {
      name: "앵도구 (櫻桃口)",
      desc: "앵두처럼 작고 입술이 붉으며 귀여운 조화를 이루는 아담한 모양입니다.",
      interpretation: "전통 관상학에서는 영리하고 총명하여 예체능적인 감각과 사람들의 애정을 모으는 매력의 상으로 해석하기도 합니다.",
      good: ["대인운", "인간관계운", "사회운"],
      weak: ["통솔력"],
      caution: "큰 책임이나 강도 높은 비즈니스를 결정할 때 우유부단하게 흐를 수 있다고 조언하기도 합니다.",
      target: { ratio: 1.8, tilt: 0.05 }
    }
  ],
  cheekbones: [
    {
      name: "장군광대 (將軍顴)",
      desc: "광대가 양옆으로 힘 있게 솟구쳤으나 뺨의 살이 적절히 감싸 위엄을 풍기는 모양입니다.",
      interpretation: "전통 관상학에서는 역경 속에서도 끝내 굴하지 않고 깃발을 꽂는 강인한 장수형 군령의 상으로 해석하기도 합니다.",
      good: ["추진력", "결단력", "통솔력"],
      weak: ["대인운"],
      caution: "부하를 통솔하는 과정이 너무 엄밀하여 반발이나 원망을 살 수 있음을 유념하십시오.",
      target: { prominence: 0.88 }
    },
    {
      name: "제왕광대 (帝王顴)",
      desc: "광대가 앞쪽과 옆쪽으로 둥그스름하고 탄탄하게 차올라 얼굴의 무게감을 잡는 모양입니다.",
      interpretation: "전통 관상학에서는 권세의 기둥이 견고하여 자신의 뜻대로 일을 주도하고 명예를 높일 통치자의 상으로 해석하기도 합니다.",
      good: ["권력운", "통솔력", "사회운"],
      weak: ["인간관계운"],
      caution: "강한 권력적 독점욕으로 주변 인재들의 자발성을 저해할 위험이 있다고 보기도 합니다.",
      target: { prominence: 0.84 }
    },
    {
      name: "평형광대 (和平顴)",
      desc: "도드라짐 없이 얼굴선과 유기적인 평탄함을 유지하며 부드럽게 감싸인 모양입니다.",
      interpretation: "전통 관상학에서는 모나지 않은 평탄한 기운을 가져 타인의 그늘 아래서 화합하고 갈등을 중재하는 상으로 해석하기도 합니다.",
      good: ["대인운", "인간관계운", "말년운"],
      weak: ["추진력", "결단력"],
      caution: "스스로를 세상에 강력히 알리고 이끄는 기백은 다소 부족하게 나타날 수 있습니다.",
      target: { prominence: 0.77 }
    }
  ],
  jaw: [
    {
      name: "장군턱 (將軍地閣)",
      desc: "턱선이 각도가 늠름하며 두텁고 강인한 뼈대가 얼굴 하관을 굳건히 지탱하는 모양입니다.",
      interpretation: "전통 관상학에서는 강한 지구력과 충성심을 가진 이들을 아랫사람으로 두고 가문을 지켜낼 보루의 상으로 해석하기도 합니다.",
      good: ["추진력", "통솔력", "말년운"],
      weak: ["인간관계운"],
      caution: "한 번 굳힌 생각을 결코 굽히지 않아 부하 또는 가족과의 관계가 경직될 수 있다고 보기도 합니다.",
      target: { angle: 25, widthRatio: 0.82 }
    },
    {
      name: "원형턱 (圓滿地閣)",
      desc: "턱끝이 모나지 않고 U자형으로 풍만하고 부드럽게 감돌며 살집이 두터운 모양입니다.",
      interpretation: "전통 관상학에서는 말년으로 갈수록 부와 부귀가 따르고 가솔과 따르는 이가 많아지는 평안한 상으로 해석하기도 합니다.",
      good: ["말년운", "대인운", "재물운"],
      weak: ["결단력"],
      caution: "성격이 너무 느긋하여 위기 상황에서 기민한 대처가 늦어질 수 있다고 해석하기도 합니다.",
      target: { angle: 18, widthRatio: 0.76 }
    },
    {
      name: "방형턱 (方正地閣)",
      desc: "턱의 좌우가 네모나고 평평하여 흔들리지 않는 바위 같은 안정감을 주는 모양입니다.",
      interpretation: "전통 관상학에서는 신뢰를 목숨처럼 아끼고 끈기가 있어 어떠한 궂은 일도 끝끝내 해내고 마는 근면의 상으로 해석하기도 합니다.",
      good: ["결단력", "판단력", "말년운"],
      weak: ["사회운"],
      caution: "도전보다는 안전 지향에 갇혀 더 넓은 세상으로의 확장을 가로막을 우려가 있다고 해석하기도 합니다.",
      target: { angle: 22, widthRatio: 0.88 }
    }
  ],
  forehead: [
    {
      name: "제왕이마 (帝王額)",
      desc: "이마가 간을 엎어놓은 것처럼 둥글고 넓으며 흠이나 주름 없이 훤한 모양입니다.",
      interpretation: "전통 관상학에서는 부모의 높은 덕을 물려받아 이른 나이에 큰 관직에 오르거나 학술로 두각을 나타낼 명예의 상으로 해석하기도 합니다.",
      good: ["사회운", "권력운", "판단력"],
      weak: ["대인운"],
      caution: "지나친 총명함으로 인해 타인의 부족함을 쉽게 참지 못하는 경향이 있을 수 있습니다.",
      target: { heightRatio: 0.23 }
    },
    {
      name: "학자이마 (學士額)",
      desc: "이마가 네모반듯하고 앞머리 경계선이 가지런하여 학문적 사색에 알맞은 모양입니다.",
      interpretation: "전통 관상학에서는 매사 이치에 맞게 처신하며 연구나 지식 습득에 뛰어나 스승의 가르침을 전파할 상으로 해석하기도 합니다.",
      good: ["판단력", "사회운", "인간관계운"],
      weak: ["추진력"],
      caution: "지식에 갇혀 실천력이 결여되기 쉬우니 생각은 줄이고 한 걸음 내딛는 데 힘쓰십시오.",
      target: { heightRatio: 0.20 }
    },
    {
      name: "부귀이마 (富貴額)",
      desc: "이마가 널찍하며 둥그스름하고 특히 관자놀이 윗부분(천창)이 잘 발달한 모양입니다.",
      interpretation: "전통 관상학에서는 유산을 상속받거나 재계의 큰손으로부터 투자를 얻어 재물을 넉넉히 다스리는 상으로 해석하기도 합니다.",
      good: ["재물운", "말년운", "대인운"],
      weak: ["결단력"],
      caution: "재산상의 이익만 쫓다 중요한 신의를 버릴 수 있으니 평소 베풂을 아끼지 마십시오.",
      target: { heightRatio: 0.18 }
    }
  ]
};

/* ==========================================================================
   TITLES SYSTEM (최종 칭호 데이터 - 최소 20개)
   ========================================================================== */
const TITLES_DATABASE = [
  { name: "왕의 상 (王之相)", target: { leadership: 10, power: 10, judgment: 8, wealth: 8 } },
  { name: "장군의 상 (將軍之相)", target: { leadership: 9, drive: 10, determination: 9, power: 8 } },
  { name: "재상의 상 (宰相之相)", target: { judgment: 10, social: 9, relationship: 8, wealth: 8 } },
  { name: "책사의 상 (策士之相)", target: { judgment: 10, determination: 8, power: 7, social: 8 } },
  { name: "명장의 상 (名將之相)", target: { leadership: 8, drive: 9, determination: 9, relationship: 6 } },
  { name: "외교관의 상 (外交官之相)", target: { interpersonal: 10, relationship: 9, social: 9, judgment: 8 } },
  { name: "상인의 상 (商人之相)", target: { wealth: 10, interpersonal: 9, relationship: 8, drive: 8 } },
  { name: "학자의 상 (學者之相)", target: { judgment: 10, social: 9, relationship: 8, lateLife: 8 } },
  { name: "개국공신의 상 (開國功臣之相)", target: { drive: 10, leadership: 8, determination: 9, power: 9 } },
  { name: "명문의 가주의 상 (名門家主之相)", target: { leadership: 8, lateLife: 10, relationship: 8, wealth: 9 } },
  { name: "대부호의 상 (大富豪之相)", target: { wealth: 12, lateLife: 9, interpersonal: 8, judgment: 7 } },
  { name: "왕을 보좌할 상 (佐王之相)", target: { judgment: 9, relationship: 9, social: 9, power: 6 } },
  { name: "은둔고수의 상 (隱遁高手之相)", target: { determination: 10, judgment: 9, lateLife: 8, social: 5 } },
  { name: "전설이 될 상 (傳奇之相)", target: { leadership: 10, drive: 9, determination: 9, wealth: 9 } },
  { name: "영웅의 상 (英雄之相)", target: { drive: 10, leadership: 9, determination: 10, interpersonal: 8 } },
  { name: "전략가의 상 (戰略家之相)", target: { judgment: 10, determination: 9, power: 8, interpersonal: 6 } },
  { name: "지휘관의 상 (指揮官之相)", target: { leadership: 10, drive: 8, determination: 8, power: 8 } },
  { name: "혁신가의 상 (革新家之相)", target: { drive: 10, determination: 9, judgment: 8, social: 8 } },
  { name: "개척자의 상 (開拓者之相)", target: { drive: 11, determination: 10, leadership: 7, interpersonal: 6 } },
  { name: "통치자의 상 (統治者之相)", target: { power: 11, leadership: 10, judgment: 8, drive: 7 } }
];

/* ==========================================================================
   APP STATE & SELECTORS
   ========================================================================== */
window.appLoaded = true;

let faceLandmarker = null;
let webcamStream = null;
let animationFrameId = null;
let isModelLoading = false;
let currentStage = 'idle'; // idle, aligning, scanning_eyes, scanning_eyebrows, ... , finished
let stageStartTime = 0;
let stableFaceCount = 0;
let lastDetectedFeatures = null;
let capturedImageSrc = "";

// Element Selectors (Globally declared, lazily initialized on DOMContentLoaded)
let welcomeScreen, scannerScreen, resultScreen, btnStart, btnRestart, btnShare;
let btnViewProduct, btnBuyProduct, webcam, overlayCanvas, ctx;
let faceGuideFrame, currentStepTitle, scannerProgress, scanMessage, shutterFlash, globalLoader;
let cameraErrorOverlay, btnErrorRetry, loaderTitle, loaderSubtitle;
let snapshotImg, resultTitle, resultFeaturesList, positiveEnergiesList, warningEnergiesList;
let reviewText, metricRationaleList, recoTitle, recoExplanation, recoImage;

document.addEventListener("DOMContentLoaded", () => {
  console.log("[DOM CONTENT LOADED]");
  welcomeScreen = document.getElementById("welcome-screen");
  scannerScreen = document.getElementById("scanner-screen");
  resultScreen = document.getElementById("result-screen");
  btnStart = document.getElementById("btn-start");
  btnRestart = document.getElementById("btn-restart");
  btnShare = document.getElementById("btn-share");
  btnViewProduct = document.getElementById("btn-view-product");
  btnBuyProduct = document.getElementById("btn-buy-product");
  webcam = document.getElementById("webcam");
  overlayCanvas = document.getElementById("overlay-canvas");
  if (overlayCanvas) ctx = overlayCanvas.getContext("2d");
  faceGuideFrame = document.querySelector(".face-guide-frame");
  currentStepTitle = document.querySelector(".current-step-title");
  scannerProgress = document.getElementById("scanner-progress");
  scanMessage = document.getElementById("scan-message");
  shutterFlash = document.getElementById("shutter-flash");
  globalLoader = document.getElementById("global-loader");

  cameraErrorOverlay = document.getElementById("camera-error-overlay");
  btnErrorRetry = document.getElementById("btn-error-retry");
  if (globalLoader) {
    loaderTitle = globalLoader.querySelector(".loader-title");
    loaderSubtitle = globalLoader.querySelector(".loader-subtitle");
  }

  snapshotImg = document.getElementById("snapshot-img");
  resultTitle = document.getElementById("result-title");
  resultFeaturesList = document.getElementById("result-features-list");
  positiveEnergiesList = document.getElementById("positive-energies");
  warningEnergiesList = document.getElementById("warning-energies");
  reviewText = document.getElementById("review-text");
  metricRationaleList = document.getElementById("metric-rationale-list");
  recoTitle = document.getElementById("reco-title");
  recoExplanation = document.getElementById("reco-explanation");
  recoImage = document.getElementById("reco-image");

  // Attach Event Listeners
  if (btnStart) btnStart.addEventListener("click", handleStart);
  if (btnRestart) btnRestart.addEventListener("click", resetToWelcome);
  if (btnShare) btnShare.addEventListener("click", downloadReportCard);
  if (btnErrorRetry) {
    btnErrorRetry.addEventListener("click", () => {
      if (cameraErrorOverlay) cameraErrorOverlay.classList.remove("active");
      handleStart();
    });
  }
  
  console.log("[EVENT LISTENERS BOUND]");
});

// Loader Helpers
function showLoader(titleText, subtitleText) {
  if (loaderTitle) loaderTitle.textContent = titleText;
  if (loaderSubtitle) loaderSubtitle.textContent = subtitleText || "";
  if (globalLoader) globalLoader.classList.add("active");
}

function hideLoader() {
  if (globalLoader) globalLoader.classList.remove("active");
}

function updateLoaderMessage(titleText, subtitleText) {
  if (loaderTitle) loaderTitle.textContent = titleText;
  if (loaderSubtitle && subtitleText !== undefined) loaderSubtitle.textContent = subtitleText;
}

/* ==========================================================================
   LANDMARKER LOADER
   ========================================================================== */
async function initializeModel() {
  if (faceLandmarker) return;
  
  isModelLoading = true;
  showLoader("얼굴 감정 준비 중...", "AI Face Landmarker 모형을 전개하고 있습니다...");

  try {
    const module = await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8");
    FaceLandmarker = module.FaceLandmarker;
    FilesetResolver = module.FilesetResolver;

    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm"
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "GPU"
      },
      runningMode: "VIDEO",
      numFaces: 1
    });
  } catch (error) {
    console.error("Failed to load FaceLandmarker Model:", error);
    throw error;
  } finally {
    isModelLoading = false;
  }
}

/* ==========================================================================
   WEBCAM ACCESS
   ========================================================================== */
async function startWebcam() {
  try {
    webcamStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 640,
        height: 480,
        facingMode: "user"
      },
      audio: false
    });
    webcam.srcObject = webcamStream;
    
    // Set Canvas size once video has loaded metadata
    webcam.addEventListener("loadedmetadata", () => {
      overlayCanvas.width = webcam.videoWidth;
      overlayCanvas.height = webcam.videoHeight;
    });
    
    return true;
  } catch (error) {
    console.error("Camera access failed:", error);
    alert("카메라 권한을 승인해야 관상 감정 서비스를 사용하실 수 있습니다.");
    return false;
  }
}

function stopWebcam() {
  if (webcamStream) {
    webcamStream.getTracks().forEach(track => track.stop());
    webcamStream = null;
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

/* ==========================================================================
   ANALYSIS ENGINE (수학적 랜드마크 분석 및 정규화)
   ========================================================================== */

// Math Helper: 2D Euclidean Distance
function getDistance(pt1, pt2) {
  return Math.hypot(pt1.x - pt2.x, pt1.y - pt2.y);
}

// Math Helper: Midpoint
function getMidpoint(pt1, pt2) {
  return { x: (pt1.x + pt2.x) / 2, y: (pt1.y + pt2.y) / 2 };
}

// Coordinate Normalization & Feature Parameter Extractor
function extractFaceMetrics(landmarks) {
  // Landmarks coordinates are normalized from 0.0 to 1.0 (relative to canvas dimensions)
  // Normalizing factor using Face Width (234 to 454) and Face Height (10 to 152)
  const leftCheekEdge = landmarks[234];
  const rightCheekEdge = landmarks[454];
  const foreheadTop = landmarks[10];
  const chinBottom = landmarks[152];
  
  const faceWidth = getDistance(leftCheekEdge, rightCheekEdge);
  const faceHeight = getDistance(foreheadTop, chinBottom);
  
  // 1. EYES
  // Left eye contour indices: inner: 362, outer: 263, top: 386, bottom: 374
  const leftEyeWidth = getDistance(landmarks[362], landmarks[263]);
  const leftEyeHeight = (getDistance(landmarks[386], landmarks[374]) + getDistance(landmarks[385], landmarks[373])) / 2;
  const leftEyeRatio = leftEyeWidth / (leftEyeHeight || 0.01);
  // Y-axis increases downwards, so a higher outer corner means y_263 < y_362.
  // Mirrored camera: x_263 > x_362. Outer corner tilt = (y_inner - y_outer)/width
  const leftEyeTilt = ((landmarks[362].y - landmarks[263].y) / leftEyeWidth) * 100; // positive is upward tilt
  
  // Right eye contour indices: inner: 133, outer: 33, top: 159, bottom: 145
  const rightEyeWidth = getDistance(landmarks[133], landmarks[33]);
  const rightEyeHeight = (getDistance(landmarks[159], landmarks[145]) + getDistance(landmarks[158], landmarks[144])) / 2;
  const rightEyeRatio = rightEyeWidth / (rightEyeHeight || 0.01);
  // Mirrored camera: x_133 > x_3. Outer corner tilt = (y_inner - y_outer)/width
  const rightEyeTilt = ((landmarks[133].y - landmarks[33].y) / rightEyeWidth) * 100;
  
  const avgEyeRatio = (leftEyeRatio + rightEyeRatio) / 2;
  const avgEyeTilt = (leftEyeTilt + rightEyeTilt) / 2;
  const eyeSymmetry = Math.min(leftEyeWidth, rightEyeWidth) / Math.max(leftEyeWidth, rightEyeWidth);
  const interEyeDistance = getDistance(landmarks[362], landmarks[133]) / faceWidth;
  
  // 2. EYEBROWS
  // Right eyebrow: inner 107, outer 70. Left eyebrow: inner 336, outer 300
  const rightBrowWidth = getDistance(landmarks[107], landmarks[70]);
  const leftBrowWidth = getDistance(landmarks[336], landmarks[300]);
  const avgBrowWidthRatio = ((rightBrowWidth + leftBrowWidth) / 2) / ((leftEyeWidth + rightEyeWidth) / 2);
  
  const rightBrowTilt = ((landmarks[107].y - landmarks[70].y) / rightBrowWidth) * 100;
  const leftBrowTilt = ((landmarks[336].y - landmarks[300].y) / leftBrowWidth) * 100;
  const avgBrowTilt = (rightBrowTilt + leftBrowTilt) / 2;
  
  // 3. NOSE
  // Bridge top: 168. Tip: 4. Nostril width: left alar: 278, right alar: 48
  const noseLength = getDistance(landmarks[168], landmarks[4]) / faceHeight;
  const noseAlarWidth = getDistance(landmarks[278], landmarks[48]);
  const noseBridgeWidth = getDistance(landmarks[344], landmarks[115]); // middle section
  const noseAlarRatio = noseAlarWidth / (noseBridgeWidth || 0.01);

  // 4. MOUTH
  // Left corner: 291, right corner: 61, top: 0, bottom: 17
  const mouthWidth = getDistance(landmarks[291], landmarks[61]);
  const mouthHeight = getDistance(landmarks[0], landmarks[17]);
  const mouthRatio = mouthWidth / (mouthHeight || 0.01);
  const mouthCenterY = (landmarks[0].y + landmarks[17].y) / 2;
  // Lip corners tilt: if corners are higher (smaller y) than center, it is upward.
  const leftCornerTilt = (mouthCenterY - landmarks[291].y) / mouthWidth;
  const rightCornerTilt = (mouthCenterY - landmarks[61].y) / mouthWidth;
  const avgMouthCornerTilt = (leftCornerTilt + rightCornerTilt) / 2;

  // 5. CHEEKBONES
  // Left cheek prominence: 425. Right cheek prominence: 205. Compare with face width
  const cheekboneProminence = getDistance(landmarks[425], landmarks[205]) / faceWidth;

  // 6. JAW
  // Jaw joint corners: 58 (right), 288 (left). Chin: 152
  const jawWidthRatio = getDistance(landmarks[58], landmarks[288]) / faceWidth;
  const rightJawVector = { x: landmarks[152].x - landmarks[58].x, y: landmarks[152].y - landmarks[58].y };
  const leftJawVector = { x: landmarks[152].x - landmarks[288].x, y: landmarks[152].y - landmarks[288].y };
  const jawAngleRight = Math.atan2(rightJawVector.y, rightJawVector.x) * (180 / Math.PI);
  const jawAngleLeft = Math.atan2(leftJawVector.y, -leftJawVector.x) * (180 / Math.PI);
  const avgJawAngle = (jawAngleRight + jawAngleLeft) / 2; // angle from vertical or slope line

  // 7. FOREHEAD
  // Top center: 10. Nose bridge top: 168
  const foreheadHeight = getDistance(landmarks[10], landmarks[168]) / faceHeight;

  return {
    eye: { ratio: avgEyeRatio, tilt: avgEyeTilt, symmetry: eyeSymmetry, inter: interEyeDistance },
    eyebrow: { tilt: avgBrowTilt, length: avgBrowWidthRatio },
    nose: { lengthRatio: noseLength, widthRatio: noseAlarRatio },
    mouth: { ratio: mouthRatio, tilt: avgMouthCornerTilt },
    cheekbones: { prominence: cheekboneProminence },
    jaw: { angle: avgJawAngle, widthRatio: jawWidthRatio },
    forehead: { heightRatio: foreheadHeight }
  };
}

// Calculate Gaussian Similarity
function calculateSimilarity(val, target, weight = 1, tolerance = 0.15) {
  const diff = val - target;
  return Math.exp(-Math.pow(diff / tolerance, 2) * weight);
}

// Score-based classifier mapping metrics to the physiognomy DB
function evaluatePhysiognomy(metrics) {
  const result = {};
  
  // 1. Eye evaluation
  let bestEye = null;
  let bestEyeScore = -1;
  const eyeScores = PHYSIOGNOMY_DB.eyes.map(item => {
    // Math similarity based on ratio, tilt and symmetry
    const sRatio = calculateSimilarity(metrics.eye.ratio, item.target.ratio, 1.5, 0.5);
    const sTilt = calculateSimilarity(metrics.eye.tilt, item.target.tilt, 1.2, 5);
    const score = Math.max(10, Math.round(100 * (sRatio * 0.6 + sTilt * 0.4)));
    
    if (score > bestEyeScore) {
      bestEyeScore = score;
      bestEye = item;
    }
    return { name: item.name, score };
  });

  // 2. Eyebrow evaluation
  let bestBrow = null;
  let bestBrowScore = -1;
  const browScores = PHYSIOGNOMY_DB.eyebrows.map(item => {
    const sTilt = calculateSimilarity(metrics.eyebrow.tilt, item.target.tilt, 1.5, 4);
    const sLen = calculateSimilarity(metrics.eyebrow.length, item.target.length, 1.0, 0.15);
    const score = Math.max(10, Math.round(100 * (sTilt * 0.6 + sLen * 0.4)));
    
    if (score > bestBrowScore) {
      bestBrowScore = score;
      bestBrow = item;
    }
    return { name: item.name, score };
  });

  // 3. Nose evaluation
  let bestNose = null;
  let bestNoseScore = -1;
  const noseScores = PHYSIOGNOMY_DB.nose.map(item => {
    const sLen = calculateSimilarity(metrics.nose.lengthRatio, item.target.lengthRatio, 1.2, 0.05);
    const sWid = calculateSimilarity(metrics.nose.widthRatio, item.target.widthRatio, 1.2, 0.15);
    const score = Math.max(10, Math.round(100 * (sLen * 0.5 + sWid * 0.5)));
    
    if (score > bestNoseScore) {
      bestNoseScore = score;
      bestNose = item;
    }
    return { name: item.name, score };
  });

  // 4. Mouth evaluation
  let bestMouth = null;
  let bestMouthScore = -1;
  const mouthScores = PHYSIOGNOMY_DB.mouth.map(item => {
    const sRatio = calculateSimilarity(metrics.mouth.ratio, item.target.ratio, 1.0, 0.4);
    const sTilt = calculateSimilarity(metrics.mouth.tilt, item.target.tilt, 2.0, 0.04);
    const score = Math.max(10, Math.round(100 * (sRatio * 0.4 + sTilt * 0.6)));
    
    if (score > bestMouthScore) {
      bestMouthScore = score;
      bestMouth = item;
    }
    return { name: item.name, score };
  });

  // 5. Cheekbones evaluation
  let bestCheek = null;
  let bestCheekScore = -1;
  const cheekScores = PHYSIOGNOMY_DB.cheekbones.map(item => {
    const sProm = calculateSimilarity(metrics.cheekbones.prominence, item.target.prominence, 1.5, 0.05);
    const score = Math.max(10, Math.round(100 * sProm));
    
    if (score > bestCheekScore) {
      bestCheekScore = score;
      bestCheek = item;
    }
    return { name: item.name, score };
  });

  // 6. Jaw evaluation
  let bestJaw = null;
  let bestJawScore = -1;
  const jawScores = PHYSIOGNOMY_DB.jaw.map(item => {
    const sAngle = calculateSimilarity(metrics.jaw.angle, item.target.angle, 1.2, 5);
    const sWid = calculateSimilarity(metrics.jaw.widthRatio, item.target.widthRatio, 1.2, 0.08);
    const score = Math.max(10, Math.round(100 * (sAngle * 0.5 + sWid * 0.5)));
    
    if (score > bestJawScore) {
      bestJawScore = score;
      bestJaw = item;
    }
    return { name: item.name, score };
  });

  // 7. Forehead evaluation
  let bestForehead = null;
  let bestForeheadScore = -1;
  const foreheadScores = PHYSIOGNOMY_DB.forehead.map(item => {
    const sHeight = calculateSimilarity(metrics.forehead.heightRatio, item.target.heightRatio, 1.5, 0.03);
    const score = Math.max(10, Math.round(100 * sHeight));
    
    if (score > bestForeheadScore) {
      bestForeheadScore = score;
      bestForehead = item;
    }
    return { name: item.name, score };
  });

  return {
    selections: {
      eye: { item: bestEye, score: bestEyeScore, all: eyeScores },
      eyebrow: { item: bestBrow, score: bestBrowScore, all: browScores },
      nose: { item: bestNose, score: bestNoseScore, all: noseScores },
      mouth: { item: bestMouth, score: bestMouthScore, all: mouthScores },
      cheekbones: { item: bestCheek, score: bestCheekScore, all: cheekScores },
      jaw: { item: bestJaw, score: bestJawScore, all: jawScores },
      forehead: { item: bestForehead, score: bestForeheadScore, all: foreheadScores }
    }
  };
}

// Calculate Attribute Scores & Matched Title (최종 칭호 및 기운 산출)
function calculateFinalReport(selections, metrics) {
  // Attributes initialized to base level
  const energyLevels = {
    leadership: 5,     // 통솔력
    judgment: 5,       // 판단력
    wealth: 5,         // 재물운
    power: 5,          // 권력운
    interpersonal: 5,  // 대인운
    relationship: 5,   // 인간관계운
    social: 5,         // 사회운
    lateLife: 5,       // 말년운
    drive: 5,          // 추진력
    determination: 5   // 결단력
  };

  // Add good energy weight
  Object.keys(selections).forEach(key => {
    const item = selections[key].item;
    if (item && item.good) {
      item.good.forEach(attr => {
        // Map Korean string to key
        const attrKey = mapAttrToKey(attr);
        if (attrKey) energyLevels[attrKey] += 1.5;
      });
    }
    if (item && item.weak) {
      item.weak.forEach(attr => {
        const attrKey = mapAttrToKey(attr);
        if (attrKey) energyLevels[attrKey] -= 1.2;
      });
    }
  });

  // Specific metric adjustments
  if (metrics.mouth.tilt < -0.01) {
    energyLevels.relationship -= 1.0;
    energyLevels.lateLife -= 1.0;
  }
  if (metrics.eyebrow.tilt < -3) {
    energyLevels.interpersonal -= 1.0;
    energyLevels.drive -= 1.0;
  }
  if (metrics.cheekbones.prominence < 0.79) {
    energyLevels.power -= 1.0;
    energyLevels.leadership -= 1.0;
  }

  // Bound ratings between 1.0 and 5.0
  const normalizedRatings = {};
  Object.keys(energyLevels).forEach(key => {
    normalizedRatings[key] = Math.max(1, Math.min(5, Math.round(energyLevels[key] * 2) / 2));
  });

  // Match Title based on closest target profile
  let bestTitle = null;
  let bestTitleDiff = Infinity;
  
  TITLES_DATABASE.forEach(title => {
    let diffSum = 0;
    Object.keys(title.target).forEach(attrKey => {
      // Scale rating (1-5) to fit target points (approx 5-12)
      const scaledVal = normalizedRatings[attrKey] * 2; 
      diffSum += Math.pow(scaledVal - title.target[attrKey], 2);
    });
    
    if (diffSum < bestTitleDiff) {
      bestTitleDiff = diffSum;
      bestTitle = title.name;
    }
  });

  return {
    ratings: normalizedRatings,
    title: bestTitle
  };
}

function mapAttrToKey(koreanAttr) {
  const map = {
    "통솔력": "leadership",
    "판단력": "judgment",
    "재물운": "wealth",
    "권력운": "power",
    "대인운": "interpersonal",
    "인간관계운": "relationship",
    "사회운": "social",
    "말년운": "lateLife",
    "추진력": "drive",
    "결단력": "determination"
  };
  return map[koreanAttr] || null;
}

function mapKeyToKorean(key) {
  const map = {
    leadership: "통솔력",
    judgment: "판단력",
    wealth: "재물운",
    power: "권력운",
    interpersonal: "대인운",
    relationship: "인간관계운",
    social: "사회운",
    lateLife: "말년운",
    drive: "추진력",
    determination: "결단력"
  };
  return map[key] || key;
}

/* ==========================================================================
   CANVAS RENDERING UTILITIES
   ========================================================================== */

// Draw highlighted paths for active analysis stages
function drawHighlight(stage, landmarks) {
  ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  
  if (!landmarks || stage === 'aligning' || stage === 'finished') return;

  // Darken canvas except for the active zone
  ctx.fillStyle = "rgba(10, 8, 6, 0.4)";
  ctx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);

  let indices = [];
  
  if (stage === 'scanning_eyes') {
    indices = [
      // Left eye outer
      [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398, 362],
      // Right eye outer
      [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246, 33]
    ];
  } else if (stage === 'scanning_eyebrows') {
    indices = [
      [276, 283, 282, 295, 285, 300, 293, 334, 296, 336, 276],
      [46, 53, 52, 65, 55, 70, 63, 105, 66, 107, 46]
    ];
  } else if (stage === 'scanning_nose') {
    indices = [
      [168, 6, 197, 195, 5, 4, 1, 19, 94, 2],
      [278, 344, 440, 463, 94, 243, 115, 220, 48]
    ];
  } else if (stage === 'scanning_mouth') {
    indices = [
      [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61]
    ];
  } else if (stage === 'scanning_cheekbones') {
    indices = [
      [425, 427, 329, 280],
      [205, 207, 101, 50]
    ];
  } else if (stage === 'scanning_jaw') {
    indices = [
      [58, 172, 136, 150, 149, 176, 148, 152, 377, 400, 378, 379, 365, 397, 288]
    ];
  } else if (stage === 'scanning_forehead') {
    indices = [
      [10, 338, 297, 332, 284, 251, 389, 162, 21, 54, 103, 67, 109, 10]
    ];
  }

  // Clear path clip to punch holes in the darkened canvas
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  indices.forEach(loop => {
    ctx.beginPath();
    loop.forEach((idx, i) => {
      const pt = landmarks[idx];
      const cx = pt.x * overlayCanvas.width;
      const cy = pt.y * overlayCanvas.height;
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.fill();
  });
  ctx.restore();

  // Draw elegant gold trace outline on top
  ctx.strokeStyle = "#B88A44";
  ctx.lineWidth = 2.5;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(184, 138, 68, 0.8)";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  indices.forEach(loop => {
    ctx.beginPath();
    loop.forEach((idx, i) => {
      const pt = landmarks[idx];
      const cx = pt.x * overlayCanvas.width;
      const cy = pt.y * overlayCanvas.height;
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.stroke();
  });

  // Clear shadows
  ctx.shadowBlur = 0;
}

/* ==========================================================================
   FACE ALIGNMENT VALIDATION
   ========================================================================== */
function checkFaceAlignment(landmarks) {
  if (!landmarks) return false;
  
  // Get nose tip (4), chin (152), cheek edges (234, 454), top (10)
  const nose = landmarks[4];
  const chin = landmarks[152];
  const left = landmarks[234];
  const right = landmarks[454];
  const top = landmarks[10];

  // Normalized bounds center check
  const faceCenterX = (left.x + right.x) / 2;
  const faceCenterY = (top.y + chin.y) / 2;

  // Guide circle is in the middle of canvas (0.5, 0.5 normalized coordinates approx)
  const isCenteredX = Math.abs(faceCenterX - 0.5) < 0.12;
  const isCenteredY = Math.abs(faceCenterY - 0.5) < 0.12;

  // Scale (size) check
  const faceWidth = getDistance(left, right);
  const isCorrectScale = faceWidth > 0.28 && faceWidth < 0.52;

  // Yaw rotation check: distance from nose tip to edges should be balanced
  const distToLeft = getDistance(nose, left);
  const distToRight = getDistance(nose, right);
  const isFacingFront = Math.abs(distToLeft - distToRight) / faceWidth < 0.15;

  return isCenteredX && isCenteredY && isCorrectScale && isFacingFront;
}

/* ==========================================================================
   MAIN CONTROL STREAM
   ========================================================================== */
const STAGES = [
  { id: 'scanning_eyes', label: '눈(眼) 분석 중', duration: 2400 },
  { id: 'scanning_eyebrows', label: '눈썹(眉) 분석 중', duration: 2400 },
  { id: 'scanning_nose', label: '코(鼻) 분석 중', duration: 2400 },
  { id: 'scanning_mouth', label: '입(口) 분석 중', duration: 2400 },
  { id: 'scanning_cheekbones', label: '광대(顴) 분석 중', duration: 2400 },
  { id: 'scanning_jaw', label: '턱(頤) 분석 중', duration: 2400 },
  { id: 'scanning_forehead', label: '이마(額) 분석 중', duration: 2400 }
];

const SCAN_SUBMESSAGES = {
  scanning_eyes: [
    "눈꼬리 각도 계측 및 기울기 환산 중...",
    "동자(瞳子)의 맑기와 대칭도 조율 중...",
    "안형(眼形) 전통 분류 매칭 중..."
  ],
  scanning_eyebrows: [
    "눈썹 기울기 흐름 분석 중...",
    "미간(眉間) 거리와 형세 비율 계산 중...",
    "눈썹 결의 길이 및 조화 판단 중..."
  ],
  scanning_nose: [
    "콧대 각도와 코끝 준두의 비율 분석 중...",
    "재물운을 주관하는 준두(準頭) 부조도 계측 중...",
    "콧망울 비익 대칭 균형 합산 중..."
  ],
  scanning_mouth: [
    "입꼬리 각도 및 상승 곡률 측정 중...",
    "말년운과 성품을 담은 구형(口形) 분류 중...",
    "입술 두께 대비 가로 길이 비율 산정 중..."
  ],
  scanning_cheekbones: [
    "광대의 융기 비율 및 대칭도 감정 중...",
    "권위와 사회적 위상을 이루는 격식 계산 중...",
    "뺨과 광대의 완만한 합일도 분석 중..."
  ],
  scanning_jaw: [
    "턱끝 하단(地閣) 격식 두께 비교 중...",
    "턱뼈 각도 및 하관 면적 대비 계산 중...",
    "지구력과 신망을 상징하는 형태 매칭 중..."
  ],
  scanning_forehead: [
    "이마의 높이 및 굴곡도 계측 중...",
    "천창(天倉) 관자놀이 팽창 비율 분석 중...",
    "명예와 부모덕의 기하학적 흐름 확인 중..."
  ]
};

async function processingLoop() {
  if (!faceLandmarker || currentStage === 'finished') return;

  const now = performance.now();
  let landmarks = null;

  if (webcam.readyState === webcam.HAVE_ENOUGH_DATA) {
    const results = faceLandmarker.detectForVideo(webcam, now);
    if (results.faceLandmarks && results.faceLandmarks.length > 0) {
      landmarks = results.faceLandmarks[0];
    }
  }

  if (currentStage === 'aligning') {
    ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    
    if (landmarks) {
      const isAligned = checkFaceAlignment(landmarks);
      if (isAligned) {
        stableFaceCount++;
        faceGuideFrame.classList.add("aligned");
        
        if (stableFaceCount > 15) { // Needs about 0.5s of stable pose
          // Start the 7-step sequence
          currentStage = STAGES[0].id;
          stageStartTime = now;
          stableFaceCount = 0;
          faceGuideFrame.style.opacity = '0'; // Hide alignment overlay
        }
      } else {
        stableFaceCount = 0;
        faceGuideFrame.classList.remove("aligned");
      }
    } else {
      stableFaceCount = 0;
      faceGuideFrame.classList.remove("aligned");
    }
  } else {
    // We are in sequential scanning stages
    const currentStageIndex = STAGES.findIndex(s => s.id === currentStage);
    if (currentStageIndex !== -1) {
      const stageInfo = STAGES[currentStageIndex];
      const elapsed = now - stageStartTime;
      const progress = Math.min(100, (elapsed / stageInfo.duration) * 100);
      
      // Update UI Progress
      currentStepTitle.textContent = `${stageInfo.label} (${currentStageIndex + 1}/${STAGES.length})`;
      scannerProgress.style.width = `${progress}%`;
      
      // Rotate messages
      const msgs = SCAN_SUBMESSAGES[currentStage];
      const msgIndex = Math.floor((elapsed / stageInfo.duration) * msgs.length);
      scanMessage.textContent = msgs[Math.min(msgs.length - 1, msgIndex)];
      
      // Draw Trace
      if (landmarks) {
        drawHighlight(currentStage, landmarks);
        lastDetectedFeatures = landmarks; // Keep tracking landmarks
      }

      if (elapsed >= stageInfo.duration) {
        // Complete current stage, move to next or snap photo
        const nextIndex = currentStageIndex + 1;
        if (nextIndex < STAGES.length) {
          currentStage = STAGES[nextIndex].id;
          stageStartTime = now;
        } else {
          // All done! Dark screen transition & Shutter snapshot
          currentStage = 'snapshot';
          await performSnapshot();
        }
      }
    }
  }

  animationFrameId = requestAnimationFrame(processingLoop);
}

/* ==========================================================================
   SNAPSHOT & REPORT COMPILATION
   ========================================================================== */
async function performSnapshot() {
  stopWebcam();
  
  // Shutter Flash
  shutterFlash.classList.add("flash-active");
  
  // Try play shutter click sound
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    // Simple synthesized click/snap sound
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.16);
  } catch (e) {
    console.log("Audio snapshot click skipped or blocked:", e);
  }

  // Draw frozen camera frame onto hidden canvas for report
  const snapCanvas = document.createElement("canvas");
  snapCanvas.width = webcam.videoWidth || 640;
  snapCanvas.height = webcam.videoHeight || 480;
  const snapCtx = snapCanvas.getContext("2d");
  
  // Mirror snapshot to match webcam preview
  snapCtx.translate(snapCanvas.width, 0);
  snapCtx.scale(-1, 1);
  snapCtx.drawImage(webcam, 0, 0, snapCanvas.width, snapCanvas.height);
  
  capturedImageSrc = snapCanvas.toDataURL("image/png");
  snapshotImg.src = capturedImageSrc;

  // Let flash run for 600ms, then display report card
  setTimeout(() => {
    shutterFlash.classList.remove("flash-active");
    compilePhysiognomyReport();
    
    scannerScreen.classList.remove("active");
    resultScreen.classList.add("active");
    currentStage = 'finished';
  }, 600);
}

function compilePhysiognomyReport() {
  if (!lastDetectedFeatures) {
    alert("오류: 분석 데이터를 추출하지 못했습니다. 정면 얼굴을 유지해 주세요.");
    resetToWelcome();
    return;
  }

  // 1. Extract Metrics
  const metrics = extractFaceMetrics(lastDetectedFeatures);

  // 2. Perform score-based matching
  const evaluation = evaluatePhysiognomy(metrics);
  const selections = evaluation.selections;

  // 3. Match final Title and calculate attributes
  const report = calculateFinalReport(selections, metrics);
  
  // Set main title
  resultTitle.textContent = report.title;

  // Clear and display tag elements
  resultFeaturesList.innerHTML = "";
  Object.keys(selections).forEach(key => {
    const matchedItem = selections[key].item;
    if (matchedItem) {
      const tag = document.createElement("span");
      tag.className = "tag";
      // Extract main name without Hanja
      const cleanName = matchedItem.name.split(" ")[0];
      tag.textContent = cleanName;
      resultFeaturesList.appendChild(tag);
    }
  });

  // Display Star Ratings
  positiveEnergiesList.innerHTML = "";
  warningEnergiesList.innerHTML = "";
  
  // Sort traits by value to isolate top and bottom
  const sortedTraits = Object.keys(report.ratings)
    .map(key => ({ key, val: report.ratings[key] }))
    .sort((a, b) => b.val - a.val); // descending
    
  // Positive energies (top 4 ratings)
  const positives = sortedTraits.slice(0, 4);
  positives.forEach(item => {
    const li = document.createElement("li");
    
    const nameSpan = document.createElement("span");
    nameSpan.className = "energy-name";
    nameSpan.textContent = mapKeyToKorean(item.key);
    
    const starsSpan = document.createElement("span");
    starsSpan.className = "energy-stars";
    // Construct ★ ratings
    const fullStars = Math.floor(item.val);
    const halfStar = item.val % 1 >= 0.5 ? "☆" : "";
    starsSpan.textContent = "★".repeat(fullStars) + halfStar + "☆".repeat(5 - Math.ceil(item.val));
    
    li.appendChild(nameSpan);
    li.appendChild(starsSpan);
    positiveEnergiesList.appendChild(li);
  });

  // Warning/compensating energies (bottom 2 ratings)
  const warnings = sortedTraits.slice(-2);
  warnings.forEach(item => {
    const li = document.createElement("li");
    
    const nameSpan = document.createElement("span");
    nameSpan.className = "energy-name";
    nameSpan.textContent = mapKeyToKorean(item.key);
    
    const starsSpan = document.createElement("span");
    starsSpan.className = "energy-stars";
    const fullStars = Math.floor(item.val);
    const halfStar = item.val % 1 >= 0.5 ? "☆" : "";
    starsSpan.textContent = "★".repeat(fullStars) + halfStar + "☆".repeat(5 - Math.ceil(item.val));
    
    li.appendChild(nameSpan);
    li.appendChild(starsSpan);
    warningEnergiesList.appendChild(li);
  });

  // 4. Generate Master's review strictly in polite Korean conditional phrasing
  let review = "전통 관상학의 흐름으로 비추어 보건대, ";
  
  // Base reviews on key features
  const eyeName = selections.eye.item.name.split(" ")[0];
  const noseName = selections.nose.item.name.split(" ")[0];
  const jawName = selections.jaw.item.name.split(" ")[0];
  
  review += `이목구비 중 ${eyeName}과 ${noseName}의 기색이 두드러져, `;
  
  // Pick the top positive trait
  const topTrait = mapKeyToKorean(positives[0].key);
  review += `전통 관상학에서는 지혜로움과 더불어 대내외적인 ${topTrait}이 우뚝 서 사회적 격식이 높아질 기운으로 해석하기도 합니다. `;
  
  // Add chin/jaw description
  review += `${selections.jaw.item.interpretation.split("해석하기도")[0]} 형태로 보여 하관의 안정감과 조화를 지닌 것으로 보기도 합니다. `;

  // Highlight the weakest trait (the lowest warning trait)
  const weakestTraitKey = warnings[1].key;
  const weakestTraitName = mapKeyToKorean(weakestTraitKey);
  review += `다만, 전체 구성 중 ${weakestTraitName}의 흐름이 다른 부위에 비해 완만하게 머물러 있어, 전통 해석에서는 대인관계의 화합이나 순간적인 추진 기백이 다소 미흡하게 나타날 수 있다고 해석하기도 하오니 이 기운을 부드럽게 보완하시길 권해 드립니다.`;

  reviewText.textContent = review;

  // 5. Display rationale detail list
  metricRationaleList.innerHTML = "";
  
  const rationales = [
    `눈: 가로-세로 비율(${metrics.eye.ratio.toFixed(1)}), 눈꼬리 각도(${metrics.eye.tilt.toFixed(1)}°)를 근거로 하여 전통 관상 중 '${selections.eye.item.name}'의 기운과 조화가 가장 유기적으로 맞닿아 있습니다.`,
    `눈썹: 눈썹의 기하학적 기울기(${metrics.eyebrow.tilt.toFixed(1)}°)와 길이 비율(${metrics.eyebrow.length.toFixed(2)})에 비추어 '${selections.eyebrow.item.name}'의 기세와 형세를 닮아 있습니다.`,
    `코: 얼굴 세로 대비 콧대의 길이(${metrics.nose.lengthRatio.toFixed(2)})와 콧망울 너비 비례를 산출하여 '${selections.nose.item.name}'의 부를 담는 격식으로 매칭되었습니다.`,
    `입: 입꼬리의 평균 상승 곡률(${metrics.mouth.tilt.toFixed(3)})을 바탕으로 미소의 유기적 대칭이 돋보이는 '${selections.mouth.item.name}'으로 분석되었습니다.`,
    `광대 & 턱: 광대 돌출도(${metrics.cheekbones.prominence.toFixed(2)})와 턱선 각도(${metrics.jaw.angle.toFixed(1)}°)에 기반하여 하관의 조화는 '${selections.cheekbones.item.name}' 및 '${selections.jaw.item.name}'에 부합합니다.`,
    `이마: 얼굴 전체의 면적 대비 이마의 비례(${metrics.forehead.heightRatio.toFixed(2)})를 대입하여 지혜를 고양시키는 '${selections.forehead.item.name}'의 학식 조화로 판정되었습니다.`
  ];

  rationales.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    metricRationaleList.appendChild(li);
  });

  // 6. Product recommendation matching
  // Select among the 3 compensation categories by finding the lowest score among:
  // - Category 1 (Interpersonal/Drive) -> Image 1
  // - Category 2 (Relationships/Late Life) -> Image 2
  // - Category 3 (Power/Leadership/Cheekbones) -> Image 3
  const group1Score = (report.ratings.interpersonal + report.ratings.drive) / 2;
  const group2Score = (report.ratings.relationship + report.ratings.lateLife) / 2;
  const group3Score = (report.ratings.power + report.ratings.leadership) / 2;

  let chosenGroup = 1;
  let minScore = group1Score;
  
  if (group2Score < minScore) {
    minScore = group2Score;
    chosenGroup = 2;
  }
  if (group3Score < minScore) {
    minScore = group3Score;
    chosenGroup = 3;
  }

  // Update recommendations based on lowest group
  if (chosenGroup === 1) {
    recoTitle.textContent = "부족한 대인운 및 추진력을 보완하기 위한 추천 제품";
    recoExplanation.innerHTML = `전통 관상학에서는 눈썹의 정갈한 정돈 상태와 흐름을 <strong>대인운</strong> 및 적극적인 <strong>추진력</strong>의 에너지와 연결하여 해석하기도 합니다.<br>부드럽지만 뚜렷한 눈썹결을 이끌어내 조화로운 기운의 안정을 보충하는 제품입니다.`;
    recoImage.src = "assets/image1.png";
    btnViewProduct.href = "https://www.hermes.com/kr/ko/product/아이브로우-펜셜-H083072V010/";
    btnBuyProduct.href = "https://www.hermes.com/kr/ko/category/뷰티/눈/";
  } else if (chosenGroup === 2) {
    recoTitle.textContent = "부족한 인간관계운 및 말년운을 보완하기 위한 추천 제품";
    recoExplanation.innerHTML = `전통 관상학에서는 입꼬리의 방향성과 입술 근육의 형세를 <strong>인간관계운</strong> 및 평온한 <strong>말년운</strong>과 연결해 해석하기도 합니다.<br>입술 주변의 경직을 풀고 아름다운 미소 라인을 자극하여 긍정적인 말년의 화합 기운을 돕는 제품입니다.`;
    recoImage.src = "assets/image2.png";
    btnViewProduct.href = "https://www.rolex.com/ko/watches/find-rolex";
    btnBuyProduct.href = "https://www.rolex.com/ko/watches/find-rolex/classic-watches";
  } else {
    recoTitle.textContent = "부족한 권력운 및 통솔력을 보완하기 위한 추천 제품";
    recoExplanation.innerHTML = `전통 관상학에서는 양 뺨의 균형 잡힌 두툼함과 광대를 관직의 품격, 즉 <strong>권력운</strong> 및 대중적 <strong>통솔력</strong>의 상징으로 보기도 합니다.<br>얼굴 중심부 근육의 피로를 완화하고 대칭성을 탄탄하게 케어하여 품격 있고 위엄 찬 인상을 가꿔주는 마사지 도구입니다.`;
    recoImage.src = "assets/image3.png";
    btnViewProduct.href = "https://www.hermes.com/kr/ko/product/페이스-마사저-H083110V000/";
    btnBuyProduct.href = "https://www.hermes.com/kr/ko/category/뷰티/페이스/";
  }
}

/* ==========================================================================
   NAVIGATION & EVENT HANDLERS
   ========================================================================== */
function resetToWelcome() {
  stopWebcam();
  resultScreen.classList.remove("active");
  scannerScreen.classList.remove("active");
  welcomeScreen.classList.add("active");
  
  // Reset progress text
  currentStepTitle.textContent = "대기 중...";
  scannerProgress.style.width = "0%";
  scanMessage.textContent = "카메라와 관상 모형을 준비하고 있습니다.";
  faceGuideFrame.style.opacity = '1';
  faceGuideFrame.classList.remove("aligned");
  
  if (cameraErrorOverlay) cameraErrorOverlay.classList.remove("active");
  
  currentStage = 'idle';
}

async function handleStart() {
  console.log("[START BUTTON CLICKED]");
  
  if (cameraErrorOverlay) cameraErrorOverlay.classList.remove("active");
  
  // 1. Immediately transition UI to the camera screen
  welcomeScreen.classList.remove("active");
  scannerScreen.classList.add("active");
  
  // 2. Show loading spinner with status message
  showLoader("관상가를 부르는 중...", "카메라 활성화를 요청하고 있습니다...");
  
  // 3. Request camera first
  console.log("[REQUESTING CAMERA]");
  const ok = await startWebcam();
  
  if (!ok) {
    console.error("[CAMERA ACCESS FAILED]");
    hideLoader();
    if (cameraErrorOverlay) {
      cameraErrorOverlay.classList.add("active");
    }
    return;
  }
  
  console.log("[CAMERA READY]");
  
  // 4. Initialize model
  try {
    updateLoaderMessage("얼굴 감정 준비 중...", "AI 관상 판정 모형을 불러오고 있습니다...");
    await initializeModel();
  } catch (error) {
    console.error("[MODEL LOADING FAILED]", error);
    hideLoader();
    alert("관상 분석 모형 준비 중 오류가 발생하였습니다. 다시 시도해 주세요.");
    resetToWelcome();
    return;
  }
  
  // 5. Start analysis
  console.log("[ANALYSIS STARTED]");
  hideLoader();

  currentStage = 'aligning';
  stableFaceCount = 0;
  currentStepTitle.textContent = "얼굴 정면 대기 중";
  scanMessage.textContent = "얼굴을 정면 가이드라인 안에 맞춰서 정지해 주세요.";
  animationFrameId = requestAnimationFrame(processingLoop);
}

// Bind camera retry button
if (btnErrorRetry) {
  btnErrorRetry.addEventListener("click", () => {
    if (cameraErrorOverlay) cameraErrorOverlay.classList.remove("active");
    handleStart();
  });
}


// Generate premium downloadable certificate via HTML5 Canvas (Save/Share)
async function downloadReportCard() {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 960;
  const c = canvas.getContext("2d");

  // Load backgrounds & fonts
  c.fillStyle = "#F5EFE2";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // Background Lattice pattern effect
  c.strokeStyle = "rgba(184, 138, 68, 0.04)";
  c.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 30) {
    c.beginPath(); c.moveTo(x, 0); c.lineTo(x, canvas.height); c.stroke();
  }
  for (let y = 0; y < canvas.height; y += 30) {
    c.beginPath(); c.moveTo(0, y); c.lineTo(canvas.width, y); c.stroke();
  }

  // Draw Gold Border Frame
  c.strokeStyle = "#B88A44";
  c.lineWidth = 1;
  c.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);
  c.lineWidth = 2.5;
  c.strokeRect(22, 22, canvas.width - 44, canvas.height - 44);

  // Header Title
  c.fillStyle = "#2A241B";
  c.textAlign = "center";
  c.font = "bold 20px 'Cinzel', serif";
  c.fillText("👑 왕이 될 상인가?", canvas.width / 2, 70);
  c.fillStyle = "#B88A44";
  c.font = "bold 13px 'Noto Serif KR', serif";
  c.fillText("王 室 觀 相 鑑定 書", canvas.width / 2, 95);

  // Divider
  c.strokeStyle = "rgba(184, 138, 68, 0.4)";
  c.lineWidth = 1;
  c.beginPath(); c.moveTo(50, 115); c.lineTo(canvas.width - 50, 115); c.stroke();

  // Load and draw snapshot image
  const img = new Image();
  img.src = capturedImageSrc;
  
  await new Promise(resolve => {
    img.onload = () => {
      // Draw centered image frame
      const frameX = (canvas.width - 180) / 2;
      const frameY = 140;
      c.fillStyle = "#EFE7D8";
      c.fillRect(frameX - 6, frameY - 6, 192, 242);
      c.strokeStyle = "#B88A44";
      c.lineWidth = 1.5;
      c.strokeRect(frameX - 6, frameY - 6, 192, 242);
      
      c.drawImage(img, frameX, frameY, 180, 230);
      resolve();
    };
    img.onerror = () => resolve(); // continue anyway if failed
  });

  // Chosen Title
  c.fillStyle = "#2A241B";
  c.font = "bold 32px 'Noto Serif KR', serif";
  c.fillText(resultTitle.textContent, canvas.width / 2, 430);

  // Tags list below Title
  c.font = "12px 'Noto Serif KR', serif";
  c.fillStyle = "#5A5040";
  const tagsText = Array.from(resultFeaturesList.children).map(tag => tag.textContent).join("  •  ");
  c.fillText(tagsText, canvas.width / 2, 465);

  // Divider
  c.strokeStyle = "rgba(184, 138, 68, 0.25)";
  c.lineWidth = 1;
  c.beginPath(); c.moveTo(80, 490); c.lineTo(canvas.width - 80, 490); c.stroke();

  // Good and Weak Energies list
  c.font = "bold 14px 'Noto Serif KR', serif";
  c.fillStyle = "#B88A44";
  c.fillText("조화로운 좋은 기운", 180, 525);
  c.fillStyle = "#7A6038";
  c.fillText("보완하면 이로운 기운", canvas.width - 180, 525);

  c.font = "12px monospace";
  c.fillStyle = "#2A241B";
  
  // Print energies list
  const positives = Array.from(positiveEnergiesList.children);
  positives.forEach((el, idx) => {
    const text = el.querySelector(".energy-name").textContent;
    const stars = el.querySelector(".energy-stars").textContent;
    c.textAlign = "left";
    c.fillText(text, 100, 560 + (idx * 28));
    c.textAlign = "right";
    c.fillText(stars, 260, 560 + (idx * 28));
  });

  const warnings = Array.from(warningEnergiesList.children);
  warnings.forEach((el, idx) => {
    const text = el.querySelector(".energy-name").textContent;
    const stars = el.querySelector(".energy-stars").textContent;
    c.textAlign = "left";
    c.fillText(text, canvas.width - 260, 560 + (idx * 28));
    c.textAlign = "right";
    c.fillText(stars, canvas.width - 100, 560 + (idx * 28));
  });

  // Divider
  c.strokeStyle = "rgba(184, 138, 68, 0.25)";
  c.beginPath(); c.moveTo(80, 685); c.lineTo(canvas.width - 80, 685); c.stroke();

  // General Review Box
  c.textAlign = "center";
  c.fillStyle = "#B88A44";
  c.font = "bold 12px 'Noto Serif KR', serif";
  c.fillText("관 상 가 총 평 (鑑定評)", canvas.width / 2, 715);

  c.fillStyle = "#403627";
  c.font = "13px 'Noto Serif KR', serif";
  
  // Wrap review text into lines of ~40 chars
  const review = reviewText.textContent;
  const charsPerLine = 34;
  const lines = [];
  for (let i = 0; i < review.length; i += charsPerLine) {
    lines.push(review.substring(i, i + charsPerLine));
  }
  
  lines.slice(0, 5).forEach((line, idx) => {
    c.fillText(line, canvas.width / 2, 745 + (idx * 24));
  });

  // Signature
  c.font = "italic 11px 'Noto Serif KR', serif";
  c.fillStyle = "#B88A44";
  c.fillText("왕실 관상 감정관 백", canvas.width - 120, 880);

  // Stamp Box
  c.strokeStyle = "rgba(184, 138, 68, 0.4)";
  c.lineWidth = 1.5;
  c.strokeRect(60, 830, 60, 60);
  c.fillStyle = "rgba(184, 138, 68, 0.6)";
  c.font = "bold 9px 'Noto Serif KR', serif";
  c.fillText("鑑定印", 90, 864);

  // Footer Fineprint
  c.fillStyle = "#8C806E";
  c.font = "9px 'Noto Serif KR', serif";
  c.fillText("© 2026 AI 왕실 관상 감정원. 학술 및 전통 오락 전용 리포트.", canvas.width / 2, 925);

  // Trigger file download
  const link = document.createElement("a");
  link.download = `왕이될상인가_관상감정서_${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
