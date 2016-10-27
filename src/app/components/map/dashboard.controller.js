(function() {
    'use strict';
    /*eslint angular/di: [2,"array"]*/

    angular.module('romanescU')
        .controller('MapController', ['$scope', '$stateParams', '$ionicLoading', '$timeout', '$document', 'MapService', 
            function($scope, $stateParams, $ionicLoading, $timeout, $document, MapService) {
                var vm = this;

                vm.map = null;

                vm.fromLocation = null;
                vm.toLocation = null;

                vm.map = new google.maps.Map($document.getElementById("map"), {
                    center: new google.maps.LatLng(48.7791878, 9.107176),
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                navigator.geolocation.getCurrentPosition(function(pos) {
                    vm.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                    new google.maps.Marker({
                        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                        map: vm.map,
                        title: "Eu"
                    });
                });

                /**
                 *  Navigate to where 
                 * 
                 */
                vm.naivgateTo = function(fromLoc, toLoc) {
                    MapService.fetchPosition(fromLoc, vm.map)
                        .then(function(f) {
                            vm.fromLocation = f;
                            return MapService.fetchPosition(toLoc, vm.map)
                        })
                        .then(function(t) {
                            vm.toLocation = t;

                            var bounds = new google.maps.LatLngBounds(vm.fromLocation.getPosition(), vm.toLocation.getPosition());
                            vm.map.fitBounds(bounds);

                            google.maps.event.addListener(vm.fromLocation, 'position_changed', vm.drawPath);
                            google.maps.event.addListener(vm.toLocation, 'position_changed', vm.drawPath);

                            vm.drawPath();
                        })
                }

                /**
                 * geodesyc update
                 */
                vm.drawPath = function() {
                    poly = new google.maps.Polyline({
                        strokeColor: '#FF0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 3,
                        map: vm.map
                    });

                    geodesicPoly = new google.maps.Polyline({
                        strokeColor: '#CC0099',
                        strokeOpacity: 1.0,
                        strokeWeight: 3,
                        geodesic: true,
                        map: vm.map
                    });

                    var path = [vm.fromLocation.getPosition(), vm.toLocation.getPosition()];
                    poly.setPath(path);
                    geodesicPoly.setPath(path);
                    var heading = google.maps.geometry.spherical.computeHeading(path[0], path[1]);
                    $document.getElementById('heading').value = heading;
                    $document.getElementById('origin').value = path[0].toString();
                    $document.getElementById('destination').value = path[1].toString();
                }

                $timeout(function() {
                    vm.naivgateTo('here', [48.7791878, 9.107176])
                }, 2500)

                // TODO:: fetch the list of companies from the server and display here
                $scope.$on("$destroy", function() {
                })
            }
        ]);
})();