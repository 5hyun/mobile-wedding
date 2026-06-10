import { wedding } from "@/data/wedding";

export default function CoupleSection() {
  return (
    <section className="couple-section section-pad">
      {/* 혼주 및 신랑 신부 소개 */}
      <div className="section-copy">
        <p className="soft-label">With Family</p>
        <h2>두 사람이 한 마음으로 인사드립니다.</h2>
      </div>

      <div className="family-list">
        <div className="family-row">
          <p>
            {wedding.groom.father} · {wedding.groom.mother}
          </p>
          <strong>아들 {wedding.groom.shortName}</strong>
        </div>
        <div className="family-row">
          <p>
            {wedding.bride.father} · {wedding.bride.mother}
          </p>
          <strong>딸 {wedding.bride.shortName}</strong>
        </div>
      </div>
    </section>
  );
}
