# mindsmash-angular-quickactions
AngularJS library for adding an action modal for quick access to actions.

### Features
- Add global action items that can be accessed quickly from anywhere in the application with a click of specified keyboard key
- Override global actions on a scope-basis

### Installation:

#### via bower:

```
$ bower install mindsmash-angular-quickactions --save
```

*please use either the minified or unminified file in the `dist` directory*

### Usage:

You can define global action items that are available anywhere in your Angular application. You could do that f.e. in the "run" scope.

```js
angular.module('myApp', ['mindsmash.quickactions']).run(function(quickactions){
  quickactions.registerGlobal('.', {
			title: 'Global actions',
			actions: [{ name: 'State1', callback: function(){ $state.go('state1'); } },
			          { name: 'State2', callback: function(){ $state.go('state2'); } },
			          { name: 'Alert', callback: function(){ alert('Hello world'); } }]
		});
});
```

Or you can define custom actions per scope (f.e. in a controller). If you bind the custom actions to the same hotkey, the custom actions will be used over the global ones until the scope is destroyed.

```js
angular.module('myModule').controller('MyCtrl', function($scope, quickactions){
  quickactions.register($scope, '.', {
			title: 'Local actions',
			actions: [{ name: 'State1', callback: function(){ $state.go('state1'); } },
			          { name: 'State2', callback: function(){ $state.go('state2'); } },
			          { name: 'Alert', callback: function(){ alert('Hello world'); } }]
		});
});
```

The above examples will trigger a $modal when '.' is pressed.

### Configuration

#### Using a custom template:

You may specify a custom template during configuration by injecting the *quickactionsProvider*.

### API

#### quickactions.registerGlobal(key, item)

`key`: The key that the user can press to open the global actions modal

`item`: An object with the following parameters:
- `title`: Title of the modal
- `actions`: Array containing actions as objects with the following parameters:
 - `name`: Display name of the action
 - `callback`: Callback function to be executed when user opens the actions

#### quickactions.register(scope, key, item)

`scope`: Scope in which this is valid

`key`: The key that the user can press to open the local actions modal

`item`: An object with the following parameters:
- `title`: Title of the modal
- `actions`: Array containing actions as objects with the following parameters:
 - `name`: Display name of the action
 - `callback`: Callback function to be executed when user opens the actions
