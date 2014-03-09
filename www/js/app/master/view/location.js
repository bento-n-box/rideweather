define('master/view/location', [
  'jquery',
  'jqueryUi',
  'underscore',
  'backbone',
  'master/collection/locations',
  'master/model/location',
  'master/view/weather'
], function($, jqueryUi, _, Backbone, LocationCollection, LocationModel, WeatherView) {

  'use strict';

  return Backbone.View.extend({

    events: {
      "submit button": "getWeather"
    },

    el: '#locationForm',

    collection: LocationCollection,

    template: _.template($("#formTemplate").html()),

    // Converts browser events to mobile events
    touchHandler: function(event) {
          var touch = event.changedTouches[0];

          var simulatedEvent = document.createEvent("MouseEvent");
              simulatedEvent.initMouseEvent({
              touchstart: "mousedown",
              touchmove: "mousemove",
              touchend: "mouseup"
          }[event.type], true, true, window, 1,
              touch.screenX, touch.screenY,
              touch.clientX, touch.clientY, false,
              false, false, false, 0, null);

          touch.target.dispatchEvent(simulatedEvent);
          event.preventDefault();
    },

    initialize: function(options) {
      _.bindAll(this);
      var view = this;
      view.render();

      document.addEventListener("touchstart", view.touchHandler, true);
      document.addEventListener("touchmove", view.touchHandler, true);
      document.addEventListener("touchend", view.touchHandler, true);
      document.addEventListener("touchcancel", view.touchHandler, true);
      view.loadingInit();

      console.log('Backbone : Global : LocationView : Initialized');
    },

    render: function() {
      var view = this;
      console.log('location render');
      view.getLocation();

      //var html = this.template(view.LocationModel.toJSON());
      //this.$el.html(html);
    },

    loadingInit: function(){
      var view = this;
      var y1 = 0;
      var y2 = 0;
      var x1 = 0;
      var x2 = 0;
      var dist;
      var droppableObj = true;
      // $('#wrapper').draggable({          
      //     revert: false,
      //     revertDuration: 200,
      //     axis: 'y',

      //     drag: function(e, ui) {
      //         y2 = ui.position.top;
      //         x2 = ui.position.left;
      //         dist = parseInt(Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)), 10);
      //         if(y2 > 80){ 
      //           ui.position.top = 80;
      //         }
      //         else if(y2 < 0){ 
      //           ui.position.top = 0;
      //         }
      //         else {
      //           ui.position.top = ui.position.top * (1 - (dist / 500));
      //       }
      //     },
      //     start: function(e, ui) {
      //         y1 = ui.position.top;
      //         x1 = ui.position.left;
      //     },
      //     stop: function(e, ui) {
      //       //view.render();
      //     }
      // });
    },

    onSuccess: function(position){
      var view = this;
      console.log('Location Found');
     // $( "#wrapper" ).animate({top: 0}, 300);
      view.createWeatherView(position);
    },

    onError: function(error) {
     console.log('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');

     console.log('failed -- faking');
     var view = this;
      console.log('Location Found');
      $( "#wrapper" ).animate({top: 0}, 300);
      var position = {};
      position.coords = {};
      position.coords.latitude = 40.0176;
      position.coords.longitude = -105.2797;
      view.createWeatherView(position);

    },

    getLocation: function() {
      var view = this;
      navigator.geolocation.getCurrentPosition(view.onSuccess, view.onError);
      //navigator.geolocation.getCurrentPosition(view.onSuccess, view.onError);
    },

    createWeatherView: function(position) {
      var view = this;

      console.log("Creating new WeatherView");
      var weatherview = new WeatherView({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });

    }

  });
});