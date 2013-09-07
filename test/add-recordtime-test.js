/*
* Add a record time
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: enter a world record time");

casper.start(baseUrl, function() {
	this.test.comment('click on the network link');
	this.mouseEvent('click', '#tools');

});

casper.then(function() {
	this.test.comment('record time tool link exists');
	casper.test.assertExists('#recordtime', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('click on the recordtime tool link');
	this.mouseEvent('click', '#recordtime');
	
});

casper.then(function() {
	this.test.comment('ensure the tools active area is present');
	casper.test.assertExists('#toolsactive', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('ensure all the div placer for the record time tool are in place');
	casper.test.assertExists('#makerecordtime', 'the element exists');
	casper.test.assertExists('#buildrecordtimetemplate', 'the element exists');	
	
});


casper.then(function() {
	this.test.comment('de select the recordtime tool');
		this.mouseEvent('click', '#recordtime');
		
});

casper.then(function() {
	this.test.comment('ensure the recordtime status is deactive ');
			this.recordtimestatus = this.getElementAttribute('#recordtime', 'data-recordtimestatus');
//console.log(this.commid);
	casper.test.assertEquals(this.recordtimestatus, "active", "tool status is correct");
	
});

casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});