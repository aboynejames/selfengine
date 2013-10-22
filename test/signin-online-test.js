/*
* online signin to store data advance settings
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: sign in to sync data back and forth between local pi cloud");

casper.start(baseUrl, function() {

});

casper.then(function() {
	this.test.comment('a sigin button exists');
	casper.test.assertExists('#signin', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('signin form elements');
	casper.test.assertExists('#signinflow', 'the element exists');
	casper.test.assertExists('form ', 'the element exists');
	casper.test.assertExists('#emailin', 'the element exists');
	casper.test.assertExists('#passwordin', 'the element exists');
	casper.test.assertExists('#signinbutton', 'the element exists');	
	
});

casper.then(function() {
	this.test.comment('signin form elements are hidden');
	casper.test.assertVisible('#signinflow', 'the section is visable');	
	casper.test.assertNotVisible('#emailin', 'the section is not visable');	
	casper.test.assertNotVisible('#passwordin', 'the section is not visable');	
	casper.test.assertNotVisible('#signinbutton', 'the section is not visable');	
	
});

casper.then(function() {
	this.test.comment('click on make signin link');
	this.mouseEvent('click', '#signin');
	
});

casper.then(function() {
	this.test.comment('signin form elements are hidden');
	casper.test.assertVisible('#signinflow', 'the section is not visable');		
	casper.test.assertVisible('#emailin', 'the section is visable');	
	casper.test.assertVisible('#passwordin', 'the section is visable');	
	casper.test.assertVisible('#signinbutton', 'the section is visable');	
	
});

casper.run(function() {
// need for exporting xml xunit/junit style
  this.test.done();
	//this.exit(); 
});