"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import { weddingConcepts } from "@/data/concepts";
import { wedding } from "@/data/wedding";

const conceptPhotos = weddingConcepts.flatMap((concept) =>
  concept.photos.map((photo) => ({
    ...photo,
    conceptId: concept.id,
    conceptTitle: concept.title,
    conceptDescription: concept.description,
  }))
);

/** 선택 사진의 전체 순서 조회 */
function getConceptPhotoIndex(photoSrc: string) {
  return conceptPhotos.findIndex((photo) => photo.src === photoSrc);
}

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

      return (currentIndex - 1 + conceptPhotos.length) % conceptPhotos.length;
    });
  };

  /** 다음 사진 이동 처리 */
  const handleNextClick = () => {
    setSelectedPhotoIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex + 1) % conceptPhotos.length;
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
    selectedPhotoIndex === null ? null : conceptPhotos[selectedPhotoIndex];

  return (
    <section className="gallery-section section-pad" id="gallery">
      {/* 컨셉별 사진 섹션 제목 */}
      <div className="section-copy">
        <p className="soft-label">Concept Archive</p>
        <h2>의상과 장면이 바뀌는 순간들</h2>
        <p>
          의상과 공간이 바뀔 때마다 달라지는 공기를 조용히 이어 담았습니다.
        </p>
        <strong className="concept-count">
          {weddingConcepts.length} scenes · {conceptPhotos.length} frames
        </strong>
      </div>

      {/* 컨셉별 사진 목록 */}
      <div className="concept-list">
        {weddingConcepts.map((concept, conceptIndex) => (
          <article className="concept-card" key={concept.id}>
            <div className="concept-heading">
              <span>{String(conceptIndex + 1).padStart(2, "0")}</span>
              <div>
                <h3>{concept.title}</h3>
                <p>{concept.description}</p>
              </div>
            </div>

            <div className="concept-photo-grid">
              {concept.photos.map((photo, photoIndex) => (
                <button
                  className={`concept-photo ${
                    photoIndex === 0 ? "concept-photo-lead" : "concept-photo-sub"
                  }`}
                  key={photo.src}
                  type="button"
                  onClick={() => setSelectedPhotoIndex(getConceptPhotoIndex(photo.src))}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading={conceptIndex < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 520px) 62vw, 280px"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* 전체 앨범 연결 */}
      <a className="album-link" href={wedding.albumUrl} target="_blank">
        더 많은 사진 보기
        <ExternalLink size={16} />
      </a>
      <p className="album-caption">Google Drive에서 열립니다.</p>

      {selectedPhoto ? (
        <div className="lightbox" role="dialog" aria-modal="true">
          {/* 상세 사진 */}
          <button className="lightbox-close" type="button" onClick={handleCloseClick}>
            <X size={22} />
            <span className="sr-only">닫기</span>
          </button>
          <button className="lightbox-nav left" type="button" onClick={handlePreviousClick}>
            <ChevronLeft size={24} />
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
            <figcaption>{selectedPhoto.conceptTitle}</figcaption>
          </figure>
          <button className="lightbox-nav right" type="button" onClick={handleNextClick}>
            <ChevronRight size={24} />
            <span className="sr-only">다음 사진</span>
          </button>
        </div>
      ) : null}
    </section>
  );
}
