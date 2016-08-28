;
(function () {

    'use strict';

    angular
        .module('app')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http'];

    function dataservice($http) {

        return {
            getData: getData
        };

        function getData(url) {
            return $http.get(url)
                .then(function(data){
                    return data.data;
                });
        }
    }
})();