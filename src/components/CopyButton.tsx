"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { copyTextToClipboard } from "@/lib/clipboard";

interface CopyButtonProps {
  label: string;
  value: string;
  className?: string;
}

export default function CopyButton({
  label, // 버튼에 표시할 문구
  value, // 클립보드에 복사할 값
  className = "", // 추가 스타일 클래스
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  /** 복사 버튼 클릭 처리 */
  const handleCopyClick = async () => {
    await copyTextToClipboard(value);
    setHasCopied(true);
    window.setTimeout(() => setHasCopied(false), 1600);
  };

  return (
    <button
      className={`copy-button ${className}`}
      type="button"
      onClick={handleCopyClick}
      aria-live="polite"
    >
      {/* 복사 상태 표시 */}
      {hasCopied ? <Check size={16} /> : <Copy size={16} />}
      <span>{hasCopied ? "복사됨" : label}</span>
    </button>
  );
}
