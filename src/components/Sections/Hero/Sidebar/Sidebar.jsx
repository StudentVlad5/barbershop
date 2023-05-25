import css from './sidebar.module.scss';

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
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
    </div>
  );
};

export default Sidebar;
