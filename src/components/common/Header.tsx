/* =======================================
 * 熊本市中央公民館 HEADER
 * URL: src/components/common/Header.tsx
 * Created: 2025-07-11
 * Last updated: 2025-07-11
 * ======================================= */
'use client';
import styles from '@/styles/components/common/Header.module.scss';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import ExternalLink from '@/components/common/ExternalLink';
import Image from 'next/image';

import Logo from '@/assets/images/logo.webp';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () =>
      document.removeEventListener('click', handleOutsideClick, true);
  }, [isOpen]);

  return (
    <header className={styles.containerHeader}>
      <article>
        <h1>
          <Link href="/" className={styles.linkTop}>
            <Image
              src={Logo}
              alt="熊本市中央公民館のロゴ"
              width={250}
              height={36}
            />
          </Link>
        </h1>
        <nav
          ref={navRef}
          className={`${styles.wrapMobileMenu} ${isOpen ? styles['is-open'] : ''} ${
            !isOpen ? styles.closing : ''
          }`}
        >
          <Link
            href="/#ContainerNews"
            className={styles.itemLink}
            onClick={closeMenu}
          >
            お知らせ
          </Link>
          <Link
            href="/#ContainerFacilityGuide"
            className={styles.itemLink}
            onClick={closeMenu}
          >
            施設のご案内
          </Link>
          <Link
            href="/#ContainerCourseGuide"
            className={styles.itemLink}
            onClick={closeMenu}
          >
            講座のご案内
          </Link>
          <Link
            href="/#BlockInformation"
            className={styles.itemLink}
            onClick={closeMenu}
          >
            利用申込・利用料金
          </Link>
          <Link
            href="/#ContainerAccess"
            className={styles.itemLink}
            onClick={closeMenu}
          >
            アクセス
          </Link>
          <ExternalLink
            href="https://zform.kumanichi.com/td0625g/form/Untitled32/formperma/4qWnLqGcH38dthvgOBJv34Mpt-viegFsAdIs-s-fnPg"
            aria-label="熊本市中央公民館へのお問い合わせ"
            className={styles.itemLink}
            onClick={closeMenu}
          >
            お問い合わせ
          </ExternalLink>
          <div className={styles.mobileMenu}>
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
          </div>
        </nav>
      </article>
      <button
        type="button"
        className={`${styles.hamburgerButton} ${
          isOpen ? styles['is-open'] : ''
        }`}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="メニューを開閉"
        ref={buttonRef}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Header;
