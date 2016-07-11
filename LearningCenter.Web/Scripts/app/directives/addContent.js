
app.directive('addContent', function ($rootScope) {
    return {
        link: function ($scope, ele, attr) {
            var p = angular.element(ele).hasClass('close');
            angular.element(ele).click(function () {
                if (p == true) {
                    angular.element(this).parents('div#addContentDiv').removeClass('show').hide();                  
                    angular.element(this).parents('div#addContentDiv').prev('div.sec_div').children('button').show();
                }
                else {
                    angular.element(this).hide();
                    angular.element(this).parent('div').siblings('div#addContentDiv').removeClass('hide').addClass('show');
                }
              
            });
           
        }
    };
});