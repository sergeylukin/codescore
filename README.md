# CodeScore

Codebase statistics, metrics, KPIs

## Description :

CodeScore is a CLI that can be used to easily collect & export various 

## Supported commands :

  - `count` - returns number of lines of code

## Usage :

```javascript
$ codescore count --path=./ --group='<group name> <dir regex pattern> <files Regex>' --group=...
```

![](https://github.com/sergeylukin/codescore/raw/master/usage.gif)

### Simple Example

Will print LOC for all JS files inside `./src`:

```javascript
$ yarn add codescore
$ ./node_modules/.bin/codescore count --path=./ --group='MySourceCode src .*js$'
```

Output:

```
[ { name: 'MySourceCode', count: 8932 } ]
```

To be continued with more advanced examples...
