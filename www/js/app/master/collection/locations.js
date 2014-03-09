define('master/collection/locations', [
	'config',
	'jquery',
	'underscore',
	'backbone',
	'router',
	'backbone.localStorage',
	'master/model/location'
	], function(config, $, _, Backbone, AppRouter, LocalStorage, LocationModel, latitude, longitude){
		'use strict';

		return Backbone.Collection.extend({
			
			//localStorage: new Backbone.LocalStorage('backbone-location'),

			default: {
				commuteTime: '1',
				firstDeparture: '8:00am',
				secondDeparture: '6:00pm',
				location: 'Zipcode or City, State'
			},

			url: 'http://maps.googleapis.com/maps/api/geocode/json?sensor=true',
			
			model: LocationModel


		})


  return App;

});