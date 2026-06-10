"use client";

import { MessageCircle, Phone, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { wedding } from "@/data/wedding";
import { copyTextToClipboard } from "@/lib/clipboard";

export default function ContactShareSection() {
  const [shareStatus, setShareStatus] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const invitationTitle = `${wedding.groom.shortName} · ${wedding.bride.shortName} 결혼식`;

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  /** 공유 버튼 클릭 처리 */
  const handleShareClick = async () => {
    const currentShareUrl = shareUrl || window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: invitationTitle,
        text: `${wedding.date.display}, ${wedding.venue.name} ${wedding.venue.hall}`,
        url: currentShareUrl,
      });
      return;
    }

    await copyTextToClipboard(currentShareUrl);
    setShareStatus("청첩장 링크가 복사되었어요.");
    window.setTimeout(() => setShareStatus(""), 1800);
  };

  return (
    <section className="contact-section section-pad">
      {/* 연락 및 공유 */}
      <div className="section-copy">
        <p className="soft-label">Contact</p>
        <h2>편하게 연락 주세요</h2>
      </div>

      <div className="contact-grid">
        <a href={`tel:${wedding.groom.phoneHref}`}>
          <Phone className="action-icon" size={17} aria-hidden="true" />
          {wedding.groom.shortName}에게 전화
        </a>
        <a href={`sms:${wedding.groom.phoneHref}`}>
          <MessageCircle className="action-icon" size={17} aria-hidden="true" />
          {wedding.groom.shortName}에게 문자
        </a>
        <a href={`tel:${wedding.bride.phoneHref}`}>
          <Phone className="action-icon" size={17} aria-hidden="true" />
          {wedding.bride.shortName}에게 전화
        </a>
        <a href={`sms:${wedding.bride.phoneHref}`}>
          <MessageCircle className="action-icon" size={17} aria-hidden="true" />
          {wedding.bride.shortName}에게 문자
        </a>
      </div>

      <div className="share-row">
        <button className="primary-button" type="button" onClick={handleShareClick}>
          <Share2 className="action-icon" size={17} aria-hidden="true" />
          청첩장 공유
        </button>
        {shareUrl ? <CopyButton label="링크 복사" value={shareUrl} /> : null}
      </div>
      {shareStatus ? <p className="toast-text">{shareStatus}</p> : null}
    </section>
  );
}
