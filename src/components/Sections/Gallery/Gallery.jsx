const Gallery = () => {
  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <div className="gallery__group title-group">
          <p className="uppertitle">In Latin, barba means beard</p>
          <h2 className="section-title visually-hidden">Our portfolio</h2>
        </div>
        <ul className="gallery__list list">
          <li className="gallery__item" data-sale="Discount 30%">
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet="./images/portfolio/gallery-1-desk.webp 1x, ./images/portfolio/gallery-1-desk@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet="./images/portfolio/gallery-1-tab.webp 1x, ./images/portfolio/gallery-1-tab@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet="./images/portfolio/gallery-1-mob.webp 1x, ./images/portfolio/gallery-1-mob@2x.webp 2x"
                type="image/webp"
              />
              <img
                className="gallery__image"
                srcSet="./images/portfolio/gallery-1-desk.jpg 270w, ./images/portfolio/gallery-1-desk@2x.jpg 540w,
                    				./images/portfolio/gallery-1-tab.webp 330w, ./images/portfolio/gallery-1-tab@2x.webp 660w,
                    				./images/portfolio/gallery-1-mob.webp 418w, ./images/portfolio/gallery-1-mob@2x.webp 836w"
                src="./images/portfolio/gallery-1-mob.jpg"
                alt="Men's Haircut"
                sizes="(min-width:1280px) 270px, (min-width:768px) 330px, (max-width:767px) 418px, 100vw"
                width="418"
                height="360"
                loading="lazy"
              />
            </picture>
          </li>
          <li className="gallery__item" data-sale="Discount 30%">
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet="./images/portfolio/gallery-2-desk.webp 1x, ./images/portfolio/gallery-2-desk@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet="./images/portfolio/gallery-2-tab.webp 1x, ./images/portfolio/gallery-2-tab@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet="./images/portfolio/gallery-2-mob.webp 1x, ./images/portfolio/gallery-2-mob@2x.webp 2x"
                type="image/webp"
              />
              <img
                className="gallery__image"
                srcSet="./images/portfolio/gallery-2-desk.jpg 270w, ./images/portfolio/gallery-2-desk@2x.jpg 540w,
                                        ./images/portfolio/gallery-2-tab.webp 330w, ./images/portfolio/gallery-2-tab@2x.webp 660w,
                                        ./images/portfolio/gallery-2-mob.webp 418w, ./images/portfolio/gallery-2-mob@2x.webp 836w"
                src="./images/portfolio/gallery-2-mob.jpg"
                alt="Beard Trim"
                sizes="(min-width:1280px) 270px, (min-width:768px) 330px, (max-width:767px) 418px, 100vw"
                width="418"
                height="360"
                loading="lazy"
              />
            </picture>
          </li>
          <li className="gallery__item" data-sale="Discount 25%">
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet="./images/portfolio/gallery-3-desk.webp 1x, ./images/portfolio/gallery-3-desk@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet="./images/portfolio/gallery-3-tab.webp 1x, ./images/portfolio/gallery-3-tab@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet="./images/portfolio/gallery-3-mob.webp 1x, ./images/portfolio/gallery-3-mob@2x.webp 2x"
                type="image/webp"
              />
              <img
                className="gallery__image"
                srcSet="./images/portfolio/gallery-3-desk.jpg 270w, ./images/portfolio/gallery-3-desk@2x.jpg 540w,
                                        ./images/portfolio/gallery-3-tab.webp 330w, ./images/portfolio/gallery-3-tab@2x.webp 660w,
                                        ./images/portfolio/gallery-3-mob.webp 418w, ./images/portfolio/gallery-3-mob@2x.webp 836w"
                src="./images/portfolio/gallery-3-mob.jpg"
                alt="Mustache Trim"
                sizes="(min-width:1280px) 270px, (min-width:768px) 330px, (max-width:767px) 418px, 100vw"
                width="418"
                height="360"
                loading="lazy"
              />
            </picture>
          </li>
          <li className="gallery__item" data-sale="Discount 20%">
            <picture>
              <source
                media="(min-width:1280px)"
                srcSet="./images/portfolio/gallery-4-desk.webp 1x, ./images/portfolio/gallery-4-desk@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(min-width:768px)"
                srcSet="./images/portfolio/gallery-4-tab.webp 1x, ./images/portfolio/gallery-4-tab@2x.webp 2x"
                type="image/webp"
              />
              <source
                media="(max-width:767px)"
                srcSet="./images/portfolio/gallery-4-mob.webp 1x, ./images/portfolio/gallery-4-mob@2x.webp 2x"
                type="image/webp"
              />
              <img
                className="gallery__image"
                srcSet="./images/portfolio/gallery-4-desk.jpg 270w, ./images/portfolio/gallery-4-desk@2x.jpg 540w,
                                        ./images/portfolio/gallery-4-tab.webp 330w, ./images/portfolio/gallery-4-tab@2x.webp 660w,
                                        ./images/portfolio/gallery-4-mob.webp 418w, ./images/portfolio/gallery-4-mob@2x.webp 836w"
                src="./images/portfolio/gallery-4-mob.jpg"
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
