/*
* Active and historical attention comparisions
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: allow the selection of two active attention focus");

casper.start(baseUrl, function() {
	this.test.comment('make sure historical attention section is present');
	casper.test.assertExists('#attentionhistory', 'the element exists');

});

casper.then(function() {
	this.test.comment('add a new active attention focus, the previous joins the history list');
	
	this.evaluate(function() {
		var $select = $('#activeself select#Sex option');
    var _option = "Female";
    $select.val(_option);
		$select.change();
   
	});
});

casper.then(function() {
	this.test.comment('add a new active attention focus, the previous joins the history list');
	this.activeattentionhistory = this.getElementsAttribute('#attentionhistory ul li').length;
	casper.test.assert((this.activeattentionhistory == 1), "number of element correct");
	
});

casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});