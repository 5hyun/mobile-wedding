"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { galleryPhotos } from "@/data/gallery";

export default function GallerySection() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  /** 사진 상세 닫기 처리 */
  const handleCloseClick = () => {
    setSelectedPhotoIndex(null);
  };

  /** 이전 사진 이동 처리 */
  const handlePreviousClick = () => {
    setSelectedPhotoIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    });
  };

  /** 다음 사진 이동 처리 */
  const handleNextClick = () => {
    setSelectedPhotoIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex + 1) % galleryPhotos.length;
    });
  };

  useEffect(() => {
    if (selectedPhotoIndex === null) {
      return;
    }

    /** 키보드 이동 처리 */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseClick();
      }

      if (event.key === "ArrowLeft") {
        handlePreviousClick();
      }

      if (event.key === "ArrowRight") {
        handleNextClick();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhotoIndex]);

  const selectedPhoto =
    selectedPhotoIndex === null ? null : galleryPhotos[selectedPhotoIndex] ?? null;
  const selectedPhotoNumber = selectedPhotoIndex === null ? 0 : selectedPhotoIndex + 1;

  return (
    <section className="gallery-section section-pad" id="gallery">
      {/* 선별 사진 섹션 제목 */}
      <div className="section-copy centered">
        <p className="soft-label">사진</p>
        <h2>함께 남긴 사진</h2>
        <p>
          두 사람이 함께한 순간을
          <br />
          몇 장의 사진으로 전합니다.
        </p>
      </div>

      {/* 선별 사진 목록 */}
      <div className="gallery-grid" aria-label="선별 웨딩 사진">
        {galleryPhotos.map((photo, photoIndex) => (
          <button
            className={`gallery-item gallery-item-${photo.mood}`}
            key={photo.src}
            type="button"
            onClick={() => setSelectedPhotoIndex(photoIndex)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading={photoIndex < 4 ? "eager" : "lazy"}
              sizes="(max-width: 520px) 50vw, 220px"
              unoptimized
            />
          </button>
        ))}
      </div>

      {selectedPhoto ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="사진 크게 보기">
          {/* 상세 사진 */}
          <button className="lightbox-close" type="button" onClick={handleCloseClick}>
            <X className="action-icon" size={22} aria-hidden="true" />
            <span className="sr-only">닫기</span>
          </button>
          <button className="lightbox-nav left" type="button" onClick={handlePreviousClick}>
            <ChevronLeft className="action-icon" size={24} aria-hidden="true" />
            <span className="sr-only">이전 사진</span>
          </button>
          <figure className="lightbox-figure">
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              width={selectedPhoto.width}
              height={selectedPhoto.height}
              className="lightbox-image"
              sizes="100vw"
              unoptimized
            />
            <figcaption>
              {selectedPhotoNumber} / {galleryPhotos.length}
            </figcaption>
          </figure>
          <button className="lightbox-nav right" type="button" onClick={handleNextClick}>
            <ChevronRight className="action-icon" size={24} aria-hidden="true" />
            <span className="sr-only">다음 사진</span>
          </button>
        </div>
      ) : null}
    </section>
  );
}
