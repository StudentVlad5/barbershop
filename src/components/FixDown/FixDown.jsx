import { openModalWindow } from 'hooks/modalWindow';
import sprite from 'images/sprite.svg';
import css from './fixDown.module.scss';

const FixDown = () => {
  window.onscroll = () => changeHeaderBackground();

  function changeHeaderBackground() {
    const fixDown = document.getElementById('fix-down');
    const header = document.getElementById('header');
    const headerOffsetTrigger = header.offsetTop;
    const pageOffset = window.scrollY;

    if (pageOffset > headerOffsetTrigger) {
      fixDown.classList.add(css['js-no-transparency']);
    } else {
      fixDown.classList.remove(css['js-no-transparency']);
    }
  }

  return (
    <div className={css['fix-down']} id="fix-down">
      <div className={css.container}>
        <a className={css['scroll-to-top']} href="#hero">
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
              document.querySelector('[aria-label="Day"]').click();
          }}
        >
          Book service
        </button>
      </div>
    </div>
  );
};

export default FixDown;
