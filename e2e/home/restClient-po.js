/* global element, by,browser */
/*var angularRestTab = function() {
    var restHost = element(by.model('request.host'));
    var restCommand = element(by.model('request.uri'));
    var restType = element(by.model('request.type'));
    var msgGood = element(by.id('good-icon'));
    var msgAlert = element(by.id('alert-icon'));
    var selectTab = element(by.buttonText('REST'));
    var sendBtn = element(by.buttonText('SEND'));
    var errorMsg = element(by.css('.alert-danger'));

    this.get = function() {
        selectTab.click();
    };
    this.getErrorMsg = function() {
        return errorMsg.getText();
    };
    this.setHost = function(host) {
        restHost.clear();
        restHost.sendKeys(host);
    };
    this.clearHost = function() {
        restHost.clear();
    };
    this.setCommand = function(command) {
        restCommand.sendKeys(command);
    };
    this.clearCommand = function() {
        restCommand.clear();
    };
    this.submit = function() {
        sendBtn.click();
    };

};
module.exports = angularRestTab;
*/