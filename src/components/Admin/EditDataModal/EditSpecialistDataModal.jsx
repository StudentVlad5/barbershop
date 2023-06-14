import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdDone } from 'react-icons/md';
import { Formik, Field, Form } from 'formik';
import { closeModalWindow } from 'hooks/modalWindow';
import { cleanModal } from 'redux/modal/operation';
import { modalComponent } from 'redux/modal/selectors';
import { addReload } from 'redux/reload/slice';
import { fetchData, updateSpecialistData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import css from './editDataModal.module.scss';

export const EditSpecialistDataModal = () => {
  const [dataUpdate, setDataUpdate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const modal = useSelector(modalComponent);
  const dispatch = useDispatch();
  const itemForFetch = `/admin/owners/${modal.id}`;

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
    if (modal.id !== '') {
      getData();
    }
  }, [itemForFetch, modal.id]);

  async function editSpecialist(formData) {
    setIsLoading(true);
    try {
      const { date } = await updateSpecialistData(itemForFetch, formData);
      console.log('editSpecialist ~ date:', date);
      if (date && date !== 201) {
        return onFetchError('Whoops, something went wrong');
      }
      return date;
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
              groupId: dataUpdate?.groupId ? dataUpdate.groupId : '',
              ownerText: dataUpdate?.ownerText ? dataUpdate.ownerText : '',
              ownerColor: dataUpdate?.ownerColor ? dataUpdate.ownerColor : '',
              designation: dataUpdate?.designation
                ? dataUpdate.designation
                : '',
              workDays: dataUpdate?.workDays?.toString()
                ? dataUpdate.workDays?.toString()
                : '',
              startHour: dataUpdate?.startHour ? dataUpdate.startHour : '',
              endHour: dataUpdate?.endHour ? dataUpdate.endHour : '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              editSpecialist(values);
              dispatch(addReload(false));
              setSubmitting(false);
            }}
            enableReinitialize={true}
          >
            {({
              handleChange,
              handleSubmit,
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
                      placeholder="Specialist id"
                      disabled
                    />
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="groupId">
                      <span>Group Id</span>
                      {errors.groupId && touched.groupId ? (
                        <span className={css.error}>{errors.groupId}</span>
                      ) : null}
                    </label>
                    <Field
                      className={css.form__input}
                      type="text"
                      id="groupId"
                      name="groupId"
                      placeholder="Type Specialist group Id"
                      value={values.groupId}
                    />
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="ownerText">
                      <span>Name</span>
                      {errors.ownerText && touched.ownerText ? (
                        <span className={css.error}>{errors.ownerText}</span>
                      ) : null}
                    </label>
                    <Field
                      className={css.form__input}
                      type="text"
                      id="ownerText"
                      name="ownerText"
                      placeholder="Type Specialist name"
                      value={values.ownerText}
                    />
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="ownerColor">
                      <span>Color</span>
                      {errors.ownerColor && touched.ownerColor ? (
                        <span className={css.error}>{errors.ownerColor}</span>
                      ) : null}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Field
                        className={css.form__input}
                        type="text"
                        id="ownerColor"
                        name="ownerColor"
                        placeholder="Type Color"
                        value={values.ownerColor}
                      />
                    </div>
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="designation">
                      <span>Designation</span>
                      {errors.designation && touched.designation ? (
                        <span className={css.error}>{errors.designation}</span>
                      ) : null}
                    </label>
                    <div>
                      <Field
                        className={css.form__input}
                        type="text"
                        id="designation"
                        name="designation"
                        placeholder="Type designation"
                        value={values.designation}
                      />
                    </div>
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="workDays">
                      <span>Work days</span>
                      {errors.workDays && touched.workDays ? (
                        <span className={css.error}>{errors.workDays}</span>
                      ) : null}
                    </label>
                    <Field
                      className={css.form__input}
                      type="text"
                      id="workDays"
                      name="workDays"
                      placeholder="Type Specialist workDays"
                      value={values.workDays}
                    />
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="startHour">
                      <span>Start work hour</span>
                      {errors.startHour && touched.startHour ? (
                        <span className={css.error}>{errors.startHour}</span>
                      ) : null}
                    </label>
                    <Field
                      className={css.form__input}
                      type="text"
                      id="startHour"
                      name="startHour"
                      placeholder="Type Specialist startHour"
                      value={values.startHour}
                    />
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="endHour">
                      <span>End work hour</span>
                      {errors.endHour && touched.endHour ? (
                        <span className={css.error}>{errors.endHour}</span>
                      ) : null}
                    </label>
                    <Field
                      className={css.form__input}
                      type="text"
                      id="endHour"
                      name="endHour"
                      placeholder="Type Specialist endHour"
                      value={values.endHour}
                    />
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
