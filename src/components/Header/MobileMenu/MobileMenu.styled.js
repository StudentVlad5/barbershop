import styled from "styled-components";
import { ReactComponent as icon } from "../../../images/svg/icon_close.svg";

const BackDrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Manrope";
  font-style: normal;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const MobileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  padding: 20px 20px 40px 20px;
`;

const ButtonClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 45;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;
  padding: 0;
  width: 34px;
  height: 34px;

  background-color: ${(props) => props.theme.mainBg};
  border-radius: 50%;
  border: medium none;
  border-spacing: 0;

  transition: all 0.25s ease-in;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: 2px solid ${(props) => props.theme.orangeLight};
    border: none;
  }

  @media screen and (min-width: 768px) {
    width: 44px;
    height: 44px;
  }

  @media screen and (min-width: 1280px) {
    top: 24px;
    right: 24px;
  }
`;

const IconClose = styled(icon)`
  width: 28px;
  height: 28px;
  display: block;

  & > path {
    stroke: ${(props) => props.theme.black};
    fill: ${(props) => props.theme.black};
  }

  @media screen and (min-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

export { MobileContainer, ButtonClose, IconClose, BackDrop };
