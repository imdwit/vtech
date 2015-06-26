$(function() {

  var detailsTmplt =  _.template($('#details-tmplt').html());
  var clndrInstance = $('.clndr').clndr({
    template: $('#tmplt').html(),
    events: [],
    showAdjacentMonths: true,
    adjacentDaysChangeMonth: false,
    clickEvents :{
      click: function(e) {
        console.log(e);
        // console.log(e);
        $('#clndr-details').html('');
        var events = e.events;
        if(events.length)
          $('.details-header').removeClass('hidden')
        else {
          $('.details-header').addClass('hidden')
        }
        _.each(events, function(event) {
          var html = detailsTmplt(event);
          $('#clndr-details').append(html);
        });
      }
    }
  });
  var key = 'AIzaSyBy-ASLHIYK7sO73Ch2hq0zSUFr8hrdahY';
  var calendarid = 'fqbl70ci59vsol21kmuq79vd5k@group.calendar.google.com';

  $.ajax({
    type: 'GET',
    url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid + '/events?key=' + key),
    dataType: 'json',
    success: function(res) {
      var events = res.items.map(function(event) {
        console.log(event);
        var date = {}; //build the object from the calendar's events
        if (event.start.dateTime)
          date.date = new Date(event.start.dateTime);
        else
          date.date = new Date(event.start.date);

        event.link = '';

        if (event.description && event.description.indexOf('https') > -1) {
          var i = event.description.indexOf('https');
          event.link = event.description.slice(i);
          event.description = event.description.slice(0, i);
        }
        date.summary = event.summary;
        date.location = event.location;
        date.link = event.link;
        date.description = event.description;
        return date;
      });
      clndrInstance.setEvents(events); //set the events for the calendar
    },
    error: function(res) {
      console.log('err', res);
      //tell that an error has occurred
    }
  });

  $('a[href*=#]:not([href=#])').click(function() {
    if($('.collapse').hasClass('in'))
      $('.navbar-toggle').trigger('click');

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
