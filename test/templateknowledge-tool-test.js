/*
* build knowledge template tools, the relationship between knowledge words.
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: build knowledge into a template (tool or part of).");

casper.start(baseUrl, function() {
	this.test.comment('click on the tools link');
	this.mouseEvent('click', '#tools');

});

casper.then(function() {
	this.test.comment('ensure knowledge template tool exist and click');
	casper.test.assertExists('#templateknowledge', 'the element exists');
	this.mouseEvent('click', '#templateknowledge');
	
});

casper.then(function() {
	this.test.comment('check all the div placer template knowlege tool are in place');
	//casper.test.assertExists('#maketemplateknowledge', 'the element exists');
	//casper.test.assertExists('#livetemplateknowledge', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('template form to receive inputs');
	//casper.test.assertExists('form#templateknowledgeform', 'the element exists');
	//casper.test.assertExists('#nametemplateknowledge', 'the element exists');
	//casper.test.assertExists('#linktemplateknowledge', 'the element exists');
	
});

casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});