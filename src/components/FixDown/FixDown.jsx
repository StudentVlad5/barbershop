import { openModalWindow } from 'hooks/modalWindow';
import { ReactComponent as ArrowTop } from 'images/icons/arrow-up.svg';
import css from './fixDown.module.scss';

const FixDown = () => {
  return (
    <div className={css['fix-down']}>
      <div className={css.container}>
        <a className={css['scroll-to-top']} href="#hero">
          <ArrowTop className={css['arrow-top']} width="20" height="20" />
        </a>

        <button
          className={css.btn + ' ' + css['btn--form-circle']}
          type="button"
          aria-label="Book a service"
          onClick={e => {
            openModalWindow(e),
              setTimeout(()=>{document.querySelector('[aria-label="Day"]').click()},250)
          }}
        >
          Book service
        </button>
      </div>
    </div>
  );
};

export default FixDown;
