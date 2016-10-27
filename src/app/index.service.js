/**
  A service for creating and managing $resource objects for the api 

Default options:
    { 
        'get':    {method:'GET'},
        'save':   {method:'POST'},
        'query':  {method:'GET', isArray:true},
        'remove': {method:'DELETE'},
        'delete': {method:'DELETE'} 
    }; 
 */
(function() {
    'use strict';

    //Directive used to set metisMenu and minimalize button
    /*eslint angular/di: [2,"array"]*/
    angular.module('romanescU')
        .service('User', [function() {
            this.data = {
                name: "Melissa",
                defaults: {
                    currency: "GPB"
                },
                lang: "en"
            }
        }])
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
        .service('MapService', ['$q', function($q){

            this.fetchPosition = function(position, map) {
                var deff = $q.defer();
                if (angular.isArray(position)) {
                     deff.resolve(new google.maps.Marker({
                        map: map,
                        draggable: true,
                        position: { lat: position[0], lng: position[0] }
                    }))
                } else if (position == 'here') {
                    navigator.geolocation.getCurrentPosition(function(pos) {
                        deff.resolve(new google.maps.Marker({
                            map: map,
                            draggable: true,
                            position: { lat: pos.coords.latitude, lng: pos.coords.longitude }
                        }))
                    });
                }
                return deff.promise;
            }
        }])
})();