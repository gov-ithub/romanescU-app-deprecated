(function() {
    'use strict';
    /*eslint angular/di: [2,"array"]*/

    angular.module('romanescU')
        .controller('newsCtrl', ['$scope', '__mongo', '$rootScope',
            function($scope, __mongo, $rootScope) {
                var vm = this,
                    vmLocal = {};

                // -->INIT: vars
                vm.newsFeed = [];

                // -->DECLARE: functions
                vm.toggleSocial = function($event) {
                    var self = angular.element($event.currentTarget);
                    self.parent().find("div").toggleClass('hidden');
                }
                vm.goToSingle = function(id) {
                    $rootScope.goto('app.news_view/:articleId', { articleId: id });
                }
                __mongo.getCollection('news').then(function(data) {
                    data.forEach(function(elem) {
                        elem.author = $rootScope.getNewsAuthorMeta(elem._id);
                    })
                    vm.newsFeed = data;
                });

                // TODO:: fetch the list of companies from the server and display here
                $scope.$on("$destroy", function() {
                    vmLocal = null;
                })
            }
        ]);
})();