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

  // table filter

  const [filterSpecialists, setFilterSpecialists] = useState([]);
  const [filterID, setFilterID] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterDesignation, setFilterDesignation] = useState('');
  const [filterWorkDays, setFilterWorkDays] = useState('');
  const [filterStartWorkHour, setFilterStartWorkHour] = useState('');
  const [filterEndWorkHour, setFilterEndWorkHour] = useState('');
  const [filterGroupID, setFilterGroupID] = useState('');
  const [filterAvatar, setFilterAvatar] = useState('');
  const [filterFacebook, setFilterFacebook] = useState('');
  const [filterInstagram, setFilterInstagram] = useState('');
  const [filterLinkedin, setFilterLinkedin] = useState('');
  const [filterTwitter, setFilterTwitter] = useState('');

  const handleChangeFilter = e => {
    e.preventDefault;
    switch (e.currentTarget.name) {
      case 'filterID':
        setFilterID(e.currentTarget.value);
        break;
      case 'filterName':
        setFilterName(e.currentTarget.value);
        break;
      case 'filterColor':
        setFilterColor(e.currentTarget.value);
        break;
      case 'filterDesignation':
        setFilterDesignation(e.currentTarget.value);
        break;
      case 'filterWorkDays':
        setFilterWorkDays(e.currentTarget.value);
        break;
      case 'filterStartWorkHour':
        setFilterStartWorkHour(e.currentTarget.value);
        break;
      case 'filterEndWorkHour':
        setFilterEndWorkHour(e.currentTarget.value);
        break;
      case 'filterGroupID':
        setFilterGroupID(e.currentTarget.value);
        break;
      case 'filterAvatar':
        setFilterAvatar(e.currentTarget.value);
        break;
      case 'filterFacebook':
        setFilterFacebook(e.currentTarget.value);
        break;
      case 'filterInstagram':
        setFilterInstagram(e.currentTarget.value);
        break;
      case 'filterLinkedin':
        setFilterLinkedin(e.currentTarget.value);
        break;
      case 'filterTwitter':
        setFilterTwitter(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const startFilterOwners = e => {
    e.preventDefault;
    const peremOfFilter = [];
    specialists.map(item => {
      if (
        item.Id.toString().toLowerCase().includes(filterID) &&
        item.ownerText.toString().toLowerCase().includes(filterName) &&
        item.ownerColor.toString().toLowerCase().includes(filterColor) &&
        item.designation.toString().toLowerCase().includes(filterDesignation) &&
        item.workDays.toString().toLowerCase().includes(filterWorkDays) &&
        item.startHour.toString().toLowerCase().includes(filterStartWorkHour) &&
        item.endHour.toString().toLowerCase().includes(filterEndWorkHour) &&
        item.groupId.toString().toLowerCase().includes(filterGroupID) &&
        Boolean(item.avatar).toString() !== filterAvatar.toString() &&
        Boolean(item.facebook).toString() !== filterFacebook.toString() &&
        Boolean(item.instagram).toString() !== filterInstagram.toString() &&
        Boolean(item.linkedin).toString() !== filterLinkedin.toString() &&
        Boolean(item.twitter).toString() !== filterTwitter.toString()
      ) {
        peremOfFilter.push(item);
      }
    });

    setFilterSpecialists(peremOfFilter);
  };

  const cleanFilterOwners = e => {
    e.preventDefault;
    let filterId = '';
    let filterN = '';
    let filterC = '';
    let filterD = '';
    let filterWd = '';
    let filterSH = '';
    let filterEH = '';
    let filterGrId = '';
    let filterA = '';
    let filterF = '';
    let filterI = '';
    let filterL = '';
    let filterT = '';

    if(e.currentTarget.name === 'clearFilterAvatar'){
      document.getElementById('checkIdNoAvatar').checked = false;
      document.getElementById('checkIdYesAvatar').checked = false;
    }
    if(e.currentTarget.name === 'clearFilterFacebook'){
      document.getElementById('checkIdNoFacebook').checked = false;
      document.getElementById('checkIdYesFacebook').checked = false;
    }
    if(e.currentTarget.name === 'clearFilterInstagram'){
      document.getElementById('checkIdNoInstagram').checked = false;
      document.getElementById('checkIdYesInstagram').checked = false;
    }
    if(e.currentTarget.name === 'clearFilterLinkedin'){
      document.getElementById('checkIdNoLinkedin').checked = false;
      document.getElementById('checkIdYesLinkedin').checked = false;
    }
    if(e.currentTarget.name === 'clearFilterTwitter'){
      document.getElementById('checkIdNoTwitter').checked = false;
      document.getElementById('checkIdYesTwitter').checked = false;
    }

    e.currentTarget.name === 'clearFilterID'
      ? setFilterID(filterId)
      : (filterId = filterID);
    e.currentTarget.name === 'clearFilterName'
      ? setFilterName(filterN)
      : (filterN = filterName);
    e.currentTarget.name === 'clearFilterColor'
      ? setFilterColor(filterC)
      : (filterC = filterColor);
    e.currentTarget.name === 'clearFilterDesignation'
      ? setFilterDesignation(filterD)
      : (filterD = filterDesignation);
    e.currentTarget.name === 'clearFilterWorkDays'
      ? setFilterWorkDays(filterWd)
      : (filterWd = filterWorkDays);
    e.currentTarget.name === 'clearFilterStartWorkHour'
      ? setFilterStartWorkHour(filterSH)
      : (filterSH = filterStartWorkHour);
    e.currentTarget.name === 'clearFilterEndWorkHour'
      ? setFilterEndWorkHour(filterEH)
      : (filterEH = filterEndWorkHour);
    e.currentTarget.name === 'clearFilterGroupID'
      ? setFilterGroupID(filterGrId)
      : (filterGrId = filterGroupID);
    e.currentTarget.name === 'clearFilterAvatar'
      ? setFilterAvatar(filterA)
      : (filterA = filterAvatar);
    e.currentTarget.name === 'clearFilterFacebook'
      ? setFilterFacebook(filterF)
      : (filterF = filterFacebook);
    e.currentTarget.name === 'clearFilterInstagram'
      ? setFilterInstagram(filterI)
      : (filterI = filterInstagram);
    e.currentTarget.name === 'clearFilterLinkedin'
      ? setFilterLinkedin(filterL)
      : (filterL = filterLinkedin);
    e.currentTarget.name === 'clearFilterTwitter'
      ? setFilterTwitter(filterT)
      : (filterT = filterTwitter);
    const peremOfFilter = [];
    specialists.map(item => {
      if (
        item.Id.toString().toLowerCase().includes(filterId) &&
        item.ownerText.toString().toLowerCase().includes(filterN) &&
        item.ownerColor.toString().toLowerCase().includes(filterC) &&
        item.designation.toString().toLowerCase().includes(filterD) &&
        item.workDays.toString().toLowerCase().includes(filterWd) &&
        item.startHour.toString().toLowerCase().includes(filterSH) &&
        item.endHour.toString().toLowerCase().includes(filterEH) &&
        item.groupId.toString().toLowerCase().includes(filterGrId) &&
        Boolean(item.avatar).toString() !== filterA.toString() &&
        Boolean(item.facebook).toString() !== filterF.toString() &&
        Boolean(item.instagram).toString() !== filterI.toString() &&
        Boolean(item.linkedin).toString() !== filterL.toString() &&
        Boolean(item.twitter).toString() !== filterT.toString()
      ) {
        peremOfFilter.push(item);
      }
    });
    setFilterSpecialists(peremOfFilter);
  };

  const handleSearhOnEnter = e => {
    if (e.key == 'Enter') {
      startFilterOwners(e);
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
        const { data } = await fetchData('/admin/owners');
        setSpecialists(data);
        setFilterSpecialists(data);
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
                    name="filterID"
                    placeholder="Search by ID"
                    value={filterID}
                    onKeyDown={e => handleSearhOnEnter(e)}
                    onChange={e => handleChangeFilter(e)}
                  />
                  <div className="button-wrapper">
                    <button type="button" onClick={e => startFilterOwners(e)}>
                      <MdDone />
                    </button>
                    <button
                      type="button"
                      name="clearFilterID"
                      onClick={e => cleanFilterOwners(e)}
                    >
                      <MdClose />
                    </button>
                  </div>
                </th>
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
                    <button type="button" onClick={e => startFilterOwners(e)}>
                      <MdDone />
                    </button>
                    <button
                      type="button"
                      name="clearFilterName"
                      onClick={e => cleanFilterOwners(e)}
                    >
                      <MdClose />
                    </button>
                  </div>
                </th>
                <th className={css.table__head}>
                  <input
                    type="text"
                    name="filterColor"
                    placeholder="Search by Color"
                    value={filterColor}
                    onKeyDown={e => handleSearhOnEnter(e)}
                    onChange={e => handleChangeFilter(e)}
                  />
                  <div className="button-wrapper">
                    <button type="button" onClick={e => startFilterOwners(e)}>
                      <MdDone />
                    </button>
                    <button
                      type="button"
                      name="clearFilterColor"
                      onClick={e => cleanFilterOwners(e)}
                    >
                      <MdClose />
                    </button>
                  </div>
                </th>
                <th className={css.table__head}>
                  <input
                    type="text"
                    name="filterDesignation"
                    placeholder="Search by Designation"
                    value={filterDesignation}
                    onKeyDown={e => handleSearhOnEnter(e)}
                    onChange={e => handleChangeFilter(e)}
                  />
                  <div className="button-wrapper">
                    <button type="button" onClick={e => startFilterOwners(e)}>
                      <MdDone />
                    </button>
                    <button
                      type="button"
                      name="clearFilterDesignation"
                      onClick={e => cleanFilterOwners(e)}
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
                        name="filterWorkDays"
                        placeholder="Search by Work Days"
                        value={filterWorkDays}
                        onKeyDown={e => handleSearhOnEnter(e)}
                        onChange={e => handleChangeFilter(e)}
                      />
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterOwners(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterWorkDays"
                          onClick={e => cleanFilterOwners(e)}
                        >
                          <MdClose />
                        </button>
                      </div>
                    </th>
                    <th className={css.table__head}>
                      <input
                        type="text"
                        name="filterStartWorkHour"
                        placeholder="Search by Start Work Hour"
                        value={filterStartWorkHour}
                        onKeyDown={e => handleSearhOnEnter(e)}
                        onChange={e => handleChangeFilter(e)}
                      />
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterOwners(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterStartWorkHour"
                          onClick={e => cleanFilterOwners(e)}
                        >
                          <MdClose />
                        </button>
                      </div>
                    </th>
                    <th className={css.table__head}>
                      <input
                        type="text"
                        name="filterEndWorkHour"
                        placeholder="Search by End Work Hour"
                        value={filterEndWorkHour}
                        onKeyDown={e => handleSearhOnEnter(e)}
                        onChange={e => handleChangeFilter(e)}
                      />
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterOwners(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterEndWorkHour"
                          onClick={e => cleanFilterOwners(e)}
                        >
                          <MdClose />
                        </button>
                      </div>
                    </th>
                    <th className={css.table__head}>
                      <input
                        type="text"
                        name="filterGroupID"
                        placeholder="Search by Group ID"
                        value={filterGroupID}
                        onKeyDown={e => handleSearhOnEnter(e)}
                        onChange={e => handleChangeFilter(e)}
                      />
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterOwners(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterGroupID"
                          onClick={e => cleanFilterOwners(e)}
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
                          onClick={e => startFilterOwners(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterAvatar"
                          onClick={e => cleanFilterOwners(e)}
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
                            name="filterFacebook"
                            value={true}
                            onChange={e => handleChangeFilter(e)}
                            id="checkIdNoFacebook"
                          />
                          No
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="filterFacebook"
                            value={false}
                            onChange={e => handleChangeFilter(e)}
                            id="checkIdYesFacebook"
                          />
                          Yes
                        </label>
                      </div>
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterOwners(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterFacebook"
                          onClick={e => cleanFilterOwners(e)}
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
                            name="filterInstagram"
                            value={true}
                            onChange={e => handleChangeFilter(e)}
                            id="checkIdNoInstagram"
                          />
                          No
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="filterInstagram"
                            value={false}
                            onChange={e => handleChangeFilter(e)}
                            id="checkIdYesInstagram"
                          />
                          Yes
                        </label>
                      </div>
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterOwners(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterInstagram"
                          onClick={e => cleanFilterOwners(e)}
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
                            name="filterLinkedin"
                            value={true}
                            onChange={e => handleChangeFilter(e)}
                            id="checkIdNoLinkedin"
                          />
                          No
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="filterLinkedin"
                            value={false}
                            onChange={e => handleChangeFilter(e)}
                            id="checkIdYesLinkedin"
                          />
                          Yes
                        </label>
                      </div>
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterOwners(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterLinkedin"
                          onClick={e => cleanFilterOwners(e)}
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
                            name="filterTwitter"
                            value={true}
                            onChange={e => handleChangeFilter(e)}
                            id="checkIdNoTwitter"
                          />
                          No
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="filterTwitter"
                            value={false}
                            onChange={e => handleChangeFilter(e)}
                            id="checkIdYesTwitter"
                          />
                          Yes
                        </label>
                      </div>
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={e => startFilterOwners(e)}
                        >
                          <MdDone />
                        </button>
                        <button
                          type="button"
                          name="clearFilterTwitter"
                          onClick={e => cleanFilterOwners(e)}
                        >
                          <MdClose />
                        </button>
                      </div>
                    </th>
                  </>
                )}
                <th className={css.table__head}></th>
              </tr>
            </thead>
            <tbody>
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
              {filterSpecialists.length > 0 &&
                !error &&
                filterSpecialists.map(specialist => (
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
        <PaginationBlock
          items={filterSpecialists}
          size={size}
          setSize={setSize}
          current={current}
          setCurrent={setCurrent}
        />
      </section>
      <EditOwnerDataModal />
      <CreateOwnerDataModal />
    </>
  );
};

export default AdminOwnerPage;
