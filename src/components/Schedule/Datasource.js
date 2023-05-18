export const data = [
    {
      Id: 1,
      Subject: 'Meeting - 1',
      StartTime: new Date(2023, 6, 18, 10, 0),
      EndTime: new Date(2023, 6, 18, 11, 30),
      IsAllDay: false,
      Status: 'Completed',
      Priority: 'High'
    },
    {
      Id: 2,
      Subject: 'Meeting - 2',
      StartTime: new Date(2023, 6, 19, 13, 0),
      EndTime: new Date(2023, 6, 19, 14, 0),
      IsAllDay: false,
      Status: 'Completed',
      Priority: 'High'
  },
  ];

  export const fieldsData = {
    id: 'Id',
    subject: { name: 'Subject' },
    isAllDay: { name: 'IsAllDay' },
    startTime: { name: 'StartTime' },
    endTime: { name: 'EndTime' }
}