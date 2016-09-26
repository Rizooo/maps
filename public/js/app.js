angular.module('app', ['ngRoute', 'ui-leaflet'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: './../views/map.html'
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
            if (vm.isSelectionReady()) {
                _.forEach(vm.selectedDep.distances, function(distance) {
                    if (distance.name === vm.selectedDest.name) {
                        vm.distance = distance.distance;
                    };
                });
            }
        };

        vm.isSelectionReady = function() {
            return (vm.selectedDep.map!== undefined && vm.selectedDest.map !== undefined);
        };

        $scope.$watch(angular.bind(vm, function () {
            return vm.selectedDep;
        }), function (newVal) {
            vm.updateViews();
        });
        $scope.$watch(angular.bind(vm, function () {
            return vm.selectedDest;
        }), function (newVal) {
            _.forEach(vm.cities, function(city) {
                if (city.name === vm.selectedDest.name) {
                    vm.selectedDest.map = city.map;
                }
            });

            vm.updateViews();
        });

        vm.updateViews = function() {
            if (vm.isSelectionReady()) {
                vm.updateMap();
            }
            angular.extend(vm, {
                map: vm.map,
                paths: vm.paths
            });
        };

        vm.updateMap = function() {

            vm.map = vm.selectedDep.map;
            vm.message = '<h1>' + 'Route from ' + vm.selectedDep.name + ' to ' + vm.selectedDest.name + '</h1>';
            var newLatLngs = [
                {
                    lat: vm.selectedDep.map.lat,
                    lng: vm.selectedDep.map.lng
                },
                {
                    lat: vm.selectedDest.map.lat,
                    lng: vm.selectedDep.map.lng
                }
            ];

            vm.paths = {
                p1: {
                    color: 'blue',
                    weight: 8,
                    //latlngs: newLatLngs,
                    latlngs: [
                        { lat: 51.50, lng: -0.082 },
                        { lat: 48.83, lng: 2.37 },
                        { lat: 41.91, lng: 12.48 }
                    ],
                    message: vm.message
                }
            };
        };

        dataService.get()
            .then(function(response) {
                vm.cities = response.data;
                vm.selectedDep = vm.cities[0];
                vm.selectedDest = vm.cities[0].distances[0];
                vm.setDistance();
            }, function(error) {
                console.err('error retrieving data, error: ' + error);
            });

        // define urls here
        vm.links = [];

    });
