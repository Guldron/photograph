;
(function () {

        'use strict';

        angular
                .module('app')
                .factory('galleryInit', galleryInit);

        galleryInit.$inject = ['$timeout', '$q'];

        function galleryInit($timeout, $q) {

                return {
                        initPhotoSwipe: initPhotoSwipe,
                };

                function initPhotoSwipe(name, index, normalImages, smallImages, promises) {
                        
                        var pswpElement = document.querySelectorAll('.pswp')[0];
                        var items = [];
                        var firstSlides = [];
                        var options = {
                                history: false,
                                focus: false,
                                showAnimationDuration: 0,
                                hideAnimationDuration: 0
                        };

                        for(var i = 0, l = smallImages.length; i < l; i += 1){
                                items.push({
                                        w: 1024,
                                        h: 768,
                                        index: i
                                });           
                        };
                        for(var i = 0, l = 3; i < l; i += 1){
                                firstSlides.push(promises[index+i]);                 
                        };

                        $q.all(firstSlides)
                        .then(function(data){
                                for(var i = 0, l = data.length; i < l; i += 1){
                                        items[index+i].src = data[i];                 
                                };
                                var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                                gallery.init();
                                gallery.goTo(index);
                                return gallery;
                        }).then(function(gallery){
                                $q.all(promises)
                                .then(function(data){
                                        for(var i = 0, l = gallery.items.length; i < l; i += 1){
                                                if(gallery.items[i].src !== data[i]){

                                                       gallery.items[i].src = data[i];         
                                                } else {
                                                        console.log(i)
                                                };              
                                        };
                                })        
                        });
                        

                };    
        };
})();