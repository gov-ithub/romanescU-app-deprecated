angular.module('romanescU.controllers', [])

.controller('mapController', function($scope, $stateParams, $ionicLoading, $timeout, $q) {
    //google.maps.event.addDomListener(window, 'load', function() {
    // });
    vm = this;
    this.fromLocation = null;
    this.toLocation = null;

    var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(48.7791878, 9.107176),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    navigator.geolocation.getCurrentPosition(function(pos) {
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: map,
            title: "Eu"
        });
    });
    $scope.map = map;

    /**
     *  Get marker from position
     * 
     */
    vm.fetchPosition = function(position) {
        var deff = $q.defer();
        if (Array.isArray(position)) {
            deff.resolve(new google.maps.Marker({
                map: $scope.map,
                draggable: true,
                position: { lat: position[0], lng: position[0] }
            }))
        } else if (position == 'here') {
            navigator.geolocation.getCurrentPosition(function(pos) {
                deff.resolve(new google.maps.Marker({
                    map: $scope.map,
                    draggable: true,
                    position: { lat: pos.coords.latitude, lng: pos.coords.longitude }
                }))
            });
        }

        return deff.promise;
    }

    console.info($scope.map)


    /**
     *  Navigate to where 
     * 
     */
    this.naivgateTo = function(fromLoc, toLoc) {
        var f, t;
        vm.fetchPosition(fromLoc)
            .then(function(f) {
                vm.fromLocation = f;
                return vm.fetchPosition(toLoc)
            })
            .then(function(t) {
                vm.toLocation = t;

                var bounds = new google.maps.LatLngBounds(vm.fromLocation.getPosition(), vm.toLocation.getPosition());
                $scope.map.fitBounds(bounds);

                google.maps.event.addListener(vm.fromLocation, 'position_changed', vm.drawPath);
                google.maps.event.addListener(vm.toLocation, 'position_changed', vm.drawPath);

                vm.drawPath();
            })
    }

    /**
     * geodesyc update
     */
    this.drawPath = function() {
        poly = new google.maps.Polyline({
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            map: map,
        });

        geodesicPoly = new google.maps.Polyline({
            strokeColor: '#CC0099',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            geodesic: true,
            map: map
        });

        var path = [vm.fromLocation.getPosition(), vm.toLocation.getPosition()];
        poly.setPath(path);
        geodesicPoly.setPath(path);
        var heading = google.maps.geometry.spherical.computeHeading(path[0], path[1]);
        document.getElementById('heading').value = heading;
        document.getElementById('origin').value = path[0].toString();
        document.getElementById('destination').value = path[1].toString();
    }

    $timeout(function() {
        vm.naivgateTo('here', [48.7791878, 9.107176])
    }, 2500)


});