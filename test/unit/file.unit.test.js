'use strict';

const file = require('../../file');
const sinon = require('sinon');
const expect = require('chai').expect;

describe ('File module', () => {
	describe ('transform()', () => {
		context('read file 1 to upper case and write to file 2', () => {
			it('should return 1', () => {
				return file.transform('1.txt', '2.txt')
						expect(arguments).to.be.an('undefined');
			});
			/*let stub;
			before('create stub for file.transform()', () => {
				stub = sinon.stub(file, 'transform');
				stub.withArgs('1.txt', '2.txt').returns(new Promise( resolve => {1}));
			});
			after('restore stube', () => {
				stub.restore();
			});*/
		});
	});
});