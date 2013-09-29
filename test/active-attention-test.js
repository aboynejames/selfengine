/*
* Active attention instant, only one active any time
*/
var baseUrl = casper.cli.get('baseUrl');
casper.echo(baseUrl);

casper.test.comment("Scenario: on start one active attention self instant and flow through to chart");

casper.start(baseUrl, function() {
	this.test.comment('start by activating class objects');
});

casper.then(function() {	
	this.test.comment('start by activating class objects');
	liveData = {};
	this.evaluate(function() {
		var liveLogic = new selfLogic();
		var livepouch = new pouchdbSettings();
		var liveprediction = new selfprediction();
		var liveData = new livedata(livepouch, liveprediction);

		//return document;
	});
//this.echo(liveData);
		//this.wait(2000, function() {
       // this.echo("I've waited for a second.");
		//});
//require('utils').dump(liveData);
//this.getGlobal('liveData');
//require('utils').dump(this.getGlobal('liveData'));
});

casper.then(function() {
	this.test.comment('active drag drop self attention instant section');
//	casper.test.assertExists('#attentionfix', 'the element exists');
		
});

casper.then(function() {
	this.test.comment('always should be on active element in the active self drop zone');
	this.activeattention = this.getElementsAttribute('.fixgroup').length;
	//casper.test.assert((this.activeattention > 1), "at least one active attention context set");
	
});

casper.then(function() {
	this.test.comment('a past and future chart should be displayed from the start');
	casper.test.assertExists('#pastchart', 'the element exists');
	casper.test.assertExists('#futurechart', 'the element exists');
	
});


casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});