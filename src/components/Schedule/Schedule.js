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

  const onActionBegin = (args) => {
    if (args.requestType === "eventCreate" && args.data.length > 0) {
      let eventData = args.data[0];
      let eventField = scheduleObj.current.eventFields;
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
            currentView="WorkWeek"
            selectedDate={
              new Date(
                today.getFullYear().toString(),
                today.getMonth().toString(),
                today.getDate().toString()
              )
            }
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
      </div>
    </div>,
    document.querySelector("#popup-root")
  );
};
export default Schedule;
