import { Navigation } from 'components/Header/Navigation/Navigation';
import { Logo } from './Elements/Logo/Logo';
import { SwitchTheme } from 'components/ThemeStatus/SwitcherTheme/SwitchTheme';
import { HeaderContainer } from './Header.styled';

export const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
      <SwitchTheme />
      <Navigation />
    </HeaderContainer>
  );
};
