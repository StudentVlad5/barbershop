import * as React from "react";
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
} from "@syncfusion/ej2-react-schedule";
import { TreeViewComponent } from "@syncfusion/ej2-react-navigations";
import { closest, remove, addClass } from "@syncfusion/ej2-base";
import { fieldsData } from "./Datasource";
import ReactDOM from "react-dom";
import { DataManager, ODataV4Adaptor, UrlAdaptor } from "@syncfusion/ej2-data";
import { closeModalWindow } from "hooks/modalWindow";
import css from "./shedule.module.scss";
import { ReactComponent as CloseIcon } from "../../images/svg/icon_close.svg";

const Schedule = () => {
  let dataManager = new DataManager({
    url: "http://localhost:3030/api/get_event",
    crudUrl: "http://localhost:3030/api/batch_event",
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });
  let ownersData = new DataManager({
    url: "http://localhost:3030/api/owner",
    adaptor: new ODataV4Adaptor(),
  });
  const [ownerData] = React.useState(ownersData);
  const group = { resources: ["Barbers"] };
  const eventSettings = {
    dataSource: dataManager,
    fields: fieldsData,
  };

  const today = new Date();
  const scheduleObj = React.useRef(null);
  const treeObj = React.useRef(null);
  let isTreeItemDropped = false;
  let draggedItemId = "";
  let allowDragAndDrops = true;
  const treeViewData = [
    { Id: 1, subject: "cut hair", time: "30", OwnerId: "2" },
    { Id: 2, subject: "cut hair", time: "30", OwnerId: "2" },
    { Id: 3, subject: "cut hair", time: "30", OwnerId: "2" },
    { Id: 4, subject: "cut hair", time: "30", OwnerId: "2" },
    { Id: 5, subject: "cut hair", time: "30", OwnerId: "2" },
    { Id: 6, subject: "cut hair", time: "30", OwnerId: "2" },
  ];
  let treeViewValues = {
    dataSource: treeViewData,
    id: "Id",
    text: "subject",
    time: "time",
    OwnerId: "OwnerId",
  };

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
    let resourceName = getBarberName(value);
    switch (resourceName) {
      case "Julia":
        return "High level barber";
      case "Grogoriy":
        return "Master";
      case "Vlad":
        return "Dr. BARber";
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
        <div className="resource-detail">
          <div className="resource-name">{getBarberName(props)}</div>
          <div className="resource-designation">{getBarberLevel(props)}</div>
        </div>
      </div>
    );
  }

  const treeTemplate = (props) => {
    return (
      <div id="waiting">
        <div id="waitdetails" style={{ display: "flex", flexDirection: "row" }}>
          <div id="waitlist">{props.Id}</div>
          <div id="waitcategory">{props.subject}</div>
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
    if (args.requestType === "eventCreate" && args.data.length > 0) {
      let eventData = args.data[0];
      let eventField = scheduleObj.current.eventFields;
      let startDate = eventData[eventField.startTime];
      let endDate = eventData[eventField.endTime];
      console.log(eventData[eventField.startTime])
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
    if (args.requestType === "eventCreate" && isTreeItemDropped) {
      let treeViewdata = treeObj.current.fields.dataSource;
      const filteredPeople = treeViewdata.filter(
        (item) => item.Id !== parseInt(draggedItemId, 10)
      );
      treeObj.current.fields.dataSource = filteredPeople;
      let elements = document.querySelectorAll(
        ".e-drag-item.treeview-external-drag"
      );
      for (let i = 0; i < elements.length; i++) {
        remove(elements[i]);
      }
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
          let eventData = {
            Subject: filteredData[0].subject,
            StartTime: cellData.startTime,
            EndTime: cellData.endTime,
            IsAllDay: cellData.isAllDay,
            Id: filteredData[0].Id,
            OwnerId: filteredData[0].OwnerId,
          };
          scheduleObj.current.addEvent(eventData);
          isTreeItemDropped = true;
          draggedItemId = event.draggedNodeData.id;
        }
      }
    }
  };

  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={closeModal}>
      <div
        className={css.sheduleContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={css.btnCloseModal}
          type="button"
          onClick={closeModal}
          aria-label="Close modal"
        >
          <CloseIcon style={{ fill: "black", width: "25px", height: "25px" }} />
        </button>
        <div>
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
                allowMultiple={true}
                groupIDField="groupId"
                cssClass="excel-export"
              ></ResourceDirective>
            </ResourcesDirective>
            <ViewsDirective>
              <ViewDirective option="Day" startHour="9:00" endHour="22:00" />
              <ViewDirective option="Week" startHour="9:00" endHour="22:00" />
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
    </div>,
    document.querySelector("#popup-root")
  );
};
export default Schedule;
