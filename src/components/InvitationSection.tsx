import Image from "next/image";
import { photos } from "@/data/photos";

export default function InvitationSection() {
  const atelierPhoto = photos.find((photo) => photo.role === "intro") ?? photos[1];
  const minimalPhoto = photos.find((photo) => photo.src.includes("soft-couple")) ?? photos[2];
  const windowPhoto = photos.find((photo) => photo.src.includes("editorial")) ?? photos[3];

  return (
    <section className="invitation-section section-pad">
      {/* 초대 문구 */}
      <div className="section-copy centered">
        <p className="soft-label">Invitation</p>
        <h2>서로의 계절이 되어, 결혼합니다.</h2>
        <p>
          소중한 분들을 모시고
          <br />
          조용히, 기쁘게 시작하려 합니다.
          <br />
          따뜻한 마음으로 함께해 주세요.
        </p>
      </div>

      {/* 컨셉 혼합 사진 */}
      <div className="story-collage">
        {[atelierPhoto, minimalPhoto, windowPhoto].map((photo, photoIndex) => (
          <figure className={`story-frame story-frame-${photoIndex + 1}`} key={photo.src}>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 520px) 64vw, 300px"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
