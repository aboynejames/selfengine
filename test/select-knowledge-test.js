/*
* display back knowledge words in drag format
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: Select knowledge tools and view back list of words");

casper.start(baseUrl, function() {
	this.test.comment('click on tools and then the knowledge tool');
	this.mouseEvent('click', '#tools');
	this.mouseEvent('click', '#knowledge');

});

casper.then(function() {
	this.test.comment('make sure the knowledge tools area is present');
	casper.test.assertExists('#knowledgelive', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('check the dragable placer exists');
	// produce after a pouchdb call
		var jss = this.evaluate(function() {

		expectkeddrophtml = '<ul id="dragknowledgeword" class="connectedSortable ui-sortable"></ul>';
			$("#knowledgelive").html(expectkeddrophtml);
		
			return document;
		});
				
	casper.test.assertExists('#dragknowledgeword', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('check their is at least one dragable word is listed');
	this.nokwords = this.getElementsAttribute('#dragknowledgeword .ui-state-default').length;
	casper.test.assert((this.nokwords > 1), 'the value as expected');
	
});

casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});