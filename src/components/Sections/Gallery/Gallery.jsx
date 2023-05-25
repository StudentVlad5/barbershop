import css from './gallery.module.scss';
import gallery_1_desk from './../../../images/portfolio/gallery-1-desk.webp';
import gallery_12_desk from './../../../images/portfolio/gallery-1-desk@2x.webp';
import gallery_1_tb from './../../../images/portfolio/gallery-1-tab.webp';
import gallery_12_tb from './../../../images/portfolio/gallery-1-tab@2x.webp';
import gallery_1_mob from './../../../images/portfolio/gallery-1-mob.webp';
import gallery_12_mob from './../../../images/portfolio/gallery-1-mob@2x.webp';

import gallery_1_desk_jpg from './../../../images/portfolio/gallery-1-desk.jpg';
import gallery_12_desk_jpg from './../../../images/portfolio/gallery-1-desk@2x.jpg';
import gallery_1_tb_jpg from './../../../images/portfolio/gallery-1-tab.jpg';
import gallery_12_tb_jpg from './../../../images/portfolio/gallery-1-tab@2x.jpg';
import gallery_1_mob_jpg from './../../../images/portfolio/gallery-1-mob.jpg';
import gallery_12_mob_jpg from './../../../images/portfolio/gallery-1-mob@2x.jpg';

import gallery_2_desk from './../../../images/portfolio/gallery-2-desk.webp';
import gallery_22_desk from './../../../images/portfolio/gallery-2-desk@2x.webp';
import gallery_2_tb from './../../../images/portfolio/gallery-2-tab.webp';
import gallery_22_tb from './../../../images/portfolio/gallery-2-tab@2x.webp';
import gallery_2_mob from './../../../images/portfolio/gallery-2-mob.webp';
import gallery_22_mob from './../../../images/portfolio/gallery-2-mob@2x.webp';

import gallery_2_desk_jpg from './../../../images/portfolio/gallery-2-desk.jpg';
import gallery_22_desk_jpg from './../../../images/portfolio/gallery-2-desk@2x.jpg';
import gallery_2_tb_jpg from './../../../images/portfolio/gallery-2-tab.jpg';
import gallery_22_tb_jpg from './../../../images/portfolio/gallery-2-tab@2x.jpg';
import gallery_2_mob_jpg from './../../../images/portfolio/gallery-2-mob.jpg';
import gallery_22_mob_jpg from './../../../images/portfolio/gallery-2-mob@2x.jpg';

import gallery_3_desk from './../../../images/portfolio/gallery-3-desk.webp';
import gallery_32_desk from './../../../images/portfolio/gallery-3-desk@2x.webp';
import gallery_3_tb from './../../../images/portfolio/gallery-3-tab.webp';
import gallery_32_tb from './../../../images/portfolio/gallery-3-tab@2x.webp';
import gallery_3_mob from './../../../images/portfolio/gallery-3-mob.webp';
import gallery_32_mob from './../../../images/portfolio/gallery-3-mob@2x.webp';

import gallery_3_desk_jpg from './../../../images/portfolio/gallery-3-desk.jpg';
import gallery_32_desk_jpg from './../../../images/portfolio/gallery-3-desk@2x.jpg';
import gallery_3_tb_jpg from './../../../images/portfolio/gallery-3-tab.jpg';
import gallery_32_tb_jpg from './../../../images/portfolio/gallery-3-tab@2x.jpg';
import gallery_3_mob_jpg from './../../../images/portfolio/gallery-3-mob.jpg';
import gallery_32_mob_jpg from './../../../images/portfolio/gallery-3-mob@2x.jpg';

import gallery_4_desk from './../../../images/portfolio/gallery-4-desk.webp';
import gallery_42_desk from './../../../images/portfolio/gallery-4-desk@2x.webp';
import gallery_4_tb from './../../../images/portfolio/gallery-4-tab.webp';
import gallery_42_tb from './../../../images/portfolio/gallery-4-tab@2x.webp';
import gallery_4_mob from './../../../images/portfolio/gallery-4-mob.webp';
import gallery_42_mob from './../../../images/portfolio/gallery-4-mob@2x.webp';

import gallery_4_desk_jpg from './../../../images/portfolio/gallery-4-desk.jpg';
import gallery_42_desk_jpg from './../../../images/portfolio/gallery-4-desk@2x.jpg';
import gallery_4_tb_jpg from './../../../images/portfolio/gallery-4-tab.jpg';
import gallery_42_tb_jpg from './../../../images/portfolio/gallery-4-tab@2x.jpg';
import gallery_4_mob_jpg from './../../../images/portfolio/gallery-4-mob.jpg';
import gallery_42_mob_jpg from './../../../images/portfolio/gallery-4-mob@2x.jpg';

