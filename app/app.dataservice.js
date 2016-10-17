;
(function () {

        'use strict';

        angular
                .module('app')
                .factory('dataservice', dataservice);

        dataservice.$inject = ['$http'];

        function dataservice($http) {

                return {
                        getData: getData,
                        deleteData: deleteData
                };

                function getData(url) {
                        return $http.get(url)
                                .then(function(data){
                                        return data.data;
                                });
                };

                 function deleteData(url, config) {
                        return $http.delete(url, config)
                                .then(function(data){
                                        return data.data;
                                });
                }
        }
})();