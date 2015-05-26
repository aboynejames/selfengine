/**
* SelfEngine
*
* Framework Logic controls
* @class selfLogic
*
* @package    LifestyleLinking part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var selfLogic = function() {
	this.status = 'default';
	this.tokenid = '';
	this.idname = '';
	this.knowledgetemplate = '';
	this.knowledgecontext = [];
};

/**
* sets filter knowledge template
* @method knowledgeTemplate	
*
*/	
selfLogic.prototype.knowledgeTemplate = function(ktemplateWord) {

	this.knowledgetemplate = ktemplateWord;
		
};

/**
* sets filter knowledge context
* @method knowledgeContext	
*
*/	
selfLogic.prototype.knowledgeContext = function(kcontextIn) {

	this.knowledgecontext = kcontextIn;
		
};
	
/**
* Take in clicks/input intentions
* @method frameworklogic		
*
*/	
selfLogic.prototype.frameworklogic = function(intentionin) {
	idclick = $(intentionin).attr("id");
	attentionchange = $(intentionin).data("attentionfocus");
	if(attentionchange == "focuschange")
	{
		// show title and other options to select
		$("#attentionfix li.fixgroup ul.active-sub li a#Female").removeClass("selectedoff");
	}

	switch(idclick){

	case "identity": 
	// make live section
	var idstatus = $("#identity").data("mestatus");
		if(idstatus == "on")
		{
			$("#contextflow").show();
			$("#wearables").show();
			$("#merecords").show();
			$("#worldrecords").show();
			$("#identity").css('background', '#009900');
			$("#identity").data("mestatus", "off");
		}
		else
		{
			$("#contextflow").hide();
			$("#wearables").hide();
			$("#merecords").hide();
			$("#worldrecords").hide();
			$("#identity").css('background', '#ffffff');
			$("#identity").data("mestatus", "on");
		}	
	
	break;

	case "network": 
	// make live section
	var networkstatus = $("#network").data("networkstatus");
		if(networkstatus == "on")
		{
			$("#networkflow").show();
			$("#network").css('background', '#009900');
			$("#network").data("networkstatus", "off");
			//reveal the network based the active attention fix
      
			
		}
		else
		{
			$("#networkflow").hide();
			$("#network").css('background', '#ffffff');
			$("#network").data("networkstatus", "on");
		}	
	
	break;
		
	case "tools": 
	// make live section
	var toolsstatus = $("#tools").data("toolsstatus");
		if(toolsstatus == "on")
		{
			$("#toolsflow").show();
			$("#tools").css('background', '#009900');
			$("#tools").data("toolsstatus", "off");
		}
		else
		{
			$("#toolsflow").hide();
			$("#tools").css('background', '#ffffff');
			$("#tools").data("toolsstatus", "on");
		}	
	
	break;
		
	case "recordtime": 
	// the recordtime tools has been select
	var recordtimestatus = $("#recordtime").data("recordtimestatus");
		if(recordtimestatus == "active")
		{
			var liveKnowledgeContext = dataModel.buildknowledgeFilter("Worldrecord");
			viewTemplates.knowledgeTimeIn(liveKnowledgeContext);
			// set the liveContext
			liveLogic.knowledgeContext(liveKnowledgeContext);
			liveLogic.knowledgeTemplate("Worldrecord");
			
			$("#recordtime").data("recordtimestatus", "inactive");
			$("#recordtime").css('background', '#009900');

		}
		else
		{
			$("#makerecordtime").empty();
			$("#recordtime").data("recordtimestatus", "active");
			$("#recordtime").css('background', '#ffffff');
		}	
			
			
	break;		
		
	case "addnetwork": 
	// add an identity to a social nework
	var addnetworkstatus = $("#addnetwork").data("addnetworkstatus");	
		if(addnetworkstatus == "active")
		{
			// get  HTML tool code
		temporynetworkcode = '';	
		temporynetworkcode = '<form id="newnetworkadd" action="#" method="post">';
		temporynetworkcode += '<div><label for="networkidentity">Name</label><input type="text" size="16" class="text ui-widget-content ui-corner-all" id="networkidentity" name="networkidentity"></div>';
		temporynetworkcode += '<div><label for="identitylink">IDlink</label><input type="text" size="30"  value="" class="text ui-widget-content ui-corner-all" id="identitylink" name="identitylink" ></div>';
		temporynetworkcode += '<button type="submit" class="submit" id="networkidentitysave" >Save</button></form>';
			
			$("#makenetwork").append('<section id="addmakenetwork" >' +  temporynetworkcode + '</section>');
			$("#addnetwork").data("addnetworkstatus", "inactive");

		}
		else
		{
			$("#makenetwork").remove();
			$("#addnetwork").data("addnetworkstatus", "active");

		}	
	
	break;

	case "knowledge": 
	// startup the knowledge tool
	//$("#toolsactive").append('<section id="makeknowledge"></section>');	
	var startknowledgestatus = $("#knowledge").data("knowledgestatus");
		if(startknowledgestatus == "active")
		{
			$("#makeknowledge").show();
			// get  HTML tool code
		temporynetknowledgecode = '';	
		temporynetknowledgecode = '<form id="makeknowledgeform" action="#" method="post">';
		temporynetknowledgecode += '<div><label for="knowledgeword">Word</label><input type="text" size="16" class="text ui-widget-content ui-corner-all" id="knowledgeword" name="knowledgeword"></div>';
		temporynetknowledgecode += '<div><label for="knowledgelink">Knowledge Link</label><input type="text" size="30"  value="" class="text ui-widget-content ui-corner-all" id="knowledgelink" name="knowledgelink" ></div>';
		temporynetknowledgecode += '<button type="submit" class="submit" id="knowledgesave" >Save</button></form>';
		temporynetknowledgecode += '<section id="knowledgelive"></section>';
			
			$("#makeknowledge").html(temporynetknowledgecode);
			$("#knowledge").data("knowledgestatus", "inactive");
			
			// make active existing knowledge dragable- query pouch display
			function localDatacallC(callback) {  
				livepouch.mapQueryknowledge(callback);
			}  
      
			localDatacallC(function(rtmap) {  

				dragHTMLknowledgeid = '';
				dragHTMLknowledgeid += '<ul id="dragknowledgeword" class="connectedSortable">';
		
				rtmap.rows.forEach(function(rowkwid){
					//pass the lane data to get html ready
					iddstrnospace = rowkwid.key.replace(/\s+/g, '');
					dragHTMLknowledgeid += '<li class="ui-state-default" data-knowledgeword="knowledgeword" id="' + iddstrnospace + '" ><a href="' + rowkwid.value + '" >' + rowkwid.key + '</a></li>';
					
				});
				
				dragHTMLknowledgeid += '</ul>';
				$("#knowledgelive").html(dragHTMLknowledgeid);
				
					$( "#dragknowledgeword" ).sortable({
					connectWith: ".connectedSortable"
					}).disableSelection();
			});			
			
		}
		else
		{
			$("#makeknowledge").hide();
			$("#knowledge").data("knowledgestatus", "active");

		}	
		break;
		
		case "relationshipknowledge": 
	// links relationships between knowledge words
		//$("#toolsactive").html('<section id="makerelationshipknowledge"></section>');
		var startrelationshipstatus = $("#relationshipknowledge").data("relationshipknowledgestatus");
		if(startrelationshipstatus == "active")
		{
			$("#makerelationshipknowledge").show();
			// get  HTML tool code
			temporyrelationshipcode = '';	
			temporyrelationshipcode = '<form id="templateknowledgeform" action="#" method="post">';
			temporyrelationshipcode += '<ul id="dragmakerelationshipknowledge" class="connectedSortable"></ul>';
			temporyrelationshipcode += '<ul id="listrelationshipknowledge" class="connectedSortable"></ul>';
			temporyrelationshipcode += '<button type="submit" class="submit" id="relationshipknowledgesave" >Save</button></form>';
			temporyrelationshipcode += '<section id="liverelationshipknowledge"></section>';
			
			$("#makerelationshipknowledge").html(temporyrelationshipcode);
			$( "#dragmakerelationshipknowledge, #listrelationshipknowledge" ).sortable({
				connectWith: ".connectedSortable"
			}).disableSelection();
			
			$("#relationshipknowledge").data("relationshipknowledgestatus", "inactive");
			
		}
		else
		{
			$("#makerelationshipknowledge").hide();
			$("#relationshipknowledge").data("relationshipknowledgestatus", "active");
						
		}
		break;

		case "sync":
	
		break;
			
		case "signin":
			$("form.signin_form").show();
		break;

		case "signout":
			$("#activeself").empty();
			window.open(liveSettings.localURL, "_self");


		case "signincloser":
			$("#signinlink").show();
			$("#datastatus").hide();
			$("#datamessage").html("");
			$("#signincloser").hide();
		break;
			
			case "twitterin":
			window.open(liveSettings.cloudIP+ "/auth/twitter", "_self");
				
			break;

			case "facebookin":
			window.open(liveSettings.cloudIP + "/auth/facebook", "_self");
				
			break;
			
			case "opensportproject":
			window.open("http://www.opensportproject.org", "_self");
			
			break;

			case "maketraining":
			window.open("http://www.opensportproject.com", "_blank");
			
			break;

			case "recordstopwatch":
			window.open("http://www.opensportproject.com", "_blank");
			
			break;

			case "recordvideo":
			window.open("http://www.opensportproject.org/real-time-video/", "_blank");
			
			break;
			
			case "merecords-start":
			
				// prepare record data
				dataModel.merecords();
			
			break;
				
			case "worldrecords-start":
			
				// prepare record data
				dataModel.worldrecords();
			
			break;				
			
			case "logout":

        var makeLogoutRequest = function(){

            // Make the PUT request.
            $.ajax({
                type: "GET",
                url: liveSettings.cloudIP  + "/logout",
                contentType: "application/json",
                dataType: "text",
						
						success: function( resultback ){

						},
						error: function( error ){
					// Log any error.
//console.log( "ERROR:", error );
						},
						complete: function(){

						}
			});

		};

			makeLogoutRequest();
			break;

	}		


		
};

