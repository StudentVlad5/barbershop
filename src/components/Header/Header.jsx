import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { openModalForm } from 'hooks/modalWindow';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import MobileMenu from './MobileMenu/MobileMenu';
import { ModalWindowForForm } from 'components/AuthForms/ModalWindowForForm/ModalWindowForForm';
import { UserNav } from './UserNav/UserNav';
import sprite from 'images/sprite.svg';
import css from './header.module.scss';

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [path, setPath] = useState('');
  const toggleModal = () => setShowMenu(state => !state);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (window.location.pathname !== '/barbershop/') {
      const header = document.getElementById('header');
      header && header.classList.add(css['js-no-transparency']);
      setPath('/barbershop');
    } else {setPath('')}
    const id = window.location.hash;
    if(document.querySelector('.'+ id.slice(1) +'-teg')){document.querySelector('.'+ id.slice(1) +'-teg').click()}
  }, [window.location.pathname]);

  return (
    <>
      <header className={css.header} id="header">
        <div className={css.header__container + ' ' + css.container}>
          <a className={css.link} href="/barbershop" aria-label="logo company">
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
                  href={`${path}#about`}
                  aria-label="About"
                >
                  About
                </a>
              </li>
              <li className={css.navigation__item}>
                <a
                  className={css.navigation__link + ' ' + css.link + " " + "price-teg"}
                  href={`${path}#price`}
                  aria-label="Services and Prices"
                >
                  Services and Prices
                </a>
              </li>
              <li className={css.navigation__item}>
                <a
                  className={css.navigation__link + ' ' + css.link + " " + "team-teg"}
                  href={`${path}#team`}
                  aria-label="Barbers"
                >
                  Barbers
                </a>
              </li>
              <li className={css.navigation__item}>
                <a
                  className={css.navigation__link + ' ' + css.link + " " + "contacts-teg"}
                  href={`${path}#contacts`}
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
                onClick={e => {
                  openModalForm(e), setIsOpenModal(true);
                }}
              >
                log in
              </button>
            ) : (
              <>
                <UserNav />
              </>
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
              {!showMenu ? (
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
        {showMenu && (
          <MobileMenu onClose={toggleModal} setIsOpenModal={setIsOpenModal} />
        )}
      </header>
      {isOpenModal && <ModalWindowForForm />}
    </>
  );
};
