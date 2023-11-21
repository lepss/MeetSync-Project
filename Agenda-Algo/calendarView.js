events = {
    
}

let ec = new EventCalendar(document.getElementById('calendar'), {
    view: 'timeGridDay',
    date: new Date("2023-01-01"),
    events: [
        // your list of events
    ]
});

ec.setOption("slotDuration", '00:10')
// ec.setOption("Date", new Date("2023-01-01"))
ec.setOption("Date", "2023-01-01")