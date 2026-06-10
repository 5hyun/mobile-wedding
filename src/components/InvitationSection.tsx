import Image from "next/image";
import { photos } from "@/data/photos";

export default function InvitationSection() {
  const introPhoto = photos.find((photo) => photo.role === "intro") ?? photos[1];
  const storyPhotos = photos.filter((photo) => photo.role === "story");
  const firstStoryPhoto = storyPhotos[0] ?? photos[2];
  const secondStoryPhoto = storyPhotos[1] ?? photos[3];

  return (
    <section className="invitation-section section-pad">
      {/* 초대 문구 */}
      <div className="section-copy centered">
        <p className="soft-label">초대</p>
        <h2>결혼합니다</h2>
        <p>
          권오현과 박혜선이
          <br />
          서로의 곁에서
          <br />
          새로운 가정을 이루려 합니다.
          <br />
          오셔서 축복해 주시면 감사하겠습니다.
        </p>
      </div>

      {/* 컨셉 혼합 사진 */}
      <div className="story-gallery" aria-label="두 사람의 웨딩 사진">
        <figure className="story-frame story-frame-large">
          <Image
            src={introPhoto.src}
            alt={introPhoto.alt}
            width={introPhoto.width}
            height={introPhoto.height}
            sizes="(max-width: 520px) 100vw, 480px"
          />
        </figure>
        <div className="story-pair">
          {[firstStoryPhoto, secondStoryPhoto].map((photo) => (
            <figure className="story-frame" key={photo.src}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 520px) 48vw, 230px"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
