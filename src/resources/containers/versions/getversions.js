/**********************************************************************
 * Copyright (c) 2022 Hilscher Gesellschaft fuer Systemautomation mbH
 * See LICENSE file
**********************************************************************/
'use strict';

var client = require('../../../client');
var querystring = require('query-string');
var validate = require('../../../utils/validate');
var checkers = require('../../../utils/checkers');

/**
 * Get all container versions
 * @param {string} containerId
 * @param {number} page optional
 * @param {number} limit optional
 * @param {string} sortBy optional
 * @param {string} sortOrder asc, desc (optional)
 * @param {function} callback (optional)
 */

module.exports = function (containerId, page, limit, sortBy, sortOrder, callback) {
  if (checkers.isFunction(page)) {
    callback = page;
    page = null;
  }
  if (checkers.isFunction(limit)) {
    callback = limit;
    limit = null;
  }
  if (checkers.isFunction(sortBy)) {
    callback = sortBy;
    sortBy - null;
  }
  if (checkers.isFunction(sortOrder)) {
    callback = sortOrder;
    sortOrder = null;
  }
  try {
    const query = {};
    if (page !== undefined && page != null) {
      query.page = page;
      validate.validateNumber(page);
    }
    if (limit !== undefined && limit != null) {
      query.limit = limit;
      validate.validateNumber(limit);
    }
    if (sortBy) {
      query.sortBy = sortBy;
      validate.validateString(sortBy);
    }
    if (sortOrder) {
      query.sortOrder = sortOrder;
      validate.validateString(sortOrder);
    }
    validate.validateString(containerId);
    var path = `/containers/${containerId}/versions?${querystring.stringify(query)}`;
    return client.get('auth', path, callback);
  } catch (e) {
    if (callback) {
      return callback(e, null);
    }
    return Promise.reject(e);
  }
}