require.config({
	baseUrl: "js",
	paths: {
		'underscore': './vendors/underscore',
		'jquery': './vendors/jquery',
		'fk-linkify': '../../fk-linkify'
	}
});

// we require(), not define() here because we are not defining a module but
// just loading requirements for the code below
require([
	'vendors/chai',
	'vendors/mocha' // mocha loads as a global because fuck you
], function(Chai) {

	// Chai
	var assert = Chai.assert;
	var should = Chai.should();
	var expect = Chai.expect;

	// Mocha
	mocha.setup('bdd');
	mocha.ignoreLeaks();

	// load and run specs
	require([
		'specs/fk-linkify_spec'
	],function(basic){
		mocha.run();
	});

});