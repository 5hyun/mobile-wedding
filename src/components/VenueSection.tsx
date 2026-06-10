import { MapPin, Navigation } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { mapLinks, wedding } from "@/data/wedding";

export default function VenueSection() {
  return (
    <section className="venue-section section-pad" id="venue">
      {/* 오시는 길 정보 */}
      <div className="section-copy">
        <p className="soft-label">오시는 길</p>
        <h2>{wedding.venue.name}</h2>
        <p>
          {wedding.venue.address}
          <br />
          {wedding.venue.hall} · 건대입구역 5번 출구에서 가깝습니다.
        </p>
      </div>

      <div className="location-card">
        {/* 위치 요약 */}
        <MapPin className="location-mark" size={22} aria-hidden="true" />
        <div>
          <span>{wedding.venue.station}</span>
          <strong>{wedding.venue.name}</strong>
          <p>{wedding.venue.hall}</p>
        </div>
      </div>

      {/* 지도 앱 연결 */}
      <div className="map-actions">
        <a href={mapLinks.kakao} target="_blank" rel="noreferrer">
          <Navigation className="action-icon" size={17} aria-hidden="true" />
          카카오맵
        </a>
        <a href={mapLinks.naver} target="_blank" rel="noreferrer">
          <MapPin className="action-icon" size={17} aria-hidden="true" />
          네이버지도
        </a>
        <CopyButton label="주소 복사" value={wedding.venue.address} />
      </div>
    </section>
  );
}
