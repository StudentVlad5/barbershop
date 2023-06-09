import * as React from "react";
import ReactDOM from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  ExcelExport,
} from "@syncfusion/ej2-react-schedule";
import { TreeViewComponent } from "@syncfusion/ej2-react-navigations";
import { closest, remove, addClass } from "@syncfusion/ej2-base";
import { DataManager, ODataV4Adaptor, UrlAdaptor } from "@syncfusion/ej2-data";
import { v4 as uuidv4 } from "uuid";
import { fieldsData } from "./Datasource";
import { closeModalWindow } from "hooks/modalWindow";
import { useSelector } from "react-redux";
import { getUser } from "redux/auth/selectors";
import { useEffect, useState } from "react";
import { onFetchError } from "helpers/Messages/NotifyMessages";
import { onLoaded, onLoading } from "helpers/Loader/Loader";
import { fetchData } from "services/APIservice";
import css from "./shedule.module.scss";
import sprite from "images/sprite.svg";
import avatarAnonimus from "images/team/png-heroes-thumbnail.png";

const Schedule = () => {
  const user = useSelector(getUser);
  // data services
  const [dataService, setDataService] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ownerId, setOwnerId] = useState("");
  const { BASE_URL } = window.global;
  const [ownersData] = useState(
    new DataManager({
      url: `${BASE_URL}/owner`,
      adaptor: new ODataV4Adaptor(),
    })
  );
  const [statusFilter, setStatusFilter] = useState(false);

  let dataManager = new DataManager({
    url: `${BASE_URL}/get_event`,
    crudUrl: `${BASE_URL}/batch_event`,
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });

  const [ownerData, setOwnerData] = React.useState(ownersData);
  const group = { resources: ["Barbers"], allowMultiple: false };
  const eventSettings = {
    dataSource: dataManager,
    fields: fieldsData,
  };
  const today = new Date();
  const scheduleObj = React.useRef(null);
  const treeObj = React.useRef(null);
  let isTreeItemDropped = false;
  let allowDragAndDrops = true;

  let treeViewValues = {
    dataSource: dataService,
    id: "Id",
    text: "subject",
    OwnerId: "OwnerId",
  };

  useEffect(() => {
    (async function getListOfServices() {
      setIsLoading(true);
      try {
        const { data } = await fetchData("/admin/services");
        setDataService(data);
        if (!data) {
          return onFetchError("Whoops, something went wrong");
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onExportClick = () => {
    let customFields = [
      { name: "Id", text: "Id" },
      { name: "Subject", text: "Summary" },
      { name: "StartTime", text: "First Date" },
      { name: "EndTime", text: "Last Date" },
      { name: "Location", text: "Place" },
      { name: "OwnerId", text: "Owners" },
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
    return value.resourceData ? value.resourceData.designation : "Barber";
  }

  function getBarberUrl(value) {
    return value.resourceData ? value.resourceData.avatar : avatarAnonimus;
  }

  function getBarberId(value) {
    return value.resourceData ? value.resourceData._id : "";
  }

  function getOwnerId(value) {
    console.log(value);
    return value.resourceData ? value.resourceData.Id : "";
  }

  function closeModal(e) {
    e.preventDefault();
    closeModalWindow(e);
  }

  function handleFilterOwner(e) {
    e.preventDefault();
    e.stopPropagation();
    setStatusFilter(true);
    setOwnerId(e.currentTarget.dataset.ownerid);
    setOwnerData(
      new DataManager({
        url: `${BASE_URL}/owner/${e.currentTarget.dataset.id}`,
        adaptor: new ODataV4Adaptor(),
      })
    );
  }

  function handleRemoveFilterOwner(e) {
    e.preventDefault();
    e.stopPropagation();
    setStatusFilter(false);
    setOwnerId("");
    setOwnerData(
      new DataManager({
        url: `${BASE_URL}/owner`,
        adaptor: new ODataV4Adaptor(),
      })
    );
  }

  function resourceHeaderTemplate(props) {
    return (
      <div
        className={`template-wrap ${css.template_wrap}`}
        data-id={getBarberId(props)}
        data-ownerid={getOwnerId(props)}
        onClick={handleFilterOwner}
      >
        <div
          className={`resource-detail ${css.resource_container}`}
          data-id={getBarberId(props)}
          data-ownerid={getOwnerId(props)}
        >
          <img
            className={css.resource_img}
            src={getBarberUrl(props)}
            alt="barber photo"
          />
          <div className={css.resource_name_container}>
            <div className="resource-name">{getBarberName(props)}</div>
            <div className="resource-designation">{getBarberLevel(props)}</div>
          </div>
          {statusFilter && (
            <button
              type="button"
              onClick={handleRemoveFilterOwner}
              className={css.handleRemoveFilterOwner}
            >
              ALL Spesialists
            </button>
          )}
        </div>
      </div>
    );
  }

  const treeTemplate = (props) => {
    return (
      <div id="waiting">
        <div id="waitdetails" style={{ display: "flex", flexDirection: "row" }}>
          <div id="waitlist"></div>
          <div id="waitcategory">{props.subject}</div>
          <div id="waittime"> : {props.time} minutes</div>
        </div>
      </div>
    );
  };

  const onItemDrag = (event) => {
    if (scheduleObj.current.isAdaptive) {
      let classElement = scheduleObj.current.element.querySelector(
        ".e-device-hover"
      );
      if (classElement) {
        classElement.classList.remove("e-device-hover");
      }
      if (event.target.classList.contains("e-work-cells")) {
        addClass([event.target], "e-device-hover");
      }
    }
    if (document.body.style.cursor === "not-allowed") {
      document.body.style.cursor = "";
    }
    if (event.name === "nodeDragging") {
      let dragElementIcon = document.querySelectorAll(
        ".e-drag-item.treeview-external-drag .e-icon-expandable"
      );
      for (let i = 0; i < dragElementIcon.length; i++) {
        dragElementIcon[i].style.display = "none";
      }
    }
  };

  const onActionBegin = (args) => {
    if (user._id === null || user._id === undefined) {
      return toast("Please login for booking a service");
    }
    if (
      args.requestType === "eventRemove" &&
      (args.data[0].CreateId !== user._id || user.role !== "admin")
    ) {
      toast("You can't delete this event");
      args.data[0].StatusForChange = false;
    }
    if (
      args.requestType === "eventChange" &&
      (args.data.CreateId !== user._id || user.role !== "admin")
    ) {
      toast("You can't change this event");
      args.data.StatusForChange = false;
    }
    if (args.requestType === "eventCreate" && isTreeItemDropped) {
      let treeViewdata = treeObj.current.fields.dataSource;
      const filteredPeople = treeViewdata.filter(
        (item) => item
        // .Id !== parseInt(draggedItemId, 10),
      );
      treeObj.current.fields.dataSource = filteredPeople;
      let elements = document.querySelectorAll(
        ".e-drag-item.treeview-external-drag"
      );
      for (let i = 0; i < elements.length; i++) {
        remove(elements[i]);
      }
    }
    if (
      args.requestType === "eventCreate" &&
      args.data.length > 0 &&
      !isTreeItemDropped
    ) {
      let eventData = args.data[0];
      let eventField = scheduleObj.current.eventFields;
      eventData.StartTimezone = "Europe/Kiev";
      eventData.EndTimezone = "Europe/Kiev";
      eventData.Id = uuidv4();
      eventData.Description = `${user.userName} ${user.phone}`;
      eventData.CreateId = user._id;
      let startDate = eventData[eventField.startTime];
      let endDate = eventData[eventField.endTime];
      args.cancel = !scheduleObj.current.isSlotAvailable(startDate, endDate);
    }
    if (args.requestType === "toolbarItemRendering") {
      let exportItem = {
        align: "Right",
        showTextOn: "Both",
        prefixIcon: "e-icon-schedule-excel-export",
        text: "Excel Export",
        cssClass: "e-excel-export",
        click: onExportClick,
      };
      args.items.push(exportItem);
    }
  };

  const onTreeDragStop = (event) => {
    let treeElement = closest(event.target, ".e-treeview");
    let classElement = scheduleObj.current.element.querySelector(
      ".e-device-hover"
    );
    if (classElement) {
      classElement.classList.remove("e-device-hover");
    }
    if (!treeElement) {
      event.cancel = true;
      let scheduleElement = closest(event.target, ".e-content-wrap");
      if (scheduleElement) {
        let treeviewData = treeObj.current.fields.dataSource;
        if (event.target.classList.contains("e-work-cells")) {
          const filteredData = treeviewData.filter(
            (item) => item.Id === parseInt(event.draggedNodeData.id, 10)
          );
          let cellData = scheduleObj.current.getCellDetails(event.target);
          //
          let endDate = new Date(cellData.startTime);
          endDate = new Date(
            endDate.setMinutes(endDate.getMinutes() + filteredData[0].time)
          );

          // set time for items
          let description = `${user.userName} ${user.phone}`;
          let s = "";
          if (ownerId === "" || ownerId === undefined) {
            s = cellData.groupIndex + 1;
          } else {
            s = ownerId;
          }
          let eventData = {
            Subject: filteredData[0].subject,
            StartTime: cellData.startTime,
            EndTime: endDate,
            IsAllDay: cellData.isAllDay,
            Id: uuidv4(),
            OwnerId: s,
            StartTimezone: "Europe/Kiev",
            EndTimezone: "Europe/Kiev",
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
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={css["modal__btn-close"]}
          type="button"
          onClick={closeModal}
          aria-label="Close modal"
        >
          <svg className={css.modal__icon} width="40" height="40">
            <use href={sprite + "#close_40px"}></use>
          </svg>
        </button>
        <div>
          <Toaster />
          {isLoading ? onLoading() : onLoaded()}
          {error && onFetchError("Whoops, something went wrong")}
          {/* START SHEDULE */}
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
                        today.getDate().toString()
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
                        today.getDate().toString()
                      )
                    }
                    maxDate={
                      new Date(
                        (today.getFullYear() + 1).toString(),
                        today.getMonth().toString(),
                        today.getDate().toString()
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
                    </ViewsDirective>

                    <Inject
                      services={[Day, Week, WorkWeek, Month, ExcelExport]}
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
      </div>
    </div>,
    document.querySelector("#popup-root")
  );
};
export default Schedule;
