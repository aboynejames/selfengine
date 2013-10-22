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
	this.test.comment('click on make signin link');
	this.mouseEvent('click', '#sigin');
	
});

casper.run(function() {
// need for exporting xml xunit/junit style
  this.test.done();
	//this.exit(); 
});