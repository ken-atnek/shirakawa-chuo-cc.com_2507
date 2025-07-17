/* =======================================
 * 熊本市中央公民館 施設のご案内
 * URL: src/components/blockFacilityGuide.tsx
 * Created: 2025-07-16
 * Last updated: 2025-07-16
 * ======================================= */
import styles from '@/styles/PageTop.module.scss';
import ListImage01 from '@/assets/images/BlockFacilityGuide/list01.webp';
import ListImage02 from '@/assets/images/BlockFacilityGuide/list02.webp';
import ListImage03 from '@/assets/images/BlockFacilityGuide/list03.webp';
import ListImage04 from '@/assets/images/BlockFacilityGuide/list04.webp';
import ListImage05 from '@/assets/images/BlockFacilityGuide/list05.webp';
import ListImage06 from '@/assets/images/BlockFacilityGuide/list06.webp';
import ListImage07 from '@/assets/images/BlockFacilityGuide/list07.webp';
import ListImage08 from '@/assets/images/BlockFacilityGuide/list08.webp';
import ListImage09 from '@/assets/images/BlockFacilityGuide/list09.webp';
import ItemImage01 from '@/assets/images/BlockFacilityGuide/item01.webp';
import ItemImage02 from '@/assets/images/BlockFacilityGuide/item02.webp';
import ItemImage03 from '@/assets/images/BlockFacilityGuide/item03.webp';
import ItemImage04 from '@/assets/images/BlockFacilityGuide/item04.webp';
import ItemImage05 from '@/assets/images/BlockFacilityGuide/item05.webp';
import ItemImage06 from '@/assets/images/BlockFacilityGuide/item06.webp';
import ItemImage07 from '@/assets/images/BlockFacilityGuide/item07.webp';
import ItemImage08 from '@/assets/images/BlockFacilityGuide/item08.webp';
import ItemImage09 from '@/assets/images/BlockFacilityGuide/item09.webp';
import Image, { StaticImageData } from 'next/image';
import ExternalLink from '@/components/common/ExternalLink';

type FacilityItem = {
  title: string;
  image: StaticImageData;
  detailImage: StaticImageData;
};

const BlockFacilityGuide = () => {
  const ListData: FacilityItem[] = [
    {
      title: 'ロビー',
      image: ListImage01,
      detailImage: ItemImage01,
    },
    {
      title: '図書室',
      image: ListImage02,
      detailImage: ItemImage02,
    },
    {
      title: '料理実習室',
      image: ListImage03,
      detailImage: ItemImage03,
    },
    {
      title: '軽運動・音楽室・トレーニング室',
      image: ListImage04,
      detailImage: ItemImage04,
    },
    {
      title: '和茶質',
      image: ListImage05,
      detailImage: ItemImage05,
    },
    {
      title: '大会議室',
      image: ListImage06,
      detailImage: ItemImage06,
    },
    {
      title: 'ホール',
      image: ListImage07,
      detailImage: ItemImage07,
    },
    {
      title: '施設案内図',
      image: ListImage08,
      detailImage: ItemImage08,
    },
    {
      title: '駐車場・駐輪場',
      image: ListImage09,
      detailImage: ItemImage09,
    },
  ];

  return (
    <ul className={styles.blockFacilityGuide}>
      {ListData.map((item) => (
        <li key={item.title}>
          <ExternalLink href={item.detailImage.src} aria-label={item.title}>
            <Image src={item.image} alt={item.title} width={358} height={150} />
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
};
export default BlockFacilityGuide;
