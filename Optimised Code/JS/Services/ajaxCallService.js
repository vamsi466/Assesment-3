(function(){

   'use strict'
    angular.module('paymentMode')
    .factory('ajaxcallservice',['$http',function($http){
        return {
            getExpenditureDetails : function(JSONpath){
                return  $http.get(JSONpath).then(function(response){ //wrap it inside another promise using then
                            return response.data;  //only return employees
                        });
            }
        }
    }])
})();
