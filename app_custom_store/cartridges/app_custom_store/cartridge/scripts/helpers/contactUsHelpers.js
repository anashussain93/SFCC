'use strict';

/**
 * Sends the email with password reset instructions
 * @param {string} email - email for password reset
 * @param {Object} resettingCustomer - the customer requesting password reset
 */
function sendContactUsEmail(email, contactInfo) {
    var Resource = require('dw/web/Resource');
    var Site = require('dw/system/Site');
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');

    var objectForEmail = {
        firstName: contactInfo.contactFirstName,
        lastName: contactInfo.contactLastName,
        email: contactInfo.contactEmail,
        phone: contactInfo.contactPhone,
        msg: contactInfo.contactMessage
    };

    var emailObj = {
        to: email,
        subject: Resource.msg('subject.contactus.email', 'contactUs', null),
        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@testorganization.com'
    };

    emailHelpers.sendEmail(emailObj, 'contactUs/contactUsEmail', objectForEmail);
}

module.exports = {
    sendContactUsEmail: sendContactUsEmail
};
