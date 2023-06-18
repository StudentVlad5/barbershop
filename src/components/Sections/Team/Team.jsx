import css from './team.module.scss';

import member1_desk from 'images/team/member-1-desk.webp';
import member12_desk from 'images/team/member-1-desk@2x.webp';
import member1_tb from 'images/team/member-1-tab.webp';
import member12_tb from 'images/team/member-1-tab@2x.webp';
import member1_mob from 'images/team/member-1-mob.webp';
import member12_mob from 'images/team/member-1-mob@2x.webp';

import member1_desk_jpg from 'images/team/member-1-desk.jpg';
import member12_desk_jpg from 'images/team/member-1-desk@2x.jpg';
import member1_tb_jpg from 'images/team/member-1-tab.jpg';
import member12_tb_jpg from 'images/team/member-1-tab@2x.jpg';
import member1_mob_jpg from 'images/team/member-1-mob.jpg';
import member12_mob_jpg from 'images/team/member-1-mob@2x.jpg';

import member2_desk from 'images/team/member-2-desk.webp';
import member22_desk from 'images/team/member-2-desk@2x.webp';
import member2_tb from 'images/team/member-2-tab.webp';
import member22_tb from 'images/team/member-2-tab@2x.webp';
import member2_mob from 'images/team/member-2-mob.webp';
import member22_mob from 'images/team/member-2-mob@2x.webp';

import member2_desk_jpg from 'images/team/member-2-desk.jpg';
import member22_desk_jpg from 'images/team/member-2-desk@2x.jpg';
import member2_tb_jpg from 'images/team/member-2-tab.jpg';
import member22_tb_jpg from 'images/team/member-2-tab@2x.jpg';
import member2_mob_jpg from 'images/team/member-2-mob.jpg';
import member22_mob_jpg from 'images/team/member-2-mob@2x.jpg';

import member3_desk from 'images/team/member-3-desk.webp';
import member32_desk from 'images/team/member-3-desk@2x.webp';
import member3_tb from 'images/team/member-3-tab.webp';
import member32_tb from 'images/team/member-3-tab@2x.webp';
import member3_mob from 'images/team/member-3-mob.webp';
import member32_mob from 'images/team/member-3-mob@2x.webp';

import member3_desk_jpg from 'images/team/member-3-desk.jpg';
import member32_desk_jpg from 'images/team/member-3-desk@2x.jpg';
import member3_tb_jpg from 'images/team/member-3-tab.jpg';
import member32_tb_jpg from 'images/team/member-3-tab@2x.jpg';
import member3_mob_jpg from 'images/team/member-3-mob.jpg';
import member32_mob_jpg from 'images/team/member-3-mob@2x.jpg';

import linkedin from 'images/sprite.svg';
import twitter from 'images/sprite.svg';
import instagram from 'images/sprite.svg';
import facebook from 'images/sprite.svg';

const Team = () => {
  return (
    <section className={css.team + ' ' + css.section} id="team">
      <div className={css.container}>
        <div className={css.team__group + ' ' + css['title-group']}>
          <p className={css.uppertitle}>
            for true connoisseurs of the atmosphere
          </p>
          <h2 className={css['section-title']}>Our Barbers</h2>
        </div>
        <ul className={css.team__list + ' ' + css.list}>
          <li
            className={css.team__item}
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet={`${member1_desk} 1x, ${member12_desk} 2x`}
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet={`${member1_tb} 1x, ${member12_tb} 2x`}
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet={`${member1_mob} 1x, ${member12_mob} 2x`}
                type="image/webp"
              />
              <img
                className="team__image"
                srcSet={`${member1_mob_jpg} 418w, ${member12_mob_jpg} 836w, ${member1_tb_jpg} 450w, ${member12_tb_jpg} 900w, ${member1_desk_jpg} 370w, ${member12_desk_jpg} 740w`}
                src={member1_mob_jpg}
                alt="John's Smith photo"
                sizes="(min-width:1280px) 370px, (min-width:768px) 450px, (max-width:767px) 418px, 100vw"
                width="418"
                height="346"
                loading="lazy"
              />
            </picture>
            <div className={css.team__wrap}>
              <h3 className={css.team__title}>John Smith</h3>
              <p className={css.team__description}>Extreme Barber</p>
              <ul className={css['social-links'] + ' ' + css.list}>
                <li className={css['social-links__item']}>
                  <a
                    className={css['social-links__link'] + ' ' + css.link}
                    href={'https://www.instagram.com/'}
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
                    href="https://twitter.com/"
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
                    href="https://www.facebook.com/"
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
                    href="https://www.linkedin.com/"
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
          <li
            className={css.team__item}
            data-aos="zoom-in-up"
            data-aos-delay="300"
          >
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet={`${member2_desk} 1x, ${member22_desk} 2x`}
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet={`${member2_tb} 1x, ${member22_tb} 2x`}
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet={`${member2_mob} 1x, ${member22_mob} 2x`}
                type="image/webp"
              />
              <img
                className={css.team__image}
                srcSet={`${member2_mob_jpg} 418w, ${member22_mob_jpg} 836w, ${member2_tb_jpg} 450w, ${member22_tb_jpg} 900w, ${member2_desk_jpg} 370w, ${member22_desk_jpg} 740w`}
                src={member2_mob_jpg}
                alt="John's Smith photo"
                sizes="(min-width:1280px) 370px, (min-width:768px) 450px, (max-width:767px) 418px, 100vw"
                width="418"
                height="346"
                loading="lazy"
              />
            </picture>
            <div className={css.team__wrap}>
              <h3 className={css.team__title}>Michele Doe</h3>
              <p className={css.team__description}>Extreme Barber</p>
              <ul className={css['social-links'] + ' ' + css.list}>
                <li className={css['social-links__item']}>
                  <a
                    className={css['social-links__link'] + ' ' + css.link}
                    href="https://www.instagram.com/"
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
                    href="https://twitter.com/"
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
                    href="https://www.facebook.com/"
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
                    href="https://www.linkedin.com/"
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
          <li
            className={css.team__item}
            data-aos="zoom-in-up"
            data-aos-delay="400"
          >
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet={`${member3_desk} 1x, ${member32_desk} 2x`}
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet={`${member3_tb} 1x, ${member32_tb} 2x`}
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet={`${member3_mob} 1x, ${member32_mob} 2x`}
                type="image/webp"
              />
              <img
                className={css.team__image}
                srcSet={`${member3_mob_jpg} 418w, ${member32_mob_jpg} 836w, ${member3_tb_jpg} 450w, ${member32_tb_jpg} 900w, ${member3_desk_jpg} 370w, ${member32_desk_jpg} 740w`}
                src={member3_mob_jpg}
                alt="John's Smith photo"
                sizes="(min-width:1280px) 370px, (min-width:768px) 450px, (max-width:767px) 418px, 100vw"
                width="418"
                height="346"
                loading="lazy"
              />
            </picture>
            <div className={css.team__wrap}>
              <h3 className={css.team__title}>Alan Black</h3>
              <p className={css.team__description}>Extreme Barber</p>
              <ul className={css['social-links'] + ' ' + css.list}>
                <li className={css['social-links__item']}>
                  <a
                    className={css['social-links__link'] + ' ' + css.link}
                    href="https://www.instagram.com/"
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
                    href="https://twitter.com/"
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
                    href="https://www.facebook.com/"
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
                    href="https://www.linkedin.com/"
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
        </ul>
      </div>
    </section>
  );
};

export default Team;
