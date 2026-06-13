import type { Metadata, Viewport } from "next";
import { Caveat, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-serif-kr",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobile-wedding-sage.vercel.app"
  ),
  alternates: {
    canonical: "/",
  },
  applicationName: "오현 · 혜선 모바일 청첩장",
  title: "오현과 혜선의 결혼식에 초대합니다",
  description:
    "2026년 9월 5일 토요일 오후 5시, 하우스오브더라움 벨루스홀에서 뵙겠습니다.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "오현과 혜선의 결혼식에 초대합니다",
    description:
      "2026년 9월 5일 토요일 오후 5시, 하우스오브더라움 벨루스홀 B1F",
    type: "website",
    locale: "ko_KR",
    siteName: "오현 · 혜선 모바일 청첩장",
    url: "/",
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
    description:
      "2026년 9월 5일 토요일 오후 5시, 하우스오브더라움 벨루스홀 B1F",
    images: ["/images/og/wedding-og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff8ea",
};

const extensionHydrationGuardScript = `
(() => {
  const cleanExtensionNodes = () => {
    const head = document.head;

    if (!head) {
      return;
    }

    head.querySelectorAll("#__endic_crx__, [id^='__endic_crx__']").forEach((node) => {
      node.remove();
    });

    head.querySelectorAll("[data-wxt-integrated]").forEach((node) => {
      node.removeAttribute("data-wxt-integrated");

      if (node instanceof HTMLElement && node.tagName === "DIV") {
        node.hidden = true;
      }
    });
  };

  cleanExtensionNodes();

  const observer = new MutationObserver(cleanExtensionNodes);
  observer.observe(document.documentElement, {
    attributeFilter: ["data-wxt-integrated", "hidden"],
    attributes: true,
    childList: true,
    subtree: true,
  });

  window.addEventListener(
    "load",
    () => {
      cleanExtensionNodes();
      window.setTimeout(() => observer.disconnect(), 1200);
    },
    { once: true }
  );
})();
`;

export default function RootLayout({
  children, // 페이지 본문
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${notoSerifKr.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {children}
        <Script
          id="extension-hydration-guard"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: extensionHydrationGuardScript }}
        />
      </body>
    </html>
  );
}
