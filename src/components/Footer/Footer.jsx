import {
  FooterSection,
  FooterContainer,
  Copyright,
  Team,
  Description,
  TeamModalBtn,
} from './Footer.styled';

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__container container">
          <p className="copyright">&#169; Copyright 2022</p>
          <ul className="socials list">
            <li className="socials__item">
              <a
                className="socials__link link"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Instagram
              </a>
            </li>
            <li className="socials__item">
              <a
                className="socials__link link"
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
