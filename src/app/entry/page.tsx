/* =======================================
 * 熊本市中央公民館 応募フォームページ
 * URL: src/app/entry/page.tsx
 * Created: 2026-03-26
 * ======================================= */

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/PageEntry.module.scss';

type FormState = {
  courseTitle: string;
  courseName: string;
  nameSei: string;
  nameMei: string;
  furiganaSei: string;
  furiganaMei: string;
  age: string;
  grade: string;
  gender: string;
  postNumber: string;
  city: string;
  streetAddress: string;
  buildingName: string;
  schoolDistrict: string;
  phone: string;
  email: string;
  course: string;
  notes: string;
};

const initialForm: FormState = {
  courseTitle: '1',
  courseName: '',
  nameSei: '',
  nameMei: '',
  furiganaSei: '',
  furiganaMei: '',
  grade: '',
  age: '',
  gender: '',
  postNumber: '',
  city: '',
  streetAddress: '',
  buildingName: '',
  schoolDistrict: '',
  phone: '',
  email: '',
  course: '',
  notes: '',
};

const CONTACT_URL = 'https://shirakawa-chuo-cc.com/backend/contact.php';

type Step = 'input' | 'confirm' | 'done';

const gradeOptions = [
  { value: 'elementary-1', label: '小学１年生' },
  { value: 'elementary-2', label: '小学２年生' },
  { value: 'elementary-3', label: '小学３年生' },
  { value: 'elementary-4', label: '小学４年生' },
  { value: 'elementary-5', label: '小学５年生' },
  { value: 'elementary-6', label: '小学６年生' },
  { value: 'junior-1', label: '中学１年生' },
  { value: 'junior-2', label: '中学２年生' },
  { value: 'junior-3', label: '中学３年生' },
  { value: 'none', label: '該当なし' },
];

const GENDER_LABELS: Record<string, string> = {
  male: '男性',
  female: '女性',
};

const COURSE_TITLE_LABELS: Record<string, string> = {
  '1': 'カルチャー講座',
  '2': '総合講座',
};

function getDisplayValue(key: keyof FormState, value: string): string {
  if (key === 'gender') return GENDER_LABELS[value] ?? value;
  if (key === 'courseTitle') return COURSE_TITLE_LABELS[value] ?? value;
  if (key === 'grade')
    return gradeOptions.find((o) => o.value === value)?.label ?? value;
  return value;
}

const LABELS: Record<keyof FormState, string> = {
  courseTitle: '講座タイトル',
  courseName: '講座名',
  nameSei: 'お名前（姓）',
  nameMei: 'お名前（名）',
  furiganaSei: 'ふりがな（姓）',
  furiganaMei: 'ふりがな（名）',
  age: '年齢',
  grade: '学年',
  gender: '性別',
  postNumber: '郵便番号',
  city: '市区町村',
  streetAddress: '番地',
  buildingName: '建物名・部屋番号',
  schoolDistrict: '校区',
  phone: '電話番号',
  email: 'メールアドレス',
  course: '受講希望講座',
  notes: '備考',
};

