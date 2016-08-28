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
                        /*resolve: {getDropDownData: getDropDownData}*/
                })
                .state('gallery', {
                        url: "/gallery",
                        templateUrl: "vendor/templates/gallery.directive.html",
                        controller: "galleryController"
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




angular
        .module('app')
        .config(config);
})();