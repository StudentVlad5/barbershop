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
} from "@syncfusion/ej2-react-schedule";
import { data, fieldsData } from "./Datasource";
import { extend } from "@syncfusion/ej2-base";

const Schedule = () => {
  const dates = extend([], data, null, true);
  const eventSettings = { dataSource: dates, fields: fieldsData };
  // const workingDays = [1, 3, 5];
  const today = new Date();

  return (
    <ScheduleComponent
      height="550px"
      width="100%"
      currentView="Week"
      selectedDate={
        new Date(
          today.getFullYear().toString(),
          (today.getMonth() + 2).toString(),
          today.getDate().toString()
        )
      }
      eventSettings={eventSettings}
    >
      <ViewsDirective>
        {/* <ViewDirective option="Day" /> */}
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
