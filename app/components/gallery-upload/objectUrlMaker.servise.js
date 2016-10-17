;
(function () {

    'use strict';

    angular
        .module('app')
        .factory('objectUrlMaker', objectUrlMaker);

    function objectUrlMaker() {
            return {
                    makeObjUrl: makeObjUrl
            };
            
            function makeObjUrl(arrayBuffer){
                    var i, 
                    l = arrayBuffer.length,
                    imageUrl = [];
                                                
                    for (i=0; i < l; i+=1) {
                            var arr = new Uint8Array(arrayBuffer[i].img.data);
                            var blob = new Blob([arr], { type: 'image/png' });
                            imageUrl.push({
                                    img : window.URL.createObjectURL(blob),
                                    name : arrayBuffer[i].name
                            }); 
                    };
                    return imageUrl;        
            };
            
    };

})();
