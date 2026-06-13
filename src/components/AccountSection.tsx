import CopyButton from "@/components/CopyButton";
import { accountGroups } from "@/data/wedding";

export default function AccountSection() {
  return (
    <section className="account-section section-pad" id="account">
      {/* 축의금 계좌 */}
      <div className="section-copy centered">
        <p className="soft-label">축하</p>
        <h2>축하의 마음 전하실 곳</h2>
        <p>
          참석만으로도 큰 축복입니다.
          <br />
          멀리서 마음 전하실 분들을 위해 안내드립니다.
        </p>
      </div>

      <div className="account-list">
        {accountGroups.map((group) => (
          <section className="account-group" key={group.side} aria-label={`${group.side} 계좌`}>
            <h3>{group.side}</h3>
            <div className="account-items">
              {group.accounts.map((account) => (
                <article className="account-item" key={`${group.side}-${account.owner}`}>
                  <div>
                    <span>{account.relation}</span>
                    <strong>{account.bank}</strong>
                    <p>
                      {account.number}
                      <br />
                      {account.owner}
                    </p>
                  </div>
                  <CopyButton
                    label="복사"
                    value={`${account.bank} ${account.number} ${account.owner}`}
                  />
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
