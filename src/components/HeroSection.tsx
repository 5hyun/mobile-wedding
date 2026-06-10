import Image from "next/image";
import { MapPin } from "lucide-react";
import { mapLinks, wedding } from "@/data/wedding";
import { photos } from "@/data/photos";

export default function HeroSection() {
  const heroPhoto = photos[0];

  return (
    <section className="hero-section" aria-label="결혼식 첫 화면">
      {/* 대표 사진 */}
      <figure className="hero-image-wrap">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          width={heroPhoto.width}
          height={heroPhoto.height}
          priority
          className="hero-image"
          sizes="(max-width: 520px) 100vw, 480px"
        />
      </figure>

      {/* 첫 화면 정보 */}
      <div className="hero-copy">
        <div className="hero-title-stack">
          <p className="hero-date">{wedding.date.compact}</p>
          <h1 aria-label={`${wedding.groom.name} 그리고 ${wedding.bride.name}`}>
            <span>{wedding.groom.name}</span>
            <i aria-hidden="true">and</i>
            <span>{wedding.bride.name}</span>
          </h1>
          <p className="hero-venue">
            {wedding.venue.name}
            <br />
            {wedding.venue.hall} · {wedding.venue.floor} · {wedding.venue.station}
          </p>
        </div>
        <p className="hero-note">두 사람이 함께 서는 날</p>
        <div className="hero-actions">
          <a
            className="text-action primary-action"
            href={mapLinks.kakao}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin className="action-icon" size={17} aria-hidden="true" />
            길 찾기
          </a>
        </div>
      </div>
    </section>
  );
}
