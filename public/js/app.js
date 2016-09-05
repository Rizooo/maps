angular.module('app', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
        .when('/', {
            template: '<h1>Main page</h1>'
        })
        .otherwise({
            redirectTo: '/'
        });
    })
    .controller('MainCtrl', function() {
        console.log('MainCtrl');
        var vm = this;

        vm.links = [1,2,3,4,5];
    });
