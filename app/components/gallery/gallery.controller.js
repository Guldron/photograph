;
(function(){
'use strict';

galleryController.$inject = ['$scope', 'getImageGalleryData'];      

function galleryController ($scope, getImageGalleryData) {
		this.imageGalleryData = getImageGalleryData;
};

angular
		.module('app')
		.controller('galleryController', galleryController)
})();