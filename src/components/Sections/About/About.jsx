const About = () => {
  return (
    <section className="about section" id="about">
      <div className="about__container container">
        <ul className="about__list list">
          <li className="about__item">
            <picture>
              <source
                media="(min-width:1280px )"
                srcSet="./images/about/work-1-desk.webp 1x, ./images/about/work-1-desk@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(min-width:768px )"
                srcSet="./images/about/work-1-tab.webp 1x, ./images/about/work-1-tab@2x.webp 2x"
                type="image/webp"
              />
              <img
                className="about__image"
                src="./images/about/work-1-desk.jpg"
                alt="Shaving beard"
                srcSet="./images/about/work-1-desk.jpg 270w, ./images/about/work-1-desk@2x.jpg 540w,
                                ./images/about/work-1-tab.jpg 330w, ./images/about/work-1-tab@2x.jpg 660w"
                sizes="(min-width:1280px) 270px, (min-width:768px) 330px, 100vw"
                width="270"
                height="445"
                loading="lazy"
              />
            </picture>
          </li>
          <li className="about__item">
            <picture>
              <source
                media="(min-width:1280px )"
                srcSet="./images/about/work-2-desk.webp 1x, ./images/about/work-2-desk@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(min-width:768px )"
                srcSet="./images/about/work-2-tab.webp 1x, ./images/about/work-2-tab@2x.webp 2x"
                type="image/webp"
              />
              <img
                className="about__image"
                src="./images/about/work-2-desk.jpg"
                alt="Shaving beard"
                srcSet="./images/about/work-2-desk.jpg 270w, ./images/about/work-2-desk@2x.jpg 540w,
                                ./images/about/work-2-tab.jpg 330w, ./images/about/work-2-tab@2x.jpg 660w"
                sizes="(min-width:1280px) 270px, (min-width:768px) 330px, 100vw"
                width="270"
                height="445"
                loading="lazy"
              />
            </picture>
          </li>
        </ul>
        <div className="about__group">
          <div className="title-group">
            <p className="uppertitle">About</p>
            <h2 className="section-title section-title--size-s">
              The Best Barbershop
              <br />
              in Your City
            </h2>
            <p className="subtitle subtitle--mode-dark subtitle--size-s">
              If you want to add more confidence to your image, you are
              definitely in the right place.
            </p>
            <p className="description">
              We are a team that never rests on its laurels and yearns for
              change. And once you fall into the hands of our master, you will
              never be the same again. We are a team that is always on the same
              wavelength with clients. Therefore, we are always ready to improve
              everyone who comes to us!
            </p>
          </div>
          <a className="link btn btn--mode-light" href="#contacts">
            book a Service
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
