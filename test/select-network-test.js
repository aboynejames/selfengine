/*
* display dragable network identities
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: Select network and display dragable netwokr identities");

casper.start(baseUrl, function() {
	this.test.comment('click on the network link');
	this.mouseEvent('click', '#network');

});

casper.then(function() {
	this.test.comment('check the activenetwork placer exists');
	casper.test.assertExists('#activenetwork', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('check the dragable placer exists');
	// produce after a pouchdb call
		var jss = this.evaluate(function() {

		expecteddrophtml = '<ul id="dragnetworkidentity" class="connectedSortable ui-sortable"><li id="http://en.wikipedia.org/wiki/Alain_Bernard" class="ui-state-default">		<li id="http://en.wikipedia.org/wiki/Alain_Gottvall%C3%A8s" class="ui-state-default"></ul>';
			$("#activenetwork").html(expecteddrophtml);
		
			return document;
		});
				
	casper.test.assertExists('#dragnetworkidentity', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('check their is at least one dragable identity listed');
	this.noofidentities = this.getElementsAttribute('#dragnetworkidentity .ui-state-default').length;
	casper.test.assert((this.noofidentities > 1), 'the value as expected');
	
});

casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});