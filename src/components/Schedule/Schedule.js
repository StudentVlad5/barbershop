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

const Schedule = () => {
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

  const dates = extend([], data, null, true);
  const [ownerData] = React.useState(ownersData);
  const group = { resources: ["Doctors"] };
  const eventSettings = { dataSource: dates, fields: fieldsData };
  // const workingDays = [1, 3, 5];
  const today = new Date();

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
        <ViewDirective option="Day" />
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
  );
};
export default Schedule;
