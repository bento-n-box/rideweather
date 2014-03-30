define('master/view/time', [
  'jquery',
  'underscore',
  'backbone',
  'master/collection/locations',
  'master/model/location',
  'master/view/weather'
], function($, _, Backbone, TimeView) {

  'use strict';

  var date = new Date();
  var hours = date.getHours();
  var hour = (hours > 12) ? hours-12: hours;
  var min = date.getMinutes();
  var meridiem = (hour > 11 ) ? 'am': 'pm';

  return Backbone.View.extend({

    el: '#time-container',

    initialize: function(options) {
      _.bindAll(this);
      var view = this;
      view.render();
      view.addTime();
      view.sliderListen();
                              
      //console.log('Backbone : Global : LocationView : Initialized');
    },

    render: function() {
      var view = this;
      view.$el.find('#time').html(view.currentTime);
    },

    addTime: function(){
      var view = this;
      var currentMin = (min < 10) ? '0'+min : min;
      view.currentTime = hour+':'+currentMin+meridiem;
      view.render();
    },

    sliderListen: function(){
      var view = this;
      var maxWidth = $(window).width();
      var sliderWidth = $('#slider').width();
      var offsetX = $('#slider').offset().left;
      var switchWidth = 52;

      var maxRight = sliderWidth + switchWidth;

      var y1 = 0;
      var y2 = 0;
      var x1 = 0;
      var x2 = 0;
      var dist;
      var droppableObj = true;
      $('#switch').draggable({          
          revert: false,
          revertDuration: 200,
          axis: 'x',
          containment: "parent",

          drag: function(e, ui) {
              y2 = ui.position.top;
              x2 = ui.position.left;

              view.updateTime(x2, sliderWidth)
          },
          start: function(e, ui) {
              y1 = ui.position.top;
              x1 = ui.position.left;
          },
          stop: function(e, ui) {
            //view.render();
          }
      });
    },

    updateTime: function(pos, sliderWidth){
        var view = this,
            max = 12,
            pos = Math.round((pos / (sliderWidth-52))*100); // slider is now 0 through 100;
        App.cache.events.trigger('update:pos', pos); 
        var sliderMinCount = (max * 60) * (pos/100); // 48hrs * 0.22
        
        if(max == 12){
          if(pos % 8 == 1){
            view.updateApp(pos);
          }
        }
        view.convertTime(sliderMinCount);
    },

    convertTime: function(sliderMinCount){
      var view = this;

     
      //var sliderMins = Math.floor(60* (sliderMinCount/12 % 1)); // 3% of 60min
      var sliderMins = Math.floor(sliderMinCount);
      var sliderHours = 0 + Math.floor(sliderMins/60);

      var newHours = view.makeTwelve(sliderHours + hours);
      var newMin = min + (sliderMins - 60*sliderHours);


      // Correct if over 60min
      if(newMin > 60 ){
        newMin = newMin - 60;
        newHours = view.makeTwelve(newHours+1);
      }
      
      
      var newTime = newHours+':'+newMin;
      view.$el.find('#time').html(newTime);
      
    },

    makeTwelve: function(num){
      var offset = 12 * (Math.floor(num/12));
      num = num - offset;
      num = (num == 0) ? 12 : num;

      //var newMeridiem = (newHours > 11 ) ? 'am': 'pm';
      return num;
    },

    addMinutes: function(date, minutes) {
      return new Date(date.getTime() + minutes*60000);
    },

    updateApp: function(pos){
      App.cache.events.trigger('update:time', pos/8)
    }

  });
});
