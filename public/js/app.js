angular.module('app', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            template: '<h1>Main page</h1>'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('MainCtrl', function() {
        console.log('MainCtrl');
        var vm = this;

        // define urls here
        vm.links = [1,2,3,4,5];
    });
