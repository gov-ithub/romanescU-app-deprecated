angular.module('romanescU.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.appName = app.name;

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };

        $rootScope.assetsUrl = "assets/";
        $rootScope.getAsset = function(path) {
                return $rootScope.assetsUrl + path;
            }
            // newsfeed global
        var newsFeedAuthors = [{
                id: ["externalaffairs", "externalaffairs-", "externalaffairstravelwarnings", "externalaffairstravelwarnings-"],
                name: "Ministerul Afacerilor Externe",
                logo: $rootScope.assetsUrl + "newsfeed/authors/logo-mae.jpg",
                url: "http://www.mae.ro/"
            },
            {
                id: ["educationnews"],
                name: "Ministerul Educației Naționale și Cercetării Științifice",
                logo: $rootScope.assetsUrl + "newsfeed/authors/logo-edu.jpg",
                url: "http://www.edu.ro/"
            },
            {
                id: ["transportation"],
                name: "Ministerul Transporturilor",
                logo: $rootScope.assetsUrl + "newsfeed/authors/logo-mt.jpg",
                url: "http://mt.gov.ro/"
            },
        ];
        $rootScope.getNewsAuthorFromId = function(id) {
            var chunks = id.split("-");
            return chunks[1];
        }

        $rootScope.getNewsAuthorMeta = function(id) {
            var author = false;

            newsFeedAuthors.forEach(function(elem) {
                if (elem.id.indexOf($rootScope.getNewsAuthorFromId(id)) > -1) {
                    author = elem;
                }
            });

            return author;
        }
    })
    .controller('settingsCtrl', function($scope) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })
    .controller('newsCtrl', function($scope, $location, __mongo, $rootScope) {
        __mongo.getCollection('news').then(function(data) {
            data.forEach(function(elem) {
                elem.author = $rootScope.getNewsAuthorMeta(elem._id);
            })
            $scope.newsFeed = data;
        });

        $scope.toggleSocial = function($event) {
            var self = angular.element($event.currentTarget);
            self.parent().find("div").toggleClass('hidden');
        }

        $scope.goToSingle = function(id) {
            $location.path("/app/news_view/" + id);
        }
    })

.controller('newsViewCtrl', function($scope, $stateParams, __mongo, $rootScope) {

    __mongo.getCollection('news').then(function(data) {
        data.forEach(function(elem) {
            if (elem._id == $stateParams.articleId) {
                $scope.news = elem;
            }
        })
    });

    $scope.authorMeta = $rootScope.getNewsAuthorMeta($stateParams.articleId);
})

