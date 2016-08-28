;
(function(){
'use strict';

function admin() {
		function link(scope, element, attrs) {

            };
	return {
			restrict: 'AE',
            templateUrl: 'vendor/templates/admin.directive.html',
            link: link,
            controller: 'adminController',
            controllerAs: 'admin'          
        }
};

angular
		.module('app')
		.directive('admin', admin)
})();