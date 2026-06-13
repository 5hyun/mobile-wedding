"use client";

import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, Grid3X3, Heart, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { galleryPhotos } from "@/data/gallery";
import { wedding } from "@/data/wedding";

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

const lightboxReducedMotionVariants = {
  enter: {
    opacity: 0,
    x: "0%",
  },
  center: {
    opacity: 1,
    x: "0%",
  },
  exit: {
    opacity: 0,
    x: "0%",
  },
};

const lightboxReducedMotionTransition = {
  duration: 0.12,
  ease: "easeOut" as const,
};

const swipeConfidenceThreshold = 7800;
const getSwipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;
const lightboxPreloadOffsets = [-2, -1, 1, 2] as const;
const lightboxImageSizes = "(max-width: 596px) calc(100vw - 36px), 560px";
const galleryImageSizes = "(max-width: 430px) calc((100vw - 4px) / 3), 142px";
const galleryDateLabel = wedding.date.iso.slice(0, 10).replaceAll("-", ".");
const galleryPlaceLabel = "RAUM";

const galleryHighlights = [
  {
    label: "STUDIO",
    photoIndex: 0,
  },
  {
    label: "VEIL",
    photoIndex: 1,
  },
  {
    label: "GARDEN",
    photoIndex: 8,
  },
  {
    label: "PORTRAIT",
    photoIndex: 15,
  },
] as const;

/** 현재 사진 주변 이미지를 미리 데워 부드럽게 넘기기 위한 목록 */
const getLightboxPreloadPhotos = (currentIndex: number) => {
  const preloadIndices = new Set<number>();

  lightboxPreloadOffsets.forEach((offset) => {
    preloadIndices.add((currentIndex + offset + galleryPhotos.length) % galleryPhotos.length);
  });

  return Array.from(preloadIndices, (photoIndex) => galleryPhotos[photoIndex]);
};

