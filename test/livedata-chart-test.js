/*
* live data flow area, chart, stream, make, infographics etc  visualisation
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: Viewing of a past and future chart");

casper.start(baseUrl, function() {
	this.test.comment('check placement div for past and future canvas chart');
	casper.test.assertExists('#pastchart', 'the element exists');
	casper.test.assertExists('#futurechart', 'the element exists');

});

casper.then(function() {
	this.test.comment('the flotr2 canvas class is present');
	casper.test.assertExists('.flotr-canvas', 'the element exists');
	
	this.noofchartslive = this.getElementsAttribute('.flotr-canvas').length;
this.echo(this.noofchartslive);
console.log(this.noofchartslive + 'number');
	casper.test.assertEquals(this.noofchartslive, "2", "the number of charts is correct");
	
});


casper.run(function() {
    this.test.done(); // I must be called once all the async stuff has been executed

});