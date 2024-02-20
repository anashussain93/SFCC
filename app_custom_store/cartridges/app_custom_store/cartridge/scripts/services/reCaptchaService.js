'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

/**
 * Creates ReCaptcha service
 * @returns {dw.svc.Service} ReCaptcha service
 */
function create() {
    var service = LocalServiceRegistry.createService('google.recaptcha', {
        createRequest: function (svc, data) {
            svc.addParam('response', data.token);
            svc.addParam('secret', data.secretKey);
        },
        parseResponse: function (svc, res) {
            return res;
        }
    });

    return service;
}

module.exports = {
    create: create
};