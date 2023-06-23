import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { update } from 'redux/auth/operations';
import { TiCamera } from 'react-icons/ti';
import defaultUserPhoto from 'images/user/defaultUserPhoto.jpg';
import { UserDataItem } from './UserDataItem/UserDataItem';
import { LogOut } from './LogOut/LogOut';
import { reloadValue } from 'redux/reload/selectors';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import css from './user.module.scss';
import { PaginationBlock } from 'helpers/Pagination/Pagination';

export const User = () => {
  const [active, setActive] = useState('');
  const [specialists, setSpecialists] = useState([]);
  const [userEvents, setUserEvents] = useState('');
  const dispatch = useDispatch();
  let { userIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const reload = useSelector(reloadValue);

// table pagination and filter
const [perPage, ] = useState(10);
const [size, setSize] = useState(perPage);
const [current, setCurrent] = useState(1);
// __________________________________________________

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/user/events/${userIn._id}`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setUserEvents(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [reload]);

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData('/admin/owners');
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setSpecialists(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [reload]);

  const changeAvatar = e => {
    dispatch(update({"avatar": e.target.files[0], '_id': userIn._id}));
  };

  let profile = false;

  const birthday = userIn.birthday
    ? new Date(userIn.birthday).toISOString().slice(0, 10)
    : '';

  return (
    <section className={css.user + ' ' + css.section}>
          {isLoading ? onLoading() : onLoaded()}
          {error && onFetchError('Whoops, something went wrong')}
      <div className={css.user__container + ' ' + css.container}>
        <div>
          <div className={css['title-group']}>
            <h2 className={css['section-title--size-s']}>My information:</h2>
          </div>
          <div className={css.user__wrapper}>
            <div className={css['img-box']}>
              <img
                className={css['user-img']}
                width="250"
                height="250"
                src={userIn.avatar ? userIn.avatar : defaultUserPhoto}
                alt="User"
              />
              <div className={css['change-wrapper']}>
                <div className={css['edit-camera-warapper']}>
                  <label htmlFor="user_photo" className={css['lable-user']}>
                    <TiCamera className={css['edit-icon']} size={18} />
                    <span className={css['edit-photo-text']}>Edit photo</span>
                  </label>
                </div>

                <input
                  className={css['change-photo-user']}
                  type="file"
                  name="file"
                  id="user_photo"
                  onChange={changeAvatar}
                  accept=".gif,.jpg,.jpeg,.webp,.png"
                />
              </div>
            </div>
            <ul className={css['input-list']}>
              <UserDataItem
                className={css['input-list__item']}
                profile={profile}
                label={'Name:'}
                defaultValue={userIn.userName}
                type="text"
                name="userName"
                active={active}
                setActive={setActive}
                id="name"
              />

              <UserDataItem
                className={css['input-list__item']}
                profile={profile}
                label={'Email:'}
                defaultValue={userIn.email}
                type="email"
                name="email"
                active={active}
                setActive={setActive}
                id="email"
              />

              <UserDataItem
                className={css['input-list__item']}
                profile={profile}
                label={'Birthday:'}
                defaultValue={birthday || '01.01.1900'}
                type="date"
                name="birthday"
                active={active}
                setActive={setActive}
                id="birthday"
              />

              <UserDataItem
                className={css['input-list__item']}
                profile={profile}
                label={'Phone:'}
                defaultValue={userIn.phone}
                type="tel"
                name="phone"
                active={active}
                setActive={setActive}
                id="phone"
              />

              <UserDataItem
                className={css['input-list__item']}
                profile={profile}
                label={'City:'}
                defaultValue={userIn.location}
                type="text"
                name="location"
                active={active}
                setActive={setActive}
                id="city"
              />
            </ul>
            <LogOut />
          </div>
        </div>
            <div className="container-fluid mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                        <div className="card-body p-0">
                            <PaginationBlock  items={userEvents} size={size} setSize={setSize}  current={current} setCurrent={setCurrent}/>
                            <div className="table-responsive">
                                <table className="table table-text-small mb-0">
                                    <thead className="thead-primary table-sorting">
                                        <tr>
                                            <th className={css.table__head}>Service</th>
                                            <th className={css.table__head}>Date</th>
                                            <th className={css.table__head}>Specialist</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {userEvents.length > 0 &&  !error && userEvents.slice((current - 1) * size, current * size).map( item => (<tr key={item._id} className={css.table__row}>
                                    <td className={css.table__data}>
                                    {item.Subject}
                                    </td>
                                    <td className={css.table__data}>
                                    {item.StartTime.split('T')[0].split('-').reverse().join(' ')}
                                    </td>
                                    <td className={css.table__data}>
                                    {specialists .length > 0 && !error && specialists.map(key => {if(key.Id === item.OwnerId){return key.ownerText}})}
                                    </td></tr>))}
                                    </tbody>
                                </table>
                            </div>
                            <PaginationBlock  items={userEvents} size={size} setSize={setSize}  current={current} setCurrent={setCurrent}/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
      </div>
    </section>
  );
};