/**
* Set token user for REST calls
* @method setToken		
*
*/	
selfLogic.prototype.setToken = function(setIDname, settokenin) {
//console.log('set token function' + settokenin);
	this.idname = setIDname;
	this.tokenid = settokenin;
	
};


/**
* Get first data from the cloud
* @method firstDatacall		
*
*/	
selfLogic.prototype.firstDatacall = function() {
		var formdataurl = liveSettings.cloudIP + '/swimdata/' + liveLogic.idname + '/token/' + liveLogic.tokenid;
            // Make the PUT request.
		$.ajax({
			type: "GET",
			url: formdataurl,
			contentType: "application/json",
			dataType: "text",
						
						success: function( swimmersback ){						
							// pass on markup and add data to live data model
							var serverdatain = JSON.parse(swimmersback);	

							// does this individual have data?  If not provide links enter data or sportsBOX
							if(serverdatain.swimdatalive ==  "empty")
							{
								$("#messages").append('<div id="startmessage" >No training data found. Collect training data with the <a href="" id="maketraining"  class="maketraining" >Training Builder & Stopwatch</a>.</div>');
								$("#messages").fadeOut(20000,  function() {});
							}
							else
							{
								// prepare attention flow header
								$("#activeself").append(serverdatain.attentionflow);
								var swimattentionin = Object.keys(serverdatain);
								swimattentionin.forEach(function(attel) {
								
									$("#previousattention").append(serverdatain[attel].attentionmarkup);
									// add the split data to data class
									dataModel.setDatain(attel, serverdatain[attel].splitdata);								
									dataModel.setKnowledgein(attel, serverdatain[attel].knowledgechain);

								});
								// set the active identity number
								$("#stopwatch-form input#stopwatch-id").val(serverdatain.idnumbers);
							}
						},
						error: function( error ){
					// Log any error.
//console.log( "ERROR:", error );
						},
						complete: function(){

						}
			});
			
};

