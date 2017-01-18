(function () {
    'use strict';

    angular
        .module('paymentMode')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise('/');
          $stateProvider
              .state('table',{
                url:'/',
                templateUrl:'Templates/table.html',
                controller :'mainPageController',
                controllerAs :'mp'
              })
        }]);
})();
