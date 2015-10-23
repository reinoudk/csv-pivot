"use strict";

var csv = require('csv');
var fs = require('fs');
var path = require('path');
var Transform = require('../lib/transform');

exports.transform = function (test) {
    var input, output, outputColumns, parser, stringify, transform;

    input = fs.createReadStream(path.resolve(__dirname, './data/crosses.in.csv'));
    output = fs.createWriteStream(path.resolve(__dirname, './tmp/crosses.out.csv'));
    outputColumns = { name: "name", value: "value"};
    parser = csv.parse({ columns: true });
    stringify = csv.stringify({ header:true, columns: outputColumns});
    transform = new Transform();

    input
        // FIXME: finish not triggering
        .on('finish', () => {
            output.end();

            // Check if generated file is correct
            test.equals(fs.readFileSync(path.resolve(__dirname, './tmp/crosses.out.csv'), "utf8"), fs.readFileSync(path.resolve(__dirname, './data/crosses.out.csv'), "utf8"));

            // Remove temp file
            fs.unlinkSync(path.resolve(__dirname, './tmp/crosses.out.csv'));

            test.done();
        })
        .on('error', e => console.log("Error loading input: " + e))
        .pipe(parser)
        .on('error', e => console.log("Error parsing csv: " +  e.stack))
        .pipe(transform.matrixToRelation())
        .on('error', e => console.log("Error transforming csv-stream:" + e.stack))
        .pipe(stringify)
        .on('error', e => console.log("Error stringifying relations: " + e.stack))
        .pipe(output);
};
