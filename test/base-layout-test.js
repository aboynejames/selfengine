/*
* check the frame section are in order
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: The framework section layout");

casper.start(baseUrl, function() {
	this.test.comment('holder for framework three sections');
	casper.test.assertExists('#selfengine', 'the element exists');

});

casper.then(function() {
	this.test.comment('');
	casper.test.assertExists('#identity', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('');
	casper.test.assertExists('#network', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('');
	casper.test.assertExists('#tools', 'the element exists');
	
});


casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});