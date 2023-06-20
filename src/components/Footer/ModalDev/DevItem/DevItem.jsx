import PropTypes from 'prop-types';
import { FaEnvelope, FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa';
import noImage from 'images/No-image-available.webp';
import css from './DevItem.module.scss';

export const DevItem = ({ developer }) => {
  const { _id, name, email, telegram, linkedin, github, imageUrl } = developer;
  const hrefEmail = `mailto:${email}`;
  return (
    <li className={css.dev__item} key={_id}>
      {imageUrl ? (
        <img
          className={css.dev__img}
          src={imageUrl}
          alt={name}
          width="150"
          height="150"
          loading="lazy"
        />
      ) : (
        <img
          className={css.dev__img}
          src={noImage}
          alt={name}
          width="100"
          height="100"
          loading="lazy"
        />
      )}
      <p className={css.dev__info}>{name}</p>
      <div className={css.dev__link}>
        <a className={css.link} href={hrefEmail} aria-label="Email">
          <FaEnvelope size={15} />
        </a>
        <a
          className={css.link}
          href={telegram}
          aria-label="Telegram"
          target="blank"
        >
          <FaTelegram size={15} />
        </a>
        <a
          className={css.link}
          href={linkedin}
          aria-label="Linkedin"
          target="blank"
        >
          <FaLinkedin size={15} />
        </a>
        <a
          className={css.link}
          href={github}
          aria-label="Github"
          target="blank"
        >
          <FaGithub size={15} />
        </a>
      </div>
    </li>
  );
};

DevItem.propTypes = {
  developer: PropTypes.object.isRequired,
};
