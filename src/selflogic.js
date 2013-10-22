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
};

/**
* Take in clicks/input intentions
* @method frameworklogic		
*
*/	
selfLogic.prototype.frameworklogic = function(intentionin) {
console.log($(intentionin).data("attentionfocus"));
	idclick = $(intentionin).attr("id");
//console.log(idclick);
	attentionchange = $(intentionin).data("attentionfocus");
	if(attentionchange == "focuschange")
	{
console.log('change of focus clicked');		
		// show title and other options to select
$("#attentionfix li.fixgroup ul.active-sub li a#Female").removeClass("selectedoff");
	}
	
	switch(idclick){

	case "identity": 
	// make live section
	var idstatus = $("#identity").data("mestatus");
//console.log(datesetstatus + 'status');	
		if(idstatus == "on")
		{
			$("#contextflow").show();
			$("#identity").css('background', '#009900');
			$("#identity").data("mestatus", "off");
		}
		else
		{
			$("#contextflow").hide();
			$("#identity").css('background', '#ffffff');
			$("#identity").data("mestatus", "on");
		}	
	
	break;

	case "network": 
	// make live section
	var networkstatus = $("#network").data("networkstatus");
//console.log(datesetstatus + 'status');	
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
//console.log(datesetstatus + 'status');	
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
//console.log(datesetstatus + 'status');	
		if(recordtimestatus == "active")
		{
			// get recordtime HTML tool code
			recordtimetemplate = '';
			recordtimetemplatecontext = '';
			knowledgeoptions = '';
			// have three default input tabs me club world
			recordtimetemplatecontext += '<a href="" id="recordtimeme" >me</a> <a href="" id="recordtimeclub" >club</a> <a href="" id="Worldrecord" >world</a>';
			
			$("#toolsactive").append('<section id="makerecordtime" >' + recordtimetemplatecontext + '</section>');

			// given recordtime context produce a necessary forms (ready for use)
			//me code
			recordtimetemplate += '<form id="newrecordtime" action="#" method="post">';
			
			// place for identity drop
			recordtimetemplate += '<ul id="buildrecordtimeidentity" class="connectedSortable ui-sortable"></ul>';
			
			recordtimetemplate += '<ul id="buildrecordtimetemplate" class="connectedSortable">';
			
			//LOOP through lists query Pouchdb
			function localDatacallB(callback) {  
				livepouch.mapQueryknowledgelist(callback);
			}  

			localDatacallB(function(rtmap) { 
	console.log(rtmap);
				rtmap.rows.forEach(function(rowkwid){
			
				iddstrnospace = rowkwid.key.replace(/\s+/g, '');
				
				recordtimetemplate += '<label><li class="ui-state-default" id="' + iddstrnospace + '" data-knowledgeword="' + rowkwid.key +'" ><a href="">' + rowkwid.key + '</a></li></label>';
				knowledgecontext = rowkwid.key;	
					// form drop down options foreach 
					strnospace = rowkwid.key.replace(/\s+/g, '');
				
						recordtimetemplate +=  '<select id="' + strnospace + '" class="rightselect" >';

						rowkwid.value.forEach(function(klist){

							strnospace = klist.replace(/\s+/g, '');
								recordtimetemplate +=  '<option value="' + strnospace + '">' + klist + '</option>';
							
						});
			
						recordtimetemplate += '</select>';

			});	

		recordtimetemplate += '</ul>';
	
		recordtimetemplate += '<div><label for="date">Date</label> <input type="text" id="datepicker" /></div>';
		recordtimetemplate += '<div><label for="time">Time</label><input type="text" size="20"  value="" class="text ui-widget-content ui-corner-all" id="time" name="time" ></div>';
		recordtimetemplate += '<button type="submit" class="submit" id="recordtimesave" >Save</button></form>';
	
		$("#makerecordtime").append(recordtimetemplate);		
			// datepicker 
			$( "#datepicker" ).datepicker({
			changeMonth: true,
			changeYear: true
			});			
			
			$( "#buildrecordtimeidentity" ).sortable({
				connectWith: ".connectedSortable"
			}).disableSelection();
			
		});

			$("#recordtime").data("recordtimestatus", "inactive");

		}
		else
		{
			$("#makerecordtime").remove();
			$("#recordtime").data("recordtimestatus", "active");

		}	
	
	break;		
		
	case "addnetwork": 
	// add an identity to a social nework
	var addnetworkstatus = $("#addnetwork").data("addnetworkstatus");
//console.log(addnetworkstatus + 'status');	
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
//console.log(addnetworkstatus + 'status');	
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
		//console.log(startrelationshipstatus + 'status');	
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
				
			var syncmessage = '<a  href=""><img  id="syncicon" alt="sync in progress" src="images/sync.png" ></a>';
			$("#synctime").html(syncmessage);
		
			PouchDB.replicate('http://www.mepath.co.uk:5984/testselfbackup/', 'selfengine', function(err, response) {
//console.log(response);
console.log('sync is complete');				
				$("#synctime").html('finished');	
				location.reload(); 				
			});

		break;
			
		case "signin":
			
			$("form.signin_form").show();
			
			
		break;
	
		
	}		


		
};

