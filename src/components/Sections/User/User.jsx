import { useAuth } from 'hooks/useAuth';
import css from './user.module.scss';
import { useDispatch } from 'react-redux';
import { update } from 'redux/auth/operations';
import defaultUserPhoto from '../../../images/user/defaultUserPhoto.jpg';
import { UserDataItem } from './UserDataItem/UserDataItem';
import { useState } from 'react';

export const User = () => {
  const [active, setActive] = useState('');
  const dispatch = useDispatch();
  let { userIn } = useAuth();

  const changeAvatar = e => {
    console.log(userIn._id)
    const data = new FormData();
    data.append('avatar', e.target.files[0]);
    data.append('_id', userIn._id);
    dispatch(update(data));
  };

  let profile = false;

  const birthday = userIn.birthday
    ? new Date(userIn.birthday).toISOString().slice(0, 10)
    : '';

  return (
    <div className={css.user + ' ' + css.section}>
      <div className={css['img-box']}>
        <img
          className={css['user-img']}
          width="250"
          height="250"
          src={userIn.avatar ? userIn.avatar : defaultUserPhoto}
          alt="User"
        />
        <div>

          <div className={css['edit-camera-warapper']}>
            <label htmlFor="user_photo" className={css['lable-user']}>
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
          dataId={userIn._id}
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
          dataId={userIn._id}
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
          dataId={userIn._id}
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
          dataId={userIn._id}
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
          dataId={userIn._id}
        />
      </ul>
    </div>
  );
};
