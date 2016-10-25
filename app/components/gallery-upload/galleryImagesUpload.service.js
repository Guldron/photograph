;
(function () {

    'use strict';

    angular
        .module('app')
        .factory('galleryImagesUpload', galleryImagesUpload);

    galleryImagesUpload.$inject = ['Upload', '$q'];

    function galleryImagesUpload(Upload, $q) {
            return {
                    uploadImages: uploadImages
            };

            function uploadImages(images) {

                    var optSmall = { width : 320, height : 200 };
                    var optNormal = { width : 1000, height : 663 };
                    var arraOfNames = makeArrayOfNames(images.length);
                    var deferred = $q.defer();
                    var responses = [];

                    resizeImages(images, optNormal).then(function(normalImgs){
                            for (var i = 0, l = normalImgs.length; i < l; i += 1) {       
                                    Upload.upload({
                                            url: '/admin/gallery',
                                            data: {file: normalImgs[i], otherInfo: {name: arraOfNames[i],size: 'normal'}}
                                    }).then(function(resp){
                                            console.log(resp);
                                            responses.push(resp);;
                                    });
                                    
                            };      
                    });

                    resizeImages(images, optSmall).then(function(smallImgs){
                            for (var i = 0, l = smallImgs.length; i < l; i += 1) {       
                                    Upload.upload({
                                            url: '/admin/gallery',
                                            data: {file: smallImgs[i], otherInfo: {name: arraOfNames[i],size: 'small'}}
                                    }).then(function(resp){
                                            console.log(resp);
                                            responses.push(resp);
                                    });
                                    
                            };      
                    });

                    function resizeImages(images, options){
                            var promises = [];

                            for (var i = 0, l = images.length; i < l; i+=1) {
                                    var promise = Upload.resize(images[i], options.width, options.height)
                                            .then(function(resizeImg) {
                                                    return resizeImg;        
                                            });
                                    promises.push(promise);
                            };
                    return  $q.all(promises);
                    };

                    function makeArrayOfNames(arrayLength){
                            var arraOfNames = [];
                            for (var i = 0; i < arrayLength; i += 1) {
                                    arraOfNames.push(Math.random().toString(36).substring(7) + new Date().getTime());
                            };
                    return arraOfNames;
                    };

            return responses;
            };
    };
})();

/*function uploadImages(images) {
                    var optSmall = { width : 320, height : 200 };
                    var optNormal = { width : 1024, height : 768 };
                    var promises = [];

                    var arrayImg = renameImagesArray(images);
                    console.log(arrayImg)

                    for (var i = 0; i < arrayImg.length; i++) {
                            console.log(arrayImg)
                            var promise = Upload.resize(arrayImg[i], optNormal.width, optNormal.height)
                                    .then(function(resizeImg) {
                                            console.log(resizeImg)
                                            var obj = {
                                                    img : resizeImg,
                                                    size : 'normal'
                                            };
                                            return obj;
                                    })
                            promises.push(promise);
                            var promise2 = Upload.resize(images[i], optSmall.width, optSmall.height)
                                    .then(function(resizeImg) {

                                            var obj = {
                                                    img : resizeImg,
                                                    size : 'small'
                                            };
                                            return obj;
                                    })
                            promises.push(promise2);
                            };

                    function makeRamdomName(){
                            var text = "";
                            for( var i=0; i < 2; i++ ) {
                                text += Math.random().toString(36).substring(7) + new Date().getTime();
                            };
                            return text;
                    };

                    function renameImagesArray(images) {
                            var array = [];

                            for (var i = 0; i < images.length; i++) {
                                    var name = makeRamdomName();
                                    array.push(Upload.rename(images[i], name));     
                            };

                            return array;
                    };

            return $q.all(promises);
            };*/
