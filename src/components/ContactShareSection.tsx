"use client";

import Script from "next/script";
import { Link2, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { wedding } from "@/data/wedding";
import { copyTextToClipboard } from "@/lib/clipboard";

const KAKAO_SDK_SRC = "https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js";
const KAKAO_SDK_INTEGRITY =
  "sha384-OL+ylM/iuPLtW5U3XcvLSGhE8JzReKDank5InqlHGWPhb4140/yrBw0bg0y7+C9J";
const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY ?? "";
const SITE_URL = (
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

export default function ContactShareSection() {
  const [shareStatus, setShareStatus] = useState("");
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  /** 카카오 SDK 초기화 */
  const initializeKakao = () => {
    const kakao = window.Kakao;

    if (!KAKAO_JS_KEY || !kakao) {
      setIsKakaoReady(false);
      return false;
    }

    if (!kakao.isInitialized()) {
      kakao.init(KAKAO_JS_KEY);
    }

    const initialized = kakao.isInitialized();
    setIsKakaoReady(initialized);
    return initialized;
  };

  /** 카카오톡 공유 버튼 클릭 처리 */
  const handleKakaoShareClick = () => {
    if (!initializeKakao()) {
      setShareStatus(
        KAKAO_JS_KEY
          ? "카카오 공유를 준비 중이에요. 잠시 후 다시 눌러주세요."
          : "카카오 JavaScript 키가 설정되지 않았어요."
      );
      window.setTimeout(() => setShareStatus(""), 2200);
      return;
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
  };

  /** 링크 복사 버튼 클릭 처리 */
  const handleCopyLinkClick = async () => {
    await copyTextToClipboard(SITE_URL);
    setShareStatus("청첩장 링크가 복사되었어요.");
    window.setTimeout(() => setShareStatus(""), 1800);
  };

  return (
    <section className="contact-section section-pad">
      <Script
        src={KAKAO_SDK_SRC}
        strategy="afterInteractive"
        integrity={KAKAO_SDK_INTEGRITY}
        crossOrigin="anonymous"
        onReady={() => {
          initializeKakao();
        }}
        onError={() => {
          setIsKakaoReady(false);
          setShareStatus("카카오 SDK를 불러오지 못했어요.");
          window.setTimeout(() => setShareStatus(""), 2200);
        }}
      />

      {/* 연락 및 공유 */}
      <div className="section-copy">
        <p className="soft-label">연락</p>
        <h2>연락하실 곳</h2>
        <p>예식 관련 문의는 아래 연락처로 부탁드립니다.</p>
      </div>

      <div className="contact-list" aria-label="신랑 신부 연락처">
        {[
          { label: "신랑", name: wedding.groom.shortName, phone: wedding.groom.phoneHref },
          { label: "신부", name: wedding.bride.shortName, phone: wedding.bride.phoneHref },
        ].map((person) => (
          <article className="contact-card" key={person.label}>
            <div>
              <span>{person.label}</span>
              <strong>{person.name}</strong>
            </div>
            <div className="contact-actions">
              <a href={`tel:${person.phone}`} aria-label={`${person.label} ${person.name}에게 전화`}>
                <Phone className="action-icon" size={17} aria-hidden="true" />
                <span>전화</span>
              </a>
              <a href={`sms:${person.phone}`} aria-label={`${person.label} ${person.name}에게 문자`}>
                <MessageCircle className="action-icon" size={17} aria-hidden="true" />
                <span>문자</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="share-row">
        <button
          className="primary-button"
          type="button"
          onClick={handleKakaoShareClick}
          aria-disabled={!KAKAO_JS_KEY}
          aria-busy={KAKAO_JS_KEY ? !isKakaoReady : undefined}
        >
          <MessageCircle className="action-icon" size={17} aria-hidden="true" />
          카카오톡 공유
        </button>
        <button className="copy-button subtle-button" type="button" onClick={handleCopyLinkClick}>
          <Link2 className="action-icon" size={16} aria-hidden="true" />
          링크 복사
        </button>
      </div>
      {shareStatus ? (
        <p className="toast-text" aria-live="polite">
          <Link2 className="toast-icon" size={15} aria-hidden="true" />
          {shareStatus}
        </p>
      ) : null}
    </section>
  );
}
