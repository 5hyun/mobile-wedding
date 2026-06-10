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
        <p className="soft-label">Invitation</p>
        <h2>우리답게, 같은 계절로</h2>
        <p>
          소소한 일상을 나누고 함께 웃을 때
          <br />
          우리는 가장 우리다웠습니다.
          <br />
          앞으로 다가올 모든 계절을 함께 맞이할
          <br />
          두 사람의 첫걸음에 함께해 주세요.
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
