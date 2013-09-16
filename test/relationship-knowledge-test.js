/*
* build knowledge template tools, the relationship between knowledge words.
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: build a new knowledge relationship one to one   one to many.");

casper.start(baseUrl, function() {
	this.test.comment('click on the tools link');
	this.mouseEvent('click', '#tools');

});

casper.then(function() {
	this.test.comment('ensure knowledge template tool exist and click');
	casper.test.assertExists('#templateknowledge', 'the element exists');
	this.mouseEvent('click', '#relationshipknowledge');
	
});

casper.then(function() {
	this.test.comment('check all the div placer relationship knowlege tool are in place');
	casper.test.assertExists('#makerelationshipknowledge', 'the element exists');
	casper.test.assertExists('#liverelationshipknowledge', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('relationship knowledge form to receive inputs');
	casper.test.assertExists('form#templateknowledgeform', 'the element exists');
	casper.test.assertExists('#dragmakerelationshipknowledge', 'the element exists');
	casper.test.assertExists('#listrelationshipknowledge', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('add  swim stroke  and list the individual strokes below and click save');
	
	// add directly the elelemnts with test data TODO
	
	this.mouseEvent('click', '#relationshipknowledgesave');
	
});

casper.then(function() {
	this.test.comment('ensure the relationship model is saved');
	//casper.test.assertExists('form#templateknowledgeform', 'the element exists');
	
});

casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});