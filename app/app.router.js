;
(function () {

'use strict';

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/about");
        $stateProvider
                .state("about", {
                        url: "/about", 
                        templateUrl: "vendor/templates/about.directive.html",
                        controller: "aboutController"
                })
                .state('gallery', {
                        url: "/gallery",
                        templateUrl: "vendor/templates/gallery.directive.html",
                        controllerAs: 'gallery',
                        controller: 'galleryController',
                        resolve: { getImageGalleryData: getImageGalleryData }
                })
                .state('services', {
                        url: "/services"
                })
                .state('admin', {
                        url: "/admin",
                        templateUrl: "vendor/templates/admin.directive.html",
                        controller: "adminController"
                })
};

getImageGalleryData.$inject = ['dataservice']; 

function getImageGalleryData(dataservice) {
        var url = '/gallery';
        return dataservice.getData(url)
        .then(function(data){
                return data;
        });
};

angular
        .module('app')
        .config(config);
})();