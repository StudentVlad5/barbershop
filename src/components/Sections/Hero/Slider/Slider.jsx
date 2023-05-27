import { useEffect } from 'react';
import css from './slider.module.scss';

import hero1_desk from 'images/slider/slider-1-desk.webp';
import hero12_desk from 'images/slider/slider-1-desk@2x.webp';
import hero1_tb from 'images/slider/slider-1-tab.webp';
import hero12_tb from 'images/slider/slider-1-tab@2x.webp';
import hero1_mob from 'images/slider/slider-1-mob.webp';
import hero12_mob from 'images/slider/slider-1-mob@2x.webp';
import hero1_desk_jpg from 'images/slider/slider-1-desk.jpg';
import hero12_desk_jpg from 'images/slider/slider-1-desk@2x.jpg';
import hero1_tb_jpg from 'images/slider/slider-1-tab.jpg';
import hero12_tb_jpg from 'images/slider/slider-1-tab@2x.jpg';
import hero1_mob_jpg from 'images/slider/slider-1-mob.jpg';
import hero12_mob_jpg from 'images/slider/slider-1-mob@2x.jpg';

import hero2_desk from 'images/slider/slider-2-desk.webp';
import hero22_desk from 'images/slider/slider-2-desk@2x.webp';
import hero2_tb from 'images/slider/slider-2-tab.webp';
import hero22_tb from 'images/slider/slider-2-tab@2x.webp';
import hero2_mob from 'images/slider/slider-2-mob.webp';
import hero22_mob from 'images/slider/slider-2-mob@2x.webp';
import hero2_desk_jpg from 'images/slider/slider-2-desk.jpg';
import hero22_desk_jpg from 'images/slider/slider-2-desk@2x.jpg';
import hero2_tb_jpg from 'images/slider/slider-2-tab.jpg';
import hero22_tb_jpg from 'images/slider/slider-2-tab@2x.jpg';
import hero2_mob_jpg from 'images/slider/slider-2-mob.jpg';
import hero22_mob_jpg from 'images/slider/slider-2-mob@2x.jpg';

import hero3_desk from 'images/slider/slider-3-desk.webp';
import hero32_desk from 'images/slider/slider-3-desk@2x.webp';
import hero3_tb from 'images/slider/slider-3-tab.webp';
import hero32_tb from 'images/slider/slider-3-tab@2x.webp';
import hero3_mob from 'images/slider/slider-3-mob.webp';
import hero32_mob from 'images/slider/slider-3-mob@2x.webp';
import hero3_desk_jpg from 'images/slider/slider-3-desk.jpg';
import hero32_desk_jpg from 'images/slider/slider-3-desk@2x.jpg';
import hero3_tb_jpg from 'images/slider/slider-3-tab.jpg';
import hero32_tb_jpg from 'images/slider/slider-3-tab@2x.jpg';
import hero3_mob_jpg from 'images/slider/slider-3-mob.jpg';
import hero32_mob_jpg from 'images/slider/slider-3-mob@2x.jpg';

