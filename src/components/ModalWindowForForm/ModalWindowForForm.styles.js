import { styled } from "styled-components";

export const BackDrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Manrope";
  font-style: normal;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

export const FormContainer = styled.div`
  position: relative;
  display: block;
  width: 280px;
  margin-top: 50px;
  padding: 10px 20px 40px 20px;
  border-radius: 20px;
  -webkit-box-shadow: 7px 4px 14px 7px rgba(0, 0, 0, 0.11);
  -moz-box-shadow: 7px 4px 14px 7px rgba(0, 0, 0, 0.11);
  box-shadow: 7px 4px 14px 7px rgba(0, 0, 0, 0.11);

  @media screen and (min-width: 768px) {
    margin-top: 0;
    width: 704px;
    padding: 45px 20px 32px 20px;
  }
`;

export const ButtonClose = styled.button`
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

  background-color: #fdf7f2;
  border-radius: 50%;
  border: medium none;
  border-spacing: 0;

  transition: all 0.25s ease-in;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: 2px solid #f59256;
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
