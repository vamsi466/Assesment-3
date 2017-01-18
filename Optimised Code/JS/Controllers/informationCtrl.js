(function(){ 

   'use strict'
    angular.module('paymentMode')
    .controller('informationCtrl',function(commonService,$timeout){
            var info= this;
            info.showData = {};
            info.paymentDetails={'paymentvalue':'','selectedaccountingData':'',"selectedfrequencyData":'',"paymentStart":'',"selectedpaymenttimingData":'',"selectedpaymentdueonData":'',"selectedpaymentduedayData":''};;
            info.showData = commonService.showDataModal();
            info.paymentDetails = (info.showData.flag ==='true')?{}:commonService.finalGeneratedData;
            info.editObj ={};
            info.editObj.showFlag == false;
            info.payment= function(data){
                info.paymentDetails.paymentvalue = data;
            }
            info.accountingSelected= function(data){
                info.paymentDetails.selectedaccountingData = data;
            }
            info.frequecySelected= function(data){
                info.paymentDetails.selectedfrequencyData = data;
            }
            info.paymenttimingSelected = function(data){
                info.paymentDetails.selectedpaymenttimingData = data;
            }
            info.paymentdueonSelected = function(data){
                info.paymentDetails.selectedpaymentdueonData = data;
            }
            info.paymentduedaySelected = function(data){
                info.paymentDetails.selectedpaymentduedayData = data;
            }
            $timeout(function() {
                commonService.getInformationDetails(info.paymentDetails)
            },1500)

            info.editObj = commonService.detailsEdited();
            if(info.editObj.showFlag == true){
                info.paymentDetails = info.editObj.data;
            } 
       })
})();