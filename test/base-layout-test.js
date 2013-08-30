/*
* check the default selfengine sections are in order
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: The framework section layout");

casper.start(baseUrl, function() {
	this.test.comment('holder for framework three sections');
	casper.test.assertExists('#selfengine', 'the element exists');

});

casper.then(function() {
	this.test.comment('identity navigation');
	casper.test.assertExists('#identity', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('view life, social, other network visualisations');
	casper.test.assertExists('#network', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('access range of tools internal or exteral to selfengine');
	casper.test.assertExists('#tools', 'the element exists');
	
});


casper.then(function() {
	this.test.comment('attention framing context');
	casper.test.assertExists('#attention', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('attention framing context');
	casper.test.assertExists('#contextflow', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('nextwork flow area');
	casper.test.assertExists('#networkflow', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('select tools area');
	casper.test.assertExists('#toolsflow', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('live active data flow');
	casper.test.assertExists('#livedata', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('live data from past visualisation area');
	casper.test.assertExists('#pastflow', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('suggestion, future make/prediction/simullation area');
	casper.test.assertExists('#futureflow', 'the element exists');
	
});


casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});