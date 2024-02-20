'use strict';

var Site = require('dw/system/Site').current;

var reCaptchaService = require('*/cartridge/scripts/services/reCaptchaService');

/**
 * Returns ReCaptcha config
 * @returns {Object} ReCaptcha config
 */
function getReCaptchaConfig() {
    var result = {
        enabled: Boolean(Site.getCustomPreferenceValue('googleReCaptchaEnabled')),
        siteKey: Site.getCustomPreferenceValue('googleReCaptchaSiteKey') || '',
        secretKey: Site.getCustomPreferenceValue('googleReCaptchaSecretKey') || ''
    };

    return result;
}

/**
 * Validates reCaptcha token
 * @param {string} token - reCaptcha token
 * @returns {boolean} validation result
 */
function validateToken(token) {
    var config = getReCaptchaConfig();

    if (!config.enabled || !config.secretKey) {
        return true;
    }

    var svc = reCaptchaService.create();

    var result = svc.call({
        token: token,
        secretKey: config.secretKey
    });

    if (!result.isOk()) {
        // In case if ReCaptcha service unavailable skip token validation
        return true;
    }

    var serviceObject = result.object;

    try {
        var parsedObject = JSON.parse(serviceObject.text);

        return parsedObject.success;
    } catch (err) {
        // Unable to parse response
        return true;
    }
}

/**
 * Validates request object
 * @param {Object} req - request object
 * @returns {boolean} validation result
 */
function validateRequest(req) {
    var token = req.form['g-recaptcha-response'];
    var result = validateToken(token);

    return result;
}


module.exports = {
    validateRequest: validateRequest,
    getReCaptchaConfig: getReCaptchaConfig
};
