'use strict';

/**
 * @namespace ContactUs
 */

var server = require('server');
server.extend(module.superModule);

/**
 * ContactUs-Subscribe : This endpoint is called to submit the shopper's contact information
 * @name Base/ContactUs-Subscribe
 * @function
 * @memberof ContactUs
 * @param {middleware} - server.middleware.https
 * @param {httpparameter} - contactFirstName - First Name of the shopper
 * @param {httpparameter} - contactLastName - Last Name of the shopper
 * @param {httpparameter} - contactEmail - Email of the shopper
 * @param {httpparameter} - contactPhone - Phone number of the shopper
 * @param {httpparameter} - contactMessage - Message entered by the shopper
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.replace('Subscribe', server.middleware.https, function (req, res, next) {
    var Resource = require('dw/web/Resource');
    var hooksHelper = require('*/cartridge/scripts/helpers/hooks');
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var contactUsHelpers = require('*/cartridge/scripts/helpers/contactUsHelpers');
    var reCaptchaHelpers = require('*/cartridge/scripts/helpers/reCaptchaHelpers');
    var Site = require('dw/system/Site');
    var email = Site.current.getCustomPreferenceValue('toCustomerServiceEmail');


    var valid = reCaptchaHelpers.validateRequest(req);
    if (!valid) {
        res.json({
            error: true,
            msg: Resource.msg('msg.verify.captcha', 'contactUs', null)
        });

        return next();
    }
    
    var contactUsForm = req.form;
    var isValidEmail = emailHelpers.validateEmail(contactUsForm.contactEmail);
    if (isValidEmail) {
        var result = hooksHelper('app.contactUs.subscribe', 'subscribe', contactUsForm, function () {});

        if(result.error){
            res.json({
                error: true,
                msg: Resource.msg('subscribe.to.contact.us.invalid', 'contactUs', null)
            });
        } else {
            contactUsHelpers.sendContactUsEmail(email, contactUsForm);
            res.json({
                success: true,
                msg: Resource.msg('subscribe.to.contact.us.success', 'contactUs', null)
            });
        }
    } else {
        res.json({
            error: true,
            msg: Resource.msg('subscribe.to.contact.us.email.invalid', 'contactUs', null)
        });
    }

    next();
});

module.exports = server.exports();
