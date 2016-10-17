(function() {
    'use strict';

    

    galleryUpload.$inject = [];

    function galleryUpload() {

        function link(scope, element, attrs) {

        }
        return {
        	templateUrl: 'vendor/templates/gallery-upload.directive.html',
            controller: 'galleryUploadController',
            link: link,
            restrict: 'AE',
            scope: {
            }
        };

    }

    angular
        .module('app')
        .directive('galleryUpload', galleryUpload);
})();