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

### customToolTip
This directive lets you add custom tooltips with data loaded on demand from the server. 
This is more of an example to refer to build your own directives of similar kind.
This particular directive was added to work with D3 elements where I wanted to load heavy payload from server on demand.

**What does the directive offer?**
* On demand data load from the server
* Caching to persist the data locally for heavy payload usecases
* Custom template support with caching
* If the same directive is tied to multiple similar elements, the directive also manages life cycles and closing/opening the tooltip. *eg:* In *D3* library's tree structure, the elements appear/disappear as the tree is unfolded/expanded/folded. So, lifecycle has to be managed accordingly.

In the given example, we fetch some given enumeration values and the coverage of them from a source. This was originally used to query sample names used in the particular geography.
```
   
```

## Dependencies
Use bower to set up angular, bootstrap and other dependencies. eg:

```
    bower install angular
```