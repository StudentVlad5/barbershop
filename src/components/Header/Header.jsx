import css from './header.module.scss';

import logo from 'images/icons/logo.svg';
import menu from 'images/icons/menu_40px.svg';
import close from 'images/icons/close_40px.svg';

export const Header = () => {
  window.onscroll = () => changeHeaderBackground();

  function changeHeaderBackground() {
    const header = document.getElementById('header');
    const headerOffsetTrigger = header.offsetTop;
    const pageOffset = window.pageYOffset;

    if (pageOffset > headerOffsetTrigger) {
      header.classList.add('js-no-transparency');
    } else {
      header.classList.remove('js-no-transparency');
    }
  }

  return (
    <>
      {/*=========== HEADER =============*/}
      <header className={css.header} id="header">
        <div className={css.header__container + ' ' + css.container}>
          <a className={css.link} href="./index.html" aria-label="logo company">
            <svg className={css.logo} width="69" height="56">
              <use href={logo}></use>
            </svg>
          </a>
          <nav className={css.navigation}>
            <ul className={css.navigation__list + ' ' + css.list}>
              <li className={css.navigation__item}>
                <a
                  className={css.navigation__link + ' ' + css.link}
                  href="#about"
                  aria-label="About"
                >
                  About
                </a>
              </li>
              <li className={css.navigation__item}>
                <a
                  className={css.navigation__link + ' ' + css.link}
                  href="#price"
                  aria-label="Services and Prices"
                >
                  Services and Prices
                </a>
              </li>
              <li className={css.navigation__item}>
                <a
                  className={css.navigation__link + ' ' + css.link}
                  href="#team"
                  aria-label="Barbers"
                >
                  Barbers
                </a>
              </li>
              <li className={css.navigation__item}>
                <a
                  className={css.navigation__link + ' ' + css.link}
                  href="#contacts"
                  aria-label="Contacts"
                >
                  Contacts
                </a>
              </li>
            </ul>
          </nav>
          <div className={css.header__group}>
            <a
              className={css.header__phone + ' ' + css.link}
              href="tel:+380441111111"
              aria-label="phone"
            >
              +38 044 111 11 11
            </a>
            <button
              className={
                css.btn +
                ' ' +
                css['btn--mode-dark'] +
                ' ' +
                css['js-modal-open']
              }
              type="button"
            >
              book a service
            </button>
          </div>
          <button
            className={css['mobile-btn'] + ' ' + css['js-mobile-menu-button']}
            type="button"
            aria-label="Switch mobile menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
          >
            <svg className={css['mobile-btn__icon']} width="40" height="40">
              <use className={css['mobile-btn__icon-open']} href={menu}></use>
              <use className={css['mobile-btn__icon-close']} href={close}></use>
            </svg>
          </button>
        </div>
        {/*========= MOBILE MENU ===========*/}
        <div
          className={
            css['header__mobile-menu'] +
            ' ' +
            css['mobile-menu'] +
            ' ' +
            css['js-mobile-menu']
          }
          id="mobile-menu"
        >
          <nav className={css['mobile-menu__navigation']}>
            <ul
              className={
                css['mobile-menu__navigation-list'] +
                ' ' +
                css.list +
                ' ' +
                css['js-mobile-menu-links']
              }
            >
              <li className={css['mobile-menu__navigation-item']}>
                <a
                  className={
                    css['mobile-menu__navigation-link'] + ' ' + css.link
                  }
                  href="#about"
                  aria-label="About"
                >
                  About
                </a>
              </li>
              <li className={css['mobile-menu__navigation-item']}>
                <a
                  className={
                    css['mobile-menu__navigation-link'] + ' ' + css.link
                  }
                  href="#price"
                  aria-label="Services and Prices"
                >
                  Services and Prices
                </a>
              </li>
              <li className={css['mobile-menu__navigation-item']}>
                <a
                  className={
                    css['mobile-menu__navigation-link'] + ' ' + css.link
                  }
                  href="#team"
                  aria-label="Barbers"
                >
                  Barbers
                </a>
              </li>
              <li className={css['mobile-menu__navigation-item']}>
                <a
                  className={
                    css['mobile-menu__navigation-link'] + ' ' + css.link
                  }
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
      </header>
    </>
  );
};
