# CSV pivot
Small lib to pivot or unpivot csv data. **Currently only supports unpivot. Also, values are not used.**

## Installation
```bash
npm install --save matrix-to-relation
```

## Features

- create pivot table from a data set **work in progress**
- unpivot a pivot table to:
  - create 2-tuples (using some marker in the pivot table)
  - create 3-tuples (using the values from the pivot table) **work in progress**  


## Usage
To perform a conversion you have to specify an input- and output file. These should both be a path. 
The operation is a streaming operation and uses [http://csv.adaltas.com/](node-csv) under the hood.

### Unpivot to 2-tuples

To create 2-tuples from a pivot table you also need to name the two output columns. (This might become optional).
Also, specify the column that contains the names for your vertical axis (might not be the first one).
The default marker is an ```x```, you can change this by setting ```options.mark```.

```JavaScript
var path = require('path');
var convert = require('matrix-to-relation');

var input = path.resolve(__dirname, './input.csv');
var output = path.resolve(__dirname, './output.csv');
var outputColumns = { name: "name-column", value: "value-column"};
var nameColumn = "name";

// Create options object from values above
var options = { input, output, outputColumns, nameColumn };

// Perform conversion
convert(options);

/*
input: 
name,value-1,value-2,value-3
name-1,x,x,x
name-3,,x,x
name-4,x,,

output:
name-column,value-column
name-1,value-1
name-1,value-2
name-1,value-3
name-3,value-2
name-3,value-3
name-4,value-1
*/

```

The conversion is a streaming operation. More docs on this will follow.

# TODO

- Document options
- Implement unpivot to 3-tuples
- Implement creation of pivot tables
- Export the transforms individually 
- Document streaming / export stream

# Changelog
[CHANGELOG.md](CHANGELOG.md)
