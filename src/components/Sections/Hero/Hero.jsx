const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero__container container">
        {/* ========= SIDEBAR =========== */}
        <div className="sidebar">
          <ul className="socials list">
            <li className="socials__item">
              <a
                className="socials__link link"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Instagram
              </a>
            </li>
            <li className="socials__item">
              <a
                className="socials__link link"
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Youtube
              </a>
            </li>
          </ul>
        </div>
        {/* ========= TITLE GROUP ========= */}
        <div className="hero__group title-group">
          <p className="uppertitle uppertitle--mode-light">
            A hair salon for men in Kyiv
          </p>
          <h1 className="main-tittle">BarberShop</h1>
          <p className="subtitle subtitle--mode-light">
            We are experts in trendy mens haircuts. We work quickly, carefully,
            and tastefully.
          </p>
        </div>
        {/* ========= SLIDER =========== */}
        <div className="hero_slider slider">
          <ul className="slider__pagination list">
            <li className="slider__item">
              <a href="#slide1" onClick="currentSlide(1)"></a>
            </li>
            <li className="slider__item">
              <a href="#slide2" onClick="currentSlide(2)"></a>
            </li>
            <li className="slider__item">
              <a href="#slide3" onClick="currentSlide(3)"></a>
            </li>
          </ul>
          <div className="slides">
            <div className="slide fade" id="slide1">
              <picture className="slide__img">
                <source
                  media="(min-width:1280px)"
                  srcSet="./images/slider/slider-1-desk.webp 1x, ./images/slider/slider-1-desk@2x.webp 2x"
                  type="image/webp"
                />
                <source
                  media="(min-width:768px)"
                  srcSet="./images/slider/slider-1-tab.webp 1x, ./images/slider/slider-1-tab@2x.webp 2x"
                  type="image/webp"
                />
                <source
                  media="(max-width:767px)"
                  srcSet="./images/slider/slider-1-mob.webp 1x, ./images/slider/slider-1-mob@2x.webp 2x"
                  type="image/webp"
                />
                <img
                  srcSet="./images/slider/slider-1-mob.jpg 480w, ./images/slider/slider-1-mob@2x.jpg 960w,
                                        ./images/slider/slider-1-tab.jpg 609w, ./images/slider/slider-1-tab@2x.jpg 1218w,
                                        ./images/slider/slider-1-desk.jpg 1125w, ./images/slider/slider-1-desk@2x.jpg 2250w"
                  src="./images/slider/slider-1-mob.jpg"
                  alt="Beard trim"
                  sizes="(min-width:1280px) 1125px, (min-width:768px) 609px, (max-width:767px) 480px, 100vw"
                  loading="lazy"
                />
              </picture>
            </div>
            <div className="slide fade" id="slide2">
              <picture className="slide__img">
                <source
                  media="(min-width:1280px)"
                  srcSet="./images/slider/slider-2-desk.webp 1x, ./images/slider/slider-2-desk@2x.webp 2x"
                  type="image/webp"
                />
                <source
                  media="(min-width:768px)"
                  srcSet="./images/slider/slider-2-tab.webp 1x, ./images/slider/slider-2-tab@2x.webp 2x"
                  type="image/webp"
                />
                <source
                  media="(max-width:767px)"
                  srcSet="./images/slider/slider-2-mob.webp 1x, ./images/slider/slider-2-mob@2x.webp 2x"
                  type="image/webp"
                />
                <img
                  srcSet="./images/slider/slider-2-mob.jpg 480w, ./images/slider/slider-2-mob@2x.jpg 960w,
                                            ./images/slider/slider-2-tab.jpg 609w, ./images/slider/slider-2-tab@2x.jpg 1218w,
                                            ./images/slider/slider-2-desk.jpg 1125w, ./images/slider/slider-2-desk@2x.jpg 2250w"
                  src="./images/slider/slider-2-mob.jpg"
                  alt="Beard trim"
                  sizes="(min-width:1280px) 1125px, (min-width:768px) 609px, (max-width:767px) 480px, 100vw"
                  loading="lazy"
                />
              </picture>
            </div>
            <div className="slide fade" id="slide3">
              <picture className="slide__img">
                <source
                  media="(min-width:1280px)"
                  srcSet="./images/slider/slider-3-desk.webp 1x, ./images/slider/slider-3-desk@2x.webp 2x"
                  type="image/webp"
                />
                <source
                  media="(min-width:768px)"
                  srcSet="./images/slider/slider-3-tab.webp 1x, ./images/slider/slider-3-tab@2x.webp 2x"
                  type="image/webp"
                />
                <source
                  media="(max-width:767px)"
                  srcSet="./images/slider/slider-3-mob.webp 1x, ./images/slider/slider-3-mob@2x.webp 2x"
                  type="image/webp"
                />
                <img
                  srcSet="./images/slider/slider-3-mob.jpg 480w, ./images/slider/slider-3-mob@2x.jpg 960w,
                                            ./images/slider/slider-3-tab.jpg 609w, ./images/slider/slider-3-tab@2x.jpg 1218w,
                                            ./images/slider/slider-3-desk.jpg 1125w, ./images/slider/slider-3-desk@2x.jpg 2250w"
                  src="./images/slider/slider-3-mob.jpg"
                  alt="Beard trim"
                  sizes="(min-width:1280px) 1125px, (min-width:768px) 609px, (max-width:767px) 480px, 100vw"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
          <ul className="slider__controls list">
            <li className="slider__controls-item">
              <a className="slider__controls-btn" onClick="plusSlides(-1)">
                Back
              </a>
            </li>
            <li className="slider__controls-item">
              <a
                className="slider__controls-btn slider__controls-btn--forward"
                onClick="plusSlides(1)"
              >
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
