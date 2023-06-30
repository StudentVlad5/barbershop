import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdClose,
  MdEdit,
  MdAddCard,
  MdChangeCircle,
  MdDone,
} from 'react-icons/md';
import { HiArrowLeft } from 'react-icons/hi';
import { openModalWindow } from 'hooks/modalWindow';
import { addModal } from 'redux/modal/operation';
import { addReload } from 'redux/reload/slice';
import { reloadValue } from 'redux/reload/selectors';
import { fetchData, deleteData, changePassword } from 'services/APIservice';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { PaginationBlock } from 'helpers/Pagination/Pagination';
import { SEO } from 'utils/SEO';
import { EditUserDataModal } from 'components/Admin/EditDataModal/EditUserDataModal';
import { CreateUserDataModal } from 'components/Admin/CreateDataModal/CreateUserDataModal';
import css from 'components/Admin/admin.module.scss';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const reload = useSelector(reloadValue);
  const dispatch = useDispatch();

  // table filter
  const [filterUsers, setFilterUsers] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterPhone, setFilterPhone] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterBirthday, setFilterBirthday] = useState('');
  const [filterCreate, setFilterCreate] = useState('');
  const [filterAvatar, setFilterAvatar] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const handleChangeFilter = e => {
    e.preventDefault;
    switch (e.currentTarget.name) {
      case 'filterName':
        setFilterName(e.currentTarget.value);
        break;
      case 'filterEmail':
        setFilterEmail(e.currentTarget.value);
        break;
      case 'filterPhone':
        setFilterPhone(e.currentTarget.value);
        break;
      case 'filterLocation':
        setFilterLocation(e.currentTarget.value);
        break;
      case 'filterBirthday':
        setFilterBirthday(e.currentTarget.value);
        break;
      case 'filterCreate':
        setFilterCreate(e.currentTarget.value);
        break;
      case 'filterRole':
        setFilterRole(e.currentTarget.value);
        break;
      case 'filterAvatar':
        setFilterAvatar(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const startFilterUsers = e => {
    e.preventDefault;
    const peremOfFilter = [];
    users.map(item => {
      if (
        item.userName.toString().toLowerCase().includes(filterName) &&
        item.email.toString().toLowerCase().includes(filterEmail) &&
        item.phone.toString().toLowerCase().includes(filterPhone) &&
        item.location.toString().toLowerCase().includes(filterLocation) &&
        new Date(item.birthday).toDateString().includes(filterBirthday) &&
        new Date(item.createdAt)
          .toDateString()
          .toLowerCase()
          .includes(filterCreate) &&
        item.role.toString().toLowerCase().includes(filterRole) &&
        Boolean(item.avatar).toString() !== filterAvatar.toString()
      ) {
        peremOfFilter.push(item);
      }
    });

    setFilterUsers(peremOfFilter);
  };

  const cleanFilterUsers = e => {
    e.preventDefault;
    let filterN = '';
    let filterE = '';
    let filterP = '';
    let filterL = '';
    let filterB = '';
    let filterC = '';
    let filterR = '';
    let filterA = '';
if(e.currentTarget.name === 'clearFilterAvatar'){
  document.getElementById('checkIdNoAvatar').checked = false;
  document.getElementById('checkIdYesAvatar').checked = false;
}
    e.currentTarget.name === 'clearFilterName'
      ? setFilterName(filterN)
      : (filterN = filterName);
    e.currentTarget.name === 'clearFilterEmail'
      ? setFilterEmail(filterE)
      : (filterE = filterEmail);
    e.currentTarget.name === 'clearFilterPhone'
      ? setFilterPhone(filterP)
      : (filterP = filterPhone);
    e.currentTarget.name === 'clearFilterLocation'
      ? setFilterLocation(filterL)
      : (filterL = filterLocation);
    e.currentTarget.name === 'clearFilterBirthday'
      ? setFilterBirthday(filterB)
      : (filterB = filterBirthday);
    e.currentTarget.name === 'clearFilterCreate'
      ? setFilterCreate(filterC)
      : (filterC = filterCreate);
    e.currentTarget.name === 'clearFilterRole'
      ? setFilterRole(filterR)
      : (filterR = filterRole);
    e.currentTarget.name === 'clearFilterAvatar'
      ? setFilterAvatar(filterA)
      : (filterA = filterAvatar);
    const peremOfFilter = [];
    users.map(item => {
      if (
        item.userName.toString().toLowerCase().includes(filterN) &&
        item.email.toString().toLowerCase().includes(filterE) &&
        item.phone.toString().toLowerCase().includes(filterP) &&
        item.location.toString().toLowerCase().includes(filterL) &&
        new Date(item.birthday)
          .toDateString()
          .toLowerCase()
          .includes(filterB) &&
        new Date(item.createdAt)
          .toDateString()
          .toLowerCase()
          .includes(filterC) &&
        item.role.toString().toLowerCase().includes(filterR) &&
        Boolean(item.avatar).toString() !== filterA.toString()
      ) {
        peremOfFilter.push(item);
      }
    });

    setFilterUsers(peremOfFilter);
  };

  const handleSearhOnEnter = e => {
    if (e.key == 'Enter') {
      startFilterUsers(e);
    }
  };

  // table pagination
  const [perPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  // __________________________________________________

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData('/admin/users');
        setUsers(data);
        setFilterUsers(data);
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

  async function changePasswordUser(id, email) {
    let isChangePasswordUser = confirm('Are you sure?');
    if (isChangePasswordUser) {
      setIsLoading(true);
      try {
        const { date } = await changePassword(`/admin/users/${id}`, email);
        return date;
      } catch (error) {
        setError(error);
      } finally {
        dispatch(addReload(true));
        setIsLoading(false);
      }
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

    if (e.currentTarget.dataset.modal === 'admin_create-user') {
      dispatch(
        addModal({
          modal: e.currentTarget.dataset.modal,
        }),
      );
      setTimeout(() => openModalWindow(e, null), 500);
    }
  };

  return (
    <>
      <SEO title="Users list" description="User administration page" />
      <section className={'admin' + ' ' + css.section}>
        <div className={css.admin__container}>
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
            <button className={css['learn-more-btn']} onClick={toggleLearnMore}>
              More
            </button>
          )}
          <table className={css.admin__table}>
            <thead className="thead-primary table-sorting">
              <tr className={css.table__row}>
                <th className={css.table__head}>
                  <input
                    type="text"
                    name="filterName"
                    placeholder="Search by Name"
                    value={filterName}
                    onKeyDown={e => handleSearhOnEnter(e)}
                    onChange={e => handleChangeFilter(e)}
                  />
                  <div className="button-wrapper">
                    <button type="button" onClick={e => startFilterUsers(e)}>
                      <MdDone />
                    </button>
                    <button
                      type="button"
                      name="clearFilterName"
                      onClick={e => cleanFilterUsers(e)}
                    >
                      <MdClose />
                    </button>
                  </div>
                </th>
                <th className={css.table__head}>
                  <input
                    type="text"
                    name="filterEmail"
                    placeholder="Search by Email"
                    value={filterEmail}
                    onKeyDown={e => handleSearhOnEnter(e)}
                    onChange={e => handleChangeFilter(e)}
                  />
                  <div className="button-wrapper">
                    <button type="button" onClick={e => startFilterUsers(e)}>
                      <MdDone />
                    </button>
                    <button
                      type="button"
                      name="clearFilterEmail"
                      onClick={e => cleanFilterUsers(e)}
                    >
                      <MdClose />
                    </button>
                  </div>
                </th>
                {isLearnMore && (
                  <>
                    <th className={css.table__head}>
                      <input
                        type="text"
                        name="filterPhone"
                        placeholder="Search by Phone"
                        value={filterPhone}
                        onKeyDown={e => handleSearhOnEnter(e)}
                        onChange={e => handleChangeFilter(e)}
                      />
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterUsers(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterPhone"
                          onClick={e => cleanFilterUsers(e)}
                        >
                          <MdClose />
                        </button>
                      </div>
                    </th>
                    <th className={css.table__head}>
                      <input
                        type="text"
                        name="filterLocation"
                        placeholder="Search by Location"
                        value={filterLocation}
                        onKeyDown={e => handleSearhOnEnter(e)}
                        onChange={e => handleChangeFilter(e)}
                      />
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterUsers(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterLocation"
                          onClick={e => cleanFilterUsers(e)}
                        >
                          <MdClose />
                        </button>
                      </div>
                    </th>
                    <th className={css.table__head}>
                      <input
                        type="text"
                        name="filterBirthday"
                        placeholder="Search by Birthday"
                        value={filterBirthday}
                        onKeyDown={e => handleSearhOnEnter(e)}
                        onChange={e => handleChangeFilter(e)}
                      />
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterUsers(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterBirthday"
                          onClick={e => cleanFilterUsers(e)}
                        >
                          <MdClose />
                        </button>
                      </div>
                    </th>
                    <th className={css.table__head}>
                      <input
                        type="text"
                        name="filterCreate"
                        placeholder="Search by Create"
                        value={filterCreate}
                        onKeyDown={e => handleSearhOnEnter(e)}
                        onChange={e => handleChangeFilter(e)}
                      />
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterUsers(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterCreate"
                          onClick={e => cleanFilterUsers(e)}
                        >
                          <MdClose />
                        </button>
                      </div>
                    </th>
                    <th className={css.table__head}>
                      <div className="radio-wrapper">
                        <label>
                          <input
                            type="radio"
                            name="filterAvatar"
                            value={true}
                            onChange={e => handleChangeFilter(e)}
                            id="checkIdNoAvatar"
                          />
                          No
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="filterAvatar"
                            value={false}
                            onChange={e => handleChangeFilter(e)}
                            id="checkIdYesAvatar"
                          />
                          Yes
                        </label>
                      </div>
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterUsers(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterAvatar"
                          onClick={e => cleanFilterUsers(e)}
                        >
                          <MdClose />
                        </button>
                      </div>
                    </th>
                  </>
                )}
                <th className={css.table__head}>
                  <input
                    type="text"
                    name="filterRole"
                    placeholder="Search by Role"
                    value={filterRole}
                    onKeyDown={e => handleSearhOnEnter(e)}
                    onChange={e => handleChangeFilter(e)}
                  />
                  <div className="button-wrapper">
                    <button type="button" onClick={e => startFilterUsers(e)}>
                      <MdDone />
                    </button>
                    <button
                      type="button"
                      name="clearFilterRole"
                      onClick={e => cleanFilterUsers(e)}
                    >
                      <MdClose />
                    </button>
                  </div>
                </th>
                <th className={css.table__head}></th>
                <th className={css.table__head}></th>
              </tr>
            </thead>
            <tbody>
              <tr className={css.table__row}>
                <th className={css.table__head}>Name</th>
                <th className={css.table__head}>Email</th>
                {isLearnMore && (
                  <>
                    <th className={css.table__head}>Phone</th>
                    <th className={css.table__head}>Location</th>
                    <th className={css.table__head}>Birthday</th>
                    <th className={css.table__head}>Create</th>
                    <th className={css.table__head}>Avatar</th>
                  </>
                )}
                <th className={css.table__head}>Role</th>
                <th className={css.table__head}>Action</th>
                <th className={css.table__head}>Change PW</th>
              </tr>
              {filterUsers.length > 0 &&
                !error &&
                filterUsers.map(user => (
                  <tr key={user._id} className={css.table__row}>
                    <td className={css.table__data}>{user.userName}</td>
                    <td className={css.table__data}>{user.email}</td>
                    {isLearnMore && (
                      <>
                        <td className={css.table__data}>{user.phone}</td>
                        <td className={css.table__data}>{user.location}</td>
                        <td className={css.table__data}>
                          {new Date(user.birthday)
                            .toDateString()
                            .split(' ')
                            .slice(1)
                            .join(' ')}
                        </td>
                        <td className={css.table__data}>
                          {new Date(user.createdAt)
                            .toDateString()
                            .split(' ')
                            .slice(1)
                            .join(' ')}
                        </td>
                        <td className={css.table__data}>
                          {user.avatar ? 'yes' : 'no'}
                        </td>
                      </>
                    )}
                    <td className={css.table__data}>{user.role}</td>
                    <td className={css.table__data}>
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
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                      >
                        <MdClose size={15} />
                      </button>
                    </td>
                    <td className={css.table__data}>
                      <button
                        className={css['icon-btn']}
                        type="button"
                        aria-label="Change password"
                        onClick={() => {
                          changePasswordUser(user._id, user.email);
                        }}
                      >
                        <MdChangeCircle size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button
            className={css['icon-btn']}
            type="button"
            aria-label="Create user"
            onClick={e => {
              openModal(e);
            }}
            data-modal="admin_create_user"
          >
            <MdAddCard size={25} />
          </button>
        </div>
        <PaginationBlock
          items={filterUsers}
          size={size}
          setSize={setSize}
          current={current}
          setCurrent={setCurrent}
        />
      </section>
      <EditUserDataModal />
      <CreateUserDataModal />
    </>
  );
};

export default AdminUsersPage;
