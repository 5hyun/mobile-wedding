"use client";

import Script from "next/script";
import { Link2, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { wedding } from "@/data/wedding";
import { copyTextToClipboard } from "@/lib/clipboard";
import {
  initializeKakaoShare,
  KAKAO_JS_KEY,
  KAKAO_SDK_INTEGRITY,
  KAKAO_SDK_SRC,
  sendKakaoWeddingShare,
  SITE_URL,
} from "@/lib/kakaoShare";

const contactGroups = [
  {
    side: "groom",
    label: "신랑측",
    name: `${wedding.groom.shortName} 측`,
    people: [
      { label: "신랑", name: wedding.groom.shortName, phone: wedding.groom.phoneHref },
      { label: "아버님", name: wedding.groom.father, phone: wedding.groom.fatherPhoneHref },
    ],
  },
  {
    side: "bride",
    label: "신부측",
    name: `${wedding.bride.shortName} 측`,
    people: [
      { label: "신부", name: wedding.bride.shortName, phone: wedding.bride.phoneHref },
      { label: "아버님", name: wedding.bride.father, phone: wedding.bride.fatherPhoneHref },
      { label: "어머님", name: wedding.bride.mother, phone: wedding.bride.motherPhoneHref },
    ],
  },
] as const;

export default function ContactShareSection() {
  const [shareStatus, setShareStatus] = useState("");
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  /** 카카오톡 공유 버튼 클릭 처리 */
  const handleKakaoShareClick = () => {
    if (!sendKakaoWeddingShare()) {
      setShareStatus(
        KAKAO_JS_KEY
          ? "카카오 공유를 준비 중이에요. 잠시 후 다시 눌러주세요."
          : "카카오 JavaScript 키가 설정되지 않았어요."
      );
      window.setTimeout(() => setShareStatus(""), 2200);
      return;
    }
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
          setIsKakaoReady(initializeKakaoShare());
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

      <div className="contact-list" aria-label="신랑 신부 및 혼주 연락처">
        {contactGroups.map((group) => (
          <div className={`contact-group is-${group.side}`} key={group.side}>
            <div className="contact-group-head">
              <span className="contact-side-label">{group.label}</span>
              <strong>{group.name}</strong>
            </div>
            {group.people.map((person) => (
              <article className="contact-card" key={`${group.side}-${person.label}`}>
                <div>
                  <span>{person.label}</span>
                  <strong>{person.name}</strong>
                </div>
                <div className="contact-actions">
                  <a href={`tel:${person.phone}`} aria-label={`${group.label} ${person.label} ${person.name}에게 전화`}>
                    <Phone className="action-icon" size={17} aria-hidden="true" />
                    <span>전화</span>
                  </a>
                  <a href={`sms:${person.phone}`} aria-label={`${group.label} ${person.label} ${person.name}에게 문자`}>
                    <MessageCircle className="action-icon" size={17} aria-hidden="true" />
                    <span>문자</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
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
