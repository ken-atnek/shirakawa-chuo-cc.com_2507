/* =======================================
 * 熊本市中央公民館 アクセス
 * URL: src/components/BlockAccess.tsx
 * Created: 2025-07-16
 * Last updated: 2025-07-16
 * ======================================= */
import styles from '@/styles/PageTop.module.scss';
import ExternalLink from '@/components/common/ExternalLink';

const BlockAccess = () => {
  return (
    <div className={styles.boxContents}>
      <div className={styles.wrapMap}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.529579251608!2d130.71280971263778!3d32.80473047354227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3540f4082dac8303%3A0xa1c880f15b3d15a3!2z54aK5pys5biC5Lit5aSu5YWs5rCR6aSo!5e0!3m2!1sja!2sus!4v1752648951955!5m2!1sja!2sus"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className={styles.wrapDetails}>
        <div>
          <address>
            <span>〒860-0843</span>熊本市中央区草葉町5番1号
          </address>
          <div className={styles.itemTel}>
            <ExternalLink
              href="tel:0963530151"
              aria-label="096-353-0151に電話"
              className={styles.itemTel}
            >
              096-353-0151
            </ExternalLink>
            <span>（FAX：096-353-0152）</span>
          </div>
          <p>白川公園バス停から徒歩1分</p>
          <p>水道町バス停から徒歩4分</p>
          <p>熊本市電水道町電停から徒歩5分</p>
          <p>熊本電鉄藤崎宮前駅から徒歩7分</p>
        </div>
        <div>
          <span>♢ 休館日 ♢</span>
          <span>毎週月曜日（月曜が祝日の場合は火曜日以降で最も近い平日）</span>
          <span>年末年始　12月29日〜翌年1月3日</span>
        </div>
        <div>
          <span>※ご来館時の注意</span>
          <p>
            できるだけ公共交通機関でご来館ください。
            <br />
            駐車場（45台）と駐輪場（バイク5台、自転車25台）は有料で、施設の利用者は無料（車2時間、バイク4時間、自転車6時間まで）です。
            <br />
            満車の場合は近隣の駐車場・駐輪場のご利用をお願いします。
          </p>
        </div>
      </div>
    </div>
  );
};
export default BlockAccess;
