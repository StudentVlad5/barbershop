import css from "./logout.module.scss";
import { logOut } from "redux/auth/operations";
import { useDispatch } from "react-redux";

export const LogOut = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logOut());
  };
  return (
    <button
      onClick={logout}
      className={
        css.btn + " " + css["btn--mode-light"] + " " + css["btn--size-m"]
      }
    >
      LOG OUT
    </button>
  );
};
