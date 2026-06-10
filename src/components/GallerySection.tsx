"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { galleryPhotos } from "@/data/gallery";

const lightboxPhotoVariants = {
  enter: (direction: number) => ({
    opacity: 1,
    x: direction > 0 ? "100vw" : "-100vw",
  }),
  center: {
    opacity: 1,
    x: "0%",
  },
  exit: (direction: number) => ({
    opacity: 1,
    x: direction > 0 ? "-100vw" : "100vw",
  }),
};

const lightboxPhotoTransition = {
  x: {
    type: "spring" as const,
    stiffness: 245,
    damping: 31,
    mass: 0.9,
  },
  opacity: {
    duration: 0.24,
    ease: "easeOut" as const,
  },
};

const swipeConfidenceThreshold = 7800;
const getSwipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export default function GallerySection() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const paginatePhoto = useCallback((direction: 1 | -1) => {
    setSlideDirection(direction);
    setSelectedPhotoIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex + direction + galleryPhotos.length) % galleryPhotos.length;
    });
  }, []);

  /** 사진 상세 닫기 처리 */
  const handleCloseClick = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  /** 이전 사진 이동 처리 */
  const handlePreviousClick = useCallback(() => {
    paginatePhoto(-1);
  }, [paginatePhoto]);

  /** 다음 사진 이동 처리 */
  const handleNextClick = useCallback(() => {
    paginatePhoto(1);
  }, [paginatePhoto]);

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
  }, [handleCloseClick, handleNextClick, handlePreviousClick, selectedPhotoIndex]);

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
            <div className="lightbox-photo-stage" aria-live="polite">
              <AnimatePresence custom={slideDirection} initial={false}>
                <motion.div
                  className="lightbox-photo-frame"
                  key={selectedPhoto.src}
                  custom={slideDirection}
                  variants={lightboxPhotoVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={lightboxPhotoTransition}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipePower = getSwipePower(offset.x, velocity.x);

                    if (swipePower < -swipeConfidenceThreshold) {
                      handleNextClick();
                    } else if (swipePower > swipeConfidenceThreshold) {
                      handlePreviousClick();
                    }
                  }}
                >
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    width={selectedPhoto.width}
                    height={selectedPhoto.height}
                    className="lightbox-image"
                    sizes="100vw"
                    priority
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <figcaption>
              {selectedPhotoNumber} / {galleryPhotos.length}
              <span className="sr-only">좌우로 밀어 사진을 넘길 수 있습니다.</span>
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
