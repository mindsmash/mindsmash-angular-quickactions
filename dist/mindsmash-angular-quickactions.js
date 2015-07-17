(function () {
    'use strict';

    angular.module('mindsmash.quickactions', ['mindsmash.hotkeys', 'ui.bootstrap'])

    .provider('quickactions', function () {

        this.templateUrl = 'mindsmash-angular-quickactions-modal.html';

        this.$get = ['hotkeys', '$modal', '$timeout', function (hotkeys, $modal, $timeout) {
            var _global = this.global,
                _templateUrl = this.templateUrl,
                _modalOpen = false;

            /**
             * Opens the modal with options/actions.
             */
            var _launchModal = function (item) {
                if (_modalOpen) {
                    return;
                }

                _modalOpen = true;

                $modal.open({
                    templateUrl: _templateUrl,
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    controller: ['$scope', '$modalInstance', 'hotkeys', 'item', function ($scope, $modalInstance, hotkeys, item) {
                        $scope.item = item;
                        $scope.active = 0;

                        $scope.keydown = function ($event) {
                            // up
                            if ($event.keyCode == 38) {
                                $scope.active = Math.max($scope.active - 1, 0);
                                $event.preventDefault();
                            }

                            // down
                            if ($event.keyCode == 40) {
                                $scope.active = Math.min($scope.active + 1, $scope.filteredActions.length - 1);
                                $event.preventDefault();
                            }

                            // enter
                            if ($event.keyCode == 13) {
                                var candidate = $scope.filteredActions[$scope.active];
                                if (candidate) {
                                    $scope.launch(candidate);
                                }
                            }
                        };

                        $scope.launch = function (action) {
                            action.callback();
                            $modalInstance.close();
                        };

                        $scope.$watch('actionFilter.name', function () {
                            $timeout(function () {
                                $scope.active = 0;
                            });
                        });

                        // reset filter to zero to avoid hotkey from being used as filter
                        $timeout(function () {
                            $scope.actionFilter = {
                                name: ''
                            };
                        });
                    }]
                }).result.then(function () {
                    _modalOpen = false;
                }, function () {
                    _modalOpen = false;
                });
            };

            /**
             * Registers an item with given hotkey.
             * 
             * Item example: { title: 'Title of modal', actions: [ { name: 'Action', callback: function(){ .... } } ] }
             */
            var _registerGlobal = function (hotkey, item) {
                _global = {
                    combo: hotkey,
                    description: item.title,
                    callback: angular.bind(this, function () {
                        _launchModal(item, item.title);
                    })
                };
                hotkeys.add(_global);
            };

            /**
             * Registers an item with given hotkey for as long as given $scope is available.
             * 
             * Item example: { title: 'Title of modal', actions: [ { name: 'Action', callback: function(){ .... } } ] }
             */
            var _register = function ($scope, hotkey, item) {
                hotkeys.add({
                    combo: hotkey,
                    description: item.title,
                    callback: angular.bind(this, function () {
                        _launchModal(item);
                    })
                });

                $scope.$on('$destroy', function () {
                    hotkeys.del(hotkey);
                    if (hotkey === _global.combo) {
                        hotkeys.add(_global);
                    }
                });
            };

            return {
                registerGlobal: _registerGlobal,
                register: _register
            };
        }];

    });
})();
