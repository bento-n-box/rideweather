/**
 * @module main
 */

'use strict';

require(['config', 'master/app'], function (config, App) {
        
    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {
        App.initialize();
    }
    

});
