document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

//BACK BUTTON
const goBack = () =>{
  window.history.back();
}

//CALENDAR CONFIG

document.addEventListener('DOMContentLoaded',() => {
  let calendarEl = document.getElementById('calendar');

  let calendar = new FullCalendar.Calendar(calendarEl, {
    editable: true,
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    dateClick: (info) => {
       alert('clicked ' + info.dateStr);
     /*  window.location.href = "http://localhost:3000/mood/new"; */

    },
    /* select: (info) => {
      alert('selected ' + info.startStr + ' to ' + info.endStr);
    } */
  });

  calendar.render();
});