import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-serif-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobile-wedding.vercel.app"
  ),
  title: "오현과 혜선의 결혼식에 초대합니다",
  description:
    "2026년 9월 5일 오후 5시, 하우스 오브더라움 2층 야호홀에서 권오현 박혜선의 결혼식이 열립니다.",
  openGraph: {
    title: "오현과 혜선의 결혼식에 초대합니다",
    description: "2026년 9월 5일 토요일 오후 5시, 하우스 오브더라움 2층 야호홀",
    type: "website",
    locale: "ko_KR",
    siteName: "오현 · 혜선 모바일 청첩장",
    images: [
      {
        url: "/images/og/wedding-og.jpg",
        width: 1200,
        height: 630,
        alt: "오현과 혜선의 결혼식 초대 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "오현과 혜선의 결혼식에 초대합니다",
    description: "2026년 9월 5일 토요일 오후 5시, 하우스 오브더라움 2층 야호홀",
    images: ["/images/og/wedding-og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf7f1",
};

export default function RootLayout({
  children, // 페이지 본문
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${notoSerifKr.variable}`}>
      <body>{children}</body>
    </html>
  );
}
