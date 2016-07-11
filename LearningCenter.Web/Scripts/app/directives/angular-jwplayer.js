//'use strict';
//app.directive('audioVideo', ['$compile', function ($compile) {
//    return {
//        restrict: 'A',
//        scope: {
//            playerId: '@',
//            setupVars: '=setup'

//        },
//        link: function (scope, element, attrs) {
//            var url = attrs.url;

//            element.attr("id", "video"+scope.$id);
//            //scope.setupVars = "http://localhost:4424/UploadFiles/ContentPages/2/cccdd60a-4bf7-4494-82dd-bf4c020732d0.mp4";
//            var id = element.attr("id");
//            jwplayer(id)
//                .setup({
//                    file: apiPath +"/"+ url,
//                    height:700,
//                    width:700
//                });

//        }
//    };
//}]);

'use strict';
angular.module('angular-jwplayer', []).directive('jwplayer', ['$compile', function ($compile) {
    return {
        restrict: 'EC',
        scope: {
            playerId: '@',
            setupVars: '=setup'

        },
        link: function (scope, element, attrs) {
            var id = scope.playerId || 'random_player_' + Math.floor((Math.random() * 999999999) + 1),
                getTemplate = function (playerId) {
                    return '<div id="' + playerId + '"></div>';
                };

            element.html(getTemplate(id));
            $compile(element.contents())(scope);
            jwplayer(id).setup({
                file: scope.setupVars,
                                height:300,
                                width:300
                            });
        }
    };
}]);