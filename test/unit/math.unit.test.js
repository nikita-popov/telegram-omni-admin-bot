'use strict';

const math = require('../../math');
const chai = require('chai');
const assert = chai.assert;

describe ('Math module', () => {
	describe ('sum()', () => {
		context('give for calculating 8 and 4', () => {
			it('should return 12', () => {
				assert.equal(12, math.sum(8, 4));
			});
		});
		context('give for calculating nothing', () => {
			it('should return 0', () => {
				assert.equal(0, math.sum());
			});
		});
	});
	describe ('pow()', () => {
		context('give for calculating 2 and 4', () => {
			it('should return 16', () => {
				assert.equal(16, math.pow(2, 4));
			});
		});
		context('give for calculating 2 and -1', () => {
			it('should return err and undefined', () => {
				assert.equal(undefined, math.pow(2, -1));
			});
		});
	});
	describe ('factorial()', () => {
		context('give for calculating 5', () => {
			it('should return 120', () => {
				assert.equal(120, math.factorial(5));
			});
		});
		context('give for calculating -1', () => {
			it('should return NaN', () => {
				assert.equal(true, isNaN(math.factorial(-1)));
			});
		});
	});
	describe ('compareNumbers()', () => {
		context('give for compare 4 and 4', () => {
			it('should return 0', () => {
				assert.equal(0, math.compareNumbers(4, 4));
			});
		});
		context('give for compare 4 and 1', () => {
			it('should return 1', () => {
				assert.equal(1, math.compareNumbers(4, 1));
			});
		});
		context('give for compare 1 and 4', () => {
			it('should return -1', () => {
				assert.equal(-1, math.compareNumbers(1, 4));
			});
		});
	});
});