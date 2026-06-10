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
        <p className="soft-label">초대합니다</p>
        <h2>우리의 다음 계절에 초대합니다.</h2>
        <p>
          서로에게 가장 다정한 편이 되어
          <br />
          천천히 같은 방향을 바라봅니다.
          <br />
          가까운 분들과 조용히 나누고 싶은 날,
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
