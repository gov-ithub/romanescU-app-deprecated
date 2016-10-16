angular.module('romanescU.services', [])
    .service('__mongo', ['$q', '$timeout', '$ionicLoading', '$http',
        function($q, $timeout, $ionicLoading, $http) {
            var url = "https://api.mlab.com/api/1/databases/romanescu/collections/";

            // -->Get: collection
            this.getCollection = function(collectionName) {
                return $http({
                        method: 'GET',
                        url: url + collectionName + '?apiKey=H8NuMe05IJua5M5vUOH_m4UgaKKYDXgc'
                    })
                    .then(function(data) {
                        return data.data;
                    })
            }
        }
    ])