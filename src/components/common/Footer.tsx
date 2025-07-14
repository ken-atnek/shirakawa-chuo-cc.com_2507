/* =======================================
 * 熊本市中央公民館 FOOTER
 * URL: src/components/common/Footer.tsx
 * Created: 2025-07-11
 * Last updated: 2025-07-11
 * ======================================= */
import { navMenu } from '@/data/navMenuData';
import styles from '@/styles/components/common/Footer.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
import Link from 'next/link';
import Image from 'next/image';
import BanLine from '@/assets/images/ban_line.webp';
import BanInsta from '@/assets/images/ban_insta.webp';
import Logo from '@/assets/images/logo/logo-footer.webp';
const Footer = () => {
  return (
    <footer className={styles.containerFooter}>
      <article>
        <div className={styles.itemLogo}>
          <Image src={Logo} alt="熊本市中央公民館のロゴ" />
        </div>

        <address>
          <span>〒861-11042</span>
          熊本県合志市御代志1868-3
        </address>
        <ExternalLink
          href="tel:09020837643"
          aria-label="090-2083-7643に電話"
          className={styles.itemTel}
        >
          090-2083-7643
        </ExternalLink>

        <ul className={styles.boxSns}>
          <li>
            <ExternalLink
              href="https://page.line.me/068impcw?oat_content=url&openQrModal=true"
              className={styles.itemSns}
            >
              <Image
                src={BanLine}
                alt="熊本市中央公民館のLINE"
                width={100}
                height={100}
              />
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="https://page.line.me/068impcw?oat_content=url&openQrModal=true"
              className={styles.itemSns}
            >
              <Image
                src={BanInsta}
                alt="熊本市中央公民館のインスタグラム"
                width={100}
                height={100}
              />
            </ExternalLink>
          </li>
        </ul>
      </article>
      <nav>
        {navMenu.map((item) => (
          <Link key={item.label} href={item.href} className={styles.itemLink}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.copyright}>
        Copyright 2024 熊本市中央公民館 All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
