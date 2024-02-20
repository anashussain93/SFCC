'use strict';

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');
var UUIDUtils = require('dw/util/UUIDUtils');

/**
 * Save the credit card information to login account if save card option is selected
 * @param {Object} req - The request object
 * @param {dw.order.Basket} basket - The current basket
 * @param {Object} billingData - payment information
 */
 function subscribe(contactDetails) {

    var error = false;

    try {
        Transaction.wrap(function () {
            var contactCustomObject = CustomObjectMgr.createCustomObject('contact-us', UUIDUtils.createUUID());

            contactCustomObject.custom.email = contactDetails.contactEmail;
            contactCustomObject.custom.phone = contactDetails.contactPhone || '';
            contactCustomObject.custom.firstName = contactDetails.contactFirstName;
            contactCustomObject.custom.lastName = contactDetails.contactLastName;
            contactCustomObject.custom.message = contactDetails.contactMessage;
            contactCustomObject.custom.tnc =  contactDetails.contactTnc === 'on';
        });
    } catch (e) {
        error = true;
    }

    return { error: error };
}

exports.subscribe = subscribe;
