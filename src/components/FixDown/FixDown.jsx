import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModalWindow } from 'hooks/modalWindow';
import { addModal } from 'redux/modal/operation';
import sprite from 'images/sprite.svg';
import css from './fixDown.module.scss';
import Schedule from 'components/Schedule/Schedule';

const FixDown = () => {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  window.onscroll = () => changeHeaderBackground();

  function changeHeaderBackground() {
    const scroll = document.getElementById('scroll');
    const header = document.getElementById('header');
    const headerOffsetTrigger = header.offsetTop;
    const pageOffset = window.scrollY;

    if (pageOffset > headerOffsetTrigger) {
      scroll && scroll.classList.remove(css['is-hide']);
      header.classList.add(css['js-no-transparency']);
    } else {
      scroll && scroll.classList.add(css['is-hide']);
      header.classList.remove(css['js-no-transparency']);
    }
  }

  return (
    <>
      <div className={css['fix-down']}>
        <div className={css.container}>
          <a className={css['scroll-to-top']} href="#hero" id="scroll">
            <svg className={css['arrow-top']}>
              <use href={sprite + '#circle-up'}></use>
            </svg>
          </a>

          <button
            className={css.btn + ' ' + css['btn--form-circle']}
            type="button"
            aria-label="Book a service"
            data-modal="book"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              if (e.currentTarget.dataset.modal === 'book') {
                dispatch(
                  addModal({
                    modal: e.currentTarget.dataset.modal,
                  }),
                );
                setIsOpenModal(true);
                setTimeout(() => openModalWindow(e, null), 500);
              }
              setTimeout(() => {
                if (document.querySelector('[aria-label="Day"]')) {
                  document.querySelector('[aria-label="Day"]').click();
                }
              }, 250);
            }}
          >
            Book service
          </button>
        </div>
      </div>
      {isOpenModal && <Schedule />}
    </>
  );
};

export default FixDown;
