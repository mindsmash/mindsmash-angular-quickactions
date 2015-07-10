angular.module('mindsmash.quickactions').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/mindsmash-angular-quickactions-modal.html',
    "<div class=\"modal-header\">\n" +
    "\t<h4 class=\"modal-title\">{{item.title}}</h4>\n" +
    "\t<button type=\"button\" class=\"modal-close\" data-ng-click=\"$dismiss()\">×</button>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "\t<input type=\"text\" class=\"form-control\" ng-model=\"actionFilter.name\" autofocus=\"autofocus\" ng-keydown=\"keydown($event)\">\n" +
    "\t<br>\n" +
    "\t<div class=\"list-group\">\n" +
    "\t\t<a class=\"list-group-item\" ng-class=\"{active: active == $index}\" ng-repeat=\"action in filteredActions = (item.actions | filter: actionFilter | limitTo: 5) \" ng-click=\"launch(action)\">{{action.name}}</a>\n" +
    "\t</div>\n" +
    "</div>"
  );

}]);
