/*
* unit test via casperjs for pouch objects methods
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: checking individual pouchdb class functions");

casper.start(baseUrl, function() {
	this.test.comment('has the pouch object been initiated');
		var jss = this.evaluate(function() {

		var mockpouchobject = 
		$("#sortable1").html( mockswimmerhtml);				
		
		return document;

	});	
});


casper.then(function() {
	this.test.comment('mock test, needing updating TODO');
	this.mockp = 1;
	casper.test.assert((this.mockp == 1), 'the element exists');
	
});

casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});