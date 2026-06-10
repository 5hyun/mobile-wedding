import { wedding } from "@/data/wedding";

interface ParentNamesProps {
  father: string;
  mother: string;
  hasMemorialMother: boolean;
}

/** 부모님 이름과 추모 표식 표시 */
function ParentNames({
  father, // 아버님 성함
  mother, // 어머님 성함
  hasMemorialMother, // 어머님 추모 표식 여부
}: ParentNamesProps) {
  return (
    <p className="parent-names">
      <span>{father}</span>
      <span aria-hidden="true">·</span>
      <span>{mother}</span>
      {hasMemorialMother ? (
        <span className="memorial-flower" aria-label="고인" title="고인">
          ❀
        </span>
      ) : null}
    </p>
  );
}

export default function CoupleSection() {
  return (
    <section className="couple-section section-pad">
      {/* 혼주 및 신랑 신부 소개 */}
      <div className="section-copy">
        <p className="soft-label">두 사람</p>
        <h2>양가의 마음을 모아 인사드립니다.</h2>
      </div>

      <div className="family-list">
        <div className="family-row">
          <ParentNames
            father={wedding.groom.father}
            mother={wedding.groom.mother}
            hasMemorialMother={wedding.groom.motherMemorial}
          />
          <strong>아들 {wedding.groom.shortName}</strong>
        </div>
        <div className="family-row">
          <ParentNames
            father={wedding.bride.father}
            mother={wedding.bride.mother}
            hasMemorialMother={wedding.bride.motherMemorial}
          />
          <strong>딸 {wedding.bride.shortName}</strong>
        </div>
      </div>
      <p className="memorial-note">❀ 마음에 함께 모시는 어머님</p>
    </section>
  );
}
