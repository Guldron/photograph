;
(function(){
'use strict';

function gallery() {
		function link(scope, element, attrs) {

            };
	return {
			restrict: 'AE',
            templateUrl: 'vendor/templates/gallery.directive.html',
            link: link,
            controller: 'galleryController',
            controllerAs: 'gallery'          
        }
};

angular
		.module('app')
		.directive('gallery', gallery)
})();