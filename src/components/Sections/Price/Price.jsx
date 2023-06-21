import { useState, useEffect } from 'react';
import { openModalWindow } from 'hooks/modalWindow';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import css from './price.module.scss';

const Price = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData('/services');
        setServices(data);
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

  return (
    <section className={css.price + ' ' + css.section} id="price">
      <div className={css.container}>
        <div className={css.price__group + ' ' + css['title-group']}>
          <p className={css.uppertitle + ' ' + css['uppertitle--mode-light']}>
            Spend time in the company of the best craftsmen
          </p>
          <h2
            className={
              css['section-title'] + ' ' + css['section-title--mode-light']
            }
          >
            Services and Prices
          </h2>
        </div>
        {isLoading ? onLoading() : onLoaded()}
        {error && onFetchError('Whoops, something went wrong')}
        {services.length > 0 && !error && (
          <ul className={css.price__list + ' ' + css.list}>
            <li className={css.price__item}>
              <ul className={css['price__inner-list'] + ' ' + css.list}>
                {services.map(
                  (service, idx) =>
                    idx <= Math.floor(services.length / 2) && (
                      <li
                        className={css['price__inner-item']}
                        key={service._id}
                      >
                        <span>{service.subject}</span>
                        <span>from {service.price} UAH</span>
                      </li>
                    ),
                )}
              </ul>
            </li>
            <li className={css.price__item}>
              <ul className={css['price__inner-list'] + ' ' + css.list}>
                {services.map(
                  (service, idx) =>
                    idx > Math.floor(services.length / 2) && (
                      <li
                        className={css['price__inner-item']}
                        key={service._id}
                      >
                        <span>{service.subject}</span>
                        <span>from {service.price} UAH</span>
                      </li>
                    ),
                )}
              </ul>
            </li>
          </ul>
        )}
        <button
          className={css.link + ' ' + css.btn + ' ' + css['btn--mode-dark']}
          type="button"
          aria-label="Book a service"
          onClick={e => {
            openModalWindow(e),
              setTimeout(() => {
                if (document.querySelector('[aria-label="Day"]')) {
                  document.querySelector('[aria-label="Day"]').click();
                }
              }, 250);
          }}
        >
          Book a service
        </button>
      </div>
    </section>
  );
};

export default Price;
