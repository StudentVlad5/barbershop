import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { openModalForm } from 'hooks/modalWindow';
import css from './mobileMenu.module.scss';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import { MobileUserNav } from '../UserNav/UserNav';

const MobileMenu = ({ onClose, setIsOpenModal }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [path, setPath] = useState('');

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
              href={`${path}#about`}
              aria-label="About"
              onClick={() => onClose()}
            >
              About
            </a>
          </li>
          <li className={css['mobile-menu__navigation-item']}>
            <a
              className={css['mobile-menu__navigation-link'] + ' ' + css.link + " " + "price-teg"}
              href={`${path}#price`}
              aria-label="Services and Prices"
              onClick={() => onClose()}
            >
              Services and Prices
            </a>
          </li>
          <li className={css['mobile-menu__navigation-item']}>
            <a
              className={css['mobile-menu__navigation-link'] + ' ' + css.link + " " + "team-teg"}
              href={`${path}#team`}
              aria-label="Barbers"
              onClick={() => onClose()}
            >
              Barbers
            </a>
          </li>
          <li className={css['mobile-menu__navigation-item']}>
            <a
              className={css['mobile-menu__navigation-link'] + ' ' + css.link + " " + "contacts-teg"}
              href={`${path}#contacts`}
              aria-label="Contacts"
              onClick={() => onClose()}
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
      {!isLoggedIn ? (
        <button
          className={css.btn + ' ' + css['btn--mode-light']}
          type="button"
          onClick={e => {
            openModalForm(e), setIsOpenModal(true);
          }}
        >
          log in
        </button>
      ) : (
        <div>
          <MobileUserNav />
        </div>
      )}
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
            href="https://www.youtube.com"
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

MobileMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  setIsOpenModal: PropTypes.any.isRequired,
};
