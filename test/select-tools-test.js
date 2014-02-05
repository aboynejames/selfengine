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
	this.test.comment('click on the recordtime tool link');
	casper.test.assertExists('#recordtime');
		this.mouseEvent('click', '#recordtime');
		
});

casper.then(function() {
	this.test.comment('click on the swim record link');
	casper.test.assertExists('#makerecordtime', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('click on the recordtime tool again to switch off');
		this.mouseEvent('click', '#recordtime');
		
});

casper.then(function() {
	this.test.comment('check recordtime status back to active');
			this.toolsstatus = this.getElementAttribute('#recordtime', 'data-recordtimestatus');
//console.log(this.commid);
	casper.test.assertEquals(this.toolsstatus, "active", "tools status is correct");
	
});

casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});