import { useState, useEffect } from 'react';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import css from './team.module.scss';
import linkedin from 'images/sprite.svg';
import twitter from 'images/sprite.svg';
import instagram from 'images/sprite.svg';
import facebook from 'images/sprite.svg';

const Team = () => {
  const [barbers, setBarbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData('/owner');
        setBarbers(data);
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
    <section className={css.team + ' ' + css.section} id="team">
      <div className={css.container}>
        <div className={css.team__group + ' ' + css['title-group']}>
          <p className={css.uppertitle}>
            for true connoisseurs of the atmosphere
          </p>
          <h2 className={css['section-title']}>Our Barbers</h2>
        </div>
        {isLoading ? onLoading() : onLoaded()}
        {error && onFetchError('Whoops, something went wrong')}
        {barbers.length > 0 && !error && (
          <ul className={css.team__list + ' ' + css.list}>
            {barbers.map(barber => (
              <li
                className={css.team__item}
                data-aos="zoom-in-up"
                data-aos-delay="300"
                key={barber._id}
              >
                <img
                  className={css.team__image}
                  src={barber.avatar}
                  alt={barber.ownerText}
                  sizes="(min-width:1280px) 370px, (min-width:768px) 450px, (max-width:767px) 418px, 100vw"
                  width="418"
                  height="346"
                  loading="lazy"
                />
                <div className={css.team__wrap}>
                  <h3 className={css.team__title}>{barber.ownerText}</h3>
                  <p className={css.team__description}>{barber.designation}</p>
                  <ul className={css['social-links'] + ' ' + css.list}>
                    <li className={css['social-links__item']}>
                      <a
                        className={css['social-links__link'] + ' ' + css.link}
                        href={barber.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        lang="en"
                        aria-label="Instagram"
                      >
                        <svg
                          className={css['social-links__icon']}
                          width="20"
                          height="20"
                        >
                          <use href={instagram + '#instagram'}></use>
                        </svg>
                      </a>
                    </li>
                    <li className={css['social-links__item']}>
                      <a
                        className={css['social-links__link'] + ' ' + css.link}
                        href={barber.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        lang="en"
                        aria-label="Twitter"
                      >
                        <svg
                          className={css['social-links__icon']}
                          width="20"
                          height="20"
                        >
                          <use href={twitter + '#twitter'}></use>
                        </svg>
                      </a>
                    </li>
                    <li className={css['social-links__item']}>
                      <a
                        className={css['social-links__link'] + ' ' + css.link}
                        href={barber.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        lang="en"
                        aria-label="Facebook"
                      >
                        <svg
                          className={css['social-links__icon']}
                          width="20"
                          height="20"
                        >
                          <use href={facebook + '#facebook'}></use>
                        </svg>
                      </a>
                    </li>
                    <li className={css['social-links__item']}>
                      <a
                        className={css['social-links__link'] + ' ' + css.link}
                        href={barber.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        lang="en"
                        aria-label="Linkedin"
                      >
                        <svg
                          className={css['social-links__icon']}
                          width="20"
                          height="20"
                        >
                          <use href={linkedin + '#linkedin'}></use>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Team;
