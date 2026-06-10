# 권오현 · 박혜선 모바일 청첩장

Next.js 16, TypeScript, pnpm 기반 모바일 청첩장 프로젝트입니다.

## 실행

```bash
pnpm dev
```

현재 로컬 확인 주소는 `http://localhost:3001`입니다.

## 배포

Vercel에서 이 폴더를 프로젝트로 연결하면 됩니다.

권장 환경 변수:

```bash
NEXT_PUBLIC_SITE_URL=https://배포주소.vercel.app
NEXT_PUBLIC_NAVER_MAPS_NCP_KEY_ID=네이버_지도_API_Key_ID
```

이 값은 카카오톡/문자 공유 미리보기의 OG 이미지 기준 주소로 사용됩니다.
네이버 지도는 `NEXT_PUBLIC_NAVER_MAPS_NCP_KEY_ID`가 있을 때 오시는 길 섹션에 표시됩니다. 네이버 클라우드 플랫폼에서 Maps JavaScript API를 활성화하고, 배포 도메인과 로컬 확인 도메인을 Web 서비스 URL로 등록해 주세요. Client Secret은 프론트엔드에 넣지 않습니다.

## 수정 위치

- 예식 정보: `src/data/wedding.ts`
- 첫 화면/인트로 사진: `src/data/photos.ts`
- 선별 갤러리 사진: `src/data/gallery.ts`
- 카카오톡 공유 이미지: `public/images/og/wedding-og.jpg`
- 주요 화면: `src/components/`
- 전체 스타일: `src/app/globals.css`
