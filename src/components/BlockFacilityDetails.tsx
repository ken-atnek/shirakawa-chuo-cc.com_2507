/* =======================================
 * 熊本市中央公民館 施設のご案内
 * URL: src/components/BlockFacilityDetails.tsx
 * Created: 2025-07-16
 * Last updated: 2025-07-16
 * ======================================= */
import styles from '@/styles/PageTop.module.scss';

import ExternalLink from '@/components/common/ExternalLink';
import Qr from '@/assets/images/img20230522170000481490.webp';
import Image from 'next/image';
const BlockFacilityDetails = () => {
  return (
    <>
      <div className={styles.boxHead}>
        <h3>公民館施設の申請時期・予約方法が変わりました。</h3>
        <ul>
          <li>
            <h4>使用申請時期の変更</h4>
            <p>4カ月先までの予約が可能となりました。</p>
          </li>
          <li>
            <h4>時間単位での予約も可能に</h4>
            <p>
              午前、午後、夜間の利用区分に加え、予約の入っていない空き室については
              1 時間単位での予約も可能となりました。
              <br />
              1時間単位での利用の予約受付は、使用日の属する月の前々月の初日から可能です。
            </p>
          </li>
          <li>
            <h4>個人登録による予約も可能に</h4>
            <p>
              個人での利用予約が可能となりました。
              <br />
              個人登録での予約受付は利用日の14日前からです。
            </p>
          </li>
        </ul>
        <div className={styles.wrapTel}>
          (中央公民館
          <ExternalLink
            href="tel:0963530151"
            aria-label="096-353-0151に電話"
            className={styles.itemTel}
          >
            096-353-0151
          </ExternalLink>
          )
        </div>
      </div>
      <div className={styles.boxFoot}>
        <h3>貸室の予約方法</h3>
        <p className={styles.sidebarH3}>
          令和５年３月からインターネットで予約ができるようになりました。
        </p>
        <ul>
          <li>
            午前・午後・夜間の区分で予約をされる場合、４カ月前の１日から予約ができます。ただし、予約開始初日の毎月１日(１日が休館日のときは２日)はインターネットのみの予約で、受付開始は正午からです。
            <br />
            (区分予約は4カ月前の初日の午前に自動抽選をします。抽選に参加を希望される団体・グループは、予約開始日の前月20日から前月末日までにエントリーしてください)
          </li>
          <li>
            電話や窓口での予約は2日(1日が休館日のときは3日)以降に承ります。
          </li>
          <li>
            貸室の予約には団体登録が必要です。まだお済でなければ、最寄りの公民館で登録してください。
          </li>
        </ul>
        <div className={styles.wrapQr}>
          <p className={styles.pcOnly}>
            ※下に掲載したURLやQRコードから公民館の案内がご覧になれます。不明な点は公民館にお尋ねください。
          </p>
          <p className={styles.mobileOnly}>
            ※下に掲載したURLから公民館の案内がご覧になれます。不明な点は公民館にお尋ねください。
          </p>
          <ExternalLink
            href="https://kouminkan-yoyaku-kmt.jp/"
            aria-label="公民館施設予約サイト"
          >
            https://kouminkan-yoyaku-kmt.jp/
          </ExternalLink>
          <Image src={Qr} alt="公民館施設予約サイト" width={100} height={100} />
        </div>
        <div className={styles.wrapPdf}>
          <h4>利用料金・定員</h4>
          <ExternalLink
            href="/data/pdf/obj20240627120429965010.pdf"
            aria-label="熊本市中央公民館施設利用料金・定員一覧（PDF）"
          >
            熊本市中央公民館施設利用料金・定員一覧（PDF）
          </ExternalLink>
        </div>
        <div className={styles.wrapPdf}>
          <h4>公民館だより</h4>
          <ExternalLink
            href="/data/pdf/r708.pdf"
            aria-label="公民館だよりをご覧いただけます（PDF）"
          >
            公民館だよりをご覧いただけます（PDF）
          </ExternalLink>
        </div>
      </div>
    </>
  );
};
export default BlockFacilityDetails;
