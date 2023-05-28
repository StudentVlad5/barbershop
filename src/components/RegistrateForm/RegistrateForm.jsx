import { useState } from 'react';
import ReactDOM from 'react-dom';
import { register } from '../redux/auth/operations';
import { useDispatch } from 'react-redux';
import { useFormik, Formik } from 'formik';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import schemas from '../Schemas/schemas';
import { closeModalForm } from "hooks/modalWindow";
import {
  FormRegister,
  FormContainer,
  Input,
  Button,
  TitleRegister,
  BackButton,
  ShowPassword,
  StyledLink,
  BoxText,
  IconValid,
  IconInValid,
  ErrBox,
  Div,
  FormSection,
  RegisterFormContainer,
  BackDrop,
  ButtonClose
} from './RegistrateForm.styled';
import { theme } from '../baseStyles/Variables.styled';
import { ReactComponent as CloseIcon } from "../../images/svg/icon_close.svg";

const RegisterForm = () => {
  const [isShown, setIsShown] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function closeModal(e) {
    e.preventDefault();
    closeModalForm(e);
  }

  const onSubmit = ({ values }) => {
    setIsLoading(true);
    const { name: userName, email, password, phone } = values;
    dispatch(
      register({
        userName,
        email,
        password,
        phone,
      }),
    );
  };

  const showForm = () => {
    setIsShown(false);
  };

  const hideForm = () => {
    setIsShown(true);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    validationSchema: schemas.registerSchema,
    onSubmit: (values, action) => {
      onSubmit({ values, action });
    },
  });

  const isValid =
    (formik.errors.email && formik.touched.email) ||
    (formik.errors.password && formik.touched.password) ||
    (formik.errors.confirmPassword && formik.touched.confirmPassword) ||
    formik.values.email === '' ||
    formik.values.confirmPassword === ''
      ? true
      : false;

  const showPassword = () => {
    setShowPass(!showPass);
  };
  const showConfirmPassword = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const showAccentValidateInput = (hasValue, isValide) => {
    return !hasValue ? null : isValide ? '#E2001A' : '#3CBC81';
  };


  return ReactDOM.createPortal(
    <BackDrop onClick={closeModal}>
    <RegisterFormContainer onClick={e => e.stopPropagation()}>
      <ButtonClose
        type="button"
        onClick={closeModal}
        aria-label="Close modal"
      >
        <CloseIcon />
      </ButtonClose>
    <FormSection>
      <FormContainer>
        <Formik validationSchema={schemas.registerSchema}>
          <FormRegister onSubmit={formik.handleSubmit} autoComplete="off">
            <TitleRegister>{'Register'}</TitleRegister>
            {isShown && (
              <Div>
                <Input
                  style={{
                    borderColor: showAccentValidateInput(
                      formik.values.email,
                      formik.errors.email,
                    ),
                  }}
                  name="email"
                  type="email"
                  placeholder={'Email'}
                  value={formik.values.email}
                  validate={schemas.registerSchema.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {!formik.values.email ? null : !formik.errors.email ? (
                  <IconValid color={theme.light.success} />
                ) : (
                  <IconInValid color={theme.light.error} />
                )}
                {formik.errors.email && formik.touched.email ? (
                  <ErrBox>{formik.errors.email}</ErrBox>
                ) : null}
              </Div>
            )}
            {isShown && (
              <Div>
                <Input
                  style={{
                    borderColor: showAccentValidateInput(
                      formik.values.password,
                      formik.errors.password,
                    ),
                  }}
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder={'Password'}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />

                <ShowPassword onClick={showPassword}>
                  {!showPass ? <ImEyeBlocked /> : <ImEye />}
                </ShowPassword>
                {formik.errors.password && formik.touched.password ? (
                  <ErrBox>{formik.errors.password}</ErrBox>
                ) : null}
              </Div>
            )}
            {isShown && (
              <Div>
                <Input
                  style={{
                    borderColor: showAccentValidateInput(
                      formik.values.confirmPassword,
                      formik.errors.confirmPassword,
                    ),
                  }}
                  name="confirmPassword"
                  type={showConfirmPass ? 'text' : 'password'}
                  placeholder={'Confirm Password'}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                />
                <ShowPassword onClick={showConfirmPassword}>
                  {!showConfirmPass ? <ImEyeBlocked /> : <ImEye />}
                </ShowPassword>
                {formik.errors.confirmPassword &&
                formik.touched.confirmPassword ? (
                  <ErrBox>{formik.errors.confirmPassword}</ErrBox>
                ) : null}
              </Div>
            )}
            {isShown && (
              <Button type="button" onClick={showForm} disabled={isValid}>
                {'Next'}
              </Button>
            )}
            {!isShown && (
              <Div>
                <Input
                  style={{
                    borderColor: showAccentValidateInput(
                      formik.values.name,
                      formik.errors.name,
                    ),
                  }}
                  name="name"
                  type="text"
                  placeholder={'Name'}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />
                {!formik.values.name ? null : !formik.errors.name ? (
                  <IconValid color={theme.light.success} />
                ) : (
                  <IconInValid color={theme.light.error} />
                )}
                {formik.errors.name && formik.touched.name ? (
                  <ErrBox>{formik.errors.name}</ErrBox>
                ) : null}
              </Div>
            )}
            {!isShown && (
              <Div>
                <Input
                  style={{
                    borderColor: showAccentValidateInput(
                      formik.values.phone,
                      formik.errors.phone,
                    ),
                  }}
                  id="phone"
                  type="phone"
                  placeholder={'Mobile phone'}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  name="phone"
                />
                {!formik.values.phone ? null : !formik.errors.phone ? (
                  <IconValid color={theme.light.success} />
                ) : (
                  <IconInValid color={theme.light.error} />
                )}
                {formik.errors.phone && formik.touched.phone ? (
                  <ErrBox>{formik.errors.phone}</ErrBox>
                ) : null}
              </Div>
            )}
            {!isShown && <Button type="submit">{'Register'}</Button>}
            {!isShown && (
              <BackButton type="button" onClick={hideForm}>
                {'Back'}
              </BackButton>
            )}
            <BoxText>
              <span>{'Already have an account?'}</span>{' '}
              <StyledLink to="/login">{'Login'}</StyledLink>
            </BoxText>
          </FormRegister>
        </Formik>
        {isLoading && (
          <h1 style={{ textAlign: 'center' }}>{'Loading...'}</h1>
        )}
      </FormContainer>
    </FormSection>
    </RegisterFormContainer>
    </BackDrop>, document.querySelector("#popup-register-root")
  );
};

export default RegisterForm;