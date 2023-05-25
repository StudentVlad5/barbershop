import css from './hero.module.scss';
import Sidebar from './Sidebar/Sidebar';
import Slider from './Slider/Slider';

const Hero = () => {

  return (
    <section className={css.hero} id="hero">
      <div className={css.hero__container + ' ' + css.container}>
        <Sidebar />
        <div className={css.hero__group + ' ' + css['title-group']}>
          <p className={css.uppertitle + ' ' + css['uppertitle--mode-light']}>
            A hair salon for men in Kyiv
          </p>
          <h1 className={css['main-tittle']}>BarberShop</h1>
          <p className={css.subtitle + ' ' + css['subtitle--mode-light']}>
            We are experts in trendy mens haircuts. We work quickly, carefully,
            and tastefully.
          </p>
        </div>
        <Slider />
      </div>
    </section>
  );
};

export default Hero;
