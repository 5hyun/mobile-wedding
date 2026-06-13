import { MapPin, Navigation, TrainFront } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import VenueMap from "@/components/VenueMap";
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
          {wedding.venue.hall} · {wedding.venue.floorDetail} · {wedding.venue.note}
        </p>
      </div>

      <div className="venue-transit" aria-label="지하철 안내">
        <span className="venue-transit-icon" aria-hidden="true">
          <TrainFront className="info-icon" size={19} />
        </span>
        <div>
          <span>지하철</span>
          <strong>
            {wedding.venue.subwayLine} {wedding.venue.station} {wedding.venue.exit}
          </strong>
          <p>{wedding.venue.exit}로 나오시면 {wedding.venue.walk}입니다.</p>
        </div>
      </div>

      <VenueMap />

      {/* 지도 앱 연결 */}
      <div className="map-actions">
        <a href={mapLinks.naver} target="_blank" rel="noreferrer">
          <MapPin className="action-icon" size={17} aria-hidden="true" />
          네이버지도
        </a>
        <a href={mapLinks.kakao} target="_blank" rel="noreferrer">
          <Navigation className="action-icon" size={17} aria-hidden="true" />
          카카오맵
        </a>
        <CopyButton
          label="주소 복사"
          value={`${wedding.venue.address} ${wedding.venue.name} ${wedding.venue.hall} ${wedding.venue.floorDetail}`}
        />
      </div>
    </section>
  );
}
