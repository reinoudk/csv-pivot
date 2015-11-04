"use strict";

var transform = require('stream-transform');

class MarkerPivotTransform {

    /**
     * @param {Object} options
     * @param {String} options.nameColumn
     * @param {String} options.marker
     */
    constructor(options) {
        options = options || {};
        this.nameColumn = options.nameColumn || 'name';
        this.marker = options.marker || 'x';
    }

    unpivot () {
        return transform((record, callback) => {
            let name = record[this.nameColumn];

            for (let key in record) {
                if (record.hasOwnProperty(key) && name != key && this.marker == record[key]) {
                    callback(null, {name, value: key});
                }
            }
        });
    }
}

module.exports = MarkerPivotTransform;