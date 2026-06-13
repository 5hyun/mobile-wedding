import { wedding } from "@/data/wedding";

export const KAKAO_SDK_SRC = "https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js";
export const KAKAO_SDK_INTEGRITY =
  "sha384-OL+ylM/iuPLtW5U3XcvLSGhE8JzReKDank5InqlHGWPhb4140/yrBw0bg0y7+C9J";
export const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY ?? "";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobile-wedding-sage.vercel.app"
).replace(/\/+$/, "");

const SHARE_IMAGE_URL = `${SITE_URL}/images/og/wedding-og.jpg`;

type KakaoLink = {
  mobileWebUrl: string;
  webUrl: string;
};

type KakaoDefaultFeedTemplate = {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
    link: KakaoLink;
  };
  buttons: Array<{
    title: string;
    link: KakaoLink;
  }>;
};

type KakaoSdk = {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (settings: KakaoDefaultFeedTemplate) => void;
  };
};

declare global {
  interface Window {
    Kakao?: KakaoSdk;
  }
}

const weddingDate = new Date(wedding.date.iso);
const kakaoShareTitle = `${
  weddingDate.getMonth() + 1
}월 ${weddingDate.getDate()}일 ${wedding.groom.name} ❤️ ${wedding.bride.name} 결혼합니다.`;
const kakaoShareDescription = `${wedding.date.display} ${wedding.date.time}\n${wedding.venue.name} ${wedding.venue.hall} ${wedding.venue.floor}`;
const invitationLink = {
  mobileWebUrl: SITE_URL,
  webUrl: SITE_URL,
};
const venueLink = {
  mobileWebUrl: `${SITE_URL}/#venue`,
  webUrl: `${SITE_URL}/#venue`,
};

export function initializeKakaoShare() {
  const kakao = window.Kakao;

  if (!KAKAO_JS_KEY || !kakao) {
    return false;
  }

  if (!kakao.isInitialized()) {
    kakao.init(KAKAO_JS_KEY);
  }

  return kakao.isInitialized();
}

export function sendKakaoWeddingShare() {
  if (!initializeKakaoShare()) {
    return false;
  }

  window.Kakao?.Share.sendDefault({
    objectType: "feed",
    content: {
      title: kakaoShareTitle,
      description: kakaoShareDescription,
      imageUrl: SHARE_IMAGE_URL,
      imageWidth: 1200,
      imageHeight: 630,
      link: invitationLink,
    },
    buttons: [
      {
        title: "모바일청첩장",
        link: invitationLink,
      },
      {
        title: "위치 보기",
        link: venueLink,
      },
    ],
  });

  return true;
}
