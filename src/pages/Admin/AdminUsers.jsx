import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdEdit } from 'react-icons/md';
import { HiArrowLeft } from 'react-icons/hi';
import { openModalWindow } from 'hooks/modalWindow';
import { addModal } from 'redux/modal/operation';
import { addReload } from 'redux/reload/slice';
import { reloadValue } from 'redux/reload/selectors';
import { fetchData, deleteData } from 'services/APIservice';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { SEO } from 'utils/SEO';
import { EditUserDataModal } from 'components/Admin/EditDataModal/EditUserDataModal';
import css from 'components/Admin/admin.module.scss';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const reload = useSelector(reloadValue);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData('/admin/users');
        setUsers(data);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
    if (reload) {
      getData();
      dispatch(addReload(false));
    }
  }, [reload, dispatch]);

  async function deleteUser(id) {
    setIsLoading(true);
    try {
      const { date } = await deleteData(`/admin/users/${id}`);
      return date;
    } catch (error) {
      setError(error);
    } finally {
      dispatch(addReload(true));
      setIsLoading(false);
    }
  }

  // add link to back
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/admin';

  // watch for view and toggle columns
  const viewWidth = window.screen.width;
  const [isLearnMore, setIsLearnMore] = useState(viewWidth >= 1280);
  const toggleLearnMore = () => setIsLearnMore(state => !state);

  // add edit modal
  const openModal = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.dataset.modal === 'admin') {
      dispatch(
        addModal({
          modal: e.currentTarget.dataset.modal,
          id: e.currentTarget.dataset.id,
        }),
      );
      setTimeout(() => openModalWindow(e, null), 500);
    }
  };

  const date = date => (date ? new Date(date).toISOString().slice(0, 10) : '');

  return (
    <>
      <SEO title="Users list" description="User administration page" />
      <section className={'admin' + ' ' + css.section}>
        <div className={css.container}>
          <Link to={backLinkHref} className={css['back-btn']}>
            <HiArrowLeft size="10" /> Go back
          </Link>
          {isLoading ? onLoading() : onLoaded()}
          {error && onFetchError('Whoops, something went wrong')}
          {isLearnMore ? (
            <button className={css['learn-more-btn']} onClick={toggleLearnMore}>
              Less
            </button>
          ) : (
            <button onClick={toggleLearnMore}>More</button>
          )}
          <table className={css.admin__table}>
            <thead>
              <tr className={css.admin__row}>
                {/* <th >ID</th > */}
                <th className={css.admin__head}>Name</th>
                <th className={css.admin__head}>Email</th>
                {isLearnMore && (
                  <>
                    <th className={css.admin__head}>Phone</th>
                    <th className={css.admin__head}>Location</th>
                    <th className={css.admin__head}>Birthday</th>
                    <th className={css.admin__head}>Create</th>
                    <th className={css.admin__head}>Avatar</th>
                  </>
                )}
                <th className={css.admin__head}>Role</th>
                <th className={css.admin__head}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                !error &&
                users.map(user => (
                  <tr key={user._id} className={css.admin__row}>
                    {/* <td>{user._id}</td> */}
                    <td className={css.admin__data}>{user.userName}</td>
                    <td className={css.admin__data}>{user.email}</td>
                    {isLearnMore && (
                      <>
                        <td className={css.admin__data}>{user.phone}</td>
                        <td className={css.admin__data}>{user.location}</td>
                        <td className={css.admin__data}>
                          {date(user.birthday)}
                        </td>
                        <td className={css.admin__data}>
                          {date(user.createdAt)}
                        </td>
                        <td className={css.admin__data}>
                          {user.avatar ? 'yes' : 'no'}
                        </td>
                      </>
                    )}
                    <td className={css.admin__data}>{user.role}</td>
                    <td className={css.admin__data}>
                      <button
                        className={css['icon-btn']}
                        type="button"
                        aria-label="Edit user"
                        onClick={e => {
                          openModal(e);
                        }}
                        data-modal="admin"
                        data-id={user._id}
                      >
                        <MdEdit size={15} />
                      </button>
                      <button
                        className={css['icon-btn']}
                        type="button"
                        aria-label="Delete user"
                        onClick={e => {
                          deleteUser(user._id);
                        }}
                      >
                        <MdClose size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
      <EditUserDataModal />
    </>
  );
};

export default AdminUsersPage;
