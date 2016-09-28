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
        vm.markers = {};

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
            vm.setDistance();
        });
        $scope.$watch(angular.bind(vm, function () {
            return vm.selectedDest;
        }), function (newVal) {
            vm.updateViews();
            vm.setDistance();
        });
        $scope.$watch(angular.bind(vm, function () {
            return vm.selectedDep.map;
        }), function (newVal) {
            console.log(vm.selectedDep.map)
        });


        vm.updateViews = function() {
            if (vm.isSelectionReady()) {
                vm.updateMap();
            }
        };

        vm.updateMap = function() {

            var newDep = {
                    lat: vm.selectedDep.map.lat,
                    lng: vm.selectedDep.map.lng,
                    message: vm.selectedDep.name,
                    draggable: false,
                    focus: true
                };
            var newDest = {
                    lat: vm.selectedDest.map.lat,
                    lng: vm.selectedDest.map.lng,
                    message: vm.selectedDest.name,
                    draggable: false,
                    focus: true
                };

            var newMarkers = {
                departCity: newDep,
                destinationCity: newDest,

            };
            vm.markers = newMarkers;
        };

        dataService.get()
            .then(function(response) {
                vm.cities = response.data;
                vm.selectedDep = vm.cities[0];
                vm.selectedDest = vm.cities[1];
                vm.setDistance();
            }, function(error) {
                console.err('error retrieving data, error: ' + error);
            });

        // define urls here
        vm.links = [];


    });
