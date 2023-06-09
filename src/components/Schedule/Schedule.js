import * as React from 'react';
import ReactDOM from 'react-dom';
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  // Agenda,
  // MonthAgenda,
  // TimelineViews,
  // TimelineMonth,
  Inject,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  ExcelExport,
} from '@syncfusion/ej2-react-schedule';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { closest, remove, addClass } from '@syncfusion/ej2-base';
import { DataManager, ODataV4Adaptor, UrlAdaptor } from '@syncfusion/ej2-data';
import { v4 as uuidv4 } from 'uuid';
import { fieldsData, treeViewData, timeServices } from './Datasource';
import { closeModalWindow } from 'hooks/modalWindow';
import sprite from 'images/sprite.svg';
import css from './shedule.module.scss';
import juliaPics from 'images/barbers/julia.jpg';
import heorhiiPics from 'images/barbers/heorhii.jpg';
import vladPics from 'images/barbers/vlad.jpg';
import { useSelector } from 'react-redux';
import { getUser } from 'redux/auth/selectors';

const Schedule = () => {
  const user = useSelector(getUser);

  const BASE_URL = 'https://drab-pear-gazelle-belt.cyclic.app/api';

  let dataManager = new DataManager({
    url: `${BASE_URL}/get_event`,
    crudUrl: `${BASE_URL}/batch_event`,
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });
  let ownersData = new DataManager({
    url: `${BASE_URL}/owner`,
    adaptor: new ODataV4Adaptor(),
  });
  const [ownerData] = React.useState(ownersData);
  const group = { resources: ['Barbers'], allowMultiple: false };
  const eventSettings = {
    dataSource: dataManager,
    fields: fieldsData,
  };

  const today = new Date();
  const scheduleObj = React.useRef(null);
  const treeObj = React.useRef(null);
  let isTreeItemDropped = false;
  // let draggedItemId = '';
  let allowDragAndDrops = true;

  let treeViewValues = {
    dataSource: treeViewData,
    id: 'Id',
    text: 'subject',
    OwnerId: 'OwnerId',
  };

  const onExportClick = () => {
    let customFields = [
      { name: 'Id', text: 'Id' },
      { name: 'Subject', text: 'Summary' },
      { name: 'StartTime', text: 'First Date' },
      { name: 'EndTime', text: 'Last Date' },
      { name: 'Location', text: 'Place' },
      { name: 'OwnerId', text: 'Owners' },
    ];
    let exportValues = { fieldsInfo: customFields, includeOccurrences: true };
    scheduleObj.current.exportToExcel(exportValues);
  };

  function getBarberName(value) {
    return value.resourceData
      ? value.resourceData[value.resource.textField]
      : value.resourceName;
  }

  function getBarberLevel(value) {
    let resourceName = getBarberName(value);
    switch (resourceName) {
      case 'Julia':
        return 'High level barber';
      case 'Heorhii':
        return 'Master';
      case 'Vlad':
        return 'Dr. BARber';
      default:
        break;
    }
  }

  function getBarberUrl(value) {
    let resourceName = getBarberName(value);
    switch (resourceName) {
      case 'Julia':
        return juliaPics;
      case 'Heorhii':
        return heorhiiPics;
      case 'Vlad':
        return vladPics;
      default:
        break;
    }
  }

  function closeModal(e) {
    e.preventDefault();
    closeModalWindow(e);
  }

  function resourceHeaderTemplate(props) {
    return (
      <div className="template-wrap">
        <div className={`resource-detail ${css.resource_container}`}>
          <img
            className={css.resource_img}
            src={getBarberUrl(props)}
            alt="barber photo"
          />
          <div className={css.resource_name_container}>
            <div className="resource-name">{getBarberName(props)}</div>
            <div className="resource-designation">{getBarberLevel(props)}</div>
          </div>
        </div>
      </div>
    );
  }

  const treeTemplate = props => {
    return (
      <div id="waiting">
        <div id="waitdetails" style={{ display: 'flex', flexDirection: 'row' }}>
          <div id="waitlist"></div>
          <div id="waitcategory">{props.subject}</div>
          <div id="waittime"> : {timeServices[props.Id]} minutes</div>
        </div>
      </div>
    );
  };

  const onItemDrag = event => {
    if (scheduleObj.current.isAdaptive) {
      let classElement =
        scheduleObj.current.element.querySelector('.e-device-hover');
      if (classElement) {
        classElement.classList.remove('e-device-hover');
      }
      if (event.target.classList.contains('e-work-cells')) {
        addClass([event.target], 'e-device-hover');
      }
    }
    if (document.body.style.cursor === 'not-allowed') {
      document.body.style.cursor = '';
    }
    if (event.name === 'nodeDragging') {
      let dragElementIcon = document.querySelectorAll(
        '.e-drag-item.treeview-external-drag .e-icon-expandable',
      );
      for (let i = 0; i < dragElementIcon.length; i++) {
        dragElementIcon[i].style.display = 'none';
      }
    }
  };

  const onActionBegin = args => {
    if (user._id === null || user._id === undefined) {
      return alert('Please login for booking a service');
    }
    if (
      args.requestType === 'eventRemove' &&
      args.data[0].CreateId !== user._id
    ) {
      alert("You can't delete this event");
      args.data[0].StatusForChange = false;
    }
    if (args.requestType === 'eventChange' && args.data.CreateId !== user._id) {
      alert("You can't change this event");
      args.data.StatusForChange = false;
    }
    if (args.requestType === 'eventCreate' && isTreeItemDropped) {
      let treeViewdata = treeObj.current.fields.dataSource;
      const filteredPeople = treeViewdata.filter(
        item => item,
        // .Id !== parseInt(draggedItemId, 10),
      );
      treeObj.current.fields.dataSource = filteredPeople;
      let elements = document.querySelectorAll(
        '.e-drag-item.treeview-external-drag',
      );
      for (let i = 0; i < elements.length; i++) {
        remove(elements[i]);
      }
    }
    if (
      args.requestType === 'eventCreate' &&
      args.data.length > 0 &&
      !isTreeItemDropped
    ) {
      let eventData = args.data[0];
      let eventField = scheduleObj.current.eventFields;
      eventData.StartTimezone = 'Europe/Kiev';
      eventData.EndTimezone = 'Europe/Kiev';
      eventData.Id = uuidv4();
      eventData.Description = `${user.userName} ${user.phone}`;
      eventData.CreateId = user._id;
      console.log(eventData);
      let startDate = eventData[eventField.startTime];
      let endDate = eventData[eventField.endTime];
      args.cancel = !scheduleObj.current.isSlotAvailable(startDate, endDate);
    }
    if (args.requestType === 'toolbarItemRendering') {
      let exportItem = {
        align: 'Right',
        showTextOn: 'Both',
        prefixIcon: 'e-icon-schedule-excel-export',
        text: 'Excel Export',
        cssClass: 'e-excel-export',
        click: onExportClick,
      };
      args.items.push(exportItem);
    }
  };

  const onTreeDragStop = event => {
    let treeElement = closest(event.target, '.e-treeview');
    let classElement =
      scheduleObj.current.element.querySelector('.e-device-hover');
    if (classElement) {
      classElement.classList.remove('e-device-hover');
    }
    if (!treeElement) {
      event.cancel = true;
      let scheduleElement = closest(event.target, '.e-content-wrap');
      if (scheduleElement) {
        let treeviewData = treeObj.current.fields.dataSource;
        if (event.target.classList.contains('e-work-cells')) {
          const filteredData = treeviewData.filter(
            item => item.Id === parseInt(event.draggedNodeData.id, 10),
          );
          let cellData = scheduleObj.current.getCellDetails(event.target);
          //
          let endDate = new Date(cellData.startTime);
          endDate = new Date(
            endDate.setMinutes(
              endDate.getMinutes() + timeServices[filteredData[0].Id],
            ),
          );

          // set time for items
          let description = `${user.userName} ${user.phone}`;
          let eventData = {
            Subject: filteredData[0].subject,
            StartTime: cellData.startTime,
            EndTime: endDate,
            IsAllDay: cellData.isAllDay,
            Id: uuidv4(),
            OwnerId: cellData.groupIndex + 1,
            StartTimezone: 'Europe/Kiev',
            EndTimezone: 'Europe/Kiev',
            Description: `${description}`,
            CreateId: user._id,
          };
          scheduleObj.current.addEvent(eventData);
          isTreeItemDropped = true;
          // draggedItemId = event.draggedNodeData.id;
        }
      }
    }
  };

  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={closeModal}>
      <div
        className={css.schedule__container}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={css['modal__btn-close']}
          type="button"
          onClick={closeModal}
          aria-label="Close modal"
        >
          <svg className={css.modal__icon} width="40" height="40">
            <use href={sprite + '#close_40px'}></use>
          </svg>
        </button>
        {/* START SCHEDULE */}
        <div className="schedule-control-section">
          <div className="col-lg-12 control-section">
            <div className="content-wrapper">
              <div className="schedule-container">
                <div className="title-container">
                  <div className="title-text">Scheduler</div>
                </div>

                <ScheduleComponent
                  height="550px"
                  width="100%"
                  currentView="Week"
                  selectedDate={
                    new Date(
                      today.getFullYear().toString(),
                      today.getMonth().toString(),
                      today.getDate().toString(),
                    )
                  }
                  drag={onItemDrag}
                  resourceHeaderTemplate={resourceHeaderTemplate}
                  group={group}
                  eventSettings={eventSettings}
                  enablePersistence={true}
                  rowAutoHeight={true}
                  actionBegin={onActionBegin}
                  ref={scheduleObj}
                  minDate={
                    new Date(
                      today.getFullYear().toString(),
                      today.getMonth().toString(),
                      today.getDate().toString(),
                    )
                  }
                  maxDate={
                    new Date(
                      (today.getFullYear() + 1).toString(),
                      today.getMonth().toString(),
                      today.getDate().toString(),
                    )
                  }
                  timeFormat="HH:mm"
                >
                  <ResourcesDirective>
                    <ResourceDirective
                      field="OwnerId"
                      title="Subject"
                      name="Barbers"
                      dataSource={ownerData}
                      textField="ownerText"
                      idField="Id"
                      DesignationField="designation"
                      colorField="ownerColor"
                      workDaysField="workDays"
                      allowMultiple={false}
                      groupIDField="groupId"
                      cssClass="excel-export"
                    ></ResourceDirective>
                  </ResourcesDirective>
                  <ViewsDirective>
                    <ViewDirective
                      option="Day"
                      startHour="9:00"
                      endHour="22:00"
                    />
                    <ViewDirective
                      option="Week"
                      startHour="9:00"
                      endHour="22:00"
                    />
                    <ViewDirective
                      option="WorkWeek"
                      startHour="9:00"
                      endHour="22:00"
                    />
                    <ViewDirective option="Month" showWeekend={true} />
                    {/* <ViewDirective option="Agenda" /> */}
                  </ViewsDirective>

                  <Inject
                    services={[
                      Day,
                      Week,
                      WorkWeek,
                      Month,
                      ExcelExport,
                      // Agenda,
                      // MonthAgenda,
                      // TimelineViews,
                      // TimelineMonth,
                    ]}
                  />
                </ScheduleComponent>
              </div>
              <div className="treeview-title-container">Services list</div>
              <div className="treeview-component">
                <TreeViewComponent
                  fields={treeViewValues}
                  ref={treeObj}
                  cssClass="treeview-external-drag"
                  nodeTemplate={treeTemplate}
                  nodeDragStop={onTreeDragStop}
                  nodeDragging={onItemDrag}
                  allowDragAndDrop={allowDragAndDrops}
                />
              </div>
            </div>
          </div>
        </div>
        ;
      </div>
    </div>,
    document.querySelector('#popup-root'),
  );
};
export default Schedule;
