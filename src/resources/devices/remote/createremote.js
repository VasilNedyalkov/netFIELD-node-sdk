/**********************************************************************
 * Copyright (c) 2022 Hilscher Gesellschaft fuer Systemautomation mbH
 * See LICENSE file
**********************************************************************/
'use strict';

var client = require('../../../client');
var validate = require('../../../utils/validate');

/**
 * Create Remote Device
 * @param {string} deviceId
 * @param {{status: string}} params
 * @param {function} callback optional
 */
module.exports = function (deviceId, params, callback) {
    try {
        validate.validateString(deviceId);
        validate.validateObject(params);
        var path = `/devices/${deviceId}/remote`;
        return client.post('auth', path, params, callback);
    } catch (e) {
        if (callback) {
            return callback(e, null);
        }
        return Promise.reject(e);
    }
}