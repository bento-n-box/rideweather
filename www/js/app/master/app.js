// get user location
// user enters location
// Grab weather data // Or is weather data cached? 
// Show weather and road conditions for commute.
// Search again or change query

define('master/app', [
  'config',
  'jquery',
  'underscore',
  'backbone',
  'router',
  'master/view/location',
  'master/view/weather',
  'master/view/time',
  'master/view/background',
  //'helpers/console',
  //'helpers/events',
  //'helpers/analytics',
], function(config, $, _, Backbone, AppRouter, LocationView, WeatherView, TimeView, BackGround) {

  'use strict';

  var App = {

    config: config,

    cache: {
      routers: {},
      models: {},
      collections: {},
      views: {},
      events: _.clone(Backbone.Events)
    },

    /**
     * initialize()
     *
     * Initialize Application. Responsible for instantiating Backbone router and starting Backbone history.
     */
    initialize: function() {
      var view = this;
      view.start();

      Backbone.history.start();

      return App; // do not use "this" in a static context
    },

    start: function(){
      console.log('starting');
      App.cache.routers.appRouter = new AppRouter();
      App.cache.views.locationView = new LocationView();
      App.cache.views.timeView = new TimeView();
      App.cache.views.background = new BackGround();
      
    }

  };
  window.App = App;
  return App;

});
