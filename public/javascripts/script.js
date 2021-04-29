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
  
  let newEvents = moods.map((mood) => {
    if(mood.img === ''){
      return {
        title: mood.mood,
        start: mood.date
      }
    } else {
      return {
        title: mood.mood,
        start: mood.date,
        image_url: mood.img
      }
    }
  })

  let calendar = new FullCalendar.Calendar(calendarEl, {
    editable: true,
    selectable: true,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    },
    dateClick: (info) => {
      const dateStr = info.dateStr
      window.location.href = "/mood/new/" + dateStr;
    },

    events: newEvents,

    eventColor: 'rgba(0, 0, 0, 0.0)',
    eventContent: function(arg) {
      let arrayOfDomNodes = []
      // title event
      let titleEvent = document.createElement('div')
      if(arg.event._def.title) {
        titleEvent.innerHTML = arg.event._def.title
        titleEvent.classList = "fc-event-title fc-sticky"
      }

      // image event
      let imgEventWrap = document.createElement('div')
      if(arg.event.extendedProps.image_url) {
        let imgEvent = '<img src="'+arg.event.extendedProps.image_url+'" >'
        imgEventWrap.classList = "fc-event-img"
        imgEventWrap.innerHTML = imgEvent;
      }

      arrayOfDomNodes = [ titleEvent,imgEventWrap ]

      return { domNodes: arrayOfDomNodes }
    }

})
  
  calendar.render();
})



//COMPROBATIONS TO BRING THE BACK INFO TO THE FRONT
try {
  console.log(moods)
} catch {
  console.log('Todavía no hay moods')
}


