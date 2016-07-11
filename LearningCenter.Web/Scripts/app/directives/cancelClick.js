

app.directive('cancelClick', ['$rootScope', function ($rootScope) {
    return {
        
        link: function (scope, ele, attr) {
            angular.element(ele).click(function () {
                var isSection = angular.element(this).hasClass("section");
             
                angular.element(this).parents("div.lecture_div ").prev('div.content_header').removeClass("hide show").addClass("show");
                angular.element(this).parents("div.lecture_div ").removeClass("hide show").addClass("hide");
               //for section
              if(isSection){
                scope.$apply(function () {
                    scope.cancelSectionClick();
                   
                });
                angular.element(this).parents("div.col-lg-2").siblings("div.col-lg-10").children().find("#secname").val('');
              }
               //for lecture
              else {
                  scope.$apply(function () {
                      scope.cancelLectureClick();

                  });
                  angular.element(this).parents("div.col-lg-2").siblings("div.col-lg-10").children().find("#lecname").val('');
              }
               
            });
        }


    };

}]);
