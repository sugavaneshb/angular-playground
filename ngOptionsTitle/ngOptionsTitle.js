angular.module('playground.options-title', ['ui.bootstrap'])
    .directive('optionsTitle', function($parse) {
        var setCustomTitle = function(scope, attr, element, data, customTitle) {
            var realIndex = 0;
            // for debugging purposes
            // console.log(JSON.stringify(element.find("option")));
            angular.forEach(element.find("option"), function(value) {
                var elem = angular.element(value);
                if(elem.val()!="") {
                    var locals = {};
                    locals[attr] = data[realIndex];
                    realIndex++;
                    //TODO: Make this a bootstrap popover instead of a tooltip title
                    elem.attr("title", customTitle(scope, locals));
                }
            });
        };
        return {
            restrict: 'A',
            priority: 100,
            require: 'ngModel',
            link: function(scope, iElement, iAttrs) {
                // same syntax as in ng-options
                var expElements = iAttrs.optionsTitle.match(/^\s*(.+)\s+for\s+(.+)\s+in\s+(.+)?\s*/);
                var attrToWatch = expElements[3];
                var customTitle = $parse(expElements[1]);
                scope.$watch(attrToWatch, function(newValue, oldValue) {
                    if(newValue)
                        setCustomTitle(scope, expElements[2], iElement, newValue, customTitle);
                }, true);
            }
        };
    });