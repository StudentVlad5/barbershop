import css from './price.module.scss';

const Price = () => {
    return (
      <section className={css.price + " " + css.section} id="price">
        <div className={css.container}>
          <div className={css.price__group + " " + css["title-group"]}>
            <p className={css.uppertitle + " " + css["uppertitle--mode-light"]}>
              Spend time in the company of the best craftsmen
            </p>
            <h2 className={css["section-title"] + " " + css["section-title--mode-light"]}>
              Services and Prices
            </h2>
          </div>
          <ul className={css.price__list + " " + css.list}>
            <li className={css.price__item}>
              <ul className={css["price__inner-list"] + " " + css.list}>
                <li className={css["price__inner-item"]}>
                  <span>Mens Haircut</span>
                  <span>from 300 UAH</span>
                </li>
                <li className={css["price__inner-item"]}>
                  <span>Beard Trim</span>
                  <span>from 200 UAH</span>
                </li>
                <li className={css["price__inner-item"]}>
                  <span>Mustache Trim</span>
                  <span>from 200 UAH</span>
                </li>
                <li className={css["price__inner-item"]}>
                  <span>Straight Razor Shave</span>
                  <span>from 200 UAH</span>
                </li>
              </ul>
            </li>
            <li className={css.price__item}>
              <ul className={css["price__inner-list"] + " " + css.list}>
                <li className={css["price__inner-item"]}>
                  <span>Trainee Haircut</span>
                  <span>from 50 UAH</span>
                </li>
                <li className={css["price__inner-item"]}>
                  <span>Buzz Cut</span>
                  <span>from 200 UAH</span>
                </li>
                <li className={css["price__inner-item"]}>
                  <span>Kids Haircut (before 12 y.o.)</span>
                  <span>from 300 UAH</span>
                </li>
                <li className={css["price__inner-item"]}>
                  <span>Gray Coverage</span>
                  <span>from 200 UAH</span>
                </li>
              </ul>
            </li>
          </ul>
          <a className={css.link + " " + css.btn + " " + css["btn--mode-dark"]} href="#contacts">
            book a Service
          </a>
        </div>
      </section>
    );
};

export default Price;