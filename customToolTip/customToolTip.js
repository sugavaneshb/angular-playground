angular.module('playground.custom-tooltip', ['ui.bootstrap'])
    .directive('custom-tooltip', function($compile, $http, $templateCache, $q, $templateRequest, $cacheFactory) {

        // a dumb way to introduce a close button. unable to find a better method. TODO: try to remove jQuery logic here.
        var closeButton = ' <span style="font-size: 8pt; cursor: pointer" onclick="$(this).closest(\'div.popover\').popover(\'hide\');" class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
        var cache = $cacheFactory('tooltipCache'); 
        
        var query = '/api/query'; //place your query here

        // some domain logic to pre-process data before rendering.
        // Update this section as required
        var setValues = function (data, scope) {
            scope.items = data;
            if(!!data && !!data.coverage && !!data.coverage.coverage) {
                scope.coverage = data.coverage.coverage * 100;
            }
        };

        // cached locally so that if the user clicks again, we need not fetch it. Angular caching by default is
        // enabled only for GET requests. So, need to use cacheFactory
        var getValues = function(source, scope) {
            var payload = {
                "source": source,
                "coverageNeeded": true
            };
            //console.log(payload);

            var cacheId = query + '*' + JSON.stringify(payload);
            var cachedData = cache.get(cacheId);

            if (cachedData) {
                setValues(cachedData, scope);
                return;
            }

            // TODO: Make this a service and make it available across the project
            $http({url: query, method: 'POST', data: payload})
                .success(function(data) {
                    cache.put(cacheId, data);
                    setValues(data, scope);
                })
                .error(function(status) {
                    console.log("Failed to fetch values with status:" + status);
                    scope.hasException = true;
                });
        };

        return {
            restrict: 'AE',
            scope: true,
            link: function (scope, element, attrs) {
                $templateRequest('/customToolTip/templates/sample.html').then(function(popOverContent) {
                    var content = function() {
                        return $compile(popOverContent)(scope);
                    };
                    var options = {
                        content: content,
                        html: true,
                        trigger: 'manual',
                        placement: 'auto',
                        container: 'body',
                        title: 'Values found for this source' + closeButton
                    };
                    // on demand of fetching of topK values only when the user clicks on the node
                    element.on("click", function() {
                        element.popover('toggle');
                        if($('.popover').hasClass('in')) {
                            getValues(attrs.source, scope);
                        }
                    });
                    element.popover(options);
                    element.removeAttr('custom-tooltip');
                });
            }
        }
    });