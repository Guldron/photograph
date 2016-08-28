;
(function(){
'use strict';

function tabs() {

	function link(scope, element, attrs) {
        
	}

	return {
			restrict: 'AE',
            templateUrl: 'vendor/templates/tabs.directive.html',
            link: link,
            scope: {},
            controller: 'tabsController',
            controllerAs: 'tabs'          
        }
};

angular
		.module('app')
		.directive('tabs', tabs)
})();