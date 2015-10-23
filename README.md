# Matrix to relation
Converts a cross table with markers to a csv with two rows. Markers (most of the time x's) denote a relationship between
the row and column value. 

Matrix might be a misleading term, but this was the first thing that came to my mind.

## Installation
```bash
npm install --save matrix-to-relation
```

## Usage
To perform a conversion you have to specify an input- and output file. These should both be a path.
You also need to name the two output columns. (This might become optional).
Last, specify the column that contains the names for your vertical axis (might not be the first one).

```JavaScript
var convert = require('matrix-to-relation');

var input = path.resolve(__dirname, './input.csv');
var output = path.resolve(__dirname, './output.csv');
var outputColumns = { name: "vertical-axis", value: "horizontal-axis"};
var nameColumn = "vertical-axis-column-name";

// Create options object from values above
var options = { input, output, outputColumns, nameColumn };

// Perform conversion
convert(options);
```

The conversion is a streaming operation. More docs on this will follow.