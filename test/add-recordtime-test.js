/*
* Add a record time
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: enter a personal record time");

casper.start(baseUrl, function() {
	this.test.comment('click on the tools link');
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
	this.test.comment('ensure the components record form parts are are present');
	casper.test.assertExists('#attentionfix', 'the element exists');
	casper.test.assertExists('#record-date', 'the element exists');
	casper.test.assertExists('#record-time', 'the element exists');
	casper.test.assertExists('#recordtimesave', 'the element exists');
	casper.test.assertExists('#timeformfeedback', 'the element exists');

});
/*
casper.then(function() {
	this.test.comment('click on record world record template');
	this.mouseEvent('click', '#Worldrecord');
	
});

casper.then(function() {
	this.test.comment('ensure all the div placer for the World record time template are in place');
	// from pouchdb  cannot test for now
	//casper.test.assertExists('#buildrecordtimetemplate', 'the element exists');
	
	//casper.test.assertExists('#Word record', 'the element exists');	
	//casper.test.assertExists('#sex', 'the element exists');	
	//casper.test.assertExists('#distance', 'the element exists');	
	//casper.test.assertExists('#metre', 'the element exists');
	//casper.test.assertExists('#Swimming_stroke', 'the element exists');	
	//casper.test.assertExists('#newrecordtime', 'the element exists');
	//casper.test.assertExists('#datepicker', 'the element exists');
	//casper.test.assertExists('#Swimming pool', 'the element exists');	
});

casper.then(function() {
	this.test.comment('fillin a record, drag in knowlege and select date and input time (in milliseconds)');
		var jss = this.evaluate(function() {
			//$("#").val();
			//$("#").val();
			//$("#").val();
			//$("#").val();
			//$("#").val();		

			this.testdate = "10/10/2013"
			$( "input#datepicker.hasDatepicker" ).datepicker( "setDate", this.testdate);
			
			$("#time").val(12000);		
			return document;
		});
		
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
*/
casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});