/**********************************************************************
 * Copyright (c) 2022 Hilscher Gesellschaft fuer Systemautomation mbH
 * See LICENSE file
**********************************************************************/
'use strict';

var client = require('../../../client');

/**
 * Get a list of enabled two-factor authentication methods for the current user
 * @param {function} callback optional
 */
module.exports = function (callback) {
    try {
        var path = '/auth/two-factor';
        return client.get('auth', path, callback);
    } catch (e) {
        if (callback) {
            return callback(e, null);
        }
        return Promise.reject(e);
    }
}