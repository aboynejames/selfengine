/*
* online signin to store data advance settings
*/
var baseUrl = casper.cli.get('baseUrl');

casper.test.comment("Scenario: sign in to sync data back and forth between local pi cloud");

casper.start(baseUrl, function() {

});

casper.then(function() {
	this.test.comment('a sigin button exists');
	casper.test.assertExists('#signin', 'the element exists');
	
});

casper.then(function() {
	this.test.comment('signin form elements');
	casper.test.assertExists('#signinflow', 'the element exists');
	casper.test.assertExists('form.signin_form', 'the element exists');
	casper.test.assertExists('#emailin', 'the element exists');
	casper.test.assertExists('#passwordin', 'the element exists');
	casper.test.assertExists('#signinbutton', 'the element exists');	
	casper.test.assertExists('#datastatus', 'the element exists');	
	casper.test.assertExists('#signincloser', 'the element exists');	
	
});

casper.then(function() {
	this.test.comment('signin form elements are hidden');
	casper.test.assertVisible('#signinflow', 'the section is visable');	
	casper.test.assertNotVisible('#emailin', 'the section is not visable');	
	casper.test.assertNotVisible('#passwordin', 'the section is not visable');	
	casper.test.assertNotVisible('#signinbutton', 'the section is not visable');	
	casper.test.assertNotVisible('#datastatus', 'the section is not visable');	
	casper.test.assertNotVisible('#signincloser', 'the section is not visable');
	
});

casper.then(function() {
	this.test.comment('click on make signin link');
	this.mouseEvent('click', '#signin');
	
});

casper.then(function() {
	this.test.comment('signin form elements are visable');
	casper.test.assertVisible('#signinflow', 'the section is not visable');		
	casper.test.assertVisible('#emailin', 'the section is visable');	
	casper.test.assertVisible('#passwordin', 'the section is visable');	
	casper.test.assertVisible('#signinbutton', 'the section is visable');	
	
});

// now fill in the form
casper.then(function() {		
	
    this.fill('form#signinform',
		{
			email: "james@aboynejames.co.uk",
			password: "ivytree22"
			}, false);

//this.echo(this.getFormValues('form#signinform').email); // 'aboynejames'
		this.test.assert("james@aboynejames.co.uk" === this.getFormValues('form#signinform').email, 'the value as expected');
		
});

casper.then(function() {
	this.test.comment('submit sign form button');
	this.mouseEvent('click', '#signinbutton');
	
});

casper.then(function() {
	this.test.comment('mock the response reply when positive from remote server');
	this.evaluate(function() {
		$("#signinlink").hide();
		$("form.signin_form").hide();
		$("#signincloser").show();
		$("#datamessage").html("a data status update message");						

	});	
	
});

casper.then(function() {
	this.test.comment('message about training data status, some new to view?');
	casper.test.assertVisible('#datastatus', 'the section is visable');	
	casper.test.assertNotVisible('#signinlink', 'the section is not visable');
	casper.test.assertVisible('#signincloser', 'the section is visable');
	
});

casper.then(function() {
	this.test.comment('click on the signout button');
	this.mouseEvent('click', '#signincloser');
	
});

casper.then(function() {
	this.test.comment('mock the response to sign out by user');
	this.evaluate(function() {
		$("#signinlink").show();
		$("#datastatus").hide();
		$("#datamessage").html("");
		$("#signincloser").hide();
	});	
	
});

casper.then(function() {
	this.test.comment('return to the original signin link');
	casper.test.assertNotVisible('#datastatus', 'the section is not visable');	
	casper.test.assertVisible('#signinlink', 'the section is visable');
	casper.test.assertNotVisible('#signincloser', 'the section is not visable');
//this.echo(this.getHTML());
});

casper.run(function() {
// need for exporting xml xunit/junit style
  this.test.done();
	//this.exit(); 
});