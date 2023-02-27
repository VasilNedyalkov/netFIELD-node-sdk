/**********************************************************************
 * Copyright (c) 2022 Hilscher Gesellschaft fuer Systemautomation mbH
 * See LICENSE file
**********************************************************************/
'use strict';

var client = require('../../client');
var validate = require('../../utils/validate');

/**
 * Update device custom field by deviceId and fieldId
 * @param {string} deviceId
 * @param {string} fieldId
 * @param {{fieldValue: string}} params
 * @param {function} callback optional
 */
module.exports = function (deviceId, fieldId, params, callback) {
    try {
        validate.validateString(deviceId);
        validate.validateString(fieldId);
        validate.validateObject(params);
        var path =  '/devices/' + deviceId + '/custom-fields/' + fieldId;
        return client.put('auth', path, params, callback);
    } catch (e) {
        if (callback) {
            return callback(e, null);
        }
        return Promise.reject(e);
    }
}