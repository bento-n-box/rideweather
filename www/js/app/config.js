/**
 * @module config
 */

'use strict';

requirejs.config({

  // Disable timeout for scripts.
  waitSeconds: 0,

  baseUrl: 'js/app',

  paths: {
    // Core Libraries
    jquery:         '../lib/jquery-1.10.2.min', // http://api.jquery.com/
    jqueryMobile:    '../lib/jquery.mobile-1.4.0.min', // http://api.jquery.com/
    jqueryUi:    '../lib/jquery-ui-1.10.4.min', // http://api.jquery.com/
    underscore:    '../lib/lodash',            // http://lodash.com/
    backbone:  '../lib/backbone-min',      // http://backbonejs.org/,
    "backbone.localStorage" : "../lib/backbone.localStorage-min",                        //https://github.com/jeromegn/Backbone.localStorage/

    // Backbone Submodule Directories
    router:     'router',
    model:      'model',
    collection: 'collection',
    view:       'view',
    template:   'template',

    // Helper Modules
    helpers: '../helpers',

    // 3rd party
    suncalc: '../lib/suncalc',
    snap: '../plugins/snap.svg-min'

  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    "backbone.localStorage": {
      "deps": ["backbone"],
      "exports": "Backbone.localStorage"
    },

    snap: {
      deps: ['jquery'],
      exports: 'snap'
    },
      
  }
});
