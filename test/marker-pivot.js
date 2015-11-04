"use strict";

var path = require('path');
var markerPivot = require('../lib/marker-pivot');

exports.MarkerPivot = function (test) {

    var input = path.resolve(__dirname, './data/crosses.in.csv');
    var output = path.resolve(__dirname, './tmp/crosses.out.csv');

    var outputColumns = { name: "name-column", value: "value-column"};
    var nameColumn = "name";

    // Create options object from values above
    var options = { input, output, outputColumns, nameColumn };

    // Perform conversion
    markerPivot.unpivot(options);
    test.done();
};

