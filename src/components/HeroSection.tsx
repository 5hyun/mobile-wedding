import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { mapLinks, wedding } from "@/data/wedding";
import { photos } from "@/data/photos";

export default function HeroSection() {
  const heroPhoto = photos[0];

  return (
    <section className="hero-section" aria-label="결혼식 첫 화면">
      <div className="hero-backdrop" aria-hidden="true">
        <Image
          src={heroPhoto.src}
          alt=""
          width={heroPhoto.width}
          height={heroPhoto.height}
          className="hero-backdrop-image"
          sizes="(max-width: 430px) 100vw, 430px"
        />
      </div>

      <div className="hero-paper-panel">
        <p className="hero-kicker">WEDDING</p>
        <p className="hero-script-mark">our wedding day</p>

        {/* 대표 사진 */}
        <figure className="hero-image-wrap">
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            width={heroPhoto.width}
            height={heroPhoto.height}
            preload
            className="hero-image"
            sizes="(max-width: 430px) calc(100vw - 72px), 328px"
          />
          <figcaption>{wedding.date.iso.slice(0, 10).replaceAll("-", ".")} · RAUM</figcaption>
        </figure>

        {/* 첫 화면 정보 */}
        <div className="hero-copy">
          <div className="hero-title-stack">
            <p className="hero-script-title">save the date</p>
            <p className="hero-date">{wedding.date.compact}</p>
            <h1 aria-label={`${wedding.groom.name} 그리고 ${wedding.bride.name}`}>
              <span>{wedding.groom.shortName}</span>
              <i aria-hidden="true">and</i>
              <span>{wedding.bride.shortName}</span>
            </h1>
            <p className="hero-venue">
              {wedding.venue.name} · {wedding.venue.hall}
              <br />
              {wedding.venue.floor} · {wedding.venue.station}
            </p>
          </div>
          <p className="hero-note">We are getting married</p>
          <div className="hero-actions">
            <a className="text-action primary-action" href="#wedding-info">
              <CalendarDays className="action-icon" size={17} aria-hidden="true" />
              날짜 보기
            </a>
            <a
              className="text-action"
              href={mapLinks.naver}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin className="action-icon" size={17} aria-hidden="true" />
              오시는 길
            </a>
          </div>
        </div>
        <span className="hero-panel-stamp" aria-hidden="true">09 · 05</span>
      </div>
    </section>
  );
}
