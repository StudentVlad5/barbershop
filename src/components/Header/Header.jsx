import { useState } from 'react';
import css from './header.module.scss';
import MobileMenu from './MobileMenu/MobileMenu';
import { openModalForm } from 'hooks/modalWindow';

import { ReactComponent as Logo } from 'images/icons/logo.svg';
import { ReactComponent as Menu } from 'images/icons/menu_40px.svg';
import { ReactComponent as Close } from 'images/icons/close_40px.svg';

export const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(state => !state);

  window.onscroll = () => changeHeaderBackground();

  function changeHeaderBackground() {
    const header = document.getElementById('header');
    const headerOffsetTrigger = header.offsetTop;
    const pageOffset = window.scrollY;

    if (pageOffset > headerOffsetTrigger) {
      header.classList.add(css['js-no-transparency']);
    } else {
      header.classList.remove(css['js-no-transparency']);
    }
  }

  return (
    <>
      <header className={css.header} id="header">
        <div className={css.header__container + ' ' + css.container}>
          <a className={css.link} href="./index.html" aria-label="logo company">
            <svg className={css.logo} width="69" height="56">
              <Logo
                className={css.logo}
                style={{ width: '69', height: '56' }}
              />
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
              className={css.btn + ' ' + css['btn--mode-dark']}
              type="button"
              onClick={e => openModalForm(e)}
            >
              log in
            </button>
          </div>
          <button
            className={css['mobile-btn']}
            type="button"
            aria-label="Switch mobile menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
            onClick={toggleModal}
          >
            <svg className={css['mobile-btn__icon']} width="40" height="40">
              {!showModal ? (
                <Menu className={css['mobile-btn__icon-open']} />
              ) : (
                <Close className={css['mobile-btn__icon-close']} />
              )}
            </svg>
          </button>
        </div>
        {showModal && <MobileMenu onClose={toggleModal} />}
      </header>
    </>
  );
};
