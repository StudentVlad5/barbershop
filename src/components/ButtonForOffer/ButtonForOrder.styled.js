import styled from "styled-components";

const ButtonForOrder = styled.button`
  position: fixed;
  bottom: 50px;
  right: 50px;
  background-color: #1c87c9;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  border: none;
  color: white;
  width: 130px;
  height: 130px;
  cursor: pointer;
  display: inline-block;
  font-family: sans-serif;
  font-size: 20px;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  @keyframes glowing {
    0% {
      background-color: #FF6C00;
      box-shadow: 0 0 3px #FF6C00;
    }
    50% {
      background-color: gray;
      box-shadow: 0 0 10px gray;
    }
    100% {
      background-color: #FF6C00;
      box-shadow: 0 0 3px #FF6C00;
    }
  }
  animation: glowing 1300ms infinite;
`;

export { ButtonForOrder };
