import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdDone } from 'react-icons/md';
import { Formik, Field, Form } from 'formik';
import { closeModalWindow } from 'hooks/modalWindow';
import { cleanModal } from 'redux/modal/operation';
import { modalComponent } from 'redux/modal/selectors';
import { addReload } from 'redux/reload/slice';
import { fetchData, updateOwnerData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import { setImage } from 'utils/setimage';
import css from './editDataModal.module.scss';
import { listOfColors } from '../../../helpers/Constants/colors';

export const EditOwnerDataModal = () => {
  const [dataUpdate, setDataUpdate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let [sunday, setSunday] = useState(false);
  let [monday, setMonday] = useState(false);
  let [tuesday, setTuesday] = useState(false);
  let [wednesday, setWednesday] = useState(false);
  let [thursday, setThursday] = useState(false);
  let [friday, setFriday] = useState(false);
  let [saturday, setSaturday] = useState(false);
  const modal = useSelector(modalComponent);
  const dispatch = useDispatch();
  const itemForFetch = `/admin/owners/${modal.id}`;
  const arr = Object.keys(listOfColors);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(itemForFetch);
        setDataUpdate(data);
        if (data.workDays?.includes('7')) {
          setSunday(true);
        }
        if (data.workDays?.includes('1')) {
          setMonday(true);
        }
        if (data.workDays?.includes('2')) {
          setTuesday(true);
        }
        if (data.workDays?.includes('3')) {
          setWednesday(true);
        }
        if (data.workDays?.includes('4')) {
          setThursday(true);
        }
        if (data.workDays?.includes('5')) {
          setFriday(true);
        }
        if (data.workDays?.includes('6')) {
          setSaturday(true);
        }
        if (data.workDays?.includes('1')) {
          setMonday(true);
        }
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

  async function editOwner(formData) {
    const file = document.querySelector('#avatar')?.files[0];
    setIsLoading(true);
    try {
      const { date } = await updateOwnerData(itemForFetch, formData, file);
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
    setSunday(false);
    setMonday(false);
    setTuesday(false);
    setWednesday(false);
    setThursday(false);
    setFriday(false);
    setSaturday(false);
    setMonday(false);
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
              workDays: dataUpdate?.workDays
                ? dataUpdate.workDays.split(',')
                : '',
              avatar: '',
              startHour: dataUpdate?.startHour ? dataUpdate.startHour : '',
              endHour: dataUpdate?.endHour ? dataUpdate.endHour : '',
              facebook: dataUpdate?.facebook ? dataUpdate?.facebook : '',
              instagram: dataUpdate?.instagram ? dataUpdate?.instagram : '',
              linkedin: dataUpdate?.linkedin ? dataUpdate?.linkedin : '',
              twitter: dataUpdate?.twitter ? dataUpdate?.twitter : '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              editOwner(values);
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
                        as="select"
                        id="ownerColor"
                        name="ownerColor"
                        placeholder={values.ownerColor}
                      >
                        {arr.map(item => (
                          <option key={item} value={listOfColors.item}>
                            {item}
                          </option>
                        ))}
                      </Field>
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
                    <label className={css.form__label} htmlFor="facebook">
                      <span>Facebook</span>
                      {errors.facebook && touched.facebook ? (
                        <span className={css.error}>{errors.facebook}</span>
                      ) : null}
                    </label>
                    <div>
                      <Field
                        className={css.form__input}
                        type="text"
                        id="facebook"
                        name="facebook"
                        placeholder="Type facebook"
                        value={values.facebook}
                      />
                    </div>
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="instagram">
                      <span>Instagram</span>
                      {errors.instagram && touched.instagram ? (
                        <span className={css.error}>{errors.instagram}</span>
                      ) : null}
                    </label>
                    <div>
                      <Field
                        className={css.form__input}
                        type="text"
                        id="instagram"
                        name="instagram"
                        placeholder="Type instagram"
                        value={values.instagram}
                      />
                    </div>
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="linkedin">
                      <span>Linkedin</span>
                      {errors.linkedin && touched.linkedin ? (
                        <span className={css.error}>{errors.linkedin}</span>
                      ) : null}
                    </label>
                    <div>
                      <Field
                        className={css.form__input}
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        placeholder="Type linkedin"
                        value={values.linkedin}
                      />
                    </div>
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="twitter">
                      <span>Twitter</span>
                      {errors.twitter && touched.twitter ? (
                        <span className={css.error}>{errors.twitter}</span>
                      ) : null}
                    </label>
                    <div>
                      <Field
                        className={css.form__input}
                        type="text"
                        id="twitter"
                        name="twitter"
                        placeholder="Type twitter"
                        value={values.twitter}
                      />
                    </div>
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="avatar">
                      <span>Avatar</span>
                      {errors.avatar && touched.avatar ? (
                        <span className={css.error}>{errors.avatar}</span>
                      ) : null}
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: '4px',
                      }}
                    >
                      {dataUpdate?.avatar ? (
                        <Field
                          className={css['form__field-item']}
                          style={{
                            backgroundImage: `url(${dataUpdate?.avatar})`,
                            backgroundSize: '50px,50px',
                          }}
                          type="file"
                          id="avatar"
                          name="avatar"
                          accept=".jpeg,.jpg,.png,.gif"
                          onChange={e => {
                            handleChange;
                            setImage(e);
                          }}
                        />
                      ) : (
                        <Field
                          className={css['form__field-item']}
                          type="file"
                          id="avatar"
                          name="avatar"
                          accept=".jpeg,.jpg,.png,.gif"
                          onChange={e => {
                            handleChange;
                            setImage(e);
                          }}
                        />
                      )}
                    </div>
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
                      type="time"
                      min="06:00"
                      max="18:00"
                      required
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
                      type="time"
                      min="09:00"
                      max="22:00"
                      required
                      id="endHour"
                      name="endHour"
                      placeholder="Type Specialist endHour"
                      value={values.endHour}
                    />
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} id="checkbox-group">
                      workDays
                    </label>
                    <ul
                      className={css.list + ' ' + css['form__checkbox-list']}
                      role="group"
                      aria-labelledby="checkbox-group"
                    >
                      <li className={css['form__checkbox-item']}>
                        <label className={css.form__label}>
                          <Field
                            type="checkbox"
                            name="workDays"
                            value="7"
                            checked={sunday}
                            onChange={() => setSunday(!sunday)}
                          />{' '}
                          Sun
                        </label>
                      </li>
                      <li className={css['form__checkbox-item']}>
                        <label className={css.form__label}>
                          <Field
                            type="checkbox"
                            name="workDays"
                            value="1"
                            checked={monday}
                            onChange={() => setMonday(!monday)}
                          />{' '}
                          Mon
                        </label>
                      </li>
                      <li className={css['form__checkbox-item']}>
                        <label className={css.form__label}>
                          <Field
                            type="checkbox"
                            name="workDays"
                            value="2"
                            checked={tuesday}
                            onChange={() => setTuesday(!tuesday)}
                          />{' '}
                          Tue
                        </label>
                      </li>
                      <li className={css['form__checkbox-item']}>
                        <label className={css.form__label}>
                          <Field
                            type="checkbox"
                            name="workDays"
                            value="3"
                            checked={wednesday}
                            onChange={() => setWednesday(!wednesday)}
                          />{' '}
                          Wed
                        </label>
                      </li>
                      <li className={css['form__checkbox-item']}>
                        <label className={css.form__label}>
                          <Field
                            type="checkbox"
                            name="workDays"
                            value="4"
                            checked={thursday}
                            onChange={() => setThursday(!thursday)}
                          />{' '}
                          Thu
                        </label>
                      </li>
                      <li className={css['form__checkbox-item']}>
                        <label className={css.form__label}>
                          <Field
                            type="checkbox"
                            name="workDays"
                            value="5"
                            checked={friday}
                            onChange={() => setFriday(!friday)}
                          />{' '}
                          Fri
                        </label>
                      </li>
                      <li className={css['form__checkbox-item']}>
                        <label className={css.form__label}>
                          <Field
                            type="checkbox"
                            name="workDays"
                            value="6"
                            checked={saturday}
                            onChange={() => setSaturday(!saturday)}
                          />{' '}
                          Sat
                        </label>
                      </li>
                    </ul>
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
