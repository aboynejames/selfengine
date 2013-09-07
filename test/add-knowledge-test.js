/*
* Add new knowledge words
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: add a knowledge word linked to url, e.g. wikipedia page");

casper.start(baseUrl, function() {
	this.test.comment('click on the network link');
	this.mouseEvent('click', '#tools');

});

casper.then(function() {
	this.test.comment('add network link exists');
	casper.test.assertExists('#knowledge', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('click on the knowledge link');
	this.mouseEvent('click', '#knowledge');
	
});

casper.then(function() {
	this.test.comment('ensure the tools active area is present');
	casper.test.assertExists('#toolsactive', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('check all the div placer are in place for the knowlege tool');
	casper.test.assertExists('#makeknowledge', 'the element exists');
	casper.test.assertExists('#makeknowledgeform', 'the element exists');
	casper.test.assertExists('#knowledgeword', 'the element exists');
	casper.test.assertExists('#knowledgelink', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('');

    this.fill('form#makeknowledgeform', {
			'knowledgeword': 'Swimming',
			'knowledgelink': 'http://en.wikipedia.org/wiki/Swimming_%28sport%29'
			}, false);
//this.echo(this.getFormValues('form#newnetworkadd').networkidentity); // 'Michael Phelps'
		casper.test.assert('Swimming' === this.getFormValues('form#makeknowledgeform').knowledgeword, 'the value as expected');
		casper.test.assert("http://en.wikipedia.org/wiki/Swimming_%28sport%29" === this.getFormValues('form#makeknowledgeform').knowledgelink, 'the value as expected');	

});

casper.then(function() {
	this.test.comment('now save the knowledge world and link');
	this.mouseEvent('click', '#knowledgesave');
	
});

casper.then(function() {
	this.test.comment('display back the knowledge words saved');
	casper.test.assertExists('#knowledgelive', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('de select the knowledge tool');
		this.mouseEvent('click', '#knowledge');
		
});

casper.then(function() {
	this.test.comment('ensure the knowledge status is deactive ');
			this.knowledgestatus = this.getElementAttribute('#knowledge', 'data-knowledgestatus');
//console.log(this.commid);
	casper.test.assertEquals(this.knowledgestatus, "active", "tools status is correct");
	
});

casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});