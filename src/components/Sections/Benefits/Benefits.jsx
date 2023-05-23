const Benefits = () => {
  return (
    <section className="benefits section" id="benefits">
      <div className="benefits__container container">
        <div className="benefits__group title-group">
          <p className="uppertitle">Old school</p>
          <h2 className="section-title">Why do they come to us?</h2>
          <p className="subtitle subtitle--mode-dark">
            Only good things are said about us. But it is better to see and feel
            1 time than to read 10 times.
          </p>
        </div>
        <ul className="benefits__list list">
          <li
            className="benefits__item"
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <p className="benefits__amount">
              600<sup className="benefits__amount--decor">+</sup>
            </p>
            <p className="benefits__text">Satisfied Customers per Day</p>
          </li>
          <li
            className="benefits__item"
            data-aos="zoom-in-up"
            data-aos-delay="300"
          >
            <p className="benefits__amount">
              50<sup className="benefits__amount--decor">+</sup>
            </p>
            <p className="benefits__text">Excellent Service Awards</p>
          </li>
          <li
            className="benefits__item"
            data-aos="zoom-in-up"
            data-aos-delay="400"
          >
            <p className="benefits__amount">
              20<sup className="benefits__amount--decor">+</sup>
            </p>
            <p className="benefits__text">The Best Barbers of Kyiv</p>
          </li>
          <li
            className="benefits__item"
            data-aos="zoom-in-up"
            data-aos-delay="500"
          >
            <p className="benefits__amount">
              100<sup className="benefits__amount--decor">+</sup>
            </p>
            <p className="benefits__text">Gifts for Regular Customers</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Benefits;
