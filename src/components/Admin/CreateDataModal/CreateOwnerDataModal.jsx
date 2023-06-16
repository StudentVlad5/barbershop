import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdDone } from 'react-icons/md';
import { Formik, Field, Form } from 'formik';
import { closeModalWindow } from 'hooks/modalWindow';
import { cleanModal } from 'redux/modal/operation';
import { modalComponent } from 'redux/modal/selectors';
import { addReload } from 'redux/reload/slice';
import { createOwnerData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import css from './createDataModal.module.scss';
import { listOfColors } from 'helpers/Constants/colors';

export const CreateOwnerDataModal = () => {

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

  const arr = Object.keys(listOfColors);

  // create owner

  async function createOwner(values) {
    setIsLoading(true);
    try {
      const { code } = await createOwnerData(
        `/admin/owners/create`,
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
    Object.values(modal)[0] === 'admin_create_owner' && (
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
              id: '',
              groupId: '',
              ownerText: '',
              ownerColor: '',
              designation: '',
              workDays: '',
              startHour: '',
              endHour: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              createOwner(values);
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
                       {arr.map((item) => <option key={item} value={listOfColors.item}>{item}</option>)}
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
                    <div id="checkbox-group">workDays</div>
                    <div role="group" aria-labelledby="checkbox-group" style={{display:"flex", flexDirection:"column"}}>
                    <div>
                    <label>
                    <Field type="checkbox" name="workDays" value="7" checked={sunday} onChange={()=>setSunday(!sunday)}/> 
                    Sunday
                    </label>
                    <label>
                    <Field type="checkbox" name="workDays" value="1" checked={monday} onChange={()=>setMonday(!monday)}/> 
                    Monday
                    </label>
                    </div>
                    <div>
                    <label>
                    <Field type="checkbox" name="workDays" value="2" checked={tuesday} onChange={()=>setTuesday(!tuesday)}/> 
                    Tuesday
                    </label>
                    <label>
                    <Field type="checkbox" name="workDays" value="3" checked={wednesday} onChange={()=>setWednesday(!wednesday)}/> 
                    Wednesday 
                    </label>
                    </div>
                    <div>
                    <label>
                    <Field type="checkbox" name="workDays" value="4" checked={thursday} onChange={()=>setThursday(!thursday)}/> 
                    Thursday  
                    </label>
                    <label>
                    <Field type="checkbox" name="workDays" value="5" checked={friday} onChange={()=>setFriday(!friday)}/> 
                    Friday   
                    </label>
                    </div>
                    <label>
                    <Field type="checkbox" name="workDays" value="6" checked={saturday} onChange={()=>setSaturday(!saturday)}/> 
                    Saturday    
                    </label>
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
