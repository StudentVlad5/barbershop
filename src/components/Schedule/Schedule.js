import * as React from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  MonthAgenda,
  TimelineViews,
  TimelineMonth,
  Inject,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
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
  console.log(ownersData);
  const group = { resources: ["Doctors"] };
  const eventSettings = {
    // includeFiltersInQuery: true,
    dataSource: dataManager,
    fields: fieldsData,
  };
  // const workingDays = [1, 3, 5];
  const today = new Date();

  function getDoctorName(value) {
    return value.resourceData
      ? value.resourceData[value.resource.textField]
      : value.resourceName;
  }

  function getDoctorLevel(value) {
    let resourceName = getDoctorName(value);
    return resourceName === "Julia"
      ? "Cardiologist"
      : resourceName === "Grogoriy"
      ? "Neurologist"
      : "Orthopedic Surgeon";
  }

  function closeModal(e) {
    e.preventDefault();
    closeModalWindow(e);
  }

  function resourceHeaderTemplate(props) {
    return (
      <div className="template-wrap">
        <div className="resource-detail">
          <div className="resource-name">{getDoctorName(props)}</div>
          <div className="resource-designation">{getDoctorLevel(props)}</div>
        </div>
      </div>
    );
  }
  return  ReactDOM.createPortal(
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
          <CloseIcon style={{fill:"black", width:"25px", height:"25px"}}/>
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
            eventSettings={eventSettings}
            group={group}
            enablePersistence={true}
            rowAutoHeight={true}
          >
            <ResourcesDirective>
              <ResourceDirective
                field="OwnerId"
                title="Subject"
                name="Doctors"
                dataSource={ownerData}
                textField="ownerText"
                idField="Id"
                DesignationField="designation"
                colorField="ownerColor"
              ></ResourceDirective>
            </ResourcesDirective>
            <ViewsDirective>
              <ViewDirective option="Day" startHour="7:00" endHour="18:00" />
              <ViewDirective option="Week" startHour="10:00" endHour="18:00" />
              <ViewDirective
                option="WorkWeek"
                startHour="7:00"
                endHour="21:00"
              />
              <ViewDirective option="Month" showWeekend={true} />
              <ViewDirective option="Agenda" />
            </ViewsDirective>

            <Inject
              services={[
                Day,
                Week,
                WorkWeek,
                Month,
                Agenda,
                MonthAgenda,
                TimelineViews,
                TimelineMonth,
              ]}
            />
          </ScheduleComponent>
        </div>
      </div>
    </div>,
    document.querySelector("#popup-root")
  )
};
export default Schedule;
