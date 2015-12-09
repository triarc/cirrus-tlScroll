var Triarc;
(function (Triarc) {
    var Scroll;
    (function (Scroll) {
        Scroll.scroll = angular.module("tlScroll", []);
    })(Scroll = Triarc.Scroll || (Triarc.Scroll = {}));
})(Triarc || (Triarc = {}));
/// <reference path="scroll.module.ts" />
var Triarc;
(function (Triarc) {
    var Scroll;
    (function (Scroll) {
        Scroll.scroll.directive('horizontalScrollReceiver', function () {
            // The element with this attribute will scroll at the same time as the scrollSender element
            return {
                restrict: 'A',
                require: '^scrollManager',
                link: function (scope, element, attrs, scrollManagerCtrl) {
                    scrollManagerCtrl.registerHorizontalReceiver(element);
                }
            };
        });
    })(Scroll = Triarc.Scroll || (Triarc.Scroll = {}));
})(Triarc || (Triarc = {}));
/// <reference path="scroll.module.ts" />
var Triarc;
(function (Triarc) {
    var Scroll;
    (function (Scroll) {
        Scroll.scroll.directive('scrollManager', function () {
            // The element with this attribute will scroll at the same time as the scrollSender element
            return {
                restrict: 'A',
                scope: {},
                controller: [
                    '$scope', function ($scope) {
                        $scope.horizontal = [];
                        $scope.vertical = [];
                        this.registerVerticalReceiver = function (element) {
                            element.css('position', 'relative');
                            $scope.vertical.push(element[0]);
                        };
                        this.registerHorizontalReceiver = function (element) {
                            element.css('position', 'relative');
                            $scope.horizontal.push(element[0]);
                        };
                        this.getHorizontalRecievers = function () { return $scope.horizontal; };
                        this.getVerticalRecievers = function () { return $scope.vertical; };
                    }
                ]
            };
        });
    })(Scroll = Triarc.Scroll || (Triarc.Scroll = {}));
})(Triarc || (Triarc = {}));
/// <reference path="scroll.module.ts" />
var Triarc;
(function (Triarc) {
    var Scroll;
    (function (Scroll) {
        Scroll.scroll.directive('scrollSender', [
            function () {
                // Updates the element which are registered for the horizontal or vertical scroll event
                return {
                    restrict: 'A',
                    require: ['^scrollManager'],
                    link: function (scope, element, attrs, controllers) {
                        var el = element[0];
                        var updateListeners = function (value) {
                            var i, l;
                            var vertical = controllers[0].getVerticalRecievers();
                            for (i = 0, l = vertical.length; i < l; i++) {
                                var vElement = vertical[i];
                                if (value) {
                                    vElement.scrollTop += value;
                                }
                                else if (vElement.scrollTop !== el.scrollTop) {
                                    vElement.scrollTop = el.scrollTop;
                                }
                            }
                            var horizontal = controllers[0].getHorizontalRecievers();
                            for (i = 0, l = horizontal.length; i < l; i++) {
                                var hElement = horizontal[i];
                                if (hElement.scrollLeft !== el.scrollLeft) {
                                    hElement.scrollLeft = el.scrollLeft;
                                }
                            }
                        };
                        element.bind('scroll', function () { return updateListeners(null); });
                        element.on('mousewheel', function (event) {
                            var wheelDelta = -event.originalEvent.wheelDelta;
                            updateListeners(wheelDelta);
                            element.children('*[scroll-sender]')[0].scrollTop += wheelDelta;
                        });
                    }
                };
            }
        ]);
    })(Scroll = Triarc.Scroll || (Triarc.Scroll = {}));
})(Triarc || (Triarc = {}));
//dispoClientMod.directive('scrollable', ['GanttDirectiveBuilder', '$timeout', 'debounce', 'moment',
//  function (Builder, $timeout, debounce, moment) {
//  var builder = new Builder('ganttScrollable');
//  builder.controller = ($scope, $element) => {
//    $scope.gantt.scroll.$element = $element;
//    var lastScrollLeft;
//
//    $element.bind('scroll', debounce(() => {
//      var el = $element[0];
//      var currentScrollLeft = el.scrollLeft;
//      var direction;
//      var date;
//
//      $scope.gantt.scroll.cachedScrollLeft = currentScrollLeft;
//      $scope.gantt.columnsManager.updateVisibleColumns();
//      $scope.gantt.rowsManager.updateVisibleTasks();
//
//      if (currentScrollLeft < lastScrollLeft && currentScrollLeft === 0) {
//        direction = 'left';
//        date = $scope.gantt.columnsManager.from;
//      } else if (currentScrollLeft > lastScrollLeft && el.offsetWidth + currentScrollLeft >= el.scrollWidth - 1) {
//        direction = 'right';
//        date = $scope.gantt.columnsManager.to;
//      }
//
//      lastScrollLeft = currentScrollLeft;
//
//      if (date !== undefined) {
//        autoExpandColumns(el, date, direction);
//      } else {
//        $scope.gantt.api.scroll.raise.scroll(currentScrollLeft);
//      }
//    }, 5));
//
//    $scope.getScrollableCss = function () {
//      var css = {};
//
//      var maxHeight = $scope.gantt.options.value('maxHeight');
//      if (maxHeight > 0) {
//        css['max-height'] = maxHeight - $scope.gantt.header.getHeight() + 'px';
//        css['overflow-y'] = 'auto';
//
//        if ($scope.gantt.scroll.isVScrollbarVisible()) {
//          css['border-right'] = 'none';
//        }
//      }
//
//      var columnWidth = this.gantt.options.value('columnWidth');
//      var bodySmallerThanGantt = $scope.gantt.width === 0 ? false : $scope.gantt.width < $scope.gantt.getWidth() - $scope.gantt.side.getWidth();
//      if (columnWidth !== undefined && bodySmallerThanGantt) {
//        css.width = ($scope.gantt.width + this.gantt.scroll.getBordersWidth()) + 'px';
//      }
//
//      return css;
//    };
//  };
//  return builder.build();
//}]); 
/// <reference path="scroll.module.ts" />
var Triarc;
(function (Triarc) {
    var Scroll;
    (function (Scroll) {
        Scroll.scroll.directive('tlIsScrolling', [
            '$parse', function ($parse) {
                return {
                    restrict: 'E',
                    scope: {
                        scrollingVariable: "="
                    },
                    link: function (scope, element, attrs) {
                        scope.$watch(function () { return element.height(); }, function (newVal, oldVal) {
                            if (element.get(0).scrollHeight > element.height()) {
                                scope.scrollingVariable = true;
                            }
                            else {
                                scope.scrollingVariable = false;
                            }
                        });
                    }
                };
            }
        ]);
    })(Scroll = Triarc.Scroll || (Triarc.Scroll = {}));
})(Triarc || (Triarc = {}));
/// <reference path="scroll.module.ts" />
var Triarc;
(function (Triarc) {
    var Scroll;
    (function (Scroll) {
        Scroll.scroll.directive('verticalScrollReceiver', function () {
            // The element with this attribute will scroll at the same time as the scrollSender element
            return {
                restrict: 'A',
                require: '^scrollManager',
                link: function (scope, element, attrs, scrollManagerCtrl) {
                    scrollManagerCtrl.registerVerticalReceiver(element);
                }
            };
        });
    })(Scroll = Triarc.Scroll || (Triarc.Scroll = {}));
})(Triarc || (Triarc = {}));

