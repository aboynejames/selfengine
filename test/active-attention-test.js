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
	this.activeattention = this.getElementsAttribute('#dragselfnow li').length;
	casper.test.assert((this.activeattention > 1), "at least one active attention context set");
	
});

casper.then(function() {
	this.test.comment('allow for selection of male or female');
	
	this.evaluate(function() {

		var $select = $('#activeself ul#dragselfnow.connectedSortable select#Sex.rightselect option');
    var _option = "Female";
    $select.val(_option);
   
	});
	
	this.activeattentionsex = this.getElementsAttribute('#activeself ul#dragselfnow.connectedSortable select#Sex.rightselect option').;
	casper.test.assertEquals(this.activeattentionsex, 'Female', 'the selection is correct');

});

casper.then(function() {
	this.test.comment('active area data has changed from male to female');
	this.activechartpast = this.getElementsAttribute('#pastchart .flotr-legend table tbody tr td.flotr-legend-label');
this.echo(this.activechartpast);	
	casper.test.assertSelectorHasText('#pastchart .flotr-legend table tbody tr td.flotr-legend-label', 'World Records 100m Freestyle Female');
});

casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});