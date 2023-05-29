import styled from "styled-components";
import { Form, Field } from "formik";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Title } from "components/baseStyles/CommonStyle.styled";

export const FormSection = styled.section`
  @media screen and (max-width: 767.9px) {
    /* min-height: 540px; */
    background-repeat: no-repeat;
    background-size: 620px auto;
    background-position: bottom -250px left 30%;
  }
`;

export const FormContainer = styled.div`
  height: 100%;
  min-height: calc(100vh - 140px);

  @media (min-width: 767px) and (max-width: 1279px) {
  }

  @media screen and (min-width: 1280px) {
    padding-top: 44px;
    min-height: calc(100vh - 120px);
  }
`;
export const TitleRegister = styled(Title)`
  margin-bottom: 40px;
  margin-top: 0;
  color: #ffffff;
  @media screen and (min-width: 768px) {
    font-size: 36px;
    font-weight: 500;
  }
`;
export const FormRegister = styled(Form)`
  position: relative;
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 44px;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    width: 608px;
    margin: 0 auto;
    padding: 60px 0 40px 0;
    border-radius: 40px;
    -webkit-box-shadow: 7px 4px 14px 0px rgba(0, 0, 0, 0.11);
    -moz-box-shadow: 7px 4px 14px 0px rgba(0, 0, 0, 0.11);
    box-shadow: 7px 4px 14px 0px rgba(0, 0, 0, 0.11);
  }

  @media screen and (min-width: 1280px) {
    width: 618px;
    padding: 60px 0 60px 0;
  }
  > div {
    position: relative;
  }
`;
export const ShowPassword = styled.span`
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 6%;
  top: 62%;
  transform: translateY(-80%);
  color: grey;
  cursor: pointer;
  svg {
    width: inherit;
    height: inherit;
  }
`;
export const IconValid = styled(FaCheck)`
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 6%;
  top: 62%;
  transform: translateY(-80%);
  color: grey;
  cursor: pointer;
  svg {
    width: inherit;
    height: inherit;
  }
`;

export const IconInValid = styled(FaTimes)`
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 6%;
  top: 30px;
  transform: translateY(-80%);
  color: grey;
  cursor: pointer;
  svg {
    width: inherit;
    height: inherit;
  }
`;

export const Input = styled(Field)`
  width: 280px;
  font-size: 14px;
  line-height: 1.3;
  padding: 11px 0 12px 14px;
  background-color: #ffffff;
  color: #535353;
  border: 1px solid rgba(245, 146, 86, 0.5);
  border-radius: 40px;
  transition: all 0.25s ease-in;
  &:focus,
  &:hover {
    border-color: #ff6101;
    outline: none;
  }
  @media screen and (min-width: 768px) {
    width: 448px;
    font-size: 18px;
    padding: 14px 0 13px 32px;
  }
  @media screen and (min-width: 1280px) {
    width: 458px;
  }
`;
export const PhoneInput = styled.div`
  width: 280px;
  padding: 11px 0 12px 14px;
  background: #fac9ab;
  color: #535353;
  border: 1px solid rgba(245, 146, 86, 0.5);
  border-radius: 40px;
  margin-bottom: 16px;
  transition: all 0.25s ease-in;
  &:focus,
  &:hover {
    border-color: #ff6101;
    outline: none;
  }
  @media screen and (min-width: 768px) {
    width: 448px;
    padding: 14px 0 13px 32px;
    font-size: 18px;
  }
  @media screen and (min-width: 1280px) {
    width: 458px;
  }
`;
export const Button = styled.button`
  width: 100%;
  padding: 11px 0 12px 14px;
  text-align: center;
  color: #ffffff;
  background: #f59256;
  border: 1px solid rgba(245, 146, 86, 0.5);
  border-radius: 40px;
  margin: 8px 0 40px 0;
  transform: scale(1);
  transition: transform 0.5s;
  cursor: pointer;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.25s ease-in;
  :hover,
  :focus {
    transform: scale(1.05);
    transition: transform 0.5s;
  }
  :hover:before {
    left: 100%;
  }
  :before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #f59256;
    transition: all 450ms;
  }
  :disabled {
    opacity: 0.5;
    cursor: auto;
    transform: none;
    transition: none;
  }
  :disabled:before {
    transform: none;
    transition: none;
  }
  @media screen and (min-width: 768px) {
    width: 458px;
    font-size: 20px;
  }
`;
export const BackButton = styled.button`
  width: 100%;
  padding: 11px 0 12px 14px;
  text-align: center;
  color: #000;
  background: #f59256;
  border: 1px solid #f59256;
  border-radius: 40px;
  margin: -24px 0 40px 0;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.5s;
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.25s ease-in;
  :hover,
  :focus {
    transform: scale(1.05);
    transition: transform 0.5s;
  }
  :hover:before {
    left: 100%;
  }
  :before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #f59256;
    transition: all 450ms;
  }
  @media screen and (min-width: 768px) {
    width: 458px;
    font-size: 20px;
  }
`;

export const ErrBox = styled.div`
  position: relative;
  bottom: 0px;
  left: 15px;
  color: #e53e3e;
  font-family: "Manrope";
  font-size: 12px;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.03em;
  margin-bottom: -16px;
  display: flex;
  flex-wrap: wrap;
  word-wrap: break-word;
  max-width: 400px;

  @media screen and (min-width: 768px) {
    left: 32px;
  }
`;

export const Div = styled.div`
  margin-bottom: 32px;
`;

export const BoxText = styled.div`
  font-family: "Manrope";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.04em;
  cursor: pointer;
  color: #707070;
`;

export const SpinerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
