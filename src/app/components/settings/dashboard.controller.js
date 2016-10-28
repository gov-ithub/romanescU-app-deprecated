(function() {
    'use strict';
    angular.module('romanescU')
        .controller('settingsCtrl', function() {
            var vm = this;

            vm.playlists = [
                { title: 'Reggae', id: 1 },
                { title: 'Chill', id: 2 },
                { title: 'Dubstep', id: 3 },
                { title: 'Indie', id: 4 },
                { title: 'Rap', id: 5 },
                { title: 'Cowbell', id: 6 }
            ];

        });
})();