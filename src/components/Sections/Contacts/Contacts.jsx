import css from './contacts.module.scss';
import sprite from "../../../images/sprite.svg";

const Contacts = () => {
  return (
    <section className={css.contacts + ' ' + css.section} id="contacts">
      <div className={css.contacts__container + ' ' + css.container}>
        {/*========= USER CONTACTS FORM ===========*/}
        <div className={css.contacts__form} id="book">
          <h2 className={css["section-title"] + ' ' + css["section-title--mode-light"]}>
            Book a Service
          </h2>
          <form className={css.form} name="form-contacts" autoComplete="on">
            <label className={css.form__field} aria-label="Name">
              <input
                className={css.form__input}
                type="text"
                name="user-name"
                required
                placeholder="John"
              />
              <span className={css.form__label}>Name*</span>
            </label>
            <label className={css.form__field} aria-label="Phone">
              <input
                className={css.form__input}
                type="tel"
                name="user-phone"
                required
                placeholder="+19739476185"
              />
              <span className={css.form__label}>Telephone*</span>
            </label>
            <label
              className={css.form__field + ' ' + css["form__field-comment"]}
              aria-label="Comment"
            >
              <textarea
                className={css.form__comment}
                name="comment"
                placeholder="Your comment"
              ></textarea>
              <span className={css.form__label}>Message</span>
            </label>
          </form>
          <button className={css.form__btn + " " + css.btn + " " + css["btn--mode-dark"]} type="submit">
            send
          </button>
        </div>
        {/*========= CONTACTS COMPANY ===========*/}
        <div className={css.contacts__group}>
          <h2 className={css["section-title"] + " " + css["section-title--mode-light"]}>Contacts</h2>
          <div className={css.contacts__wrapper}>
            <address className={css.address}>
              <ul className={css.address__list + ' ' + css.list}>
                <li className={css.address__item}>
                  <a
                    className={css.adress__link + " " + css.link}
                    href="https://goo.gl/maps/EWTb5EmzrJwAVnWu9"
                    aria-label="address"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className={css.address__icon} width="24" height="24">
                      <use href={sprite + "#map-pin"}></use>
                    </svg>
                    Main Street, 7A, Kyiv, 08132
                  </a>
                </li>
                <li className={css.address__item}>
                  <a
                    className={css.adress__link + " " + css.link}
                    href="tel:+380441111111"
                    aria-label="phone"
                  >
                    <svg className={css.address__icon} width="24" height="24">
                      <use href={sprite + "#map-phone"}></use>
                    </svg>
                    +38 044 111 11 11
                  </a>
                </li>
                <li className={css.address__item}>
                  <a
                    className={css.adress__link + " " + css.link}
                    href="mailto:barbershop@email.com"
                    aria-label="email"
                  >
                    <svg className={css.address__icon} width="24" height="24">
                      <use href={sprite + "#mail"}></use>
                    </svg>
                    barbershop@email.com
                  </a>
                </li>
              </ul>
            </address>
            <div className={css.worktime}>
              <p className={css.uppertitle + " " + css["uppertitle--mode-light"]}>working hours</p>
              <p className={css.subtitle + " " + css["subtitle--mode-light"]}>
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
