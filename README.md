inidiff.js
==========

Compare two ini file and efficiently return a list of differences


## Demo

[demo](http://l2x.github.io/inidiff.js/)

## Usage

First, include the libraries

```html
<script src="/path/to/inidiff.min.js" type="text/javascript"></script>
```

Next

```javascript

var inidiff = new IniDiff(baseText, newText);

// return html
var html = inidiff.prettyHtml();

// return objects
var diff = inidiff.diff()

```

## License
Copyright (c) 2016 l2x. Licensed under
[MIT LICENSE](https://github.com/l2x/inidiff.js/blob/master/LICENSE)
for details.