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
    display: "2026년 9월 5일 토요일 오후 5시",
    compact: "2026.09.05 SAT · 5PM",
    calendarStartUtc: "20260905T080000Z",
    calendarEndUtc: "20260905T100000Z",
  },
  venue: {
    name: "하우스 오브더라움",
    hall: "2층 야호홀",
    station: "건대입구역",
    address: "서울 광진구 능동로 81",
    note: "건대입구역 5번 출구에서 가까운 거리",
  },
} as const;

/** 축의금 계좌 더미값 */
export const accountGroups = [
  {
    side: "신랑 측",
    owner: "권오현",
    bank: "국민은행",
    number: "000000-00-000000",
  },
  {
    side: "신부 측",
    owner: "박혜선",
    bank: "신한은행",
    number: "000-000-000000",
  },
] as const;

/** 지도 앱 연결 정보 */
export const mapLinks = {
  naver: `https://map.naver.com/p/search/${encodeURIComponent(
    `${wedding.venue.name} ${wedding.venue.address}`
  )}`,
  kakao: `https://map.kakao.com/link/search/${encodeURIComponent(
    `${wedding.venue.name} ${wedding.venue.address}`
)}`,
  google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${wedding.venue.name} ${wedding.venue.address}`
  )}`,
} as const;

/** 구글 캘린더 일정 추가 주소 */
export const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  `${wedding.groom.name} · ${wedding.bride.name} 결혼식`
)}&dates=${wedding.date.calendarStartUtc}/${wedding.date.calendarEndUtc}&details=${encodeURIComponent(
  "가까운 분들과 조용하고 기쁘게 나누고 싶은 날입니다. 따뜻한 마음으로 함께해 주세요."
)}&location=${encodeURIComponent(
  `${wedding.venue.address} ${wedding.venue.name} ${wedding.venue.hall}`
)}`;
