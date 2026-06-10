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
        <h1>
          {wedding.groom.name}
          <span>·</span>
          {wedding.bride.name}
        </h1>
        <p className="hero-venue">
          {wedding.venue.station} {wedding.venue.name}
          <br />
          {wedding.venue.hall}
        </p>
        <div className="hero-actions">
          <a className="text-action" href={calendarUrl} target="_blank">
            <CalendarDays size={17} />
            일정 저장
          </a>
          <a className="text-action" href={mapLinks.kakao} target="_blank">
            <MapPin size={17} />
            오시는 길
          </a>
        </div>
      </div>
    </section>
  );
}