.controller('mapController', function($scope, $stateParams, $ionicLoading, $timeout, $q, $ionicModal, $ionicSideMenuDelegate, $ionicPopup, __mongo) {
    //google.maps.event.addDomListener(window, 'load', function() {
    // });
    vm = this;
    this.fromLocation = null;
    this.toLocation = null;

    this.filter = {
        markers: '',
        init_filter: 'doctori',
        by: 'doctori' // null = doctor
    }
    this.paths = {
        poly: null,
        path: null
    }
    this.allMarkers = [
        { title: "Here", description: "XXX", location: [49.7791878, 9.107176] },
        { title: "there", description: "XXX", location: [43.7791878, 9.107176] },
        { title: "everywhere", description: "XXX", location: [45.7791878, 9.107176] },
        { title: "nowhere", description: "XXX", location: [48.7791878, 8.107176] },
    ];
    this.filtered_markers = [];
    this.rendered_markers = [];
    this.clustered_markers = [];


    this.filterMarkers = function(by) {
        console.info("filter " + by)
        vm.filter.by = by;
        vm.addMarkers();
    }

    var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(48.7791878, 9.107176),
        zoom: 4,
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
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
    // -->Map: is live 
    google.maps.event.addListenerOnce(map, 'idle', function() {
        __mongo.getCollection('markers')
            .then(function(markeers) {
                // -->Get: all valid markers
                vm.allMarkers = _.filter(markeers, function(m) {
                    return Array.isArray(m.location);
                })

                // -->Set: markers
                vm.filterMarkers(vm.filter.init_filter);
            })
    });
    $scope.map = map;
    console.info($scope.map)

    /**
     * 
     */
    this.showAlert = function(titile, text) {
        var alertPopup = $ionicPopup.alert({
            title: titile,
            template: text
        });

        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };

    /**
     *  Get marker from position
     * 
     */
    this.fetchPosition = function(position) {
        var deff = $q.defer();

        if (Array.isArray(position)) {
            deff.resolve(new google.maps.Marker({
                map: $scope.map,
                draggable: false,
                marker: { lat: position[0], lng: position[1] }
            }))
        } else if (position == 'here') {
            navigator.geolocation.getCurrentPosition(function(pos) {
                deff.resolve(new google.maps.Marker({
                    map: $scope.map,
                    draggable: false,
                    position: { lat: pos.coords.latitude, lng: pos.coords.longitude }
                }))
            });
        }

        return deff.promise;
    }

    /**
     *  Navigate to where 
     * 
     */
    this.naivgateTo = function(fromLoc, toLoc) {
        vm.fetchPosition(fromLoc)
            .then(function(f) {
                vm.fromLocation = f;
                return vm.fetchPosition(toLoc)
            })
            .then(function(t) {
                vm.toLocation = new google.maps.Marker({
                    map: $scope.map,
                    draggable: false,
                    position: { lat: t.marker.lat, lng: t.marker.lng }
                })

                //var bounds = new google.maps.LatLngBounds(vm.fromLocation.getPosition(), vm.toLocation.getPosition());
                //$scope.map.fitBounds(bounds);
                google.maps.event.addListener(vm.fromLocation, 'position_changed', vm.drawPath);
                google.maps.event.addListener(vm.toLocation, 'position_changed', vm.drawPath);

                vm.drawPath();
                //console.log(google.maps.geometry.spherical.computeDistanceBetween(vm.fromLocation.getPosition(), vm.toLocation.getPosition()))
            })
            .catch(function(err) { console.error(err); })
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
        vm.paths.path = [vm.fromLocation.getPosition(), vm.toLocation.getPosition()];
        //poly.setPath(vm.paths.path);
        geodesicPoly.setPath(vm.paths.path);
        vm.paths.poly = google.maps.geometry.spherical.computeHeading(vm.paths.path[0], vm.paths.path[1]);

        // console.info(heading)
        // console.info(path[0].toString())
        // console.info(path[1].toString())

        //document.getElementById('heading').value = heading;
        //document.getElementById('origin').value = path[0].toString();
        //document.getElementById('destination').value = path[1].toString();
    }

    /**
     * Find Nearest
     */
    this.nearestFromLocations = function() {
        var deff = $q.defer();
        var closest = 0;
        var mindist = 99999;

        vm.fetchPosition('here')
            .then(function(me) {
                if (vm.filtered_markers.length == 0)
                    deff.reject({ ok: false, error: 'no data' })
                else {
                    var lat = me.getPosition().lat(),
                        lon = me.getPosition().lng();

                    for (var i = 0; i < vm.filtered_markers.length; i++) {
                        // get the distance between user's location and this point
                        var dist = Haversine(vm.filtered_markers[i].location[0], vm.filtered_markers[i].location[1], lat, lon);

                        // check if this is the shortest distance so far
                        if (dist < mindist) {
                            closest = i;
                            mindist = dist;
                        }
                    }
                    deff.resolve(closest);
                }
            })
            .catch(function(err) {
                console.error(err);
            })

        return deff.promise;
    }

    /**
     * Merg la vot 
     */
    this.goToClosesVote = function() {
        // -->Filter: to votes
        vm.filterMarkers('vot');
        // -->Go: close
        vm.goToClosesAddress();
    }

    /**
     * Merg la vot 
     */
    this.goToClosesAddress = function() {
        // -->Go: to nearest
        vm.nearestFromLocations()
            .then(function(i) {
                // -->Navigate: to it 
                vm.naivgateTo('here', vm.filtered_markers[i].location)
            })
            .catch(function(err) { vm.showAlert("No Data", "Nu ai nici un punct apropiat. Esti nicaieri...") })
    }

    /**
     *  Small box at the bottom
     */
    this.viewLocationSmall = function() {}

    /**
     *  Show Modal Big
     */
    this.viewLocationModal = function(data) {
        var scope = $scope.$new(data),
            mod = "";
        scope.data = data;

        $ionicModal.fromTemplateUrl('showMarker.html', {
            scope: scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            mod = modal;
            mod.show();
        });

        scope.closeModal = function() {
            mod.hide();
        };
        // Cleanup the modal when we're done with it!
        scope.$on('$destroy', function() {
            mod.remove();
        });
        // Execute action on hide modal
        // scope.$on('modal.hidden', function() {
        //     // Execute action
        // });
        // // Execute action on remove modal
        // scope.$on('modal.removed', function() {
        //     // Execute action
        // });
    }


    /**
     *  Add Markers
     */
    this.addMarkers = function() {
        // -->filter: markers by types
        vm.filtered_markers = _.filter(vm.allMarkers, function(m) {
            switch (vm.filter.by) {
                case 'bere':
                case 'magazin':
                case 'vot':
                case 'events':
                case 'biserici':
                    return (m.type == vm.filter.by);
                    break;
                case 'doctori':
                    return !m.type;
                    break;
            }
            return false;
        })

        // -->Clear
        vm.clearMarkers();

        // -->Render: markers
        vm.rendered_markers = [];
        for (var i = 0; i < vm.filtered_markers.length; i++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(vm.filtered_markers[i].location[0], vm.filtered_markers[i].location[1])
            });
            // -->Set: payload 
            marker.customData = vm.filtered_markers[i];
            // -->Event: click
            google.maps.event.addListener(marker, 'click', function() {
                vm.selectMarker(this.customData);
            });
            vm.rendered_markers.push(marker);
        }
        var options = { imagePath: 'img/m' };
        vm.clustered_markers = new MarkerClusterer($scope.map, vm.rendered_markers, options);
    }

    /**
     *  Select Marker
     */
    this.selectMarker = function(data) {
        vm.viewLocationModal(data);
    }

    /**
     *  Clear all markers from map
     */
    this.clearMarkers = function() {
        // -->Remove: clusters
        if (typeof vm.clustered_markers.setMap == 'function')
            vm.clustered_markers.clearMarkers();

        if (vm.paths.path != null) {
            //vm.paths.path.setMap(null);
            //vm.paths.poly.setMap(null);
        }
        _.map(vm.rendered_markers, function(m) {
            m.setMap(null)
            m.visible = false;
            return m;
        })
    }

    // -------------------- \\
    // -------------------- \\
    // -------------------- \\
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.$on("$destroy", function() {
        $ionicSideMenuDelegate.canDragContent(true);
    })

    /*** HELPER FUNCTIONS */
    /*** HELPER FUNCTIONS */
    /*** HELPER FUNCTIONS */
    function Haversine(lat1, lon1, lat2, lon2) {
        var R = 6372.8; // Earth Radius in Kilometers
        var dLat = Deg2Rad(lat2 - lat1);
        var dLon = Deg2Rad(lon2 - lon1);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(Deg2Rad(lat1)) * Math.cos(Deg2Rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        // Return Distance in Kilometers
        return d;
    }

    function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
        lat1 = Deg2Rad(lat1);
        lat2 = Deg2Rad(lat2);
        lon1 = Deg2Rad(lon1);
        lon2 = Deg2Rad(lon2);
        var R = 6371; // km
        var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
        var y = (lat2 - lat1);
        var d = Math.sqrt(x * x + y * y) * R;
        return d;
    }

    function Deg2Rad(deg) {
        return deg * Math.PI / 180;
    }
});