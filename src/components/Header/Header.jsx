import { useState } from 'react';
import { useSelector } from 'react-redux';
import { openModalForm } from 'hooks/modalWindow';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import MobileMenu from './MobileMenu/MobileMenu';
import { UserNav } from './UserNav/UserNav';
import sprite from 'images/sprite.svg';
import css from './header.module.scss';

export const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(state => !state);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const header = document.getElementById('header');
  const admin = document.getElementById('admin');
  if (admin.isConnected) {
    header.classList.add(css['js-no-transparency']);
  }

  return (
    <>
      <header className={css.header} id="header">
        <div className={css.header__container + ' ' + css.container}>
          <a className={css.link} href="./index.html" aria-label="logo company">
            <svg className={css.logo} width="69" height="56">
              <svg className={css.logo} width="69" height="56">
                <use href={sprite + '#logo'}></use>
              </svg>
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
            {!isLoggedIn ? (
              <button
                className={css.btn + ' ' + css['btn--mode-dark']}
                type="button"
                onClick={e => openModalForm(e)}
              >
                log in
              </button>
            ) : (
              <UserNav />
            )}
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
                <svg className={css['mobile-btn__icon-open']}>
                  <use href={sprite + '#menu_40px'}></use>
                </svg>
              ) : (
                <svg className={css['mobile-btn__icon-close']}>
                  <use href={sprite + '#close_40px'}></use>
                </svg>
              )}
            </svg>
          </button>
        </div>
        {showModal && <MobileMenu onClose={toggleModal} />}
      </header>
    </>
  );
};
