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
```

이 값은 공유 링크의 OG 이미지 기준 주소로 사용됩니다.

## 수정 위치

- 예식 정보: `src/data/wedding.ts`
- 첫 화면/인트로 사진: `src/data/photos.ts`
- 컨셉별 갤러리 사진: `src/data/concepts.ts`
- 주요 화면: `src/components/`
- 전체 스타일: `src/app/globals.css`
