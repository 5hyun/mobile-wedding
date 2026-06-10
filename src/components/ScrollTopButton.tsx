"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 520);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      className={`scroll-top-button${isVisible ? " is-visible" : ""}`}
      href="#top"
      aria-label="맨 위로 이동"
    >
      <ArrowUp className="action-icon" size={17} aria-hidden="true" />
      <span>맨 위로</span>
    </a>
  );
}
