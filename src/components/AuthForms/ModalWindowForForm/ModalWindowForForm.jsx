import ReactDOM from 'react-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import { ReactComponent as CloseIcon } from 'images/icons/close_40px.svg';
import { closeModalForm } from 'hooks/modalWindow';
import { useState } from 'react';
import css from './modalWindowForForm.module.scss';

export const ModalWindowForForm = () => {
  const [statusLogin, setStatusLogin] = useState(true);

  function closeModal(e) {
    e.preventDefault();
    closeModalForm(e);
  }

  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={closeModal}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button
          className={css['modal__btn-close']}
          type="button"
          onClick={closeModal}
          aria-label="Close modal"
        >
          <CloseIcon className={css.modal__icon} width="40" height="40" />
        </button>
        {statusLogin ? (
          <LoginForm setStatusLogin={setStatusLogin} />
        ) : (
          <RegisterForm setStatusLogin={setStatusLogin} />
        )}
      </div>
    </div>,
    document.querySelector('#popup-register-root'),
  );
};
