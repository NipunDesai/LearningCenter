
app.directive('addClick', function ($rootScope) {
    return {
       
        link: function (scope, ele, attr) {
            angular.element(ele).click(function () {
                var isSection = angular.element(this).hasClass("section");
                //for Section
                if (isSection) {
                    //check any add sectino is open or not
                    var isOpenDiv = angular.element(this).parents("div.content_div").find('div#addsectionDiv').hasClass("show");
                    //remove class from all opend section
                    angular.element(this).parents("div.content_header").removeClass("hide show");
                    angular.element(this).parents("div.content_header").next('div.lecture_div').removeClass("hide show");
                    if (isOpenDiv) {
                        angular.element(this).parents("div.content_div").find('div#addsectionDiv').removeClass("show");
                        angular.element(this).parents("div.content_div").find('div#addsectionHeader').removeClass("hide show").addClass("show");
                        angular.element(this).parents("div.content_header").removeClass("hide show").addClass("hide");
                        angular.element(this).parents("div.content_header").next('div#addsectionDiv').addClass("show");
                        angular.element(this).parents("div.content_header").next('div#addsectionDiv').find("input[type=text]").val('');

                    }
                    else {
                        angular.element(this).parents("div.content_header").removeClass("hide show").addClass("hide");
                        angular.element(this).parents("div.content_header").next('div#addsectionDiv').removeClass("hide show").addClass("show");
                    }
                    scope.$apply(function () {
                        scope.addSectionClick();

                    });
                  
                }
                    //for Lecture
                else {
                    angular.element(this).parents("div.content_header").removeClass("hide show").addClass("hide");
                    angular.element(this).parents("div.content_header").next('div.lecture_div').removeClass("hide show").addClass("show");

                    
                }

                

            });
        }
    };
});