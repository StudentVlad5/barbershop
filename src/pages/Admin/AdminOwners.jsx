import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdEdit, MdAddCard } from 'react-icons/md';
import { HiArrowLeft } from 'react-icons/hi';
import { openModalWindow } from 'hooks/modalWindow';
import { addModal } from 'redux/modal/operation';
import { addReload } from 'redux/reload/slice';
import { reloadValue } from 'redux/reload/selectors';
import { fetchData, deleteData } from 'services/APIservice';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { SEO } from 'utils/SEO';
import { EditOwnerDataModal } from 'components/Admin/EditDataModal/EditOwnerDataModal';
import { CreateOwnerDataModal } from 'components/Admin/CreateDataModal/CreateOwnerDataModal';
import { PaginationBlock } from 'helpers/Pagination/Pagination';
import css from 'components/Admin/admin.module.scss';

const AdminOwnerPage = () => {
  const [specialists, setSpecialists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const reload = useSelector(reloadValue);
  const dispatch = useDispatch();

    // table pagination and filter
const [perPage, ] = useState(10);
const [size, setSize] = useState(perPage);
const [current, setCurrent] = useState(1);
// __________________________________________________

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData('/admin/owners');
        setSpecialists(data);
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

  async function deleteSpecialist(id) {
    setIsLoading(true);
    try {
      const { date } = await deleteData(`/admin/owners/${id}`);
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
    if (
      e.currentTarget.dataset.modal === 'admin' ||
      e.currentTarget.dataset.modal === 'admin_create_owner'
    ) {
      dispatch(
        addModal({
          modal: e.currentTarget.dataset.modal,
          id: e.currentTarget.dataset.id,
        }),
      );
      setTimeout(() => openModalWindow(e, null), 500);
    }
  };

  return (
    <>
      <SEO
        title="Specialists list"
        description="Specialists administration page"
      />
      <section className={'admin' + ' ' + css.section}>
      <PaginationBlock  items={specialists} size={size} setSize={setSize}  current={current} setCurrent={setCurrent}/>
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
            <thead>
              <tr className={css.table__row}>
                <th className={css.table__head}>ID</th>
                <th className={css.table__head}>Name</th>
                <th className={css.table__head}>Color</th>
                <th className={css.table__head}>Designation</th>
                {isLearnMore && (
                  <>
                    <th className={css.table__head}>Work Days</th>
                    <th className={css.table__head}>Start Work Hour</th>
                    <th className={css.table__head}>End Work Hour</th>
                    <th className={css.table__head}>Group ID</th>
                    <th className={css.table__head}>Avatar</th>
                    <th className={css.table__head}>Facebook</th>
                    <th className={css.table__head}>Instagram</th>
                    <th className={css.table__head}>Linkedin</th>
                    <th className={css.table__head}>Twitter</th>
                  </>
                )}
                <th className={css.table__head}>Action</th>
              </tr>
            </thead>
            <tbody>
              {specialists.length > 0 &&
                !error &&
                specialists.map(specialist => (
                  <tr
                    key={specialist._id}
                    className={css.table__row}
                    style={{ backgroundColor: `${specialist.ownerColor}` }}
                  >
                    <td className={css.table__data}>{specialist.Id}</td>
                    <td className={css.table__data}>{specialist.ownerText}</td>
                    <td className={css.table__data}>{specialist.ownerColor}</td>
                    <td className={css.table__data}>
                      {specialist.designation}
                    </td>
                    {isLearnMore && (
                      <>
                        <td className={css.table__data}>
                          {specialist.workDays?.toString()}
                        </td>
                        <td className={css.table__data}>
                          {specialist.startHour}
                        </td>
                        <td className={css.table__data}>
                          {specialist.endHour}
                        </td>
                        <td className={css.table__data}>
                          {specialist.groupId}
                        </td>
                        <td className={css.table__data}>
                          {specialist.avatar ? 'yes' : 'no'}
                        </td>
                        <td className={css.table__data}>
                          {specialist.facebook ? 'yes' : 'no'}
                        </td>
                        <td className={css.table__data}>
                          {specialist.instagram ? 'yes' : 'no'}
                        </td>
                        <td className={css.table__data}>
                          {specialist.linkedin ? 'yes' : 'no'}
                        </td>
                        <td className={css.table__data}>
                          {specialist.twitter ? 'yes' : 'no'}
                        </td>
                      </>
                    )}
                    <td className={css.table__data}>
                      <button
                        className={css['icon-btn']}
                        type="button"
                        aria-label="Edit specialist"
                        onClick={e => {
                          openModal(e);
                        }}
                        data-modal="admin"
                        data-id={specialist._id}
                      >
                        <MdEdit size={15} />
                      </button>
                      <button
                        className={css['icon-btn']}
                        type="button"
                        aria-label="Delete specialist"
                        onClick={() => {
                          deleteSpecialist(specialist._id);
                        }}
                      >
                        <MdClose size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button
            className={css['icon-btn']}
            type="button"
            aria-label="Create owner"
            onClick={e => {
              openModal(e);
            }}
            data-modal="admin_create_owner"
            // data-id={service._id}
          >
            <MdAddCard size={25} />
          </button>
        </div>
        <PaginationBlock  items={specialists} size={size} setSize={setSize}  current={current} setCurrent={setCurrent}/>
      </section>
      <EditOwnerDataModal />
      <CreateOwnerDataModal />
    </>
  );
};

export default AdminOwnerPage;
