/**
 * @module router
 */

'use strict';

define('router', [
  'backbone'
], function(Backbone) {

  return Backbone.Router.extend({

    initialize: function() {

      console.log('Backbone : Global : AppRouter : Initialized');
    },


    routes: {
      '': 'index'
    },


    index: function() {
    }

  });

});
