"use strict";

var transform = require('stream-transform');

class Transform {

    /**
     * @param {Object} options
     * @param {String} options.nameColumn
     * @param {String} options.mark
     */
    constructor(options) {
        options = options || {};
        this.nameColumn = options.nameColumn || 'name';
        this.mark = options.mark || 'x';
    }

    matrixToRelation () {
        return transform((record, callback) => {
            let name = record[this.nameColumn];

            for (let key in record) {
                if (record.hasOwnProperty(key) && name != key && this.mark == record[key]) {
                    callback(null, {name, value: key});
                }
            }
        });
    }
}

module.exports = Transform;