/**
* Get second data from the cloud
* @method secondDatacall		
*
*/	
selfLogic.prototype.secondDatacall = function() {
		var formdataurlb = liveSettings.cloudIP + '/racedata/' + liveLogic.idname + '/token/' + liveLogic.tokenid;
			// Make the PUT request.
			$.ajax({
				type: "GET",
				url: formdataurlb,
				contentType: "application/json",
				dataType: "text",
							
				success: function(racesbackb){
					// pass on markup and add data to live data model
					var serverdatainb = JSON.parse(racesbackb);	
					// does this individual have data?  If not provide links enter data or sportsBOX
					if(serverdatainb.swimracedatalive ==  "empty")
					{
						$("#messages").append('<div id="startcompare" >Use the Record Time <a href="" id="toolsstart" >tool</a> to enter competition times.</div>');
						$("#messages").fadeOut(20000,  function() {});
					}
					else
					{
						var compswimattentionin = Object.keys(serverdatainb);
						compswimattentionin.forEach(function(attelc) {
					
							dataModel.setCompetitiondata(attelc, serverdatainb[attelc].time);
							dataModel.setsplitsCompetitiondata(attelc, serverdatainb[attelc].splittimes);
							dataModel.setCompetitionKnowledge(attelc, serverdatainb[attelc].compKnowledge);
						});
					}	
	
				},
							error: function( error ){
							// Log any error.
	//console.log( "ERROR:", error );
							},
							complete: function(){

							}
				});

		
};

