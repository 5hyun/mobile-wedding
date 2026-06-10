import { ExternalLink, MapPin } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { mapLinks, wedding } from "@/data/wedding";

export default function VenueSection() {
  return (
    <section className="venue-section section-pad" id="venue">
      {/* 오시는 길 정보 */}
      <div className="section-copy">
        <p className="soft-label">Location</p>
        <h2>{wedding.venue.name}</h2>
        <p>
          {wedding.venue.address}
          <br />
          {wedding.venue.hall} · {wedding.venue.note}
        </p>
      </div>

      <div className="map-visual" aria-label="하우스 오브더라움 위치 안내">
        {/* 위치 요약 지도 */}
        <div className="map-line" />
        <div className="map-point station-point">
          <span>건대입구역</span>
          <strong>5번 출구</strong>
        </div>
        <div className="map-point venue-point">
          <MapPin size={18} />
          <span>{wedding.venue.name}</span>
          <strong>{wedding.venue.hall}</strong>
        </div>
      </div>

      {/* 지도 앱 연결 */}
      <div className="map-actions">
        <a href={mapLinks.kakao} target="_blank">
          <MapPin size={17} />
          카카오맵
        </a>
        <a href={mapLinks.naver} target="_blank">
          <MapPin size={17} />
          네이버지도
        </a>
        <a href={mapLinks.google} target="_blank">
          <ExternalLink size={17} />
          구글맵
        </a>
        <CopyButton label="주소 복사" value={wedding.venue.address} />
      </div>
    </section>
  );
}
