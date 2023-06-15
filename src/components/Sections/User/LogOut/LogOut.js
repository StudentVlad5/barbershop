import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { MdLogout } from 'react-icons/md';
import css from './logout.module.scss';

export const LogOut = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logOut());
  };
  return (
    <button
      onClick={logout}
      className={
        css.btn + ' ' + css['btn--mode-light'] + ' ' + css['btn--size-m']
      }
    >
      LOG OUT
    </button>
  );
};
