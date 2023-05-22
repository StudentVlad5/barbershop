const Price = () => {
    return (
      <section className="price section" id="price">
        <div className="container">
          <div className="price__group title-group">
            <p className="uppertitle uppertitle--mode-light">
              Spend time in the company of the best craftsmen
            </p>
            <h2 className="section-title section-title--mode-light">
              Services and Prices
            </h2>
          </div>
          <ul className="price__list list">
            <li className="price__item">
              <ul className="price__inner-list list">
                <li className="price__inner-item">
                  <span>Mens Haircut</span>
                  <span>from 300 UAH</span>
                </li>
                <li className="price__inner-item">
                  <span>Beard Trim</span>
                  <span>from 200 UAH</span>
                </li>
                <li className="price__inner-item">
                  <span>Mustache Trim</span>
                  <span>from 200 UAH</span>
                </li>
                <li className="price__inner-item">
                  <span>Straight Razor Shave</span>
                  <span>from 200 UAH</span>
                </li>
              </ul>
            </li>
            <li className="price__item">
              <ul className="price__inner-list list">
                <li className="price__inner-item">
                  <span>Trainee Haircut</span>
                  <span>from 50 UAH</span>
                </li>
                <li className="price__inner-item">
                  <span>Buzz Cut</span>
                  <span>from 200 UAH</span>
                </li>
                <li className="price__inner-item">
                  <span>Kids Haircut (before 12 y.o.)</span>
                  <span>from 300 UAH</span>
                </li>
                <li className="price__inner-item">
                  <span>Gray Coverage</span>
                  <span>from 200 UAH</span>
                </li>
              </ul>
            </li>
          </ul>
          <a className="link btn btn--mode-dark" href="#contacts">
            book a Service
          </a>
        </div>
      </section>
    );
};

export default Price;