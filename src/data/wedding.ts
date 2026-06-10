/** 청첩장 전체 표시 정보 */
export const wedding = {
  groom: {
    name: "권오현",
    shortName: "오현",
    father: "권영호",
    mother: "김경애",
    motherMemorial: true,
    phone: "010-0000-0000",
    phoneHref: "01000000000",
  },
  bride: {
    name: "박혜선",
    shortName: "혜선",
    father: "박정필",
    mother: "김은자",
    motherMemorial: false,
    phone: "010-1111-1111",
    phoneHref: "01011111111",
  },
  date: {
    iso: "2026-09-05T17:00:00+09:00",
    display: "2026년 9월 5일 토요일",
    time: "오후 5시",
    compact: "2026.09.05 SAT · 5PM",
  },
  venue: {
    name: "하우스오브더라움",
    hall: "벨루스홀",
    floor: "B1F",
    floorDetail: "지하 1층(B1F)",
    subwayLine: "2·7호선",
    station: "건대입구역",
    exit: "5번 출구",
    walk: "도보 약 2분",
    address: "서울 광진구 능동로 81",
    note: "2·7호선 건대입구역 5번 출구 도보 약 2분",
    coordinates: {
      lat: 37.5383624,
      lng: 127.0693132,
    },
    stationCoordinates: {
      lat: 37.54024,
      lng: 127.06938,
    },
    exitCoordinates: {
      lat: 37.5399303,
      lng: 127.0703711,
    },
  },
} as const;

/** 축의금 계좌 더미값 */
export const accountGroups = [
  {
    side: "신랑 측",
    accounts: [
      {
        relation: "신랑",
        owner: "권오현",
        bank: "국민은행",
        number: "000000-00-000000",
      },
      {
        relation: "신랑 아버지",
        owner: "권영호",
        bank: "우리은행",
        number: "0000-000-000000",
      },
    ],
  },
  {
    side: "신부 측",
    accounts: [
      {
        relation: "신부",
        owner: "박혜선",
        bank: "신한은행",
        number: "000-000-000000",
      },
      {
        relation: "신부 아버지",
        owner: "박정필",
        bank: "하나은행",
        number: "000-000000-00000",
      },
      {
        relation: "신부 어머니",
        owner: "김은자",
        bank: "농협은행",
        number: "000-00-000000",
      },
    ],
  },
] as const;

/** 지도 앱 연결 정보 */
export const mapLinks = {
  naver: "https://naver.me/GbDMwi5B",
  kakao: "https://place.map.kakao.com/435680876",
  google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${wedding.venue.name} ${wedding.venue.address}`
  )}`,
} as const;
