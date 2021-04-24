document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

//BACK BUTTON
const goBack = () =>{
  window.history.back();
}

//Day config


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
      const dateStr = info.dateStr
     /* alert('clicked ' + info.dateStr);  */
       console.log(info) 
      window.location.href = "/mood/new/" + dateStr;


    },
    
  /*   select: (info) => {
      alert('selected ' + info.startStr + ' to ' + info.endStr);
      console.log(info)
    }  */
  });

  calendar.render();
});