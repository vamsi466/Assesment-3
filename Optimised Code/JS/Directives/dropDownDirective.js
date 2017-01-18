(function(){

   'use strict'
    angular.module('paymentMode')
    .directive('dropDown',function(){
        return{
            restrict: 'E',
            scope:{
                options:'=',
                selectedOption:'='
            },
            templateUrl:'Templates/dropDown.html',
            link : function(scope){
              scope.selecting = function(option){
                scope.selectedOption = option;
              }
            }
        }
    })
})();