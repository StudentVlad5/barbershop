import PropTypes from 'prop-types';
import { ButtonAuth } from '../Elements/button/ButtonAuth';
import { MobileContainer, Container } from './AuthNav.styled';


export const MobileAuthNav = ({ toggleMenu }) => {


  return (
    <MobileContainer>
      <ButtonAuth title='Login' onClick={toggleMenu} />
      <ButtonAuth
        title='Registration'
        onClick={toggleMenu}
      />
    </MobileContainer>
  );
};

export const AuthNav = ({ toggleMenu }) => {


  return (
    <Container>
      <ButtonAuth title='Login' onClick={toggleMenu} />
      <ButtonAuth
        title='Registration'
        onClick={toggleMenu}
      />
    </Container>
  );
};

MobileAuthNav.propTypes = {
  toggleMenu: PropTypes.func,
};

AuthNav.propTypes = {
  toggleMenu: PropTypes.func,
};