angular.module('app', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            template: ''
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
            // Do something
        });

        dataService.get()
            .then(function(response) {
                vm.cities = response.data;
            }, function(error) {
                console.log('error retrieving data, error: ' + error);
            });

        // define urls here
        vm.links = [];
    });
