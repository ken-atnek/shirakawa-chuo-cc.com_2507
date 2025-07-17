/* =======================================
 * 熊本市中央公民館 喫茶・売店 しらかわのほとり
 * URL: src/components/BlockStore.tsx
 * Created: 2025-07-16
 * Last updated: 2025-07-16
 * ======================================= */
import styles from '@/styles/PageTop.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
import Ban01 from '@/assets/images/ban01.webp';
import Ban02 from '@/assets/images/ban02.webp';
import Ban03 from '@/assets/images/ban03.webp';
import Ban04 from '@/assets/images/ban04.webp';
import StoreImage from '@/assets/images/store.webp';
import Image from 'next/image';
const BlockStore = () => {
  return (
    <>
      <div className={styles.boxContents}>
        <div className={styles.wrapInfo}>
          <div className={styles.itemImage}>
            <Image src={StoreImage} alt="しらかわのほとり" />
          </div>
          <h3>営業時間</h3>
          <span>9：00〜17：30</span>
          <span>中央公民館１階</span>
          <div className={styles.itemTel}>
            <ExternalLink href="tel:0963358655" aria-label="096-335-8655に電話">
              096-335-8655
            </ExternalLink>
            <span>（公民館の休館日は休業）</span>
          </div>
        </div>
        <div className={styles.wrapAnnounce}>
          <h3>新メニュー始めました</h3>
          <p>
            お昼のメニューうどんが登場！
            <br />
            講座終わりや仕事終わりにぜひお立ち寄りください♪
          </p>
          <hr />
          <h3>夜の宴会承ります！（５名様より要予約）</h3>
          <p>
            ・コース4,000円よりご予算に応じます。
            <br />
            ・90分飲み放題付き
            <br />
            ・宴会時間 / 21：30まで（ラストオーダー 21：00）
            <br />
            お気軽にご相談ください。
          </p>
        </div>
      </div>
      <nav className={styles.navLink}>
        <ExternalLink
          href="https://pb-japan.net/"
          aria-label="パブリックビジネスジャパン"
        >
          <Image
            src={Ban01}
            alt="パブリックビジネスジャパン"
            width={292}
            height={63}
          />
        </ExternalLink>
        <ExternalLink
          href="https://www.kyuusou.co.jp/"
          aria-label="九州綜合サービス株式会社"
        >
          <Image
            src={Ban02}
            alt="九州綜合サービス株式会社"
            width={292}
            height={63}
          />
        </ExternalLink>
        <ExternalLink
          href="https://www.kumanichi-sv.co.jp/"
          aria-label="熊日サービス開発株式会社"
        >
          <Image
            src={Ban03}
            alt="熊日サービス開発株式会社"
            width={292}
            height={63}
          />
        </ExternalLink>
        <ExternalLink href="https://fm791.jp/" aria-label="熊本シティエフエム">
          <Image src={Ban04} alt="熊本シティエフエム" width={292} height={63} />
        </ExternalLink>
      </nav>
    </>
  );
};
export default BlockStore;
