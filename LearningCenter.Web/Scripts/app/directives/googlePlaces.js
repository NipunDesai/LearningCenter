app.directive('googlePlaces', function ($rootScope) {
    return {
        restrict: 'E',
        replace: true,
        // transclude:true,
        scope: {
            location: '='
        },
        template: '<input id="google_places_ac" name="google_places_ac" type="text" class="form-control" ng-model="location"/>',
        link: function ($scope, elm, attrs) {
            var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                $rootScope.locationDetails = place.formatted_address;
                $scope.location = place.formatted_address;
                $scope.$apply();
            });
        }
    }
});