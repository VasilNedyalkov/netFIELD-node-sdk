/**********************************************************************
 * Copyright (c) 2019 Hilscher Gesellschaft fuer Systemautomation mbH
 * See LICENSE file
**********************************************************************/
'use strict';

var client = require('../../client');
var validate = require('../../utils/validate');

/**
 * Get all network devices that where discovered by the specific device.
 * @param {string} deviceId The desired deviceId
 * @param {function} callback optional
 */
module.exports = function (deviceId, callback) {
    try {
        validate.validateString(deviceId);
        var path = '/devices/' + deviceId + '/network';
        return client.get('auth', path, callback);
    } catch (e) {
        if (callback) {
            return callback(e, null);
        }
        return Promise.reject(e);
    }
}