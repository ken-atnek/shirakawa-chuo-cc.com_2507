/* =======================================
 * 熊本市中央公民館 TOPページ
 * URL: /app/page.tsx
 * Created: 2025-07-11
 * Last updated: 2025-07-11
 * ======================================= */

import type { Metadata } from 'next';
import styles from '@/styles/PageTop.module.scss';
import Image from 'next/image';
import ExternalLink from '@/components/common/ExternalLink';
import BlockFacilityGuide from '@/components/BlockFacilityGuide';
import BlockFacilityDetails from '@/components/BlockFacilityDetails';
import BlockFacilityHours from '@/components/BlockFacilityHours';
import BlockCourseGuide from '@/components/BlockCourseGuide';
import BlockAccess from '@/components/BlockAccess';
import BlockStore from '@/components/BlockStore';

// import { newsData } from '@/data/newsData';
// import BlockNewsList from '@/components/BlockNewsList';

import BlockNewsList from '@/components/BlockNewsClient';

export const generateMetadata = (): Metadata => {
  return {
    title: '熊本市中央公民館',
    description:
      '熊本市中央公民館は図書館から会議室、ホールまで幅広くご利用いただける施設です。',
  };
};
export default function Home() {
  return (
    <>
      <section className={styles.containerHero}>
        <Image
          src="/images/hero.webp"
          alt="人々が集い 学ぶ 災害に強いまちづくりの拠点"
          width={100}
          height={100}
        />
      </section>
      <section className={styles.containerNews} id="ContainerNews">
        <article>
          <h2 className={styles.itemH2}>お知らせ</h2>
          <p className={styles.sidebarH2}>
            講座案内や公民館だよりについてなど最新情報をお届けします
          </p>
          <ExternalLink
            href="/data/pdf/spring202502.pdf"
            aria-label="（白川）カルチャー講座　春期講座　受講生募集中！"
            className={styles.itemHeadPdf}
          >
            （白川）カルチャー講座　夏期講座　受講生募集中！
          </ExternalLink>
          <BlockNewsList />
          <article className={styles.blockInformation} id="BlockInformation">
            <h2 className={styles.itemH2}>講座のご案内</h2>
            <BlockCourseGuide />
          </article>
        </article>
      </section>
      <section
        className={styles.containerFacilityGuide}
        id="ContainerFacilityGuide"
      >
        <div className={styles.boxHead}>施設ご利用に関するトピックス</div>
        <article>
          <h2 className={styles.itemH2}>施設のご案内</h2>
          <p className={styles.sidebarH2}>
            画像をクリックすると詳しい情報が見れます
          </p>
          <BlockFacilityGuide />
        </article>
      </section>
      <section
        className={styles.containerFacilityDetails}
        id="ContainerFacilityDetails"
      >
        <article>
          <h2 className={styles.itemH2}>施設ご利用について</h2>
          <p className={styles.sidebarH2}>利用お申し込み、料金、定員について</p>
          <BlockFacilityDetails />
        </article>
      </section>
      <section
        className={styles.containerFacilityHours}
        id="ContainerFacilityHours"
      >
        <article>
          <h2 className={styles.itemH2}>施設利用可能時間</h2>
          <p className={styles.sidebarH2}>利用時間</p>
          <BlockFacilityHours />
        </article>
      </section>
      <section
        className={styles.containerCourseGuide}
        id="ContainerCourseGuide"
      >
        {/* <article>
          <h2 className={styles.itemH2}>講座のご案内</h2>
          <BlockCourseGuide />
        </article> */}
      </section>
      <section className={styles.containerAccess} id="ContainerAccess">
        <article>
          <h2 className={styles.itemH2}>アクセス</h2>
          <BlockAccess />
        </article>
      </section>
      <section className={styles.containerTearoom} id="ContainerTearoom">
        <article>
          <h2 className={styles.itemH2}>白川公園茶室について</h2>
          <dl>
            <dt>申し込み開始日</dt>
            <dd>前年度の10月より開始</dd>
          </dl>
          <dl>
            <dt>料金のお支払い</dt>
            <dd>
              利用料は前納です。申込の際にお支払いください。
              <br />
              茶道具の一部は、無料で貸し出します。
            </dd>
          </dl>
          <dl>
            <dt>連絡先</dt>
            <dd>
              <div>
                白川公園茶室事務所
                <ExternalLink
                  href="tel:0963545280"
                  aria-label="096-354-5280に電話"
                  className={styles.itemTel}
                >
                  096-354-5280
                </ExternalLink>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>お申し込み/予約変更方法</dt>
            <dd>
              <p>
                ご来館、またはファクスで承ります。以下書類をダウンロードして必要事項をご記入ください。
              </p>
              <nav>
                <ExternalLink
                  href="/data/pdf/白川公園茶室予約申込書202209.pdf"
                  aria-label="予約申込書PDF"
                >
                  予約申込書PDF
                </ExternalLink>
                <ExternalLink
                  href="/data/pdf/shirakawahenkou.pdf"
                  aria-label="予約変更依頼書PDF"
                >
                  予約変更依頼書PDF
                </ExternalLink>
                <ExternalLink
                  href="/data/pdf/obj20250813105335833062.pdf"
                  aria-label="優先予約申込書（100人以上の催事）PDF"
                >
                  優先予約申込書（100人以上の催事）PDF
                </ExternalLink>
              </nav>
            </dd>
          </dl>
        </article>
      </section>
      <section className={styles.containerStore} id="ContainerStore">
        <article>
          <h2 className={styles.itemH2}>喫茶・売店 しらかわのほとり</h2>
          <BlockStore />
        </article>
      </section>
    </>
  );
}
