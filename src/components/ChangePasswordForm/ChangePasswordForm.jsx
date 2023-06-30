import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { useFormik, Formik, Form, Field } from 'formik';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
// import { FaCheck, FaTimes } from 'react-icons/fa';
import schemas from 'components/Schemas/schemas';
import { changePassword } from 'services/APIservice';
import css from './changePasswordForm.module.scss';
import { closeModalChangePassword } from 'hooks/modalWindow';
import sprite from 'images/sprite.svg';
import { addReload } from 'redux/reload/slice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';

const ChangePasswordForm = ({setIsOpenModal, userinID}) => {

  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  
  function closeModal(e) {
    e.preventDefault();
    setIsOpenModal(false);
    closeModalChangePassword();
  }

  async function changePasswordUser(id, password) {
    let isChangePasswordUser = confirm('Are you sure?');
    if (isChangePasswordUser) {
      setIsLoading(true);
      try {
        const { date } = await changePassword(`/user/${id}`, password);
        return date;
      } catch (error) {
        setError(error);
      } finally {
        dispatch(addReload(true));
        setIsLoading(false);
      }
    }
  }


  const onSubmit = values => {
    setIsLoading(true);
    const { password } = values;
    console.log("password", password);
    changePasswordUser(userinID, password);
      closeModalChangePassword();
      setIsLoading(false);
  };
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: schemas.schemasChangePassword,
    onSubmit,
  });

  const isValid =
    (formik.errors.password && formik.touched.password) 
      ? true
      : false;

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const showAccentValidateInput = (hasValue, isValide) => {
    return !hasValue ? null : isValide ? '#E2001A' : '#3CBC81';
  };
    return createPortal(
      <div className={css.backdrop} onClick={closeModal}>
        <div className={css.modal} onClick={e => e.stopPropagation()}>
          <button
            className={css['modal__btn-close']}
            type="button"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <svg className={css.modal__icon} width="40" height="40">
              <use href={sprite + '#close_40px'}></use>
            </svg>
          </button>
          <Formik validationSchema={schemas.schemasLogin}>
            <Form
              className={css.form}
              name="form-changePassword"
              onSubmit={formik.handleSubmit}
              autoComplete="off"
            >
              <h1 className={css.form__title}>{'Change Password'}</h1>

                <div className={css.form__wrapper}>
                  <Field
                    className={css.form__input}
                    style={{
                      borderColor: showAccentValidateInput(
                        formik.values.password,
                        formik.errors.password,
                      ),
                    }}
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />

                  <span className={css['form__icon-show']} onClick={showPassword}>
                    {!showPass ? <ImEyeBlocked /> : <ImEye />}
                  </span>
                  {formik.errors.password && formik.touched.password ? (
                    <div className={css['form__input-error']}>
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <button className={css.form__btn} type="submit" disabled={isValid}>
                  {'Change Password'}
                </button>
            </Form>
          </Formik>
          {isLoading && <h1 style={{ textAlign: 'center' }}>{'Loading...'}</h1>}
          {error && onFetchError('Whoops, something went wrong')}
        </div>
      </div>, document.querySelector('#popup-changepassword-root'))
};


export default ChangePasswordForm;
