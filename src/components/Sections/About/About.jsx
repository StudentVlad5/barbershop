import { openModalWindow } from 'hooks/modalWindow';
import css from './about.module.scss';

import work1_desk from './../../../images/about/work-1-desk.webp';
import work2_desk from './../../../images/about/work-1-desk@2x.webp';
import work1_tb from './../../../images/about/work-1-tab.webp';
import work2_tb from './../../../images/about/work-1-tab@2x.webp';

import work1_desk_jpg from './../../../images/about/work-1-desk.jpg';
import work2_desk_jpg from './../../../images/about/work-1-desk@2x.jpg';
import work1_tb_jpg from './../../../images/about/work-1-tab.jpg';
import work2_tb_jpg from './../../../images/about/work-1-tab@2x.jpg';

import work12_desk from './../../../images/about/work-2-desk.webp';
import work22_desk from './../../../images/about/work-2-desk@2x.webp';
import work12_tb from './../../../images/about/work-2-tab.webp';
import work22_tb from './../../../images/about/work-2-tab@2x.webp';

import work12_desk_jpg from './../../../images/about/work-2-desk.jpg';
import work22_desk_jpg from './../../../images/about/work-2-desk@2x.jpg';
import work12_tb_jpg from './../../../images/about/work-2-tab.jpg';
import work22_tb_jpg from './../../../images/about/work-2-tab@2x.jpg';

const About = () => {
  return (
    <section className={'about' + ' ' + css.section} id="about">
      <div className={css.about__container + ' ' + css.container}>
        <ul className={css.about__list + ' ' + css.list}>
          <li className={css.about__item}>
            <picture>
              <source
                media="(min-width:1280px )"
                srcSet={`${work1_desk} 1x, ${work2_desk} 2x`}
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet={`${work1_tb} 1x, ${work2_tb} 2x`}
                type="image/webp"
              />
              <img
                className={css.about__image}
                src={work1_desk_jpg}
                alt="Shaving beard"
                srcSet={`${work1_desk_jpg} 270w, ${work2_desk_jpg} 540w, ${work1_tb_jpg} 330w, ${work2_tb_jpg} 660w`}
                sizes="(min-width:1280px) 270px, (min-width:768px) 330px, 100vw"
                width="270"
                height="445"
                loading="lazy"
              />
            </picture>
          </li>
          <li className={css.about__item}>
            <picture>
              <source
                media="(min-width:1280px )"
                srcSet={`${work12_desk} 1x, ${work22_desk} 2x`}
                type="image/webp"
              />
              <source
                media="(min-width:768px )"
                srcSet={`${work12_tb} 1x, ${work22_tb} 2x`}
                type="image/webp"
              />
              <img
                className={css.about__image}
                src={work12_desk_jpg}
                alt="Shaving beard"
                srcSet={`${work12_desk_jpg} 270w, ${work22_desk_jpg} 540w, ${work12_tb_jpg} 330w, ${work22_tb_jpg} 660w`}
                sizes="(min-width:1280px) 270px, (min-width:768px) 330px, 100vw"
                width="270"
                height="445"
                loading="lazy"
              />
            </picture>
          </li>
        </ul>
        <div className={css.about__group}>
          <div className={css['title-group']}>
            <p className={css.uppertitle}>About</p>
            <h2
              className={
                css['section-title'] + ' ' + css['section-title--size-s']
              }
            >
              The Best Barbershop
              <br />
              in Your City
            </h2>
            <p
              className={
                css.subtitle + ' ' + css['subtitle--mode-dark subtitle--size-s']
              }
            >
              If you want to add more confidence to your image, you are
              definitely in the right place.
            </p>
            <p className={css.description}>
              We are a team that never rests on its laurels and yearns for
              change. And once you fall into the hands of our master, you will
              never be the same again. We are a team that is always on the same
              wavelength with clients. Therefore, we are always ready to improve
              everyone who comes to us!
            </p>
          </div>
          <button
            className={css.link + ' ' + css.btn + ' ' + css['btn--mode-light']}
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
      </div>
    </section>
  );
};

export default About;
