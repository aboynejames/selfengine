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

casper.then(function() {
	this.test.comment('add network active area');
	casper.test.assertExists('#makenetwork', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('visualisation of network');
	casper.test.assertExists('#activenetwork', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('click on the add network link');
	this.mouseEvent('click', '#addnetwork');
	
});

casper.then(function() {
	this.test.comment('elements of adding an identity are present');
	casper.test.assertExists('#networkidentity', 'the element exists');
	casper.test.assertExists('#identitylink', 'the element exists');
	casper.test.assertExists('#networkidentitysave', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('fill in network identiry name, idlink and save');

    this.fill('form#newnetworkadd', {
			'networkidentity': 'Michael Phelps',
			'identitylink': 'http://en.wikipedia.org/wiki/Michael_Phelps'
			}, false);
//this.echo(this.getFormValues('form#newnetworkadd').networkidentity); // 'Michael Phelps'
		casper.test.assert('Michael Phelps' === this.getFormValues('form#newnetworkadd').networkidentity, 'the value as expected');
		casper.test.assert("http://en.wikipedia.org/wiki/Michael_Phelps" === this.getFormValues('form#newnetworkadd').identitylink, 'the value as expected');	

});

casper.then(function() {
	this.test.comment('now save the identity');
	this.mouseEvent('click', '#networkidentitysave');
	
});

casper.then(function() {
	this.test.comment('click on the add network link to turn off');
		this.mouseEvent('click', '#addnetwork');
		
});

casper.then(function() {
	this.test.comment('ensure the add network can be turned off');
			this.addnetworktoolsstatus = this.getElementAttribute('#addnetwork', 'data-addnetworkstatus');
//console.log(this.commid);
	casper.test.assertEquals(this.addnetworktoolsstatus, "active", "tools status is correct");
	
});

casper.run(function() {
//this.echo(this.getHTML());
    this.test.done(); // I must be called once all the async stuff has been executed

});