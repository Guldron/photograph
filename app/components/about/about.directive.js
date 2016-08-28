;
(function(){
'use strict';

function about () {
		function link(scope, element, attrs) {

            };
	return {
			restrict: 'AE',
            templateUrl: 'vendor/templates/about.directive.html',
            link: link,
            controller: 'aboutController',
            controllerAs: 'about'          
        }
};

angular
		.module('app')
		.directive('about', about)
})();