

app.directive('sliderClick', ['$rootScope', function ($rootScope) {
    return {

        link: function (scope, ele, attr) {
            var rightClass = angular.element(ele).hasClass("right");
            if (rightClass) {
                alert("right")
            }
            else {
                alert("left")
            }
        }


    };

}]);
