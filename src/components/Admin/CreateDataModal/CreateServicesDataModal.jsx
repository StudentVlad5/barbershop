import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdDone } from 'react-icons/md';
import { Formik, Field, Form } from 'formik';
import { closeModalWindow } from 'hooks/modalWindow';
import { cleanModal } from 'redux/modal/operation';
import { modalComponent } from 'redux/modal/selectors';
import { addReload } from 'redux/reload/slice';
import { createServiceData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import css from './createDataModal.module.scss';

export const CreateServiceDataModal = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const modal = useSelector(modalComponent);
  const dispatch = useDispatch();

  async function createService(values) {
    setIsLoading(true);
    try {
      const { code } = await createServiceData(
        `/admin/services/create`,
        values,
      );
      if (code && code !== 201) {
        return onFetchError('Whoops, something went wrong');
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
      dispatch(addReload(true));
    }
  }

  const closeDataModal = e => {
    e.preventDefault();
    dispatch(cleanModal());
    closeModalWindow(e);
  };

  return createPortal(
    Object.values(modal)[0] === 'admin_create_service' && (
      <div
        className={css.backdrop}
        onClick={e => {
          if (e.currentTarget === e.target) closeDataModal(e);
        }}
      >
        <div className={css.modal} onClick={e => e.stopPropagation()}>
          <button
            className={css['close-btn']}
            type="button"
            onClick={e => closeDataModal(e)}
            aria-label="Close modal"
          >
            <MdClose size={15} />
          </button>
          {isLoading ? onLoading() : onLoaded()}
          {error && onFetchError('Whoops, something went wrong')}
          <Formik
            initialValues={{
              id: +localStorage.getItem('services')+1,
              subject: '',
              time: '',
              location: '',
              price: '',
              owner: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              createService(values);
              dispatch(addReload(false));
              setSubmitting(false);
            }}
            enableReinitialize={true}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting,
              values,
              errors,
              touched,
            }) => (
              <Form
                className={css.form}
                autoComplete="off"
                onSubmit={handleSubmit}
                onChange={handleChange}
              >
                <div className={css.form__list}>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="id">
                      ID
                    </label>
                    <Field
                      className={css.form__input}
                      id="id"
                      type="text"
                      name="id"
                      placeholder="Service id"
                      disabled
                    />
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="subject">
                      <span>Subject</span>
                      {errors.subject && touched.subject ? (
                        <span className={css.error}>{errors.subject}</span>
                      ) : null}
                    </label>
                    <Field
                      className={css.form__input}
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Type service subject"
                      value={values.subject}
                    />
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="price">
                      <span>Price</span>
                      {errors.price && touched.price ? (
                        <span className={css.error}>{errors.price}</span>
                      ) : null}
                    </label>
                    <Field
                      className={css.form__input}
                      type="text"
                      id="price"
                      name="price"
                      placeholder="Type service price"
                      value={values.price}
                    />
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="owner">
                      <span>owner</span>
                      {errors.owner && touched.owner ? (
                        <span className={css.error}>{errors.owner}</span>
                      ) : null}
                    </label>
                    <Field
                      className={css.form__input}
                      type="text"
                      id="owner"
                      name="owner"
                      placeholder="Type service owner"
                      value={values.owner}
                    />
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="time">
                      <span>Time</span>
                      {errors.time && touched.time ? (
                        <span className={css.error}>{errors.time}</span>
                      ) : null}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Field
                        className={css.form__input}
                        type="text"
                        id="time"
                        name="time"
                        placeholder="Type time"
                        value={values.time}
                      />
                    </div>
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="location">
                      <span>Location</span>
                      {errors.location && touched.location ? (
                        <span className={css.error}>{errors.location}</span>
                      ) : null}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Field
                        className={css.form__input}
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Type location"
                        value={values.location}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <button
                  className={css['done-btn']}
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Submit"
                >
                  <MdDone size={15} />
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    ),
    document.querySelector('#popup-root'),
  );
};
