# angular-playground
Directives and code snippets using Angular

## Directives

List of directives that gets the job done

### ngOptionsTitle
This directive lets you set title property for options configured using ng-options.
To use it, add the directive to your repo of directives and then use it in your html like explained below, 
```
  <!-- Let's say values are the list of structure which also contains the title and value-->
  <select 
        ng-options="value as value.value for value in values track by value.value"
        options-title="value.title for value in values">

```


## Dependencies
Use bower to set up angular, bootstrap and other dependencies. eg:

```
    bower install angular
```