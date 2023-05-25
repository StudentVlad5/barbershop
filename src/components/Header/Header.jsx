import css from './header.module.scss';
import { changeHeaderBackground } from 'utils/js/header-scroll';
import  MobileMenu  from './MobileMenu/MobileMenu';
import { openModalWindow } from 'hooks/modalWindow';


import { ReactComponent as Logo } from '../../images/icons/logo.svg';
import { ReactComponent as Menu } from '../../images/icons/menu_40px.svg';
import { ReactComponent as Close } from '../../images/icons/close_40px.svg';


export const Header = () => {
  window.onscroll = () => changeHeaderBackground();

  // mobile_menu();
  return (
    <>
      {/*=========== HEADER =============*/}
      <header className={css.header} id="header">
        <div className={css.header__container + ' ' + css.container}>
          <a className={css.link} href="./index.html" aria-label="logo company">
            <svg className={css.logo} width="69" height="56">
              <Logo className={css.logo} style={{width:"69",height:"56"}}/>
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
            onClick={(e)=>openModalWindow(e)}
          >
            <svg width="69" height="56">
              <Menu className={css['mobile-btn__icon']} style={{width:"40",height:"40"}}/>
              <Close className={css['mobile-btn__icon-close']} style={{width:"40",height:"40"}}/>
            </svg>
          </button>
        </div>
        <MobileMenu/>
      </header>
    </>
  );
};
