import css from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.footer__container + ' ' + css.container}>
        <ul className={css.socials + ' ' + css.list}>
          <li className={css.socials__item}>
            <a
              className={css.socials__link + ' ' + css.link}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Instagram
            </a>
          </li>
          <li className={css.socials__item}>
            <a
              className={css.socials__link + ' ' + css.link}
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Youtube
            </a>
          </li>
        </ul>
        <div className={css.copyright}>
          <p className={css.copyright__text}>
            &#169; 2023 | All Rights Reserved |
          </p>

          <div className={css.developers}>
            <p className={css.developers__text}>Developed by</p>
            <button
              className={css.developers__btn}
              aria-label="Developers"
              data-modal="developers"
            >
              DTeam
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
