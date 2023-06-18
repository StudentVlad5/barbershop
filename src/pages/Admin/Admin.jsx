import React from 'react';
import { NavLink } from 'react-router-dom';
import { SEO } from 'utils/SEO';
import css from 'components/Admin/admin.module.scss';
import { User } from 'components/Sections/User/User';

const AdminPage = () => {
  return (
    <>
      <SEO title="Administration" description="Page Administration" />
      <User />
      <section className={css.admin + ' ' + css.section} id="admin">
        <div className={css.admin__container + ' ' + css.container}>
          <div className={css['title-group']}>
            <h2 className={css['section-title--size-s']}>Administration:</h2>
          </div>
          <ul className={css.admin__list + ' ' + css.list}>
            <li className={css.admin__item}>
              <NavLink className={css.admin__link} to="users">
                Users
              </NavLink>
            </li>
            <li className={css.admin__item}>
              <NavLink className={css.admin__link} to="services">
                Services
              </NavLink>
            </li>
            <li className={css.admin__item}>
              <NavLink className={css.admin__link} to="owners">
                Specialist
              </NavLink>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default AdminPage;
