"use strict";

var csv = require('csv');
var fs = require('fs');
var path = require('path');
var MarkerPivotTransform = require('./marker-pivot-transform');

/**
 * TODO:
 *
 * @param {Object} options
 * @param {path} options.input Location of the input CSV
 * @param {path} options.output Location of the output CSV
 * @param {Object} options.outputColumns Names of the output columns
 * @param {Object} options.outputColumns.name Header for the values on the vertical axis
 * @param {Object} options.outputColumns.value Header for the values on the horizonal axis
 * @param {String} options.nameColumn Header of the column (in the original csv) that contains the vertical axis names
 */
var unpivot = function unpivot (options) {
    var input, output, parser, stringify, transform;

    options = options || {};

    if (
        "undefined" === typeof options.input ||
        "undefined" === typeof options.output
    ) {
        throw Error('In- and output must be specified.');
    }
    input = fs.createReadStream(options.input);
    output = fs.createWriteStream(options.output);

    parser = csv.parse({ columns: true });

    if (
        "undefined" === typeof options.outputColumns ||
        "undefined" === typeof options.outputColumns.name ||
        "undefined" === typeof options.outputColumns.value
    ) {
        throw Error("Output columns must be defined");
    }
    stringify = csv.stringify({ header:true, columns: options.outputColumns, eof: false, rowDelimiter: '\n'});

    if("undefined" === typeof options.nameColumn) {
        throw Error("Name column must be defined.");
    }
    transform = new MarkerPivotTransform({ nameColumn: options.nameColumn});

    input
        .on('error', e => console.log("Error loading input: " + e))
        .pipe(parser)
        .on('error', e => console.log("Error parsing csv: " +  e.stack))
        .pipe(transform.unpivot())
        .on('error', e => console.log("Error transforming csv-stream:" + e.stack))
        .pipe(stringify)
        .on('error', e => console.log("Error stringifying relations: " + e.stack))
        .pipe(output);

};

module.exports = {
    unpivot: unpivot
};