(function() {
        'use strict';

        galleryUploadController.$inject = ['$scope', '$http', 'Upload', 'dataservice', 'objectUrlMaker', 'galleryImagesUpload'];

        function galleryUploadController($scope, $http, Upload, dataservice, objectUrlMaker, galleryImagesUpload) {

            $scope.getImages = getImages;
	    	$scope.upload = upload;
	    	$scope.deleteAllImages = deleteAllImages;
		    $scope.deleteSingleImage = deleteSingleImage;
		    $scope.removeUploadImage = removeUploadImage;
		    

			function getImages() {
	    			var url = '/admin/gallery';
	    			dataservice.getData(url)
				            .then(function(data){
				            console.log(data);
				            $scope.imageUrl = objectUrlMaker.makeObjUrl(data);
				            return $scope.imageUrl;
			        });
	    	};

	    	function upload(images) {
	    			var arr = galleryImagesUpload.uploadImages(images);
	    			$scope.images = null;
	    	};

    		function deleteSingleImage(name){
    				console.log(name);
    				var url = '/admin/gallery/';
    				dataservice.deleteData(url + name)
		    		.then(function(resp){
		    				console.log(resp);
		    				for(var i = 0; i < $scope.imageUrl.length; i+=1){
									if($scope.imageUrl[i].name === resp.name) {
											$scope.imageUrl.splice(i, 1);
									};
							}; 	
		    		});			
		    };

			function deleteAllImages(){
    				var url = '/admin/gallery/';
    				dataservice.deleteData(url)
		    		.then(function(resp){
		    				console.log(resp);
		    				$scope.imageUrl = null;
		    		});			
		    };		    

			function removeUploadImage(imageName){

					console.log($scope.images);
					for(var i = 0; i < $scope.images.length; i+=1){
							if($scope.images[i].name === imageName) {
									$scope.images.splice(i, 1);
							}
					}
			};
	};






    angular
        .module('app')
        .controller('galleryUploadController', galleryUploadController);
})();
