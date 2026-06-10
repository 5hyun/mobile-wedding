import CopyButton from "@/components/CopyButton";
import { accountGroups } from "@/data/wedding";

export default function AccountSection() {
  return (
    <section className="account-section section-pad">
      {/* 축의금 계좌 */}
      <div className="section-copy centered">
        <p className="soft-label">For Your Heart</p>
        <h2>마음 전하실 곳</h2>
        <p>축하의 마음을 전하고 싶으신 분들을 위해 계좌를 안내드립니다.</p>
      </div>

      <div className="account-list">
        {accountGroups.map((account) => (
          <details className="account-details" key={`${account.side}-${account.owner}`}>
            <summary>{account.side}</summary>
            <div className="account-body">
              <p>
                <span>{account.bank}</span>
                <strong>{account.number}</strong>
                <em>{account.owner}</em>
              </p>
              <CopyButton
                label="계좌번호 복사"
                value={`${account.bank} ${account.number} ${account.owner}`}
              />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
