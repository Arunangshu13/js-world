var app=angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider.when("/",{
        templateUrl: "app/views/home.html",
        controller: "homeController"
    })
    .when("/about", {
        templateUrl: "app/views/about.html",
        controller: "aboutController"
    })
    .when("/contact", {
        templateUrl: "app/views/contact.html",
        controller: "contactController"
    })
    .when("/jsactivities",{
        templateUrl: "app/views/jsactivities.html",
        controller: "activityController"
    })
    .when("/downloads",{
        templateUrl: "app/views/downloads.html",
        controller: "downloadsController"
    })
    .otherwise({redirectTo: "app/views/error.html"});
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
      });
});

app.controller("indexController",function($scope, $location, $rootScope, $route, $templateCache) {
    $scope.$on('$locationChangeStart', function() {
        $rootScope.location=$location.path();
    });
    $rootScope.refreshPage=function (){
        var currentPageTemplate = $route.current.templateUrl;
        $templateCache.remove(currentPageTemplate);
        $route.reload();
        console.log("window refresh");
    }
});