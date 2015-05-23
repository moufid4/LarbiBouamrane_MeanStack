'use strict';

angular.module('larbiAngularApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'Blog',
      'link': '/blog'
    },
    {
      'title': 'Nous Joindre',
      'link': '/contact'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });

  // ScrollWatch
angular.module('larbiAngularApp').directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
          if (this.pageYOffset>70) { 
                        scope.style = function () {
                          return { 
                          'background-color': 'rgba(255, 255, 255, 1)',
                          'color':'#000'
                          };
                          };
                          scope.color = function () {
                          return { 
                          'color':'#000'
                          };
                          };
                          scope.size = function () {
                          return { 
                            'color':'#000',
                          'font-size':'14px'
                          };
                          };
                                
                                console.log(this.pageYOffset);
                  } else {
                    scope.style = function () {
                          return { 
                          'background-color': 'rgba(255, 255, 255, 0)',
                          
                          };
                          };
                          scope.color = function () {
                          return { 
                          'color':'#fff'
                          };
                          };
                          scope.size = function () {
                          return { 
                            'color':'#fff',
                          'font-size':'21x'
                          };
                          };
                                console.log(this.pageYOffset);
                  } 



            scope.$apply();
        })
    };
});

