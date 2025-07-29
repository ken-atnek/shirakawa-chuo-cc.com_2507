/* =======================================
 * 熊本市中央公民館 施設利用可能時間
 * URL: src/components/BlockFacilityHours.tsx
 * Created: 2025-07-16
 * Last updated: 2025-07-16
 * ======================================= */
import styles from '@/styles/PageTop.module.scss';

const BlockFacilityHours = () => {
  return (
    <ul>
      <li>
        <h3>施設</h3>
        <h3>曜日</h3>
        <h3>利用時間</h3>
      </li>
      <li className={styles.place01}>
        <h4>中央公民館</h4>
        <div>火曜〜日曜・祝日</div>
        <div>9:00〜22:00</div>
      </li>
      <li className={styles.place02}>
        <h4>図書館</h4>
        <div>火曜〜土曜</div>
        <div>9:30〜20:00</div>
        <div>日曜・祝日</div>
        <div>9:30〜18:00</div>
      </li>
      <li className={styles.place03}>
        <h4>トレーニング室 </h4>
        <div>火曜〜日曜・祝日 </div>
        <div>9:00〜21:00</div>
        <p>2時間300円（60歳以上は100円）、ロッカー50円</p>
      </li>
    </ul>
  );
};
export default BlockFacilityHours;
