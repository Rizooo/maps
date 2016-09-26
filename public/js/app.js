angular.module('app', ['ngRoute', 'ui-leaflet'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: './../views/map.html'
        })
        .when('/old', {
            templateUrl: './../views/old.html'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .constant('_', window._)
    .run(function ($rootScope) {
        $rootScope._ = window._;
    })
    .controller('MainCtrl', function($scope, dataService) {
        var vm = this;
        vm.cities = [];
        vm.selectedDep = {};
        vm.selectedDest = {};
        vm.distance;
        vm.map = {};
        vm.paths = {};

        vm.setDistance = function() {
            _.forEach(vm.selectedDep.distances, function(distance) {
                if (distance.name === vm.selectedDest.name) {
                    vm.distance = distance.distance;
                };
            });
        };

        $scope.$watch(angular.bind(vm, function () {
            return vm.selectedDep;
        }), function (newVal) {

            vm.updateMap();
            angular.extend(vm, {
                map: vm.map,
                paths: vm.paths
            });
        });

        vm.updateMap = function() {

            vm.map = vm.selectedDep.map;
            vm.paths = {
                p1: {
                    color: 'blue',
                    weight: 8,
                    latlngs: [
                        { lat: 51.50, lng: -0.082 },
                        { lat: 48.83, lng: 2.37 },
                        { lat: 41.91, lng: 12.48 }
                    ],
                    message: '<h1>' + 'Route from ' + vm.selectedDep + ' to ' + vm.selectedDest + '</h1>'
                }
            };
        };

        dataService.get()
            .then(function(response) {
                vm.cities = response.data;
                vm.selectedDep = vm.cities[0];
            }, function(error) {
                console.log('error retrieving data, error: ' + error);
            });

        // define urls here
        vm.links = [];

    });
