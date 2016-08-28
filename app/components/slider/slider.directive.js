;
(function(){
'use strict';

function slider () {
		function link(scope, element, attrs) {
                element.ready(function(){
                        $('.bxslider').bxSlider({
                                auto: true,
                                onSliderLoad: function(){
                                        $(".slider").css("visibility", "visible");
                                }
                        });
                });
        };
	return {
			restrict: 'AE',
            templateUrl: 'vendor/templates/slider.directive.html',
            link: link,
            scope: {},
            controller: 'sliderController',
            controllerAs: 'slider'          
            }
};

angular
		.module('app')
		.directive('slider', slider)
})();