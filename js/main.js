$(function() {
  var clndrInstance = $('.clndr').clndr({
    template: $('#tmplt').html(),
    events: [],
    showAdjacentMonths: true,
    adjacentDaysChangeMonth: false,
    classes: {

    }
  });;
  var key = 'AIzaSyBy-ASLHIYK7sO73Ch2hq0zSUFr8hrdahY';
  var calendarid = 'fqbl70ci59vsol21kmuq79vd5k@group.calendar.google.com';

  $.ajax({
    type: 'GET',
    url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid + '/events?key=' + key),
    dataType: 'json',
    success: function(res) {

      var events = res.items.map(function(event) {
        var date = {}; //build the object from the calendar's events
        if (event.start.dateTime)
          date.date = new Date(event.start.dateTime);
        else
          date.date = new Date(event.start.date)
        return date;
      });
      // console.log(events);
      clndrInstance.setEvents(events);//set the events for the calendar
    },
    error: function(res) {
      console.log('err', res)
        //tell that an error has occurred
    }
  });

});