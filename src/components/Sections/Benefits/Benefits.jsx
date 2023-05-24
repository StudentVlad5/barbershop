import AOS from 'aos';
import 'aos/dist/aos.css';
import css from './benefits.module.scss';

const Benefits = () => {
  AOS.init();

  return (
    <section className={'benefits' + ' ' + css.section} id="benefits">
      <div className={css.benefits__container + ' ' + css.container}>
        <div className={css.benefits__group + ' ' + css['title-group']}>
          <p className={css.uppertitle}>Old school</p>
          <h2 className={css['section-title']}>Why do they come to us?</h2>
          <p className={css.subtitle + ' ' + css['subtitle--mode-dark']}>
            Only good things are said about us. But it is better to see and feel
            1 time than to read 10 times.
          </p>
        </div>
        <ul className={css.benefits__list + ' ' + css.list}>
          <li
            className={css.benefits__item}
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <p className={css.benefits__amount}>
              600<sup className={css['benefits__amount--decor']}>+</sup>
            </p>
            <p className={css.benefits__text}>Satisfied Customers per Day</p>
          </li>
          <li
            className={css.benefits__item}
            data-aos="zoom-in-up"
            data-aos-delay="300"
          >
            <p className={css.benefits__amount}>
              50<sup className={css['benefits__amount--decor']}>+</sup>
            </p>
            <p className={css.benefits__text}>Excellent Service Awards</p>
          </li>
          <li
            className={css.benefits__item}
            data-aos="zoom-in-up"
            data-aos-delay="400"
          >
            <p className={css.benefits__amount}>
              20<sup className={css['benefits__amount--decor']}>+</sup>
            </p>
            <p className={css.benefits__text}>The Best Barbers of Kyiv</p>
          </li>
          <li
            className={css.benefits__item}
            data-aos="zoom-in-up"
            data-aos-delay="500"
          >
            <p className={css.benefits__amount}>
              100<sup className={css['benefits__amount--decor']}>+</sup>
            </p>
            <p className={css.benefits__text}>Gifts for Regular Customers</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Benefits;
