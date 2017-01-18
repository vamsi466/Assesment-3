(function(){
   'use strict'
    angular.module('paymentMode')
    .controller('modalFormCtrl',['ajaxcallservice','commonService','$uibModalInstance','items','initialData','$uibModal',function(ajaxcallservice,commonService,$uibModalInstance,items,initialData,$uibModal){
            var vm = this;
        
            vm.tableDetails = {};
            vm.showComponents = true
            vm.items = items;
            vm.errorMessage ={};
            vm.selected = { 
                item: vm.items[0]
            };
            var jsonFileNames = ['c_paymentType','l_AccountingType','c_frequecyType','l_PaymentTiming','l_PaymentDueDay','l_PaymentDueOn','l_GrowthType','l_ChargeAmountBasis'];
            var lengthOfFiles = jsonFileNames.length; 
            var fieldsToValidate = ["paymentvalue","selectedaccountingData","selectedfrequencyData","paymentStart","selectedpaymenttimingData","selectedpaymentdueonData","selectedpaymentduedayData"];
           
            vm.responseData = {};
            for(var keyValue = 0;keyValue<lengthOfFiles;keyValue++){
                (function(fileName){
                 
                    ajaxcallservice.getExpenditureDetails("JSON/"+jsonFileNames[fileName]+".JSON").then(function(response){
                      
                        var details=[];
                        vm.responseData[jsonFileNames[fileName]] = [];
                        var responseLength = response.length;
                        if(jsonFileNames[fileName].charAt(0) === "c" ){
                           
                            for(var jsonVal=0;jsonVal<response.length;jsonVal++){
                                var array = [];
                                array = (response[jsonVal].path).split("\\");
                                vm.responseData[jsonFileNames[fileName]].push(array[array.length - 1]);
                            }
                        }else if(jsonFileNames[fileName].charAt(0)=== "l"){
                             for(var jsonVal=0;jsonVal<response.result.length;jsonVal++){
                                vm.responseData[jsonFileNames[fileName]].push(response.result[jsonVal].value);
                            }
                        
                        }
                       

                    });
                })(keyValue);
            }
            vm.next = function (informationData) {
                if(commonService.setDetails.selectedfrequencyData === 'Other'){
                    var removedFields = fieldsToValidate.splice('5',2);
                    delete fieldsToValidate[removedFields[0]];
                    delete fieldsToValidate[removedFields[1]];
                }else if(commonService.setDetails.selectedfrequencyData === 'Monthly'){
                    var removedFields = fieldsToValidate.splice('5',1);
                    delete fieldsToValidate[removedFields[0]];
                }else if(commonService.setDetails.selectedpaymentdueonData !== 'Specific Day of Period' && commonService.setDetails.selectedpaymentdueonData != undefined){
                    var removedFields = fieldsToValidate.splice('6',1);
                    delete fieldsToValidate[removedFields[0]];
                }

                var initialValidationFlag = true;
                commonService.setInformationDetails()
                var validateTheFields = commonService.validationFunction(fieldsToValidate)
                initialValidationFlag = validateTheFields.flag
                vm.errorMessage = validateTheFields.errorMessage
                if(initialValidationFlag == true){
                    vm.selected = {
                        item: vm.items[1]
                    }
                } 
                if(commonService.setDetails.selectedfrequencyData === 'Other'){
                    vm.showComponents = false
                }else{
                    vm.showComponents = true;
                }
            };



            vm.previous = function (informationData) {
                vm.selected = {
                    item: vm.items[0]
                };
            };


            vm.generateDatatoTable = function(){
                vm.tableDetails = commonService.generateData();
                vm.errorMessage =commonService.validatingFields.errorMessage;
                if(commonService.validatingFields.flag){
                     $uibModalInstance.close();
                }   
            }

            vm.editDetails = commonService.detailsEdited();
            vm.showSaveButton = (vm.editDetails.showFlag == true)?true:false;

            vm.saveEdited=function(){
                commonService.editSaved();
                $uibModalInstance.close();
            }

            //closing modal for generate without any warnings
            vm.closeModal = function(){
                $uibModalInstance.close();
            }

            //showing warning when data is not saved and close is clicked
            vm.editconfirm = function(){
                $uibModal.open({
                    templateUrl: './Templates/warning-modal.html',
                    size : 'lg',
                    keyboard:false,
                    backdrop : 'static',
                    controller: 'editWarningCtrl',
                    controllerAs: 'edc'
                });
            }
        }])
    })();
   