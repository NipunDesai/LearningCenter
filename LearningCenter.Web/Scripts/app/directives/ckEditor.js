app.directive('ckEditor', ['$rootScope','$log',function ($rootScope,$log) {
    return {
        require: '?ngModel',
        restrict: 'C',
        link: function (scope, elm, attr, ngModel) {
           
            var ck = CKEDITOR.replace(elm[0]);



            ck.on('pasteState', function () {
               
                ngModel.$setViewValue(ck.getData());
               
            });

            ngModel.$render = function (value) {
                ck.setData('');
            };

            ck.on('change', function (e) {
               
                ngModel.$setViewValue(ck.getData());
               
            });

            $rootScope.$on('clearData', function clearData() {
                ck.setData('');
            });

          

            $rootScope.$on('editData', function (event, editorData) {
                $log.log(editorData);
              
                ck.setData(editorData);
            });
           

        }


    };
   
}]);


