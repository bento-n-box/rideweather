define('master/view/weather', [
  'jquery',
  'jqueryMobile',
  'underscore',
  'backbone',
  'master/model/weather',
  'master/collection/weather',
  'suncalc',
], function( $, jqueryMobile, _, Backbone, weatherModel, weatherCollection, SunCalc) {

  'use strict';
  var input = 0;
  var interval = 'hourly';
  var pos = 0;
  
  return Backbone.View.extend({

    events: {
      "tap #weather-main": "showDetail"
    },

    hour: 0,

    el: '#hero',

    template: _.template($('#hero-weather').html()),

    model: weatherModel,

    collection: weatherCollection,

    defaults: {},

    initialize: function(data) {
      _.bindAll(this);
      var view = this;
      
      App.cache.events.on('update:time', function(data){
        input = Math.floor(data);
        view.drawWeather(input);
      })
      console.log("weather view", data);

      view.defaults.longitude = data.longitude;
      view.defaults.latitude = data.latitude;

      view.getWeatherData(data.longitude, data.latitude);
      var date = new Date();

    },

    render: function() {
      var view = this;
      var json = view.json;
      console.log('render', json);
      
      view.renderDefault();
      view.drawWeather(0);
    },

    renderDefault: function(){
      var view = this;
      var json = view.json;
      
      $("#highTemp").html(Math.floor(json.daily.data[0].temperatureMax));
      $("#lowTemp").html(Math.floor(json.daily.data[0].temperatureMin));

      $("#summary").html(json.minutely.summary);
      $('#weather-loc').html(json.timezone);
    },

    drawWeather: function(pos) {
      var view = this;
      var json = view.json;
      window.json = json;

      var hrly  = json.hourly.data[pos],
          icon = hrly.icon,
          temp = Math.floor(hrly.temperature),
          precip = Math.round(hrly.precipIntensity*1000)/1000,
          probability = Math.floor(hrly.precipProbability * 100),
          bearing = hrly.windBearing,
          windSpeed = hrly.windSpeed,
          cloudCover = hrly.cloudCover
          ;

      
      $('#weather-icon-0, #weather-icon-1').attr('class', 'weather-icon icon icon-'+icon);
      $('#weather-temp-0, #weather-temp-1').html( temp + '&deg;');
      
      $('#precip').html(precip+'&quot;/hr');
      $('#intensity').html(probability + '%');
      $('#cloudCover').html(cloudCover + '%');
      $('#wind').css({'-webkit-transform' : 'rotate('+ bearing +'deg)'});
      $('#speed').html(windSpeed+'mph');
    },

    update: function() {
      var view = this;
      
      this.$el.html(this.template(view.json[interval].data[input]));
      var degrees = view.json.hourly.data[input].windBearing;

      $('#wind').css({'-webkit-transform' : 'rotate('+ degrees +'deg)'});
    },

    getWeatherData: function(lat, long){
      var view = this;
      
      view.weatherModel = new this.model({
        longitude: lat,
        latitude: long,
      });

      view.weatherModel.fetch({
        success: function(data) {
          view.dataReturned(data.attributes);
        }
      });
    },

    dataReturned: function(results) {
      var view = this;
      view.json = view.weatherModel.toJSON();
      var date = new Date();
      console.log(date, view.defaults.latitude);
      var sunTimes = SunCalc.getPosition(date, view.defaults.latitude, view.defaults.longitude);
      var moonTimes = SunCalc.getMoonPosition(date, view.defaults.latitude, view.defaults.longitude);
      
      App.cache.events.trigger("weather:data", [view.json, moonTimes, sunTimes]);
      this.render();

    },

    showDetail: function(){
      var view = this;
      var panel = view.$el.find('.panel');
      var panelNum = view.$el.find('.active').index();
      var panels = view.$el.find('.panel').length;
      
      console.log('click panel', panelNum, panels)
      if (panelNum < panels-1){
        panelNum = panelNum + 1;
      } else {
        panelNum = 0;
      }

      console.log(panelNum !== panels)
      console.log('click panel', panelNum, panels)
      
      panel.removeClass('active');
      panel.eq(panelNum).addClass('active');
    }

  });
});
