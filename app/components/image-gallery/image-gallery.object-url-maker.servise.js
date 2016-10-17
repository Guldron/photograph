;
(function () {

        'use strict';

        angular
                .module('app')
                .factory('imageGalleryObjUrlMaker', imageGalleryObjUrlMaker);

        imageGalleryObjUrlMaker.$inject = [];

        function imageGalleryObjUrlMaker() {

                return {
                        makeObjUrl: makeObjUrl,
                };

                function makeObjUrl(bufferObject) {
                        var arr = new Uint8Array(bufferObject);
                        var blob = new Blob([arr], { type: 'image/png' });
                        var objUrl = window.URL.createObjectURL(blob); 
                return objUrl;  
                };                
        };
})();