import React from 'react';
import { useSelector } from 'react-redux';
import { getPermission, selectUser, getUserAvatar } from 'redux/auth/selectors';
import {
  MobileAccountButton,
  AccountButton,
  IconUser,
  AvatarUser,
} from './UserNav.styled';
// import { useTranslation } from 'react-i18next';

export const MobileUserNav = () => {
  const user = useSelector(selectUser);
  const avatar = useSelector(getUserAvatar);
  const permission = useSelector(getPermission);
  // const { t } = useTranslation();

  return permission === 'admin' ? (
    <MobileAccountButton>
      {avatar ? <AvatarUser src={avatar} alt="User" /> : <IconUser />}
      {user}
    </MobileAccountButton>
  ) : (
    <MobileAccountButton>
      {avatar ? <AvatarUser src={avatar} alt="User" /> : <IconUser />}
      {user}
    </MobileAccountButton>
  );
};

export const UserNav = () => {
  const user = useSelector(selectUser);
  const avatar = useSelector(getUserAvatar);
  const permission = useSelector(getPermission);

  return permission === 'admin' ? (
    <AccountButton>
      {avatar ? <AvatarUser src={avatar} alt="User" /> : <IconUser />}
      {user}
    </AccountButton>
  ) : (
    <AccountButton>
      {avatar ? <AvatarUser src={avatar} alt="User" /> : <IconUser />}
      {user}
    </AccountButton>
  );
};