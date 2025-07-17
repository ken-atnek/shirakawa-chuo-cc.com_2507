/* =======================================
 * 熊本市中央公民館 FOOTER
 * URL: src/components/common/Footer.tsx
 * Created: 2025-07-15
 * Last updated: 2025-07-15
 * ======================================= */
import styles from '@/styles/components/common/Footer.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
import SnsFb from '@/assets/images/sns-fb.webp';
import SnsLine from '@/assets/images/sns-line.webp';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className={styles.containerFooter}>
      <ExternalLink
        href="tel:0963530151"
        aria-label="096-353-0151に電話"
        className={styles.itemTel}
      >
        096-353-0151
      </ExternalLink>
      <div className={styles.name}>
        <span>指定管理者</span>
        白川公園複合施設管理運営共同企業体
      </div>
      <ul className={styles.boxSns}>
        <li>
          <ExternalLink
            href="https://www.facebook.com/%E7%86%8A%E6%9C%AC%E5%B8%82%E4%B8%AD%E5%A4%AE%E5%85%AC%E6%B0%91%E9%A4%A8-112888990540984/?modal=admin_todo_tour"
            aria-label="熊本市中央公民館のFaceBook"
            className={styles.itemSns}
          >
            <Image src={SnsFb} alt="熊本市中央公民館のFaceBook" />
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href="https://page.line.me/087khscf?openQrModal=true"
            aria-label="熊本市中央公民館のLINE"
            className={styles.itemSns}
          >
            <Image src={SnsLine} alt="熊本市中央公民館のLINE" />
          </ExternalLink>
        </li>
      </ul>
      <div className={styles.copyright}>
        ©︎2022, 熊本市中央公民館. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
