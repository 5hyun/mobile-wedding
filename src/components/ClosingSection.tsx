import Image from "next/image";
import { photos } from "@/data/photos";
import { wedding } from "@/data/wedding";

export default function ClosingSection() {
  const closingPhoto = photos.find((photo) => photo.role === "closing") ?? photos[0];

  return (
    <section className="closing-section">
      {/* 마무리 사진 */}
      <Image
        src={closingPhoto.src}
        alt={closingPhoto.alt}
        width={closingPhoto.width}
        height={closingPhoto.height}
        sizes="(max-width: 520px) 100vw, 480px"
      />

      {/* 감사 문구 */}
      <div className="closing-copy">
        <p>축복해 주시는 마음 감사히 간직하겠습니다.</p>
        <strong>
          {wedding.groom.shortName} · {wedding.bride.shortName}
        </strong>
      </div>
    </section>
  );
}
