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

	idclick = $(intentionin).attr("id");

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
			// make active network dragable- query pouch display
			function localDatacall(callback) {  
				livepouch.mapQueryname(callback);
			}  
      
			localDatacall(function(rtmap) {  

				dragHTMLnetworkid = '';
				dragHTMLnetworkid += '<ul id="dragnetworkidentity" class="connectedSortable">';
		
				rtmap.rows.forEach(function(rowsnetwid){
					//pass the lane data to get html ready
					dragHTMLnetworkid += '<li class="ui-state-default" data-networkidentity="networkidentity" id="' + rowsnetwid.key + '" ><a href="' + rowsnetwid.value + '" >' + rowsnetwid.key + '</a></li>';
					
				});
				
				dragHTMLnetworkid += '</ul>';
				$("#activenetwork").html(dragHTMLnetworkid);
					$( "#dragnetworkidentity" ).sortable({
					connectWith: ".connectedSortable"
					}).disableSelection();
			});
			
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
			recordtimetemplatecontext += '<a href="" id="recordtimeme" >me</a> <a href="" id="recordtimeclub" >club</a> <a href="" id="recordtimeworld" >world</a>';
			
			$("#toolsactive").append('<section id="makerecordtime" >' + recordtimetemplatecontext + '</section>');

			// given recordtime context produce a necessary forms (ready for use)
			//me code
			recordtimetemplate += '<form id="newrecordtime" action="#" method="post">';
			// look up knowledge relationshiop words for :
			recordtimetemplate += '<ul id="buildrecordtimetemplate" class="connectedSortable">';
			//LOOP through lists query Pouchdb
			function localDatacall(callback) {  
				livepouch.mapQueryknowledgelist(callback);
			}  

			localDatacall(function(rtmap) { 
console.log(rtmap.rows[0].key);				
				rtmap.rows.forEach(function(rowkwid){
	console.log(rowkwid);
				recordtimetemplate += '<label><li class="ui-state-default" id="' + rowkwid.key + '" data-knowledgeword="' + rowkwid.key +'" ><a href="">' + rowkwid.key + '</a></li></label>';
				knowledgecontext = rowkwid.key;	
					// form drop down options foreach 
console.log(rowkwid.value)
					
													
						recordtimetemplate +=  '<select id="' + rowkwid.key + '" class="rightselect" >';

						rowkwid.value.knowledgelist.forEach(function(klist){
console.log(klist);							
								recordtimetemplate +=  '<option value="' + klist + '">' + klist + '</option>';
							
						});
						
						recordtimetemplate += '</select>';

			});	

		recordtimetemplate += '</ul>';
	
		recordtimetemplate += '<div><label for="date">Date</label> <input type="text" id="datepicker" /></div>';
		recordtimetemplate += '<div><label for="time">Time</label><input type="text" size="20"  value="" class="text ui-widget-content ui-corner-all" id="time" name="time" ></div>';
		recordtimetemplate += '<button type="submit" class="submit" id="recordtimesave" >Save</button></form>';
		
		$("#makerecordtime").append(recordtimetemplate);			
		});
			

			
			$( "#buildrecordtimetemplate" ).sortable({
				connectWith: ".connectedSortable"
			}).disableSelection();
			
			// datepicker 
			$( "#datepicker" ).datepicker({
			changeMonth: true,
			changeYear: true
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
			function localDatacall(callback) {  
				livepouch.mapQueryknowledge(callback);
			}  
      
			localDatacall(function(rtmap) {  

				dragHTMLknowledgeid = '';
				dragHTMLknowledgeid += '<ul id="dragknowledgeword" class="connectedSortable">';
		
				rtmap.rows.forEach(function(rowkwid){
					//pass the lane data to get html ready
					dragHTMLknowledgeid += '<li class="ui-state-default" data-knowledgeword="knowledgeword" id="' + rowkwid.key + '" ><a href="' + rowkwid.value + '" >' + rowkwid.key + '</a></li>';
					
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
			
	
		
	}		


		
};

