;
(function(){
'use strict';

tabsController.$inject = ['$scope', 'dataservice', '$http'];

function tabsController ($scope, dataservice, $http) {
		$scope.tabsData = [];

		getTabs();
		
		function getTabs() {
		var url = '/tabs';
        return dataservice.getData(url)
	            .then(function(data){
	            return $scope.tabsData = data.tabs["0"];
        });
    };
};

angular
		.module('app')
		.controller('tabsController', tabsController)
})();