/**
* Get first  knowledge data from the cloud
* @method knowledgeDatacall		
*
*/	
selfLogic.prototype.knowledgeDatacall = function() {
	
		var formdataurl = liveSettings.cloudIP + '/knowledgetemplate/' + liveLogic.idname + '/token/' + liveLogic.tokenid;
            // Make the PUT request.
		$.ajax({
			type: "GET",
			url: formdataurl,
			contentType: "application/json",
			dataType: "text",
						
						success: function( knowledgeback ){					
							// pass on markup and add data to live data model
							var serverdatain = JSON.parse(knowledgeback);	
							// does this individual have data?  If not provide links enter data or sportsBOX
							if(serverdatain.swimknowledgedatalive ==  "empty")
							{
								$("#messages").append('<div id="startknowledge" >No knowledge is available for that sport.</div>');
							}
							else
							{
								// prepare knowledge for client datamodel
								//var swimKattentionin = Object.keys(serverdatain);
								//serverdatain.forEach(function(Kword) {
									dataModel.setKnowledgeWord(serverdatain[0]);
									dataModel.setKnowledgeRelationship(serverdatain[1]);
									dataModel.setKnowledgeRecord(serverdatain[2]);
								//});
							}
						},
						error: function( error ){
					// Log any error.
//console.log( "ERROR:", error );
						},
						complete: function(){

						}
			});
			
};


/**
* make email signin check call
* @method emailsignin		
*
*/	
selfLogic.prototype.emailsignincall = function(emailin, cookiehash, passwordin) {

	// Make the PUT request.
	$.ajax({
		type: "GET",
		url: liveSettings.cloudIP + "/signinmepath/" + emailin + '/' + cookieidhash + '/' + passwordin,
		contentType: "application/json",
		dataType: "text",
		success: function( resultback ){

			var acceptdetails = JSON.parse(resultback);

			if(acceptdetails.signin == 'passed') {		
					//$.cookie("traintimer", cookieidhash,  { expires: 7 });
				$("#signinlink").hide();
				$("form.signin_form").hide();
				$("#signincloser").show();
				$("#datamessage").html("a data status update message");							
			}
			else
			{
				$("#datamessage").html('Signin Failed, please try again');
			}

		},
		error: function( error ){
		// Log any error.
//console.log( "ERROR:", error );
		},
		complete: function(){

		}
	});
	
};

/**
* save data back to cloud
* @method swimdataCloud		
*
*/	
selfLogic.prototype.swimdataCloud = function(cloudsave) {
	
	var cloudready = JSON.stringify(cloudsave);

	var formdataurl = liveSettings.cloudIP + '/swimdatasave/' + liveLogic.idname + '/token/' + liveLogic.tokenid;
    // Make the PUT request.
	$.ajax({
		type: "POST",
		url: formdataurl,
		contentType: "application/json",
		dataType: "text",
		data: cloudready,
					
			success: function( saveback ){						
				// pass on markup and add data to live data model
				var serverdatain = JSON.parse(saveback);		
				// does this individual have data?  If not provide links enter data or sportsBOX
				if(serverdatain.save ==  "passedrecord")
				{
					$("#timeformfeedback").html("<div>Record saved.</div>");//.fadeOut(1000);
					// empty the form
					//check type of save and prepare analysisi
					if(cloudsave.tooltemplate = "Individualrecord-template")
					{
						var quickanalysiscontext = '';
						// provide analysis feedback message
						// perform quick analysis
						liveData.quickanalysisControl(cloudsave);
						//var quickfeedbackanalysis = liveData.quickworldrecordAnalysis(quickanalysiscontext);
				
					}
				}
				else if(serverdatain.save ==  "passedbt")
				{
					//  need to make call for data again from cloud
					setTimeout(function() {liveLogic.firstDatacall()}, 1000);
					$("#startmessage").remove();
					$("#startcompare").remove();
					
				}
			},
			error: function( error ){
		// Log any error.
//console.log( "ERROR:", error );
			},
			complete: function(){

			}
	});
		
};