export default function GallerySection() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const shouldReduceMotion = useReducedMotion();
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);
  const hasFocusedLightboxRef = useRef(false);
  const scrollLockRef = useRef<{
    scrollY: number;
    bodyStyle: Pick<CSSStyleDeclaration, "left" | "overflow" | "position" | "right" | "top" | "width">;
  } | null>(null);

  const handlePhotoOpen = useCallback((photoIndex: number) => {
    previousFocusedElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    hasFocusedLightboxRef.current = false;
    setSlideDirection(1);
    setSelectedPhotoIndex(photoIndex);
  }, []);

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
    hasFocusedLightboxRef.current = false;

    window.requestAnimationFrame(() => {
      previousFocusedElementRef.current?.focus({ preventScroll: true });
      previousFocusedElementRef.current = null;
    });
  }, []);

  /** 이전 사진 이동 처리 */
  const handlePreviousClick = useCallback(() => {
    paginatePhoto(-1);
  }, [paginatePhoto]);

  /** 다음 사진 이동 처리 */
  const handleNextClick = useCallback(() => {
    paginatePhoto(1);
  }, [paginatePhoto]);

  const isLightboxOpen = selectedPhotoIndex !== null;

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    /** 키보드 이동 처리 */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleCloseClick();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePreviousClick();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNextClick();
      }

      if (event.key === "Tab") {
        const focusableElements = lightboxRef.current?.querySelectorAll<HTMLElement>(
          "button, [href], [tabindex]:not([tabindex='-1'])"
        );

        if (!focusableElements?.length) {
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    const { body } = document;
    const scrollY = window.scrollY;

    scrollLockRef.current = {
      scrollY,
      bodyStyle: {
        left: body.style.left,
        overflow: body.style.overflow,
        position: body.style.position,
        right: body.style.right,
        top: body.style.top,
        width: body.style.width,
      },
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    if (!hasFocusedLightboxRef.current) {
      closeButtonRef.current?.focus({ preventScroll: true });
      hasFocusedLightboxRef.current = true;
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      const lockedScroll = scrollLockRef.current;

      if (lockedScroll) {
        const restoreScrollY = lockedScroll.scrollY;
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;

        body.style.position = lockedScroll.bodyStyle.position;
        body.style.top = lockedScroll.bodyStyle.top;
        body.style.left = lockedScroll.bodyStyle.left;
        body.style.right = lockedScroll.bodyStyle.right;
        body.style.width = lockedScroll.bodyStyle.width;
        body.style.overflow = lockedScroll.bodyStyle.overflow;
        scrollLockRef.current = null;

        root.style.scrollBehavior = "auto";
        window.requestAnimationFrame(() => {
          window.scrollTo({ left: 0, top: restoreScrollY, behavior: "auto" });
          window.requestAnimationFrame(() => {
            root.style.scrollBehavior = previousScrollBehavior;
          });
        });
      }

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCloseClick, handleNextClick, handlePreviousClick, isLightboxOpen]);

  const selectedPhoto =
    selectedPhotoIndex === null ? null : galleryPhotos[selectedPhotoIndex] ?? null;
  const selectedPhotoNumber = selectedPhotoIndex === null ? 0 : selectedPhotoIndex + 1;
  const preloadedLightboxPhotos =
    selectedPhotoIndex === null ? [] : getLightboxPreloadPhotos(selectedPhotoIndex);

  return (
    <section className="gallery-section section-pad" id="gallery" aria-labelledby="gallery-title">
      {/* 선별 사진 섹션 제목 */}
      <div className="section-copy centered">
        <p className="soft-label">PHOTO</p>
        <h2 id="gallery-title">함께 남긴 사진</h2>
        <p>
          두 사람이 함께한 순간을
          <br />
          몇 장의 사진으로 전합니다.
        </p>
      </div>

      <div className="gallery-profile" aria-label="오현 혜선 웨딩 사진 프로필">
        <button
          className="gallery-avatar"
          type="button"
          onClick={() => handlePhotoOpen(0)}
          aria-label="대표 웨딩 사진 크게 보기"
        >
          <span className="gallery-avatar-ring">
            <Image
              src={galleryPhotos[0].src}
              alt=""
              width={galleryPhotos[0].width}
              height={galleryPhotos[0].height}
              sizes="74px"
            />
          </span>
        </button>
        <div className="gallery-profile-copy">
          <div className="gallery-handle-row">
            <p className="gallery-handle" translate="no">
              ohhyun.hyesun
            </p>
            <span>{galleryDateLabel}</span>
          </div>
          <dl className="gallery-stats" aria-label="사진첩 요약">
            <div>
              <dt>POSTS</dt>
              <dd>{galleryPhotos.length}</dd>
            </div>
            <div>
              <dt>DATE</dt>
              <dd>09.05</dd>
            </div>
            <div>
              <dt>PLACE</dt>
              <dd>{galleryPlaceLabel}</dd>
            </div>
          </dl>
          <p className="gallery-bio">
            Kwon Ohhyun & Park Hyesun
            <br />
            Wedding archive
          </p>
        </div>
      </div>

      <div className="gallery-highlights" aria-label="사진 하이라이트">
        {galleryHighlights.map((highlight) => {
          const photo = galleryPhotos[highlight.photoIndex];

          return (
            <button
              className="gallery-highlight"
              key={highlight.label}
              type="button"
              onClick={() => handlePhotoOpen(highlight.photoIndex)}
              aria-label={`${highlight.label} 사진 크게 보기`}
            >
              <span className="gallery-highlight-thumb">
                <Image
                  src={photo.src}
                  alt=""
                  width={photo.width}
                  height={photo.height}
                  sizes="58px"
                />
              </span>
              <span>{highlight.label}</span>
            </button>
          );
        })}
      </div>

      <div className="gallery-feed-header" aria-hidden="true">
        <span>
          <Grid3X3 className="action-icon" size={15} />
          FEED
        </span>
        <span>
          <Heart className="action-icon" size={15} />
          {galleryDateLabel}
        </span>
      </div>

      {/* 선별 사진 목록 */}
      <div className="gallery-grid" aria-label={`웨딩 사진 ${galleryPhotos.length}장`}>
        {galleryPhotos.map((photo, photoIndex) => (
          <button
            className={`gallery-item gallery-item-${photo.mood}`}
            key={photo.src}
            type="button"
            onClick={() => handlePhotoOpen(photoIndex)}
            aria-label={`${photo.alt} 크게 보기, ${photoIndex + 1} / ${galleryPhotos.length}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              preload
              sizes={galleryImageSizes}
            />
            <span className="gallery-item-mark" aria-hidden="true">
              <Camera className="action-icon" size={15} />
            </span>
          </button>
        ))}
      </div>

      {selectedPhoto && typeof document !== "undefined" ? createPortal(
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="사진 크게 보기"
          ref={lightboxRef}
        >
          {/* 상세 사진 */}
          <button
            className="lightbox-close"
            type="button"
            onClick={handleCloseClick}
            onPointerDown={(event) => {
              event.stopPropagation();
              handleCloseClick();
            }}
            ref={closeButtonRef}
          >
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
                  variants={
                    shouldReduceMotion ? lightboxReducedMotionVariants : lightboxPhotoVariants
                  }
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={
                    shouldReduceMotion
                      ? lightboxReducedMotionTransition
                      : lightboxPhotoTransition
                  }
                  drag={shouldReduceMotion ? false : "x"}
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
                    sizes={lightboxImageSizes}
                    loading="eager"
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
          <div className="lightbox-preload" aria-hidden="true">
            {preloadedLightboxPhotos.map((photo) => (
              <Image
                key={`lightbox-preload-${photo.src}`}
                src={photo.src}
                alt=""
                width={photo.width}
                height={photo.height}
                loading="eager"
                sizes={lightboxImageSizes}
              />
            ))}
          </div>
        </div>,
        document.body
      ) : null}
    </section>
  );
}
