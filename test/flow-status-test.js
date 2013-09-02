/*
* check the flow section can be made active and not.
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: Select different elements of attention setting");

casper.start(baseUrl, function() {
	this.test.comment('check the network and tools flows divs are hidden');
	casper.test.assertNotVisible('#contextflow', 'the section is not visable');
	casper.test.assertNotVisible('#networkflow', 'the section is not visable');
	casper.test.assertNotVisible('#toolsflow', 'the section is not visable');	
});

casper.then(function() {
	this.test.comment('click on me identity link');
	this.mouseEvent('click', '#identity');
	
});

casper.then(function() {
	this.test.comment('the contextflow section is visable');
	casper.test.assertVisible('#contextflow', 'the section is not visable');
	casper.test.assertNotVisible('#networkflow', 'the section is not visable');
	casper.test.assertNotVisible('#toolsflow', 'the section is not visable');	
});

casper.then(function() {
	this.test.comment('click on me identity to deselect');
	this.mouseEvent('click', '#identity');
	
});

casper.then(function() {
	this.test.comment('the contextflow section is visable');
	casper.test.assertNotVisible('#contextflow', 'the section is not visable');
	casper.test.assertNotVisible('#networkflow', 'the section is not visable');
	casper.test.assertNotVisible('#toolsflow', 'the section is not visable');	
});

casper.then(function() {
	this.test.comment('click on network link');
	this.mouseEvent('click', '#network');
	
});

casper.then(function() {
	this.test.comment('the neworkflow section is visable');
	casper.test.assertNotVisible('#contextflow', 'the section is not visable');
	casper.test.assertVisible('#networkflow', 'the section is not visable');
	casper.test.assertNotVisible('#toolsflow', 'the section is not visable');	
});

casper.then(function() {
	this.test.comment('click on network link');
	this.mouseEvent('click', '#network');
	
});

casper.then(function() {
	this.test.comment('the neworkflow section is visable');
	casper.test.assertNotVisible('#contextflow', 'the section is not visable');
	casper.test.assertNotVisible('#networkflow', 'the section is not visable');
	casper.test.assertNotVisible('#toolsflow', 'the section is not visable');	
});

casper.run(function() {
// need for exporting xml xunit/junit style
  //this.test.renderResults(true, 0, 'reports/test-casper.xml');
  this.test.done();
	//this.exit(); 
});