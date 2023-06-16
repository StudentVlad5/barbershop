import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdDone } from 'react-icons/md';
import { Formik, Field, Form } from 'formik';
import { closeModalWindow } from 'hooks/modalWindow';
import { cleanModal } from 'redux/modal/operation';
import { modalComponent } from 'redux/modal/selectors';
import { addReload } from 'redux/reload/slice';
import { fetchData, updateServiceData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import css from './editDataModal.module.scss';

export const EditServiceDataModal = () => {
  const [dataUpdate, setDataUpdate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const modal = useSelector(modalComponent);
  const dispatch = useDispatch();

  const itemForFetch = `/admin/services/${modal.id}`;

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(itemForFetch);
        setDataUpdate(data);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (modal.id !== '' && modal.id !== undefined) {
      getData();
    }
  }, [itemForFetch, modal.id]);

  async function editService(values) {
    setIsLoading(true);
    try {
      const { code } = await updateServiceData(
        `/admin/services/${modal.id}`,
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
    Object.values(modal)[0] === 'admin' && (
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
              id: dataUpdate?._id ? dataUpdate._id : '',
              subject: dataUpdate?.subject ? dataUpdate.subject : '',
              time: dataUpdate?.time ? dataUpdate.time : '',
              location: dataUpdate?.location ? dataUpdate.location : '',
              price: dataUpdate?.price ? dataUpdate.price : '',
              owner: dataUpdate?.owner ? dataUpdate.owner : '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              editService(values);
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
                        // onFocus={e => {
                        //   e.target.setAttribute('type', 'date');
                        // }}
                        // onBlur={e => {
                        //   e.target.setAttribute('type', 'text');
                        // }}
                        type="text"
                        id="time"
                        name="time"
                        // min={'1900-01-01'}
                        // max={`${new Date().toISOString().split('T')[0]}`}
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
                        // onChange={() => {
                        //   handleChange();
                        // }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  className={css['done-btn']}
                  type="submit"
                  disabled={isSubmitting}
                  // onClick={e => closeDataModal(e)}
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
