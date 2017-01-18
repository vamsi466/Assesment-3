(function(){
 
   'use strict'
    angular.module('paymentMode')
    .controller('parameterCtrl',function(commonService,$timeout){
            var pm = this;
            pm.paymentDetails ={};
            pm.showData = {};
            pm.showData = commonService.showDataModal();
            pm.paymentDetails = (pm.showData.flag ==='true')?{}:commonService.finalGeneratedData;
            pm.editObj ={};
            pm.growthSelected = function(data){
                pm.paymentDetails.growthselectedData = data;
            }
            pm.chargeAmountSelected = function(data){
                pm.paymentDetails.chargeAmountselectedData = data;
            }
            $timeout(function() {
                commonService.getParamsDetails(pm.paymentDetails)
            },1500)

            pm.editObj = commonService.detailsEdited();
            if(pm.editObj.showFlag == true){
                pm.paymentDetails = pm.editObj.data;
            }
        })
})();