import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdEdit, MdAddCard, MdDone } from 'react-icons/md';
import { HiArrowLeft } from 'react-icons/hi';
import { openModalWindow } from 'hooks/modalWindow';
import { addModal } from 'redux/modal/operation';
import { addReload } from 'redux/reload/slice';
import { reloadValue } from 'redux/reload/selectors';
import { fetchData, deleteData } from 'services/APIservice';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { SEO } from 'utils/SEO';
import { EditServiceDataModal } from 'components/Admin/EditDataModal/EditServicesDataModal';
import { CreateServiceDataModal } from 'components/Admin/CreateDataModal/CreateServicesDataModal';
import { PaginationBlock } from 'helpers/Pagination/Pagination';
import css from 'components/Admin/admin.module.scss';

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const reload = useSelector(reloadValue);

  // table filter
  const [filterServices, setFilterServices] = useState([]);
  const [filterSubject, setFilterSubject] = useState('');
  const [filterTime, setFilterTime] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterSpecialist, setFilterSpecialist] = useState('');

  const handleChangeFilter = e => {
    e.preventDefault;
    switch (e.currentTarget.name) {
      case 'filterSubject':
        setFilterSubject(e.currentTarget.value);
        break;
      case 'filterTime':
        setFilterTime(e.currentTarget.value);
        break;
      case 'filterPrice':
        setFilterPrice(e.currentTarget.value);
        break;
      case 'filterLocation':
        setFilterLocation(e.currentTarget.value);
        break;
      case 'filterSpecialist':
        setFilterSpecialist(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const startFilterServices = e => {
    e.preventDefault;
    const peremOfFilter = [];
    services.map(item => {
      if (
        item.subject.toString().toLowerCase().includes(filterSubject) &&
        item.time.toString().toLowerCase().includes(filterTime) &&
        item.price.toString().toLowerCase().includes(filterPrice) &&
        item.location.toString().toLowerCase().includes(filterLocation) &&
        item.owner.toString().toLowerCase().includes(filterSpecialist)
      ) {
        peremOfFilter.push(item);
      }
    });
    setFilterServices(peremOfFilter);
  };

  const cleanFilterServices = e => {
    e.preventDefault;
    let filterS = '';
    let filterT = '';
    let filterP = '';
    let filterL = '';
    let filterSp = '';
    e.currentTarget.name === 'clearFilterSubject'
      ? setFilterSubject(filterS)
      : (filterS = filterSubject);
    e.currentTarget.name === 'clearFilterTime'
      ? setFilterTime(filterT)
      : (filterT = filterTime);
    e.currentTarget.name === 'clearFilterPrice'
      ? setFilterPrice(filterP)
      : (filterP = filterPrice);
    e.currentTarget.name === 'clearFilterLocation'
      ? setFilterLocation(filterL)
      : (filterL = filterLocation);
    e.currentTarget.name === 'clearFilterSpecialist'
      ? setFilterSpecialist(filterSp)
      : (filterSp = filterSpecialist);
    const peremOfFilter = [];
    services.map(item => {
      if (
        item.subject.toString().toLowerCase().includes(filterS) &&
        item.time.toString().toLowerCase().includes(filterT) &&
        item.price.toString().toLowerCase().includes(filterP) &&
        item.location.toString().toLowerCase().includes(filterL) &&
        item.owner.toString().toLowerCase().includes(filterSp)
      ) {
        peremOfFilter.push(item);
      }
    });
    setFilterServices(peremOfFilter);
  };

  const handleSearhOnEnter = e => {
    if (e.key == 'Enter') {
      startFilterServices(e);
    }
  };

  // table pagination
  const [perPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  // __________________________________________________

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData('/admin/services');
        setServices(data);
        setFilterServices(data);
        localStorage.setItem('services', data.length);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [reload]);

  async function deleteService(id) {
    setIsLoading(true);
    try {
      const { date } = await deleteData(`/admin/services/${id}`);
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
  const dispatch = useDispatch();
  const openModal = e => {
    e.preventDefault();
    e.stopPropagation();
    if (
      e.currentTarget.dataset.modal === 'admin' ||
      e.currentTarget.dataset.modal === 'admin_create_service'
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
      <SEO title="Services list" description="Services administration page" />
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
                    name="filterSubject"
                    placeholder="Search by Name"
                    value={filterSubject}
                    onKeyDown={e => handleSearhOnEnter(e)}
                    onChange={e => handleChangeFilter(e)}
                  />
                  <div className="button-wrapper">
                    <button type="button" onClick={e => startFilterServices(e)}>
                      <MdDone />
                    </button>
                    <button
                      type="button"
                      name="clearFilterSubject"
                      onClick={e => cleanFilterServices(e)}
                    >
                      <MdClose />
                    </button>
                  </div>
                </th>
                <th className={css.table__head}>
                  <input
                    type="text"
                    name="filterTime"
                    placeholder="Search by Time"
                    value={filterTime}
                    onKeyDown={e => handleSearhOnEnter(e)}
                    onChange={e => handleChangeFilter(e)}
                  />
                  <div className="button-wrapper">
                    <button type="button" onClick={e => startFilterServices(e)}>
                      <MdDone />
                    </button>
                    <button
                      type="button"
                      name="clearFilterTime"
                      onClick={e => cleanFilterServices(e)}
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
                        name="filterPrice"
                        placeholder="Search by Price"
                        value={filterPrice}
                        onKeyDown={e => handleSearhOnEnter(e)}
                        onChange={e => handleChangeFilter(e)}
                      />
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterServices(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterPrice"
                          onClick={e => cleanFilterServices(e)}
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
                          onClick={e => startFilterServices(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterLocation"
                          onClick={e => cleanFilterServices(e)}
                        >
                          <MdClose />
                        </button>
                      </div>
                    </th>
                    <th className={css.table__head}>
                      <input
                        type="text"
                        name="filterSpecialist"
                        placeholder="Search by Specialist"
                        value={filterSpecialist}
                        onKeyDown={e => handleSearhOnEnter(e)}
                        onChange={e => handleChangeFilter(e)}
                      />
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterServices(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterSpecialist"
                          onClick={e => cleanFilterServices(e)}
                        >
                          <MdClose />
                        </button>
                      </div>
                    </th>
                  </>
                )}
                <th className={css.table__head}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className={css.table__row}>
                <th className={css.table__head}>Subject</th>
                <th className={css.table__head}>Time</th>
                {isLearnMore && (
                  <>
                    <th className={css.table__head}>Price</th>
                    <th className={css.table__head}>Location</th>
                    <th className={css.table__head}>Specialist</th>
                  </>
                )}
                <th className={css.table__head}>Action</th>
              </tr>
              {filterServices.length > 0 &&
                !error &&
                filterServices.map(service => (
                  <tr key={service._id} className={css.table__row}>
                    {/* <td className={css.table__data}>{service._id}</td> */}
                    <td className={css.table__data}>{service.subject}</td>
                    <td className={css.table__data}>{service.time}</td>
                    {isLearnMore && (
                      <>
                        <td className={css.table__data}>{service.price}</td>
                        <td className={css.table__data}>{service.location}</td>
                        <td className={css.table__data}>{service.owner}</td>
                      </>
                    )}
                    <td className={css.table__data}>
                      <button
                        className={css['icon-btn']}
                        type="button"
                        aria-label="Edit services"
                        onClick={e => {
                          openModal(e);
                        }}
                        data-modal="admin"
                        data-id={service._id}
                      >
                        <MdEdit size={15} />
                      </button>
                      <button
                        className={css['icon-btn']}
                        type="button"
                        aria-label="Delete services"
                        onClick={() => {
                          deleteService(service._id);
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
            aria-label="Create services"
            onClick={e => {
              openModal(e);
            }}
            data-modal="admin_create_service"
            // data-id={service._id}
          >
            <MdAddCard size={25} />
          </button>
        </div>
        <PaginationBlock
          items={filterServices}
          size={size}
          setSize={setSize}
          current={current}
          setCurrent={setCurrent}
        />
      </section>
      <EditServiceDataModal />
      <CreateServiceDataModal />
    </>
  );
};

export default AdminServicesPage;
