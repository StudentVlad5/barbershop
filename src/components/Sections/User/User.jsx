import { useAuth } from 'hooks/useAuth';
import css from './user.module.scss';
import { useDispatch } from 'react-redux';
import { update } from 'redux/auth/operations';
import defaultUserPhoto from '../../../images/user/defaultUserPhoto.webp';
// import { UserDataItem } from './UserDataItem/UserDataItem';
import { useState } from 'react';

export const User = () => {
  const [active, setActive] = useState('');
  const dispatch = useDispatch();
  let userIn = useAuth();

  const changeAvatar = e => {
    const data = new FormData();
    data.append('avatar', e.target.files[0]);
    dispatch(update(data));
  };

  let profile = false;

  const birthday = userIn.birthday
    ? new Date(userIn.birthday).toISOString().slice(0, 10)
    : '';

  return (
    <div className={css.user + ' ' + css.section}>
      <div className={css["img-box"]}>
        <img
          src={userIn.avatar ? userIn.avatar : defaultUserPhoto}
          alt="User"
        />
        <div>
          <label htmlFor="user_photo">
            <input
              type="file"
              name="file"
              id="user_photo"
              onChange={changeAvatar}
              accept=".gif,.jpg,.jpeg,.webp,.png"
            />
          </label>
        </div>
      </div>
      <ul className={css['input-list']}>
        <input
          className={css['input-list__item']}
          profile={profile}
          label={'Name:'}
          defaultValue={userIn.userName}
          type="text"
          name="userName"
          // active={active}
          // setActive={setActive}
          id="name"
        />

        <input
          className={css['input-list__item']}
          profile={profile}
          label={'Email:'}
          defaultValue={userIn.email}
          type="email"
          name="email"
          // active={active}
          // setActive={setActive}
          id="email"
        />

        <input
          className={css['input-list__item']}
          profile={profile}
          label={'Birthday:'}
          defaultValue={birthday || '01.01.1900'}
          type="date"
          name="birthday"
          // active={active}
          // setActive={setActive}
          id="birthday"
        />

        <input
          className={css['input-list__item']}
          profile={profile}
          label={'Phone:'}
          defaultValue={userIn.phone}
          type="tel"
          name="phone"
          // active={active}
          // setActive={setActive}
          id="phone"
        />

        <input
          className={css['input-list__item']}
          profile={profile}
          label={'City:'}
          defaultValue={userIn.location}
          type="text"
          name="location"
          // active={active}
          // setActive={setActive}
          id="city"
        />
      </ul>

      <div>
        <button>Schedule</button>
      </div>
    </div>
  );
};
