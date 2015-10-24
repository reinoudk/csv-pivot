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
    stringify = csv.stringify({ header:true, columns: outputColumns, eof: false});
    transform = new Transform();

    input
        .on('close', () => {
            output.end();
            test.equals(
               fs.readFileSync(path.resolve(__dirname, './tmp/crosses.out.csv'), "utf8"),
               fs.readFileSync(path.resolve(__dirname, './data/crosses.out.csv'), "utf8"),
              "The generated file should match the reference file."
            );

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
