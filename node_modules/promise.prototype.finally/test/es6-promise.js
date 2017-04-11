var assert = require('assert');

require('es6-promise').polyfill();
require('../finally');

var o_create = Object.create || function(o, props) {
	function F() {}
	F.prototype = o;

	if (typeof(props) === "object") {
		for (var prop in props) {
			if (props.hasOwnProperty((prop))) {
				F[prop] = props[prop];
			}
		}
	}
	return new F();
};

describe("Promise.finally", function() {
	describe("native finally behaviour", function() {
		describe("no value is passed in", function() {
			it("does not provide a value to the finally code", function(done) {
				var fulfillmentValue = 1;
				var promise = Promise.resolve(fulfillmentValue);

				promise['finally'](function() {
					assert.equal(arguments.length, 0);
					done();
				});
			});

			it("does not provide a reason to the finally code", function(done) {
				var rejectionReason = new Error();
				var promise = Promise.reject(rejectionReason);

				promise['finally'](function(arg) {
					assert.equal(arguments.length, 0);
					done();
				});
			});
		});

		describe("non-exceptional cases do not affect the result", function(){
			it("preserves the original fulfillment value even if the finally callback returns a value", function(done) {
				var fulfillmentValue = 1;
				var promise = Promise.resolve(fulfillmentValue);

				promise['finally'](function() {
					return 2;
				}).then(function(value) {
					assert.equal(fulfillmentValue, value);
					done();
				});
			});

			it("preserves the original rejection reason even if the finally callback returns a value", function(done) {
				var rejectionReason = new Error();
				var promise = Promise.reject(rejectionReason);

				promise['finally'](function() {
					return 2;
				}).then(undefined, function(reason) {
					assert.equal(rejectionReason, reason);
					done();
				});
			});
		});

		describe("exception cases do propogate the failure", function(){
			describe("fulfilled promise", function(){
				it("propagates changes via throw", function(done) {
					var promise = Promise.resolve(1);
					var expectedReason = new Error();

					promise['finally'](function() {
						throw expectedReason;
					}).then(undefined, function(reason) {
						assert.deepEqual(expectedReason, reason);
						done();
					});
				});

				it("propagates changes via returned rejected promise", function(done){
					var promise = Promise.resolve(1);
					var expectedReason = new Error();

					promise['finally'](function() {
						return Promise.reject(expectedReason);
					}).then(undefined, function(reason) {
						assert.deepEqual(expectedReason, reason);
						done();
					});
				});
			});

			describe("rejected promise", function(){
				it("propagates changes via throw", function(done) {
					var promise = Promise.reject(1);
					var expectedReason = new Error();

					promise['finally'](function() {
						throw expectedReason;
					}).then(undefined, function(reason) {
						assert.deepEqual(expectedReason, reason);
						done();
					});
				});

				it("propagates changes via returned rejected promise", function(done){
					var promise = Promise.reject(1);
					var expectedReason = new Error();

					promise['finally'](function() {
						return Promise.reject(expectedReason);
					}).then(undefined, function(reason) {
						assert.deepEqual(expectedReason, reason);
						done();
					});
				});
			});

			describe("inheritance", function() {
				function Subclass (resolver) {
					this._promise$constructor(resolver);
				}

				Subclass.prototype = o_create(Promise.prototype);
				Subclass.prototype.constructor = Subclass;
				Subclass.prototype._promise$constructor = Promise;

				Subclass.resolve = Promise.resolve;
				Subclass.reject = Promise.reject;
				Subclass.all = Promise.all;

				it("preserves correct subclass when chained", function() {
					var promise = Subclass.resolve().finally();
					assert.ok(promise instanceof Subclass);
					assert.equal(promise.constructor, Subclass);
				});

				it("preserves correct subclass when rejected", function() {
					var promise = Subclass.resolve().finally(function() {
						throw new Error("OMG");
					});
					assert.ok(promise instanceof Subclass);
					assert.equal(promise.constructor, Subclass);
				});

				it("preserves correct subclass when someone returns a thenable", function() {
					var promise = Subclass.resolve().finally(function() {
						return Promise.resolve(1);
					});
					assert.ok(promise instanceof Subclass);
					assert.equal(promise.constructor, Subclass);
				});
			});
		});
	});
});
