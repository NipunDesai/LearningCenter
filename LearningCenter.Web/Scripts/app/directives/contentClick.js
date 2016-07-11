
app.directive('contentClick', function ($rootScope) {
    return {
        link: function ($scope, ele, attr) {           
            angular.element(ele).click(function () {
                var index = angular.element('ul.options li').index(this);
                angular.element('div.upload_div').children('label.error').text('');
                if (index == 0 || index==1 ||index==3) {
                    angular.element(this).parent('ul').siblings('div.ckeditor_div').removeClass('show').addClass('hide');
                    angular.element(this).parent('ul').siblings('div.upload_div').removeClass('hide').addClass('show');
                }
                else if (index == 4) {
                    angular.element(this).parent('ul').siblings('div.upload_div').removeClass('show').addClass('hide');
                    angular.element(this).parent('ul').siblings('div.ckeditor_div').removeClass('hide').addClass('show');
                }
                else {
                    angular.element(this).parent('ul').siblings('div.upload_div').removeClass('show').addClass('hide');
                    angular.element(this).parent('ul').siblings('div.ckeditor_div').removeClass('show').addClass('hide');
                }
            });
        }
    };
});