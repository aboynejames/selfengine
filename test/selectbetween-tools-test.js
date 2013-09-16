/*
* select a knowledge tool, then select another. both to be displayed on the toolsflowUI at same time. Then select
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: switch on two tools and then switch on off then the both off.");

casper.start(baseUrl, function() {
	this.test.comment('click on the tools link');
	this.mouseEvent('click', '#tools');

});

casper.then(function() {
	this.test.comment('check two seperate tools existing, knowldge and template knowledge');
	casper.test.assertExists('#knowledge', 'the element exists');
	casper.test.assertExists('#templateknowledge', 'the element exists');	

});

casper.then(function() {
	this.test.comment('select the knowledge tool');
	this.mouseEvent('click', '#knowledge');
	casper.test.assertExists('#makeknowledge', 'the element exists');	
	
});

casper.then(function() {
	this.test.comment('select the template knowledge tool');
	this.mouseEvent('click', '#templateknowledge');
	casper.test.assertExists('#maketemplateknowledge', 'the element exists');	
	casper.test.assertExists('#makeknowledge', 'the element exists');	
	
});

casper.then(function() {
	this.test.comment('de -select the template knowledge tool');
	this.mouseEvent('click', '#templateknowledge');
	casper.test.assertNotVisible('#maketemplateknowledge', 'the element does notexists');	
	casper.test.assertExists('#makeknowledge', 'the element exists');	
	
});

casper.then(function() {
	this.test.comment('de -select the template knowledge tool');
	this.mouseEvent('click', '#knowledge');
	casper.test.assertNotVisible('#maketemplateknowledge', 'the element exists');	
	casper.test.assertNotVisible('#makeknowledge', 'the element exists');	
	
});

casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});