import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { update } from 'redux/auth/operations';
import { TiCamera } from 'react-icons/ti';
import { MdClose, MdDone, MdPrivacyTip } from 'react-icons/md';
import defaultUserPhoto from 'images/user/defaultUserPhoto.jpg';
import { UserDataItem } from './UserDataItem/UserDataItem';
import { LogOut } from './LogOut/LogOut';
import { reloadValue } from 'redux/reload/selectors';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { PaginationBlock } from 'helpers/Pagination/Pagination';
import css from './user.module.scss';
import ChangePasswordForm from 'components/ChangePasswordForm/ChangePasswordForm';
import { openModalChangePassword } from 'hooks/modalWindow';

export const User = () => {
  const [active, setActive] = useState('');
  const [specialists, setSpecialists] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const dispatch = useDispatch();
  let { userIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const reload = useSelector(reloadValue);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // table filter
  const [filterUserEvents, setFilterUserEvents] = useState([]);
  const [filterSubject, setFilterSubject] = useState('');
  const [filterStartTime, setFilterStartTime] = useState('');
  const [filterOwnerId, setFilterOwnerId] = useState('');

  const handleChangeFilter = e => {
    e.preventDefault;
    switch (e.currentTarget.name) {
      case 'filterSubject':
        setFilterSubject(e.currentTarget.value);
        break;
      case 'filterOwnerId':
        setFilterOwnerId(e.currentTarget.value);
        break;
      case 'filterStartTime':
        setFilterStartTime(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const startFilterUserEvents = e => {
    e.preventDefault;
    const peremOfFilter = [];

    userEvents.map(item => {
      let nameOwner = '';
      if (item.NameOfOwner !== '' && item.NameOfOwner !== undefined) {
        nameOwner = item.NameOfOwner;
      }
      if (
        item.Subject.toString().toLowerCase().includes(filterSubject) &&
        new Date(item.StartTime).toDateString().includes(filterStartTime) &&
        nameOwner.toString().toLowerCase().includes(filterOwnerId)
      ) {
        peremOfFilter.push(item);
      }
    });

    setFilterUserEvents(peremOfFilter);
  };

  const cleanFilterUserEvents = e => {
    e.preventDefault;
    let filterS = '';
    let filterST = '';
    let filterO = '';

    e.currentTarget.name === 'clearFilterSubject'
      ? setFilterSubject(filterS)
      : (filterS = filterSubject);
    e.currentTarget.name === 'clearFilterStartTime'
      ? setFilterStartTime(filterST)
      : (filterST = filterStartTime);
    e.currentTarget.name === 'filterOwnerId'
      ? setFilterOwnerId(filterO)
      : (filterO = filterOwnerId);

    const peremOfFilter = [];
    userEvents.map(item => {
      let nameOwner = '';
      if (item.NameOfOwner !== '' && item.NameOfOwner !== undefined) {
        nameOwner = item.NameOfOwner;
      }
      if (
        item.Subject.toString().toLowerCase().includes(filterS) &&
        new Date(item.StartTime).toDateString().includes(filterST) &&
        nameOwner.toString().toLowerCase().includes(filterO)
      ) {
        peremOfFilter.push(item);
      }
    });

    setFilterUserEvents(peremOfFilter);
  };

  const handleSearhOnEnter = e => {
    if (e.key == 'Enter') {
      startFilterUserEvents(e);
    }
  };

  // table pagination and filter
  const [perPage] = useState(10);
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
        setUserEvents(
          data.sort(
            (a, b) => Date.parse(b.StartTime) - Date.parse(a.StartTime),
          ),
        );
        setFilterUserEvents(
          data.sort(
            (a, b) => Date.parse(b.StartTime) - Date.parse(a.StartTime),
          ),
        );
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
    dispatch(update({ avatar: e.target.files[0], _id: userIn._id }));
  };

  let profile = false;

  const birthday = userIn.birthday
    ? new Date(userIn.birthday).toISOString().slice(0, 10)
    : '';

  if (specialists.length > 0) {
    userEvents.map(item => {
      specialists.map(key => {
        if (key.Id === item.OwnerId) {
          item.NameOfOwner = key.ownerText;
        }
      });
    });
  }
  if (specialists.length > 0) {
    filterUserEvents.map(item => {
      specialists.map(key => {
        if (key.Id === item.OwnerId) {
          item.NameOfOwner = key.ownerText;
        }
      });
    });
  }

  return (
    <>
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
            <div style={{display:'flex', justifyContent:"space-between", alignItems:"baseline", flexWrap:"nowrap"}}>
              <div><LogOut /></div>
              <div><MdPrivacyTip style={{marginRight:'10px', scale:'1.3', cursor:"pointer"}} onClick={(e)=>{setIsOpenModal(true), openModalChangePassword(e)}}/></div>
            </div>
          </div>
        </div>
        <div>
          <div className={css['title-group']}>
            <h2 className={css['section-title--size-s']}>My visits:</h2>
          </div>
          <div className="container-fluid mt-5 mb-5">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="card">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-text-small mb-0">
                        <thead className="thead-primary table-sorting">
                          <tr>
                            <th className={css.table__head}>
                              <input
                                type="text"
                                name="filterSubject"
                                placeholder="Search by Service"
                                value={filterSubject}
                                onKeyDown={e => handleSearhOnEnter(e)}
                                onChange={e => handleChangeFilter(e)}
                              />
                              <div className="button-wrapper">
                                <button
                                  type="button"
                                  onClick={e => startFilterUserEvents(e)}
                                >
                                  <MdDone />
                                </button>
                                <button
                                  type="button"
                                  name="clearFilterSubject"
                                  onClick={e => cleanFilterUserEvents(e)}
                                >
                                  <MdClose />
                                </button>
                              </div>
                            </th>
                            <th className={css.table__head}>
                              <input
                                type="text"
                                name="filterStartTime"
                                placeholder="Search by Date"
                                value={filterStartTime}
                                onKeyDown={e => handleSearhOnEnter(e)}
                                onChange={e => handleChangeFilter(e)}
                              />
                              <div className="button-wrapper">
                                <button
                                  type="button"
                                  onClick={e => startFilterUserEvents(e)}
                                >
                                  <MdDone />
                                </button>
                                <button
                                  type="button"
                                  name="clearFilterStartTime"
                                  onClick={e => cleanFilterUserEvents(e)}
                                >
                                  <MdClose />
                                </button>
                              </div>
                            </th>
                            <th className={css.table__head}>
                              <input
                                type="text"
                                name="filterOwnerId"
                                placeholder="Search by Specialist"
                                value={filterOwnerId}
                                onKeyDown={e => handleSearhOnEnter(e)}
                                onChange={e => handleChangeFilter(e)}
                              />
                              <div className="button-wrapper">
                                <button
                                  type="button"
                                  onClick={e => startFilterUserEvents(e)}
                                >
                                  <MdDone />
                                </button>
                                <button
                                  type="button"
                                  name="clearFilterOwnerId"
                                  onClick={e => cleanFilterUserEvents(e)}
                                >
                                  <MdClose />
                                </button>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th className={css.table__head}>Service</th>
                            <th className={css.table__head}>Date</th>
                            <th className={css.table__head}>Specialist</th>
                          </tr>
                          {filterUserEvents.length > 0 &&
                            !error &&
                            filterUserEvents
                              .slice((current - 1) * size, current * size)
                              .map(item => (
                                <tr key={item._id} className={css.table__row}>
                                  <td className={css.table__data}>
                                    {item.Subject}
                                  </td>
                                  <td className={css.table__data}>
                                    {new Date(item.StartTime)
                                      .toDateString()
                                      .split(' ')
                                      .slice(1)
                                      .join(' ')}
                                  </td>
                                  <td className={css.table__data}>
                                    {item.NameOfOwner}
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <PaginationBlock
                      items={filterUserEvents}
                      size={size}
                      setSize={setSize}
                      current={current}
                      setCurrent={setCurrent}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {isOpenModal && <ChangePasswordForm setIsOpenModal={setIsOpenModal} userinID={userIn._id}/>}
    </>
  );
};
