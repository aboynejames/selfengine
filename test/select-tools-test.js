/*
* select record time entry
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: Select record time entry and enter data");

casper.start(baseUrl, function() {
	this.test.comment('click on the tools link');
	this.mouseEvent('click', '#tools');

});

casper.then(function() {
	this.test.comment('both tools icons and active sections');
	casper.test.assertExists('#toolsicons', 'the element exists');
	casper.test.assertExists('#toolsactive', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('click on the swim record link');
	casper.test.assertExists('#recordtime');
		
});

casper.then(function() {
	this.test.comment('click on the swim record link');
	casper.test.assertExists('#recordtime', 'the element exists');
	
});


casper.run(function() {
this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});