(function(){
  'use strict';

  angular
    .module('paymentMode')
    .controller('deleteCtrl',['commonService','initialData','$uibModalInstance',function(commonService,initialData,$uibModalInstance){
      var deleteModalScope = {};

      deleteModalScope.cancelDel = function(){
        $uibModalInstance.close();
      }

      deleteModalScope.confirmDel = function(){
        commonService.tableDetails[initialData.key].splice(initialData.index,1);
        if(commonService.tableDetails[initialData.key].length==0){ 
                delete commonService.tableDetails[initialData.key];
            }
        $uibModalInstance.close();
      }
      return deleteModalScope;
    }])
})();

