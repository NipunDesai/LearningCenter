
app.directive('autoComplete', function ($timeout, $rootScope) {
    return function (rootScope, iElement, iAttrs) {
        iElement.autocomplete({
            source: rootScope[iAttrs.uiItems],
            select: function() {
                $timeout(function() {
                    iElement.trigger('input');
                }, 0);
            }
        });
    };
});