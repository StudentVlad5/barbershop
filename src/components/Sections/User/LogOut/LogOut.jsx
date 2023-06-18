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
    <button className={css['btn--without-border']} onClick={logout}>
      <MdLogout size={18} />
      Log out
    </button>
  );
};
