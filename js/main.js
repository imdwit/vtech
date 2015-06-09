$(function() {
   var thisMonth = moment().format('YYYY-MM');

  var eventArray = [
  { date: thisMonth + '', title: 'Single Day Event' },
  { date: thisMonth + '-2', title: 'Single Day Event' },
  { date: thisMonth + '-2', title: 'Single Day Event' },
  { date: thisMonth + '-7', title: 'Single Day Event' },
    { date: thisMonth + '-27', title: 'Single Day Event' }
  ];

  $('.clndr').clndr({
    template: $('#tmplt').html(),
    events: eventArray,
    multiDayEvents: {
      startDate: 'startDate',
      endDate: 'endDate',
      singleDay: 'date'
    },
    //dateparam: '',  will need this for google cal api
    showAdjacentMonths: true,
    adjacentDaysChangeMonth: false,
    classes: {

    }
  });
});