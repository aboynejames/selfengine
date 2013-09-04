/*
* add new social network identity
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: add a person identity to socialnetwork graph");

casper.start(baseUrl, function() {
	this.test.comment('click on the network link');
	this.mouseEvent('click', '#network');

});

casper.then(function() {
	this.test.comment('add network link exists');
	casper.test.assertExists('#addnetwork', 'the element exists');
	
});



casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});