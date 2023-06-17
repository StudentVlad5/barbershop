import { useDispatch } from 'react-redux';
import css from './UserDataItem.module.scss';
import { useState } from 'react';
import { update } from 'redux/auth/operations';
import PropTypes from 'prop-types';
import check from '../../../../images/sprite.svg';
import pencil from '../../../../images/sprite.svg';

export const UserDataItem = ({
  name,
  label,
  type,
  defaultValue,
  profile,
  active,
  setActive,
  dataId
}) => {
  const emailRegExp = /^.+@.+\..+$/;
  const cityRegex = /^[a-zA-Z\s,'-]+$/;
  const phoneRegExp = /^\+380\d{9}$/;
  const dayToday = new Date().toLocaleDateString();
  const minDate = new Date('01.01.1910').toLocaleDateString();

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(defaultValue ?? '');
  const [isError, setIsError] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    if (name === 'userName') {
      setInputValue(value);
    }
    if (name === 'email') {
      setInputValue(value);
    } else if (name === 'birthday') {
      setInputValue(value);
    } else if (name === 'phone') {
      setInputValue(value);
    } else if (name === 'location') {
      setInputValue(value);
    }
  };

  const handleSubmit = name => {
    if (name === 'userName') {
      setActive('userName');
      if (
        inputValue.length !== 0 &&
        (inputValue.length < 2 || inputValue.length > 16)
      ) {
        setIsError('type from 2 to 16 letters');
        return;
      }
      setIsError('');
      setActive('');
      dispatch(update({ userName: inputValue, _id : dataId}));
    } else if (name === 'email') {
      setActive('email');
      if (!inputValue.match(emailRegExp)) {
        setIsError('please type valid email');
        return;
      }
      setIsError('');
      setActive('');
      dispatch(update({ email: inputValue, _id : dataId}));
    } else if (name === 'birthday') {
      setActive('birthday');
      if (inputValue > dayToday) {
        setIsError('date must be current');
        return;
      }
      if (inputValue < minDate) {
        setIsError('date must be current');
        return;
      }
      setIsError('');
      setActive('');
      dispatch(
        update({
          birthday: inputValue,
        }),
      );
    } else if (name === 'phone') {
      setActive('phone');
      if (!phoneRegExp.test(inputValue)) {
        setIsError('please type valid phone number starting with +380');
        return;
      }
      if (inputValue.length !== 13) {
        setIsError('phone number should contain 13 digits');
        return;
      }
      setIsError('');
      setActive('');
      dispatch(update({ phone: inputValue, _id : dataId }));
    } else if (name === 'location') {
      setActive('location');
      if (!inputValue.match(cityRegex)) {
        setIsError('use format Kyiv, Brovary');
        return;
      }
      setIsError('');
      setActive('');
      dispatch(update({ location: inputValue, _id : dataId }));
    }
  };

  const activeHandleClick = name => {
    if (!active) setActive(name);
  };

  return (
    <>
      <div className={css['user-data-item-wrapper']}>
        <label htmlFor={name} className={css['title-name']}>
          {label}
        </label>

        <div className={css['user-data-item-input-btn-wrapper']}>
          <div className={css['input-wrapper']}>
            <input
              value={!profile ? inputValue : defaultValue}
              onChange={handleChange}
              className={
                active === name ? css.active : '' + css['user-data-item-input']
              }
              disabled={active !== name}
              type={type}
              name={name}
              id={name}
            />
            {isError && active === name ? (
              <div className={css.error}>{isError}</div>
            ) : null}
          </div>

          {!profile &&
            (active == name ? (
              <button
                className={css['user-data-item-btn']}
                type="button"
                onClick={() => handleSubmit(name)}
              >
                <svg className={css['icon-check']} width="20" height="20">
                  <use href={check + '#check'}></use>
                </svg>
              </button>
            ) : (
              <button
                className={css['user-data-item-btn']}
                type="button"
                disabled={active && active !== name}
                onClick={() => activeHandleClick(name)}
              >
                <svg className={css['icon-pencil']} width="20" height="20">
                  <use href={pencil + '#pencil'}></use>
                </svg>
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

UserDataItem.propTypes = {
  name: PropTypes.string,
  dataId: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  profile: PropTypes.bool,
  active: PropTypes.string,
  setActive: PropTypes.func,
};
