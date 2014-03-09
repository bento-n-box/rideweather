define('master/model/weather', [
	'config',
	'jquery',
	'underscore',
	'backbone',
	'router'
	], function(config, $, _, Backbone, AppRouter, LocationView){
		'use strict';

		var latitude;
		var longitude;
		var error 

		return Backbone.Model.extend({

			//url: 'http://localhost:3000/weather?latitude=40.0176&longitude=-105.2797',
			initialize: function(data) {
				latitude = data.latitude;
				longitude = data.longitude;
			},

			// To get call to work in browser
       sync: function(method, model, options) {
         var model = this;
         var params = _.extend({
          type: 'GET',
          dataType: 'jsonp',
          url: model.url(),
          processData: false
       }, options);

       return $.ajax(params);
    },

			// url: function(){
			// 	return 'https://api.forecast.io/forecast/82c7b16d26dd2ca8441620fee32574ba/40.0176,-105.2797';
			// 	//return 'http://localhost:3000/weather?latitude=40.0176&longitude=-105.2797';

			// 	// IPHONE ONE
			// 	//return 'https://api.forecast.io/forecast/82c7b16d26dd2ca8441620fee32574ba/' + latitude + ',' + longitude;
			// },

			url: function(){
				return 'https://api.forecast.io/forecast/82c7b16d26dd2ca8441620fee32574ba/' + latitude + ',' + longitude;
			},
			
			parse: function(response){
				// Relocate date in to hourly
				response.hourly.data.unshift(response.currently);	
				response.hourly.timezone = response.timezone;
				response.hourly.currentSummary = response.currently.summary;


				for(var hours in response.hourly.data){
					response.hourly.data[hours].temperature = Math.floor(response.hourly.data[hours].temperature);
					response.hourly.data[hours].avgTemp = Math.floor(response.hourly.data[hours].temperature);
					response.hourly.data[hours].windSpeed = Math.floor(Math.round( response.hourly.data[hours].windSpeed * 10 ) / 10);
					response.hourly.data[hours].precipIntensity =response.hourly.data[hours].precipIntensity;
					response.hourly.data[hours].cloudCover = Math.round(response.hourly.data[hours].cloudCover*100);
				}
		


				console.log(response);
				return response;
			}

		});
});
