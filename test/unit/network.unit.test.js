'use strict';

const network = require('../../middleware/network');
const chai = require('chai');
const assert = chai.assert;

describe ('network module', () => {
  describe ('updateIP()', () => {
    context('must update IP address', () => {
      it('should return 12', () => {
//  (25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}
        assert.equal(, network.updateIP());
      });
    });
  });
});