const Slider = () => {
  let slideIndex = 1;

  // Next/previous controls
  function plusSlides(n) {
    slideIndex = slideIndex + n;
    showSlides(slideIndex);
  }

  // Thumbnail image controls
  function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
  }

  function showSlides(n) {
    let i;
    let slides = document.querySelectorAll('[data-info = "slide"]');
    let dots = document.querySelectorAll('[data-info = "slider__item"]');

    if (Number(n) > slides.length) {
      slideIndex = 1;
    }
    if (Number(n) < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i += 1) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i += 1) {
      dots[i].className = dots[i].className.replace(css['active'], '');
    }

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add(css['active']);
  }

  useEffect(() => {
    showSlides(1);
  }, []);

  return (
    <div className={css.slider}>
      <ul className={css.slider__pagination + ' ' + css.list}>
        <li
          className={css.slider__item}
          data-info="slider__item"
          onClick={() => currentSlide(1)}
        >
          <a href="#slide1"></a>
        </li>
        <li
          className={css.slider__item}
          data-info="slider__item"
          onClick={() => currentSlide(2)}
        >
          <a href="#slide2"></a>
        </li>
        <li
          className={css.slider__item}
          data-info="slider__item"
          onClick={() => currentSlide(3)}
        >
          <a href="#slide3"></a>
        </li>
      </ul>
      <div className={css.slides}>
        <div
          className={css.slide + ' ' + css.fade}
          id="slide1"
          data-info="slide"
        >
          <picture className={css.slide__img}>
            <source
              media="(min-width:1280px)"
              srcSet={`${hero1_desk} 1x, ${hero12_desk} 2x`}
              type="image/webp"
            />
            <source
              media="(min-width:768px)"
              srcSet={`${hero1_tb} 1x, ${hero12_tb} 2x`}
              type="image/webp"
            />
            <source
              media="(max-width:767px)"
              srcSet={`${hero1_mob} 1x, ${hero12_mob} 2x`}
              type="image/webp"
            />
            <img
              srcSet={`${hero1_mob_jpg} 480w, ${hero12_mob_jpg} 960w, ${hero1_tb_jpg} 609w, ${hero12_tb_jpg} 1218w, ${hero1_desk_jpg} 1125w, ${hero12_desk_jpg} 2250w`}
              src={hero1_mob_jpg}
              alt="Beard trim"
              sizes="(min-width:1280px) 1125px, (min-width:768px) 609px, (max-width:767px) 480px, 100vw"
              loading="lazy"
            />
          </picture>
        </div>
        <div
          className={css.slide + ' ' + css.fade}
          id="slide2"
          data-info="slide"
        >
          <picture className={css.slide__img}>
            <source
              media="(min-width:1280px)"
              srcSet={`${hero2_desk} 1x, ${hero22_desk} 2x`}
              type="image/webp"
            />
            <source
              media="(min-width:768px)"
              srcSet={`${hero2_tb} 1x, ${hero22_tb} 2x`}
              type="image/webp"
            />
            <source
              media="(max-width:767px)"
              srcSet={`${hero2_mob} 1x, ${hero22_mob} 2x`}
              type="image/webp"
            />
            <img
              srcSet={`${hero2_mob_jpg} 480w, ${hero22_mob_jpg} 960w, ${hero2_tb_jpg} 609w, ${hero22_tb_jpg} 1218w, ${hero2_desk_jpg} 1125w, ${hero22_desk_jpg} 2250w`}
              src={hero2_mob_jpg}
              alt="Beard trim"
              sizes="(min-width:1280px) 1125px, (min-width:768px) 609px, (max-width:767px) 480px, 100vw"
              loading="lazy"
            />
          </picture>
        </div>
        <div
          className={css.slide + ' ' + css.fade}
          id="slide3"
          data-info="slide"
        >
          <picture className={css.slide__img}>
            <source
              media="(min-width:1280px)"
              srcSet={`${hero3_desk} 1x, ${hero32_desk} 2x`}
              type="image/webp"
            />
            <source
              media="(min-width:768px)"
              srcSet={`${hero3_tb} 1x, ${hero32_tb} 2x`}
              type="image/webp"
            />
            <source
              media="(max-width:767px)"
              srcSet={`${hero3_mob} 1x, ${hero32_mob} 2x`}
              type="image/webp"
            />
            <img
              srcSet={`${hero3_mob_jpg} 480w, ${hero32_mob_jpg} 960w, ${hero3_tb_jpg} 609w, ${hero32_tb_jpg} 1218w, ${hero3_desk_jpg} 1125w, ${hero32_desk_jpg} 2250w`}
              src={hero3_mob_jpg}
              alt="Beard trim"
              sizes="(min-width:1280px) 1125px, (min-width:768px) 609px, (max-width:767px) 480px, 100vw"
              loading="lazy"
            />
          </picture>
        </div>
      </div>
      <ul className={css.slider__controls + ' ' + css.list}>
        <li className={css['slider__controls-item']}>
          <a
            className={css['slider__controls-btn']}
            onClick={() => plusSlides(-1)}
          >
            Back
          </a>
        </li>
        <li className={css['slider__controls-item']}>
          <a
            className={
              css['slider__controls-btn'] +
              ' ' +
              css['slider__controls-btn--forward']
            }
            onClick={() => plusSlides(1)}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Slider;
