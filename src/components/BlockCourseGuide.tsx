/* =======================================
 * 熊本市中央公民館 講座のご案内
 * URL: src/components/BlockCourseGuide.tsx
 * Created: 2025-07-16
 * Last updated: 2025-07-16
 * ======================================= */
import styles from '@/styles/PageTop.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
import ListImage01 from '@/assets/images/BlockCourseGuide/list01.webp';
import ListImage02 from '@/assets/images/BlockCourseGuide/list02.webp';
import ListImage03 from '@/assets/images/BlockCourseGuide/list03.webp';
import Image from 'next/image';
const BlockCourseGuide = () => {
  return (
    <>
      <p className={styles.announce}>
        文化や教養、運動など幅広い講座を開いています。
        <br />
        生涯学習自主講座、カルチャー講座については、
        <br />
        一覧になっておりますので、 ダウンロードしていただき、ご確認ください。
        <br />
        主催講座については、「お申し込みはこちら」から、
        <br />
        それぞれ申込みができます。
      </p>
      <div className={styles.wrapImage}>
        <div className={styles.itemH3}>
          <h3>
            <>冬期募集</>
          </h3>
        </div>
        <ul className={styles.listImage}>
          <li>
            <ExternalLink
              href="/data/pdf/251215.pdf"
              aria-label="生涯学習自主講座"
            >
              <Image
                src={ListImage01}
                alt="生涯学習自主講座"
                width={260}
                height={270}
              />
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="https://shirakawapark36221.wixsite.com/my-site-5"
              aria-label="主催講座のご案内"
            >
              <Image
                src={ListImage02}
                alt="生涯学習自主講座"
                width={260}
                height={270}
              />
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="/data/pdf/251212.pdf"
              aria-label="カルチャー講座"
            >
              <Image
                src={ListImage03}
                alt="カルチャー講座"
                width={260}
                height={270}
              />
            </ExternalLink>
          </li>
        </ul>
      </div>
      <nav className={styles.linkForm}>
        <ExternalLink
          href="https://shirakawapark36221.wixsite.com/my-site-5"
          aria-label="主催講座のお申し込みはこちら"
        >
          主催講座のお申し込みはこちら
        </ExternalLink>
        <ExternalLink
          href="https://forms.zohopublic.com/td0625g/form/Untitled63/formperma/Z9YxJucNpmbogL5m63OnOkGC1LO0izVQ1_8D9pZgZgQ"
          aria-label="カルチャー講座のお申し込みはこちら"
        >
          カルチャー講座のお申し込みはこちら
        </ExternalLink>
      </nav>
    </>
  );
};
export default BlockCourseGuide;
