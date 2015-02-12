'use strict';
$(document).ready(init);

function init() {
  getLocal();
}

function getLocal() {
  var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
  navigator.geolocation.getCurrentPosition(success, error, options);
}

function success(pos) {
  var url = 'http://api.wunderground.com/api/7223c528ababc07f/forecast10day/q/' + pos.coords.latitude + ',' + pos.coords.longitude + '.json';
  paint(url);

}

function error(err) {
  console.log('could not find position', err);
}

function paint(url) {
  // var url = 'http://api.wunderground.com/api/7223c528ababc07f/forecast10day/q/CA/San_Francisco.json'
    $.getJSON(url, function(response) {
    console.log(response.forecast.simpleforecast.forecastday);
    response.forecast.simpleforecast.forecastday.forEach(function(a) {
      conditions.push(a.conditions);
      var $day = $('<div>');
      $day.addClass('dayDisplay');
      $('#calendar').append($day);
      var $weekDay = $('<div>')
      $weekDay.addClass('weekDayDisplay');
      $weekDay.text(a.date.weekday);
      $day.append($weekDay);
      var $condition = $('<div>');
      $condition.addClass('conditionDisplay');
      $condition.text(a.conditions);
      $day.append($condition);
      var $highs = $('<div>');
      $highs.addClass('highsDisplay');
      $highs.text(a.high.fahrenheit);
      $day.append($highs);
      var $lows = $('<div>');
      $lows.addClass('lowsDisplay');
      $lows.text(a.low.fahrenheit);
      $day.append($lows);

    });
  });
}
