"use client";

import Script from "next/script";
import { ArrowUp, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  initializeKakaoShare,
  KAKAO_JS_KEY,
  KAKAO_SDK_INTEGRITY,
  KAKAO_SDK_SRC,
  sendKakaoWeddingShare,
} from "@/lib/kakaoShare";

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const [shareStatus, setShareStatus] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 360);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShareClick = () => {
    if (sendKakaoWeddingShare()) {
      return;
    }

    setShareStatus(
      KAKAO_JS_KEY
        ? "카카오 공유를 준비 중이에요."
        : "카카오 JavaScript 키가 설정되지 않았어요."
    );
    window.setTimeout(() => setShareStatus(""), 1800);
  };

  return (
    <div className="floating-actions" aria-label="빠른 실행">
      <Script
        src={KAKAO_SDK_SRC}
        strategy="afterInteractive"
        integrity={KAKAO_SDK_INTEGRITY}
        crossOrigin="anonymous"
        onReady={() => {
          setIsKakaoReady(initializeKakaoShare());
        }}
        onError={() => {
          setIsKakaoReady(false);
          setShareStatus("카카오 SDK를 불러오지 못했어요.");
          window.setTimeout(() => setShareStatus(""), 1800);
        }}
      />

      <button
        className={`floating-action-button scroll-top-button${isVisible ? " is-visible" : ""}`}
        type="button"
        onClick={handleScrollTopClick}
        aria-label="맨 위로 이동"
      >
        <ArrowUp className="action-icon" size={25} aria-hidden="true" />
      </button>
      <button
        className="floating-action-button"
        type="button"
        onClick={handleShareClick}
        aria-label="카카오톡 공유"
        aria-disabled={!KAKAO_JS_KEY}
        aria-busy={KAKAO_JS_KEY ? !isKakaoReady : undefined}
      >
        <Share2 className="action-icon" size={24} aria-hidden="true" />
      </button>
      {shareStatus ? (
        <p className="floating-action-status" aria-live="polite">
          {shareStatus}
        </p>
      ) : null}
    </div>
  );
}
