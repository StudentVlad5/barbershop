import { createPortal } from 'react-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import sprite from 'images/sprite.svg';
import { closeModalForm } from 'hooks/modalWindow';
import { useState } from 'react';
import css from './modalWindowForForm.module.scss';

export const ModalWindowForForm = () => {
  const [statusLogin, setStatusLogin] = useState(true);

  function closeModal(e) {
    e.preventDefault();
    closeModalForm(e);
  }

  return createPortal(
    <div className={css.backdrop} onClick={closeModal}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button
          className={css['modal__btn-close']}
          type="button"
          onClick={closeModal}
          aria-label="Close modal"
        >
          <svg className={css.modal__icon} width="40" height="40">
            <use href={sprite + '#close_40px'}></use>
          </svg>
        </button>
        {statusLogin ? (
          <LoginForm setStatusLogin={setStatusLogin} />
        ) : (
          <RegisterForm setStatusLogin={setStatusLogin} />
        )}
      </div>
    </div>,
    document.querySelector('#popup-register-root')
)};
