import { CalendarDays, Clock, MapPin } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { calendarUrl, wedding } from "@/data/wedding";

export default function WeddingInfoSection() {
  return (
    <section className="info-section section-pad" id="wedding-info">
      {/* 예식 정보 */}
      <div className="section-copy">
        <p className="soft-label">예식 안내</p>
        <h2>2026.09.05</h2>
      </div>

      <div className="info-stack">
        <div className="info-row">
          <CalendarDays className="info-icon" size={20} aria-hidden="true" />
          <div>
            <span>날짜</span>
            <strong>{wedding.date.display}</strong>
          </div>
        </div>
        <div className="info-row">
          <Clock className="info-icon" size={20} aria-hidden="true" />
          <div>
            <span>시간</span>
            <strong>오후 5시</strong>
          </div>
        </div>
        <div className="info-row">
          <MapPin className="info-icon" size={20} aria-hidden="true" />
          <div>
            <span>장소</span>
            <strong>
              {wedding.venue.name} {wedding.venue.hall}
            </strong>
          </div>
        </div>
      </div>

      {/* 일정 저장 */}
      <div className="button-row">
        <a className="primary-button" href={calendarUrl} target="_blank" rel="noreferrer">
          <CalendarDays className="action-icon" size={17} aria-hidden="true" />
          일정 저장
        </a>
        <CopyButton
          label="예식장명 복사"
          value={`${wedding.venue.name} ${wedding.venue.hall}`}
        />
      </div>
    </section>
  );
}