const Gallery = () => {
  return (
    <section className={'gallery' + ' ' + css.section} id="gallery">
      <div className={css.container}>
        <div className={css.gallery__group + ' ' + css['title-group']}>
          <p className={css.uppertitle}>In Latin, barba means beard</p>
          <h2 className={css['section-title'] + ' ' + css['visually-hidden']}>
            Our portfolio
          </h2>
        </div>
        <ul className={css.gallery__list + ' ' + css.list}>
          <li className={css.gallery__item} data-sale="Discount 30%">
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet={`${gallery_1_desk} 1x, ${gallery_12_desk} 2x`}
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet={`${gallery_1_tb} 1x, ${gallery_12_tb} 2x`}
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet={`${gallery_1_mob} 1x, ${gallery_12_mob} 2x`}
                type="image/webp"
              />
              <img
                className={css.gallery__image}
                srcSet={`${gallery_1_desk_jpg} 270w, ${gallery_12_desk_jpg} 540w, ${gallery_1_tb_jpg} 330w, ${gallery_12_tb_jpg} 660w,
                  ${gallery_1_mob_jpg} 418w, ${gallery_12_mob_jpg} 836w`}
                src={gallery_1_mob_jpg}
                alt="Men's Haircut"
                sizes="(min-width:1280px) 270px, (min-width:768px) 330px, (max-width:767px) 418px, 100vw"
                width="418"
                height="360"
                loading="lazy"
              />
            </picture>
          </li>
          <li className={css.gallery__item} data-sale="Discount 30%">
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet={`${gallery_2_desk} 1x, ${gallery_22_desk} 2x`}
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet={`${gallery_2_tb} 1x, ${gallery_22_tb} 2x`}
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet={`${gallery_2_mob} 1x, ${gallery_22_mob} 2x`}
                type="image/webp"
              />
              <img
                className={css.gallery__image}
                srcSet={`${gallery_2_desk_jpg} 270w, ${gallery_22_desk_jpg} 540w, ${gallery_2_tb_jpg} 330w, ${gallery_22_tb_jpg} 660w,
                ${gallery_2_mob_jpg} 418w, ${gallery_22_mob_jpg} 836w`}
                src={gallery_2_desk_jpg}
                alt="Beard Trim"
                sizes="(min-width:1280px) 270px, (min-width:768px) 330px, (max-width:767px) 418px, 100vw"
                width="418"
                height="360"
                loading="lazy"
              />
            </picture>
          </li>
          <li className={css.gallery__item} data-sale="Discount 25%">
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet={`${gallery_3_desk} 1x, ${gallery_32_desk} 2x`}
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet={`${gallery_3_tb} 1x, ${gallery_32_tb} 2x`}
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet={`${gallery_3_mob} 1x, ${gallery_32_mob} 2x`}
                type="image/webp"
              />
              <img
                className={css.gallery__image}
                srcSet={`${gallery_3_desk_jpg} 270w, ${gallery_32_desk_jpg} 540w, ${gallery_3_tb_jpg} 330w, ${gallery_32_tb_jpg} 660w,
                ${gallery_3_mob_jpg} 418w, ${gallery_32_mob_jpg} 836w`}
                src={gallery_3_desk_jpg}
                alt="Mustache Trim"
                sizes="(min-width:1280px) 270px, (min-width:768px) 330px, (max-width:767px) 418px, 100vw"
                width="418"
                height="360"
                loading="lazy"
              />
            </picture>
          </li>
          <li className={css.gallery__item} data-sale="Discount 20%">
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet={`${gallery_4_desk} 1x, ${gallery_42_desk} 2x`}
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet={`${gallery_4_tb} 1x, ${gallery_42_tb} 2x`}
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet={`${gallery_4_mob} 1x, ${gallery_42_mob} 2x`}
                type="image/webp"
              />
              <img
                className={css.gallery__image}
                srcSet={`${gallery_4_desk_jpg} 270w, ${gallery_42_desk_jpg} 540w, ${gallery_4_tb_jpg} 330w, ${gallery_42_tb_jpg} 660w,
                ${gallery_4_mob_jpg} 418w, ${gallery_42_mob_jpg} 836w`}
                src={gallery_4_desk_jpg}
                alt="Straight Razor Shave"
                sizes="(min-width:1280px) 270px, (min-width:768px) 330px, (max-width:767px) 418px, 100vw"
                width="418"
                height="360"
                loading="lazy"
              />
            </picture>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Gallery;
