(function() {
    'use strict';

    angular
        .module('romanescU')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider, $resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;

        $stateProvider
            .state('app', {
                abstract: true,
                url: "/app",
                templateUrl: "app/components/common/content.html"
            })
            .state('app.map', {
                url: "/map",
                templateUrl: "app/components/map/map.html",
                controller: "mapController",
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Dashboard'
                }
            })
            .state('app.settings', {
                url: "/settings",
                templateUrl: "app/components/settings/settings.html",
                controller: "settingsController",
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Dashboard'
                }
            })
            .state('app.news', {
                url: "/news",
                templateUrl: "app/components/news/dashboard.html",
                controller: "newsController",
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Dashboard'
                }
            })
            .state('app.news_view/:articleId', {
                url: '/news_view/:articleId',
                templateUrl: 'app/components/news/view.html',
                controller: 'newsViewCtrl',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Dashboard'
                },
                resolve: {
                    articleId: ['$stateParams', function($stateParams) {
                        return $stateParams.articleId;
                    }]
                }
            });

        $urlRouterProvider.otherwise('/app/map');
    }

})();