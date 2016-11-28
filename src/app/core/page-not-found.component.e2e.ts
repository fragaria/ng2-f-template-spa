// import {verifyNoBrowserErrors} from '@angular/core/testing/src/e2e_util'; https://github.com/angular/angular/issues/6684

describe('hello world', function() {

  // afterEach(verifyNoBrowserErrors);

  describe('hello world app', function() {
    var URL = '/';

    beforeEach(function() {
      browser.get(URL);
      browser.waitForAngular();
    });

    it('should load', function() {
      browser.getCurrentUrl().then(function(url) {
        expect(url.endsWith('/')).toBe(true);
      });
    });

    it('should display link to homepage', function() {
      var linkElement = element.all(by.css('.navbar-brand')).first();
      expect(linkElement.getText()).toEqual('HP');
      expect(linkElement.getAttribute('href')).toEqual('http://localhost:8080/');
    });
  });
});

