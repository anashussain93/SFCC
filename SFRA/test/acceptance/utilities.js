'use strict';

const I = actor();

module.exports = {
    locators: {
        consentTrackModal: '.modal-content',
        consentTrackAffirm: '.affirm.btn.btn-primary'
    },
    accept() {
        I.waitForElement(this.locators.consentTrackModal);
        within(this.locators.consentTrackModal, () => {
            I.click(this.locators.consentTrackAffirm);
        });
    },
    clickToLoadPage(elementSelector, expectedPageUrl) {
        I.wait(1);
        I.click(elementSelector);
        I.wait(2);
        I.seeCurrentUrlEquals(expectedPageUrl);
    }
};
