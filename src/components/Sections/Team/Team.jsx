const Team = () => {
  return (
    <section className="team section" id="team">
      <div className="container">
        <div className="team__group title-group">
          <p className="uppertitle">for true connoisseurs of the atmosphere</p>
          <h2 className="section-title">Our Barbers</h2>
        </div>
        <ul className="team__list list">
          <li className="team__item" data-aos="zoom-in-up" data-aos-delay="200">
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet="./images/team/member-1-desk.webp 1x, ./images/team/member-1-desk@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet="./images/team/member-1-tab.webp 1x, ./images/team/member-1-tab@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet="./images/team/member-1-mob.webp 1x, ./images/team/member-1-mob@2x.webp 2x"
                type="image/webp"
              />
              <img
                className="team__image"
                srcSet="./images/team/member-1-mob.jpg 418w, ./images/team/member-1-mob@2x.jpg 836w,
                        				./images/team/member-1-tab.jpg 450w, ./images/team/member-1-tab@2x.jpg 900w,
                        				./images/team/member-1-desk.jpg 370w, ./images/team/member-1-desk@2x.jpg 740w"
                src="./images/team/member-1-mob.jpg"
                alt="John's Smith photo"
                sizes="(min-width:1280px) 370px, (min-width:768px) 450px, (max-width:767px) 418px, 100vw"
                width="418"
                height="346"
                loading="lazy"
              />
            </picture>
            <div className="team__wrap">
              <h3 className="team__title">John Smith</h3>
              <p className="team__description">Extreme Barber</p>
              <ul className="social-links list">
                <li className="social-links__item">
                  <a
                    className="social-links__link link"
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    aria-label="Instagram"
                  >
                    <svg className="social-links__icon" width="20" height="20">
                      <use href="./images/sprite.svg#instagram"></use>
                    </svg>
                  </a>
                </li>
                <li className="social-links__item">
                  <a
                    className="social-links__link link"
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    aria-label="Twitter"
                  >
                    <svg className="social-links__icon" width="20" height="20">
                      <use href="./images/sprite.svg#twitter"></use>
                    </svg>
                  </a>
                </li>
                <li className="social-links__item">
                  <a
                    className="social-links__link link"
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    aria-label="Facebook"
                  >
                    <svg className="social-links__icon" width="20" height="20">
                      <use href="./images/sprite.svg#facebook"></use>
                    </svg>
                  </a>
                </li>
                <li className="social-links__item">
                  <a
                    className="social-links__link link"
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    aria-label="Linkedin"
                  >
                    <svg className="social-links__icon" width="20" height="20">
                      <use href="./images/sprite.svg#linkedin"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="team__item" data-aos="zoom-in-up" data-aos-delay="300">
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet="./images/team/member-2-desk.webp 1x, ./images/team/member-2-desk@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet="./images/team/member-2-tab.webp 1x, ./images/team/member-2-tab@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet="./images/team/member-2-mob.webp 1x, ./images/team/member-2-mob@2x.webp 2x"
                type="image/webp"
              />
              <img
                className="team__image"
                srcSet="./images/team/member-2-mob.jpg 418w, ./images/team/member-2-mob@2x.jpg 836w,
                                        ./images/team/member-2-tab.jpg 450w, ./images/team/member-2-tab@2x.jpg 900w,
                                        ./images/team/member-2-desk.jpg 370w, ./images/team/member-2-desk@2x.jpg 740w"
                src="./images/team/member-2-mob.jpg"
                alt="John's Smith photo"
                sizes="(min-width:1280px) 370px, (min-width:768px) 450px, (max-width:767px) 418px, 100vw"
                width="418"
                height="346"
                loading="lazy"
              />
            </picture>
            <div className="team__wrap">
              <h3 className="team__title">Michele Doe</h3>
              <p className="team__description">Extreme Barber</p>
              <ul className="social-links list">
                <li className="social-links__item">
                  <a
                    className="social-links__link link"
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    aria-label="Instagram"
                  >
                    <svg className="social-links__icon" width="20" height="20">
                      <use href="./images/sprite.svg#instagram"></use>
                    </svg>
                  </a>
                </li>
                <li className="social-links__item">
                  <a
                    className="social-links__link link"
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    aria-label="Twitter"
                  >
                    <svg className="social-links__icon" width="20" height="20">
                      <use href="./images/sprite.svg#twitter"></use>
                    </svg>
                  </a>
                </li>
                <li className="social-links__item">
                  <a
                    className="social-links__link link"
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    aria-label="Facebook"
                  >
                    <svg className="social-links__icon" width="20" height="20">
                      <use href="./images/sprite.svg#facebook"></use>
                    </svg>
                  </a>
                </li>
                <li className="social-links__item">
                  <a
                    className="social-links__link link"
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    aria-label="Linkedin"
                  >
                    <svg className="social-links__icon" width="20" height="20">
                      <use href="./images/sprite.svg#linkedin"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="team__item" data-aos="zoom-in-up" data-aos-delay="400">
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet="./images/team/member-3-desk.webp 1x, ./images/team/member-3-desk@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet="./images/team/member-3-tab.webp 1x, ./images/team/member-3-tab@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet="./images/team/member-3-mob.webp 1x, ./images/team/member-3-mob@2x.webp 2x"
                type="image/webp"
              />
              <img
                className="team__image"
                srcSet="./images/team/member-3-mob.jpg 418w, ./images/team/member-3-mob@2x.jpg 836w,
                                        ./images/team/member-3-tab.jpg 450w, ./images/team/member-3-tab@2x.jpg 900w,
                                        ./images/team/member-3-desk.jpg 370w, ./images/team/member-3-desk@2x.jpg 740w"
                src="./images/team/member-3-mob.jpg"
                alt="John's Smith photo"
                sizes="(min-width:1280px) 370px, (min-width:768px) 450px, (max-width:767px) 418px, 100vw"
                width="418"
                height="346"
                loading="lazy"
              />
            </picture>
            <div className="team__wrap">
              <h3 className="team__title">Alan Black</h3>
              <p className="team__description">Extreme Barber</p>
              <ul className="social-links list">
                <li className="social-links__item">
                  <a
                    className="social-links__link link"
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    aria-label="Instagram"
                  >
                    <svg className="social-links__icon" width="20" height="20">
                      <use href="./images/sprite.svg#instagram"></use>
                    </svg>
                  </a>
                </li>
                <li className="social-links__item">
                  <a
                    className="social-links__link link"
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    aria-label="Twitter"
                  >
                    <svg className="social-links__icon" width="20" height="20">
                      <use href="./images/sprite.svg#twitter"></use>
                    </svg>
                  </a>
                </li>
                <li className="social-links__item">
                  <a
                    className="social-links__link link"
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    aria-label="Facebook"
                  >
                    <svg className="social-links__icon" width="20" height="20">
                      <use href="./images/sprite.svg#facebook"></use>
                    </svg>
                  </a>
                </li>
                <li className="social-links__item">
                  <a
                    className="social-links__link link"
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    aria-label="Linkedin"
                  >
                    <svg className="social-links__icon" width="20" height="20">
                      <use href="./images/sprite.svg#linkedin"></use>
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
