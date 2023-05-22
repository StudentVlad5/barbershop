import {
  FooterSection,
  FooterContainer,
  Copyright,
  Team,
  Description,
  TeamModalBtn,
} from './Footer.styled';
import css from './footer.module.scss';

export const Footer = () => {
  return (
    <>
      <footer className={css.footer}>
        <div className={css.footer__container + ' ' + css.container}>
          <p className={css.copyright}>&#169; Copyright 2022</p>
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
      </footer>
      <FooterSection id="footer">
        <FooterContainer>
          <Copyright>&#169; 2023 | All Rights Reserved |</Copyright>
          <Team>
            <Description>Developed by</Description>
            <TeamModalBtn
              aria-label="Developers"
              data-modal="developers"
            ></TeamModalBtn>
          </Team>
        </FooterContainer>
      </FooterSection>
    </>
  );
};
