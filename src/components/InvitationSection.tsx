import { wedding } from "@/data/wedding";

function PaperDoveOrnament() {
  return (
    <svg
      className="paper-ornament"
      viewBox="0 0 164 72"
      role="img"
      aria-label="리본을 문 비둘기 장식"
      focusable="false"
    >
      <path
        d="M68 31c-10-3-18-10-23-22 12 2 21 8 27 18M96 31c10-3 18-10 23-22-12 2-21 8-27 18"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M72 32c-14 0-25 10-31 24 12-1 24-7 31-19M92 32c14 0 25 10 31 24-12-1-24-7-31-19"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M68 35c-8 7-18 10-30 8M96 35c8 7 18 10 30 8M76 35c-7-5-14-6-22-2M88 35c7-5 14-6 22-2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M78 35c-7-4-13-2-14 3-1 6 7 8 18 0 11 8 19 6 18 0-1-5-7-7-14-3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M78 40c-4 7-9 12-15 15M86 40c4 7 9 12 15 15"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function InvitationSection() {
  return (
    <section className="invitation-section section-pad" id="invitation">
      <div className="section-copy centered invitation-panel-copy">
        <PaperDoveOrnament />
        <h2 className="paper-title-en">Wedding Invitation</h2>
        <p>
          서로의 일상에 작은 기쁨이 되어
          <br />
          함께 걸어가고 싶은 두 사람이
          <br />
          평생을 약속하려 합니다.
          <br />
          새로운 출발의 순간에 소중한 분들을 모시고
          <br />
          기쁨을 나누고자 하오니 함께 자리해 주시기 바랍니다.
        </p>

        <span className="paper-divider" aria-hidden="true" />

        <div className="invitation-family" aria-label="혼주 및 신랑 신부">
          <p>
            <span className="family-parent-line">
              {wedding.groom.father} ·{" "}
              <span className="memorial-flower-icon" aria-label="고인 표시">
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                  <path d="M8 1.4c.9 1 1.3 2 1.1 3.1 1-.6 2-.7 3.3-.2-.1 1.3-.6 2.2-1.5 2.8 1.1.3 1.8 1.1 2.3 2.3-1 .8-2 1.1-3.1.8.4 1.1.2 2.1-.5 3.2-1.2-.4-2-1.1-2.4-2.2-.6 1-1.5 1.5-2.8 1.7-.6-1.2-.7-2.2-.2-3.2-1.2.1-2.1-.3-3-1.2.6-1.1 1.4-1.8 2.6-1.9-.8-.8-1.2-1.8-1-3.1 1.3-.2 2.3.1 3.1.9C6.1 3.2 6.7 2.2 8 1.4Z" />
                  <circle cx="8" cy="7.7" r="1.7" />
                </svg>
              </span>
              {wedding.groom.mother}의 장남
            </span>
            <strong>{wedding.groom.name}</strong>
          </p>
          <p>
            <span className="family-parent-line">
              {wedding.bride.father} · {wedding.bride.mother}의 차녀
            </span>
            <strong>{wedding.bride.name}</strong>
          </p>
        </div>

        <p className="signature-line" aria-label={`${wedding.groom.name} ${wedding.bride.name}`}>
          <span>{wedding.groom.name}</span>
          <span>{wedding.bride.name}</span>
        </p>
      </div>
    </section>
  );
}
