/*
* Active attention instant, only one active any time
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: on start one active attention self instant and flow through to chart");

casper.start(baseUrl, function() {
	this.test.comment('active drag drop self attention instant section');
	casper.test.assertExists('#dragselfnow', 'the element exists');

});

casper.then(function() {
	this.test.comment('always shuld be on active element in the active self drop zone');
	this.activeattention = this.getElementsAttribute('#dragselfnow').length;
	casper.test.assert(this.activeattention > 1, "at least one active attention context set");
	
});

casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});