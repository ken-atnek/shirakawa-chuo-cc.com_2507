/* =======================================
 * 熊本市中央公民館 HEADER
 * URL: src/components/common/Header.tsx
 * Created: 2025-07-11
 * Last updated: 2025-07-11
 * ======================================= */
'use client';
import { navMenu } from '@/data/navMenuData';
import styles from '@/styles/components/common/Header.module.scss';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ExternalLink from '@/components/common/ExternalLink';
import Image from 'next/image';
import BanLine from '@/assets/images/ban_line.webp';
import BanInsta from '@/assets/images/ban_insta.webp';
import Logo from '@/assets/images/logo/logo-header.webp';
const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const [hoverStyle, setHoverStyle] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const [activeStyle, setActiveStyle] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);

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
        !navRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () =>
      document.removeEventListener('click', handleOutsideClick, true);
  }, [isOpen]);

  const handleHover = (index: number) => {
    const link = linkRefs.current[index];
    if (link && containerRef.current) {
      const linkRect = link.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setHoverStyle({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
      });
    }
  };

  const handleLeave = () => {
    setHoverStyle(null);
  };

  // Set activeStyle on load and pathname change
  useEffect(() => {
    const activeIndex = navMenu.findIndex((link) => link.href === pathname);
    if (activeIndex !== -1) {
      const link = linkRefs.current[activeIndex];
      if (link && containerRef.current) {
        const linkRect = link.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setActiveStyle({
          left: linkRect.left - containerRect.left,
          width: linkRect.width,
        });
      }
    }
  }, [pathname]);

  return (
    <header className={styles.containerHeader}>
      <article>
        <h1>
          <Link href="/" className={styles.linkTop}>
            <Image
              src={Logo}
              alt="熊本市中央公民館のロゴ"
              width={100}
              height={100}
            />
          </Link>
        </h1>
        <div
          className={`${styles.wrapMobileMenu} ${isOpen ? styles['is-open'] : ''} ${
            !isOpen ? styles.closing : ''
          }`}
        >
          <nav>
            <div className={styles.linkContainer} ref={containerRef}>
              {navMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={styles.itemLink}
                  ref={(el) => {
                    if (el) linkRefs.current[index] = el;
                  }}
                  onClick={closeMenu}
                  onMouseEnter={() => handleHover(index)}
                  onMouseLeave={handleLeave}
                >
                  {item.label}
                </Link>
              ))}
              <span
                className={styles.hoverBar}
                style={{
                  left: (hoverStyle?.left ?? activeStyle?.left) + 'px',
                  width: (hoverStyle?.width ?? activeStyle?.width) + 'px',
                  opacity: hoverStyle || activeStyle ? 1 : 0,
                }}
              />
            </div>
          </nav>
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
            <li className={styles.wrapTel}>
              <ExternalLink
                href="tel:09020837643"
                aria-label="090-2083-7643に電話"
                className={styles.itemTel}
              ></ExternalLink>
            </li>
          </ul>
        </div>
      </article>
      <button
        type="button"
        className={`${styles.hamburgerButton} ${
          isOpen ? styles['is-open'] : ''
        }`}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="メニューを開閉"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Header;
