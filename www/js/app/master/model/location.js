define('master/model/location', [
	'config',
	'jquery',
	'underscore',
	'backbone',
	'router'
	], function(config, $, _, Backbone, AppRouter, LocationView){
		'use strict';

		return Backbone.Model.extend({

			defaults: {
				commuteTime: '1',
				firstDeparture: '8:00am',
				secondDeparture: '6:00pm',
				location: 'Zipcode or City, State'
			}

		});
});