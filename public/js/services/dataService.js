angular.module('app')
    .factory('dataService', ['$http', function($http) {
        return {
            get: function() {
                return $http.get('/api/cities');
            }
        };
    }]);