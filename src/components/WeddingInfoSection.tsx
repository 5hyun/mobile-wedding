import { CalendarDays, Clock, MapPin } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { wedding } from "@/data/wedding";

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
            <strong>{wedding.date.time}</strong>
          </div>
        </div>
        <div className="info-row">
          <MapPin className="info-icon" size={20} aria-hidden="true" />
          <div>
            <span>장소</span>
            <strong>
              {wedding.venue.name} {wedding.venue.hall} · {wedding.venue.floor}
            </strong>
          </div>
        </div>
      </div>

      {/* 장소명 복사 */}
      <div className="button-row">
        <CopyButton
          label="예식장명 복사"
          value={`${wedding.venue.name} ${wedding.venue.hall} ${wedding.venue.floor}`}
        />
      </div>
    </section>
  );
}
