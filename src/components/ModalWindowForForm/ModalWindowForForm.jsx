import ReactDOM from 'react-dom';
import  RegisterForm  from "../RegistrateForm/RegistrateForm";
import  LoginForm  from "../LoginForm/LoginForm";
import { ReactComponent as CloseIcon } from "../../images/svg/icon_close.svg";
import { BackDrop, ButtonClose, FormContainer } from "./ModalWindowForForm.styles";
import { closeModalForm } from "hooks/modalWindow";
import { useState } from 'react';

export const ModalWindowForForm = () =>{
const [statusLogin, setStatusLogin] = useState(true);


    function closeModal(e) {
        e.preventDefault();
        closeModalForm(e);
      }
    
    return ReactDOM.createPortal(
        <BackDrop onClick={closeModal}>
        <FormContainer onClick={e => e.stopPropagation()}>
          <ButtonClose
            type="button"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <CloseIcon />
          </ButtonClose>
           {statusLogin ? <LoginForm setStatusLogin={setStatusLogin}/> : <RegisterForm setStatusLogin={setStatusLogin}/>} 
           </FormContainer>
    </BackDrop>, document.querySelector("#popup-register-root")
  );
}