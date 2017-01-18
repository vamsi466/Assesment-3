(function(){
   'use strict'
    angular.module('paymentMode')
    .controller('editWarningCtrl',['commonService','$uibModalInstance','$uibModalStack', function (commonService,$uibModalInstance,$uibModalStack) {
        
        var edc = {}
        edc.flag = {};
        
        edc.discloseChanges = function(){
            $uibModalStack.dismissAll('closing'); 
            commonService.clearData();
        }
        edc.continuechanges = function(){
            $uibModalInstance.dismiss('cancel');
        }
        return edc;
    }])
})();