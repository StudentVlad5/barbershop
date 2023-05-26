import { useEffect } from 'react';
import css from './mobileMenu.module.scss';

const MobileMenu = onClose => {
  useEffect(() => {
    // closes modal with a click on the root
    const handleBackdropClick = () => {
      onClose();
    };
    document
      .querySelector('#root')
      .addEventListener('click', handleBackdropClick);

    // closes modal with a click on the Escape
    const handleKeyDown = e => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // removes all event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document
        .querySelector('#root')
        .removeEventListener('click', handleBackdropClick);
    };
  }, [onClose]);

  return (
    <div
      className={css['header__mobile-menu']}
      id="mobile-menu"
      onClick={() => onClose()}
    >
      <nav className={css['mobile-menu__navigation']}>
        <ul className={css['mobile-menu__navigation-list'] + ' ' + css.list}>
          <li className={css['mobile-menu__navigation-item']}>
            <a
              className={css['mobile-menu__navigation-link'] + ' ' + css.link}
              href="#about"
              aria-label="About"
            >
              About
            </a>
          </li>
          <li className={css['mobile-menu__navigation-item']}>
            <a
              className={css['mobile-menu__navigation-link'] + ' ' + css.link}
              href="#price"
              aria-label="Services and Prices"
            >
              Services and Prices
            </a>
          </li>
          <li className={css['mobile-menu__navigation-item']}>
            <a
              className={css['mobile-menu__navigation-link'] + ' ' + css.link}
              href="#team"
              aria-label="Barbers"
            >
              Barbers
            </a>
          </li>
          <li className={css['mobile-menu__navigation-item']}>
            <a
              className={css['mobile-menu__navigation-link'] + ' ' + css.link}
              href="#contacts"
              aria-label="Contacts"
            >
              Contacts
            </a>
          </li>
        </ul>
      </nav>
      <a
        className={css.contacts__phone + ' ' + css.link}
        href="tel:+380441111111"
      >
        +38 044 111 11 11
      </a>
      <button
        className={
          css.btn +
          ' ' +
          css['btn--mode-light'] +
          ' ' +
          css['js-mobile-modal-open']
        }
        type="button"
      >
        book a service
      </button>
      <ul
        className={
          css['mobile-menu__socials'] + ' ' + css.socials + ' ' + css.list
        }
      >
        <li className={css.socials__item}>
          <a
            className={css.socials__link + ' ' + css.link}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Instagram
          </a>
        </li>
        <li className={css.socials__item}>
          <a
            className={css.socials__link + ' ' + css.link}
            href="htts://www.youtube.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Youtube
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
