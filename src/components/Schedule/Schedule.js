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
import { data, fieldsData, ownersData } from "./Datasource";
import { extend } from "@syncfusion/ej2-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

const Schedule = () => {
  const dates = extend([], data, null, true);
  const [ownerData] = React.useState(ownersData);
  const group = { resources: ["Doctors"] };
  const eventSettings = { dataSource: dates, fields: fieldsData };
  // const workingDays = [1, 3, 5];
  const today = new Date();
  let scheduleObj;
  let buttonObj;

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

  function onAddClick() {
    let Data = data;
    scheduleObj.addEvent(Data);
    buttonObj.element.setAttribute("disabled", "true");
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
  return (
    <div>
      <ButtonComponent
        id="add"
        title="Add"
        ref={(t) => (buttonObj = t)}
        onClick={onAddClick}
      >
        Add
      </ButtonComponent>
      <ScheduleComponent
        ref={(t) => (scheduleObj = t)}
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
            textField="OwnerText"
            idField="Id"
            DesignationField="designation"
            colorField="OwnerColor"
          ></ResourceDirective>
        </ResourcesDirective>
        <ViewsDirective>
          {/* <ViewDirective option="Week" /> */}
          <ViewDirective option="Week" startHour="10:00" endHour="18:00" />
          <ViewDirective option="WorkWeek" startHour="7:00" endHour="21:00" />
          <ViewDirective option="Month" showWeekend={false} />
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
  );
};
export default Schedule;
