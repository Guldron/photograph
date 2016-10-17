;
(function(){
'use strict';

imageGalleryController.$inject = ['$scope', 'objectUrlMaker', 'galleryInit', 'dataservice', '$q', 'imageGalleryObjUrlMaker'];  

function imageGalleryController ($scope, objectUrlMaker, galleryInit, dataservice, $q, imageGalleryObjUrlMaker) {
	var that = this;
	this.smallImages = objectUrlMaker.makeObjUrl($scope.imageGalleryData);
	this.galleryInit = galleryInit.initPhotoSwipe;
	this.normalImages = [];
	this.promises = [];
	
	getNormalImages();

	function getNormalImages(){
		var url = '/gallery/';

		for(var i = 0, l = that.smallImages.length; i < l; i += 1){
			that.promises.push(
				dataservice.getData(url + that.smallImages[i].name)
				.then(function(data){
					var objUrl = imageGalleryObjUrlMaker.makeObjUrl(data[0].img.data);
					that.normalImages.push(objUrl)
				return objUrl;
				})
			);
		};
	return $q.all(that.promises);
	};

};
angular
	.module('app')
	.controller('imageGalleryController', imageGalleryController)
})();