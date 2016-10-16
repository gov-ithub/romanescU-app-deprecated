var app = angular.module('romanescU', ['ionic', 'romanescU.controllers', 'romanescU.services','ngSanitize','ion-floating-menu'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('app.map', {
            url: '/map',
            views: {
                'menuContent': {
                    templateUrl: 'templates/map.html',
                    controller: "mapController as vm"
                }
            }
        })
        .state('app.settings', {
            url: '/settings',
            views: {
                'menuContent': {
                    templateUrl: 'templates/settings.html',
                    controller: 'settingsCtrl'
                }
            }
        })
        .state('app.news', {
            url: '/news',
            views: {
                'menuContent': {
                    templateUrl: 'templates/news.html',
                    controller: 'newsCtrl'
                }
            }
        })
        .state('app.news_view/:articleId', {
            url: '/news_view/:articleId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/news_view.html',
                    controller: 'newsViewCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/app/map');
});

