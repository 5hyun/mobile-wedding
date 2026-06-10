import { CalendarDays, Clock, MapPin } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { calendarUrl, wedding } from "@/data/wedding";

export default function WeddingInfoSection() {
  return (
    <section className="info-section section-pad" id="wedding-info">
      {/* 예식 정보 */}
      <div className="section-copy">
        <p className="soft-label">Wedding Day</p>
        <h2>2026년 9월 5일 토요일</h2>
      </div>

      <div className="info-stack">
        <div className="info-row">
          <CalendarDays size={20} />
          <div>
            <span>날짜</span>
            <strong>{wedding.date.display}</strong>
          </div>
        </div>
        <div className="info-row">
          <Clock size={20} />
          <div>
            <span>시간</span>
            <strong>오후 5시</strong>
          </div>
        </div>
        <div className="info-row">
          <MapPin size={20} />
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
        <a className="primary-button" href={calendarUrl} target="_blank">
          <CalendarDays size={17} />
          캘린더에 추가
        </a>
        <CopyButton
          label="장소 복사"
          value={`${wedding.venue.name} ${wedding.venue.hall}`}
        />
      </div>
    </section>
  );
}
