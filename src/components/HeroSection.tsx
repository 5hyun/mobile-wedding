import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { calendarUrl, mapLinks, wedding } from "@/data/wedding";
import { photos } from "@/data/photos";

export default function HeroSection() {
  const heroPhoto = photos[0];

  return (
    <section className="hero-section" aria-label="결혼식 첫 화면">
      {/* 대표 사진 */}
      <div className="hero-image-wrap">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          width={heroPhoto.width}
          height={heroPhoto.height}
          priority
          className="hero-image"
          sizes="(max-width: 520px) 100vw, 480px"
        />
      </div>

      {/* 첫 화면 정보 */}
      <div className="hero-copy">
        <p className="hero-date">{wedding.date.compact}</p>
        <h1 aria-label={`${wedding.groom.name} 그리고 ${wedding.bride.name}`}>
          <span>{wedding.groom.name}</span>
          <i aria-hidden="true">and</i>
          <span className="hero-name-dot" aria-hidden="true">
            ·
          </span>
          <span>{wedding.bride.name}</span>
        </h1>
        <p className="hero-venue">
          {wedding.venue.name}
          <br />
          {wedding.venue.hall} · {wedding.venue.station}
        </p>
        <div className="hero-actions">
          <a className="text-action" href={calendarUrl} target="_blank">
            <CalendarDays className="action-icon" size={17} aria-hidden="true" />
            일정 저장
          </a>
          <a className="text-action" href={mapLinks.kakao} target="_blank">
            <MapPin className="action-icon" size={17} aria-hidden="true" />
            지도 보기
          </a>
        </div>
      </div>
    </section>
  );
}
