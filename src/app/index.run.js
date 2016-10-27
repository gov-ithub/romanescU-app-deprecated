(function() {
    'use strict';

    angular
        .module('romanescU')
        .run(function($log, $rootScope, $state, $ionicPlatform, $window) {
            /** @ngInject */
            $rootScope.goto = function(route, opts) {
                $state.go(route, opts);
            }
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if ($window.cordova && $window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if ($window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
            $log.debug('runBlock end');
        });
})();