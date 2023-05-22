const Contacts = () => {
  return (
    <section className="contacts section" id="contacts">
      <div className="contacts__container container">
        {/*========= USER CONTACTS FORM ===========*/}
        <div className="contacts__form" id="book">
          <h2 className="section-title section-title--mode-light">
            Book a Service
          </h2>
          <form className="form" name="form-contacts" autoComplete="on">
            <label className="form__field" aria-label="Name">
              <input
                className="form__input"
                type="text"
                name="user-name"
                required
                placeholder="John"
              />
              <span className="form__label">Name*</span>
            </label>
            <label className="form__field" aria-label="Phone">
              <input
                className="form__input"
                type="tel"
                name="user-phone"
                required
                placeholder="+19739476185"
              />
              <span className="form__label">Telephone*</span>
            </label>
            <label
              className="form__field form__field-comment"
              aria-label="Comment"
            >
              <textarea
                className="form__comment"
                name="comment"
                placeholder="Your comment"
              ></textarea>
              <span className="form__label">Message</span>
            </label>
          </form>
          <button className="form__btn btn btn--mode-dark" type="submit">
            send
          </button>
        </div>
        {/*========= CONTACTS COMPANY ===========*/}
        <div className="contacts__group">
          <h2 className="section-title section-title--mode-light">Contacts</h2>
          <div className="contacts__wrapper">
            <address className="address">
              <ul className="address__list list">
                <li className="address__item">
                  <a
                    className="adress__link link"
                    href="https://goo.gl/maps/EWTb5EmzrJwAVnWu9"
                    aria-label="address"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="address__icon" width="24" height="24">
                      <use href="./images/sprite.svg#map-pin"></use>
                    </svg>
                    Main Street, 7A, Kyiv, 08132
                  </a>
                </li>
                <li className="address__item">
                  <a
                    className="adress__link link"
                    href="tel:+380441111111"
                    aria-label="phone"
                  >
                    <svg className="address__icon" width="24" height="24">
                      <use href="./images/sprite.svg#phone"></use>
                    </svg>
                    +38 044 111 11 11
                  </a>
                </li>
                <li className="address__item">
                  <a
                    className="adress__link link"
                    href="mailto:barbershop@email.com"
                    aria-label="email"
                  >
                    <svg className="address__icon" width="24" height="24">
                      <use href="./images/sprite.svg#mail"></use>
                    </svg>
                    barbershop@email.com
                  </a>
                </li>
              </ul>
            </address>
            <div className="worktime">
              <p className="uppertitle uppertitle--mode-light">working hours</p>
              <p className="subtitle subtitle--mode-light">
                Daily from 9:00 AM till 22:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
