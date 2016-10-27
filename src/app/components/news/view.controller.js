(function() {
    'use strict';
    /*eslint angular/di: [2,"array"]*/

    angular.module('romanescU')
        .controller('MapController', ['$scope', '$stateParams', '__mongo', '$rootScope',
            function($scope, $stateParams, __mongo, $rootScope) {
                var vm = this;

                __mongo.getCollection('news').then(function(data) {
                    data.forEach(function(elem) {
                        if (elem._id == $stateParams.articleId) {
                            vm.news = elem;
                        }
                    })
                });

                vm.authorMeta = $rootScope.getNewsAuthorMeta($stateParams.articleId);

                // TODO:: fetch the list of companies from the server and display here
                $scope.$on("$destroy", function() {
                })
            }
        ]);
})();