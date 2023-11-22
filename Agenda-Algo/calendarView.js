const event1 = {
    id: "01",
    allDay: false,
    start: new Date("2023-01-01 12:00:00"),
    end: new Date("2023-01-01 12:30:00"),
    title: "Event test",
    editable: false,
    display: "auto"
}

let ec = new EventCalendar(document.getElementById('calendar'), {
    view: 'timeGridDay',
    date: new Date("2023-01-01"),
    slotDuration: "00:30",
    events: [
        // your list of events
        event1
    ]
});