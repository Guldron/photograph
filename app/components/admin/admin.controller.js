;
(function(){
'use strict';

adminController.$inject = ['$scope', 'Upload', '$window', '$http'];


function adminController($scope, Upload, $window, $http) {
$scope.submit = function(){ //function to call on form submit
            if ($scope.upload_form.file.$valid && $scope.file) { //check if from is valid
                $scope.upload($scope.file); //call upload function
            }
        }
        $scope.upload = function (file) {
            Upload.upload({
                url: '/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                console.log(resp)
                if(resp.data.error_code === 0){ //validate success
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log(resp)
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };

    $scope.test = function () {
        var url = '/images';
        return $http.get(url).then(function (response) {
            console.log(response)
            var arr = new Uint8Array(response.data[0].img.data);
                var blobData = new Blob([arr], { type: 'image/png' });
                var blob = window.URL.createObjectURL(blobData);
            
                return $scope.blob = blob;
            });
    }
};

angular
		.module('app')
		.controller('adminController', adminController)
})();

