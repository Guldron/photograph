;
(function(){
'use strict';

function imageGallery () {
	function link(scope, element, attrs) {    
                
};



	return {
			restrict: 'AE',
            templateUrl: 'vendor/templates/image-gallery.directive.html',
            link: link,
            scope: {},
            controller: 'imageGalleryController',
            controllerAs: 'imgGal',
            scope:{
                imageGalleryData:"=imagegallerydata"
            }           
        };
};

angular
		.module('app')
		.directive('imageGallery', imageGallery)
})();