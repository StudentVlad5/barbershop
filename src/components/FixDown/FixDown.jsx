import { openModalWindow } from 'hooks/modalWindow';
import sprite from 'images/sprite.svg';
import css from './fixDown.module.scss';

const FixDown = () => {
  window.onscroll = () => changeHeaderBackground();

  function changeHeaderBackground() {
    const scroll = document.getElementById('scroll');
    const header = document.getElementById('header');
    const headerOffsetTrigger = header.offsetTop;
    const pageOffset = window.scrollY;

    if (pageOffset > headerOffsetTrigger) {
      scroll.classList.remove(css['is-hide']);
      header.classList.add(css['js-no-transparency']);
    } else {
      scroll.classList.add(css['is-hide']);
      header.classList.remove(css['js-no-transparency']);
    }
  }

  return (
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
          onClick={e => {
            openModalWindow(e),
              setTimeout(() => {
                document.querySelector('[aria-label="Day"]').click();
              }, 250);
          }}
        >
          Book service
        </button>
      </div>
    </div>
  );
};

export default FixDown;
