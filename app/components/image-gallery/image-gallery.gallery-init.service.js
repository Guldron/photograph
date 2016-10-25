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
                        var indexes = [];
                        var firstSlides = [];
                        var options = {
                                history: false,
                                showAnimationDuration: 0,
                                hideAnimationDuration: 0
                        };

                        //creating array of slides
                        for(var i = 0, l = smallImages.length; i < l; i += 1){
                                items.push({
                                        msrc: smallImages[i].img,
                                        w: 1000,
                                        h: 663,
                                        index: i
                                });
                                console.log(items[i])           
                        };
                        


                        if(index === 0){
                                indexes.push(items.length-1);
                                indexes.push(index);                
                                indexes.push(index+1);
                        } else if (index === promises.length-1) {
                                indexes.push(items.length-2);
                                indexes.push(index);                
                                indexes.push(0);                                
                        } else {
                                indexes.push(index-1);
                                indexes.push(index);                
                                indexes.push(index+1);   
                        };

                        for(var i = 0, l = indexes.length; i < l; i += 1){
                                firstSlides.push(promises[indexes[i]]);
                        };

                        $q.all(firstSlides)
                        .then(function(data){
                                for(var i = 0, l = data.length; i < l; i += 1){
                                        items[indexes[i]].src = data[i];                 
                                };
                                var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                                gallery.init();
                                gallery.goTo(index);
                                return gallery;
                        }).then(function(gallery){
                                $q.all(promises)
                                .then(function(data){
                                        for(var i = 0, l = gallery.items.length; i < l; i += 1){
                                                if(i !== indexes[i]){
                                                        gallery.items[i].src = data[i];
                                                        gallery.items[i].w = 1000,
                                                        gallery.items[i].h = 663        
                                                } else {
                                                        console.log(i);
                                                        console.log(gallery.items);
                                                };              
                                        };

/*                                        gallery.listen('imageLoadComplete', function(index, item) { 
                                                item.w = 1024,
                                                item.h = 768
                                        });*/   
                                })        
                        });

                                  
                        

                };    
        };
})();