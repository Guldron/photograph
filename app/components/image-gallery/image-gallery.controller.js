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
		var promisesArraylength = that.smallImages.length;
		var indexes = that.smallImages.length -1;
		var topOfTheList = Math.ceil(promisesArraylength/2);
		var endOfTheList = promisesArraylength - topOfTheList;


		for(var i = 0, l = topOfTheList; i < l; i += 1){
			that.promises[i] = dataservice.getData(url + that.smallImages[i].name)
				.then(function(data){
					var objUrl = imageGalleryObjUrlMaker.makeObjUrl(data[0].img.data);
					that.normalImages.push(objUrl)
				return objUrl;
				})

			if(i < endOfTheList){
			that.promises[indexes-i] = dataservice.getData(url + that.smallImages[indexes-i].name)
				.then(function(data){
					var objUrl = imageGalleryObjUrlMaker.makeObjUrl(data[0].img.data);
					that.normalImages.push(objUrl)
				return objUrl;
				});	
			};
			
			
		};
	return $q.all(that.promises);
	};

};
angular
	.module('app')
	.controller('imageGalleryController', imageGalleryController)
})();