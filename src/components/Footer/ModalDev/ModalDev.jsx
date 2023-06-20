import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { closeModalWindow } from 'hooks/modalWindow';
import { cleanModal } from 'redux/modal/operation';
import { modalComponent } from 'redux/modal/selectors';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import { DevItem } from './DevItem/DevItem';
import sprite from 'images/sprite.svg';
import css from './ModalDev.module.scss';

export const ModalDev = () => {
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const modal = useSelector(modalComponent);

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData('/developers');
        setDevelopers(data);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  //close modal window
  const dispatch = useDispatch();
  const closeModal = e => {
    e.preventDefault();
    dispatch(cleanModal());
    closeModalWindow(e);
  };

  return createPortal(
    Object.values(modal)[0] === 'developers' && (
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
          <h1 className={css.modal__title}>Development team</h1>
          {isLoading ? onLoading() : onLoaded()}
          {error && onFetchError('Whoops, something went wrong')}
          {developers.length > 0 && !error && (
            <ul className={css.dev__list}>
              {developers.map(developer => (
                <DevItem developer={developer} key={developer._id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    ),
    document.querySelector('#popup-root'),
  );
};