export default function EntryPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [step, setStep] = useState<Step>('input');
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formError, setFormError] = useState('');
  const [errorFields, setErrorFields] = useState<Set<keyof FormState>>(
    new Set()
  );

  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState('');

  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const gradeSelectRef = useRef<HTMLDivElement | null>(null);
  const selectedGradeLabel =
    gradeOptions.find((option) => option.value === form.grade)?.label ??
    '選択してください';

  const fetchAddressByPostNumber = async (postNumber: string) => {
    const zip = postNumber.replace(/[^0-9]/g, '');

    if (zip.length !== 7) {
      setAddressError('郵便番号は7桁で入力してください。');
      return;
    }

    setIsAddressLoading(true);
    setAddressError('');

    try {
      const res = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`
      );
      const data = await res.json();

      if (!data.results || !data.results[0]) {
        setAddressError('該当する住所が見つかりませんでした。');
        return;
      }

      const result = data.results[0];

      setForm((prev) => ({
        ...prev,
        city: `${result.address1}${result.address2}`,
        streetAddress: result.address3 ?? '',
      }));
    } catch {
      setAddressError(
        '住所検索に失敗しました。時間をおいて再度お試しください。'
      );
    } finally {
      setIsAddressLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        gradeSelectRef.current &&
        !gradeSelectRef.current.contains(event.target as Node)
      ) {
        setIsGradeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'grade') setIsGradeOpen(false);

    setErrorFields((prev) => {
      if (!prev.has(name as keyof FormState)) return prev;
      const next = new Set(prev);
      next.delete(name as keyof FormState);
      return next;
    });
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const required: { key: keyof FormState; label: string }[] = [
      { key: 'courseName', label: '受講希望講座' },
      { key: 'nameSei', label: 'お名前（姓）' },
      { key: 'nameMei', label: 'お名前（名）' },
      { key: 'furiganaSei', label: 'ふりがな（姓）' },
      { key: 'furiganaMei', label: 'ふりがな（名）' },
      { key: 'age', label: '年齢' },
      { key: 'gender', label: '性別' },
      { key: 'postNumber', label: '郵便番号' },
      { key: 'city', label: '市区町村' },
      { key: 'streetAddress', label: '番地' },
      { key: 'phone', label: '電話番号' },
      { key: 'email', label: 'メールアドレス' },
    ];

    const missing = required.filter(({ key }) => form[key] === '');
    if (missing.length > 0) {
      setFormError(
        `未入力の必須項目があります：${missing.map((m) => m.label).join('、')}`
      );
      setErrorFields(new Set(missing.map((m) => m.key)));
      return;
    }

    setErrorFields(new Set());
    setStep('confirm');
  };

  const handleSubmit = async () => {
    setSending(true);
    setErrorMsg('');

    const body = new FormData();
    Object.entries(form).forEach(([key, val]) => body.append(key, val));

    try {
      const res = await fetch(CONTACT_URL, { method: 'POST', body });
      const json = await res.json();
      if (json.success) {
        setStep('done');
      } else {
        setErrorMsg(
          json.error ?? '送信に失敗しました。もう一度お試しください。'
        );
      }
    } catch {
      setErrorMsg(
        '通信エラーが発生しました。しばらく経ってから再度お試しください。'
      );
    } finally {
      setSending(false);
    }
  };

  // 送信完了
  if (step === 'done') {
    return (
      <section className={styles.containerForm}>
        <article>
          <h2 className={styles.itemH2}>
            中央公民館<span>講座申し込みフォーム</span>
          </h2>
          <div className={styles.thanks}>
            <h3>送信完了</h3>
            <p>
              講座申し込みありがとうございます。
              <br />
              ※本フォームは申し込みで、予約確定ではありませんのでご注意ください
            </p>
            <Link href="/" className={styles.btnBack}>
              <span>TOPページへ戻る</span>
            </Link>
          </div>
        </article>
      </section>
    );
  }

  // 確認画面
  if (step === 'confirm') {
    return (
      <section className={styles.containerForm}>
        <article>
          <h2 className={styles.itemH2}>
            中央公民館<span>講座申し込みフォーム</span>
          </h2>
          <p className={styles.lead}>
            以下の内容でよろしければ「送信する」を押してください。
          </p>

          <dl className={styles.confirmList}>
            {(Object.keys(form) as (keyof FormState)[]).map(
              (key) =>
                form[key] !== '' && (
                  <div className={styles.confirmRow} key={key}>
                    <dt>{LABELS[key]}</dt>
                    <dd>{getDisplayValue(key, form[key])}</dd>
                  </div>
                )
            )}
          </dl>

          {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

          <div className={styles.btnWrap}>
            <button className={styles.btnBack} onClick={() => setStep('input')}>
              <span>修正</span>
            </button>
            <button
              className={styles.btnSubmit}
              onClick={handleSubmit}
              disabled={sending}
            >
              <span>{sending ? '送信中...' : '送信する'}</span>
            </button>
          </div>
        </article>
      </section>
    );
  }

  // 入力フォーム
  return (
    <section className={styles.containerForm}>
      <article>
        <h2 className={styles.itemH2}>
          中央公民館<span>講座申し込みフォーム</span>
        </h2>
        <p className={styles.lead}>
          講座申し込みありがとうございます。
          <br />
          下記項目をご入力後、送信をお願いします。
          <br />
          ※本フォームは申し込みで、
          <br className="sp" />
          予約確定ではありませんのでご注意ください
        </p>
        <form onSubmit={handleConfirm} noValidate autoComplete="on">
          <dl>
            <div className={styles.boxCourseTitle}>
              <dt>講座タイトル</dt>
              <dd>
                <div>
                  <input
                    type="radio"
                    id="courseTitle_01"
                    name="courseTitle"
                    value="1"
                    checked
                    readOnly
                  />
                  <label htmlFor="courseTitle_01">カルチャー講座</label>
                </div>
              </dd>
            </div>
            <div>
              <dt className={styles.required}>受講希望講座</dt>
              <dd>
                <input
                  id="courseName"
                  type="text"
                  name="courseName"
                  value={form.courseName}
                  onChange={handleChange}
                  placeholder="講座名をご記入ください"
                  required
                  className={
                    errorFields.has('courseName')
                      ? styles.inputError
                      : undefined
                  }
                />
              </dd>
            </div>
            <div className={styles.boxName}>
              <dt className={styles.required}>お名前</dt>
              <dd>
                <input
                  id="nameSei"
                  type="text"
                  name="nameSei"
                  value={form.nameSei}
                  onChange={handleChange}
                  placeholder="熊本"
                  required
                  autoComplete="family-name"
                  className={
                    errorFields.has('nameSei') ? styles.inputError : undefined
                  }
                />
                <input
                  id="nameMei"
                  type="text"
                  name="nameMei"
                  value={form.nameMei}
                  onChange={handleChange}
                  placeholder="太郎"
                  required
                  autoComplete="given-name"
                  className={
                    errorFields.has('nameMei') ? styles.inputError : undefined
                  }
                />
              </dd>
            </div>
            <div className={styles.boxName}>
              <dt className={styles.required}>ふりがな</dt>
              <dd>
                <input
                  id="furiganaSei"
                  type="text"
                  name="furiganaSei"
                  value={form.furiganaSei}
                  onChange={handleChange}
                  placeholder="くまもと"
                  required
                  autoComplete="off"
                  className={
                    errorFields.has('furiganaSei')
                      ? styles.inputError
                      : undefined
                  }
                />
                <input
                  id="furiganaMei"
                  type="text"
                  name="furiganaMei"
                  value={form.furiganaMei}
                  onChange={handleChange}
                  placeholder="太郎"
                  required
                  autoComplete="off"
                  className={
                    errorFields.has('furiganaMei')
                      ? styles.inputError
                      : undefined
                  }
                />
              </dd>
            </div>
            <div className={styles.boxAge}>
              <dt className={styles.required}>年齢</dt>
              <dd>
                <input
                  id="age"
                  type="text"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  required
                  className={
                    errorFields.has('age') ? styles.inputError : undefined
                  }
                />
              </dd>
            </div>
            <div className={styles.boxGrade}>
              <dt>学年</dt>
              <dd>
                <div
                  ref={gradeSelectRef}
                  className={`${styles.selectGrade} ${isGradeOpen ? styles.isOpen : ''} ${
                    form.grade ? styles.isSelected : styles.isEmpty
                  }`}
                  data-selectbox
                >
                  <button
                    type="button"
                    className={styles.selectboxHead}
                    aria-expanded={isGradeOpen}
                    onClick={() => setIsGradeOpen((prev) => !prev)}
                  >
                    <span className={styles.selectboxValue}>
                      {selectedGradeLabel}
                    </span>
                  </button>
                  <div className={styles.listWrapper}>
                    <ul className={styles.selectboxPanel}>
                      {gradeOptions.map((option) => (
                        <li key={option.value}>
                          <input
                            type="radio"
                            id={`grade-${option.value}`}
                            name="grade"
                            value={option.value}
                            checked={form.grade === option.value}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor={`grade-${option.value}`}
                            onClick={() => setIsGradeOpen(false)}
                          >
                            {option.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </dd>
            </div>
            <div className={styles.boxGender}>
              <dt className={styles.required}>性別</dt>
              <dd
                className={
                  errorFields.has('gender') ? styles.errorGroup : undefined
                }
              >
                <div>
                  <input
                    type="radio"
                    id="gender_01"
                    name="gender"
                    value="male"
                    checked={form.gender === 'male'}
                    onChange={handleChange}
                  />
                  <label htmlFor="gender_01">男性</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gender_02"
                    name="gender"
                    value="female"
                    checked={form.gender === 'female'}
                    onChange={handleChange}
                  />
                  <label htmlFor="gender_02">女性</label>
                </div>
              </dd>
            </div>
            <div className={styles.boxAddress}>
              <dt className={styles.required}>住所</dt>
              <dd>
                <div>
                  <input
                    id="postNumber"
                    type="text"
                    name="postNumber"
                    value={form.postNumber}
                    onChange={handleChange}
                    placeholder="ハイフンなし"
                    required
                    autoComplete="postal-code"
                    className={`${styles.postNumber}${errorFields.has('postNumber') ? ` ${styles.inputError}` : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => fetchAddressByPostNumber(form.postNumber)}
                    disabled={isAddressLoading}
                  >
                    {isAddressLoading ? '検索中...' : '住所を自動入力'}
                  </button>
                </div>
                {addressError && (
                  <p className={styles.errorMsg}>{addressError}</p>
                )}
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="市区町村"
                  required
                  autoComplete="address-level2"
                  className={
                    errorFields.has('city') ? styles.inputError : undefined
                  }
                />
                <input
                  id="streetAddress"
                  type="text"
                  name="streetAddress"
                  value={form.streetAddress}
                  onChange={handleChange}
                  placeholder="番地"
                  autoComplete="street-address"
                  className={
                    errorFields.has('streetAddress')
                      ? styles.inputError
                      : undefined
                  }
                />
                <input
                  id="buildingName"
                  type="text"
                  name="buildingName"
                  value={form.buildingName}
                  onChange={handleChange}
                  placeholder="建物名・部屋番号"
                  autoComplete="address-line2"
                />
              </dd>
            </div>
            <div className={styles.boxSchoolDistrict}>
              <dt>校区</dt>
              <dd>
                <input
                  id="schoolDistrict"
                  type="text"
                  name="schoolDistrict"
                  value={form.schoolDistrict}
                  onChange={handleChange}
                  placeholder="※お住まいの小学校区をご記入ください。"
                  required
                />
              </dd>
            </div>
            <div className={styles.boxPhone}>
              <dt className={styles.required}>電話番号</dt>
              <dd>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="ご連絡が取れる電話番号をご記入ください"
                  required
                  autoComplete="tel"
                  className={
                    errorFields.has('phone') ? styles.inputError : undefined
                  }
                />
              </dd>
            </div>

            <div>
              <dt className={styles.required}>メールアドレス</dt>

              <dd>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  autoComplete="email"
                  className={
                    errorFields.has('email') ? styles.inputError : undefined
                  }
                />
              </dd>
            </div>

            <div>
              <dt>備考</dt>

              <dd>
                <textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="ご質問・ご要望などがあればご記入ください"
                  rows={5}
                />
              </dd>
            </div>
          </dl>

          {formError && <p className={styles.errorMsg}>{formError}</p>}
          <div className={styles.btnWrap}>
            <button type="submit" className={styles.btnCheck}>
              <span>確認</span>
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}
