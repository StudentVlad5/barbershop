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
      <FooterSection id="footer">
        <FooterContainer>
          <Copyright>&#169; 2023 | All Rights Reserved |</Copyright>
          <Team>
            <Description>Developed by</Description>
            <TeamModalBtn
              aria-label="Our team"
              onClick={e => {
                
              }}
              data-modal="developers"
            ></TeamModalBtn>
          </Team>
        </FooterContainer>
      </FooterSection>
    </>
  );
};
