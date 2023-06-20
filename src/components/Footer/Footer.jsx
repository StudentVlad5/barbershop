import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addModal } from 'redux/modal/operation';
import { openModalWindow } from 'hooks/modalWindow';
import { ModalDev } from './ModalDev/ModalDev';
import css from './footer.module.scss';

export const Footer = () => {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.dataset.modal === 'developers') {
      dispatch(
        addModal({
          modal: e.currentTarget.dataset.modal,
        }),
      );
      setIsOpenModal(true);
      setTimeout(() => openModalWindow(e, null), 500);
    }
  };

  return (
    <footer className={css.footer}>
      <div className={css.footer__container + ' ' + css.container}>
        <ul className={css.socials + ' ' + css.list}>
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
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Youtube
            </a>
          </li>
        </ul>
        <div className={css.copyright}>
          <p className={css.copyright__text}>
            &#169; 2023 | All Rights Reserved |
          </p>

          <div className={css.developers}>
            <p className={css.developers__text}>Developed by</p>
            <button
              className={css.developers__btn}
              onClick={e => {
                openModal(e);
              }}
              aria-label="Developers"
              data-modal="developers"
            >
              DTeam
            </button>
          </div>
        </div>
      </div>
      {isOpenModal && <ModalDev />}
    </footer>
  );
};
