/*
* check the utiity basic function of pouchdb class are working
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Test all the pouchdb class utilty function, create, save, delete, query etc.");

casper.start(baseUrl, function() {
	this.test.comment('create a pouchdb');


});

casper.then(function() {
	this.test.comment('save a single document JSON to pouchdb');
	
});
	


casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});