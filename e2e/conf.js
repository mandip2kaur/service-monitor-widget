/* global require, jasmine */
var HtmlReporter = require('protractor-html-screenshot-reporter');
exports.config = {
    // Protractor configurations will be in Gruntfile.js
    onPrepare: function() {
        // Add a reporter and store screenshots to `screnshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'reports/e2e/screenshots'
        }));
    }
};
