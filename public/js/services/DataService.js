angular.module('app')
    .factory('Data', ['$http', function($http) {
        return {
            get: function() {
                return $http.get('/api/data');
            },
            create: function(Data) {
                return http.post('/api/data', Data);
            },
            delete: function() {
                return $http.delete('/api/data/' + id);
            }
        }
    }]);