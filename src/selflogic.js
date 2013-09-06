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
console.log(rtmap.rows);			
				rtmap.rows.forEach(function(rowsnetwid){
					//pass the lane data to get html ready
					dragHTMLnetworkid += '<li class="ui-state-default" id="' + rowsnetwid.value + '" ><a href="' + rowsnetwid.value + '" >' + rowsnetwid.key + '</a></li>';
					
				});
				
				dragHTMLnetworkid += '</ul>';
				$("#activenetwork").html(dragHTMLnetworkid);
							$( "#dragnetworkidentity" ).sortable({
					connectWith: ".connectedSortable"
					}).disableSelection();
			});

			
			
	/*		
			$("#activenetwork").append('<ul id="dragnetworkidentity" class="connectedSortable"><li class="ui-state-default">Item 1</li><li class="ui-state-default">Item 2</li><li class="ui-state-default">Item 3</li><li class="ui-state-default">Item 4</li><li class="ui-state-default">Item 5</li></ul>');
			*/

			
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
			// get recordtime HTML app code
			
			$("#toolsactive").append('<section id="makerecordtime" >redord type, Name, stroke, distance, time, pool</section>');
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
			$("#makenetwork").empty();
			$("#addnetwork").data("addnetworkstatus", "active");

		}	
	
	break;

	case "knowledge": 
	// startup the knowledge tool
	$("#toolsactive").html('<section id="makeknowledge"></section>');	
	var startknowledgestatus = $("#knowledge").data("knowledgestatus");
//console.log(addnetworkstatus + 'status');	
		if(startknowledgestatus == "active")
		{
			// get  HTML tool code
		temporynetknowledgecode = '';	
		temporynetknowledgecode = '<form id="makeknowledgeform" action="#" method="post">';
		temporynetknowledgecode += '<div><label for="knowledgeword">Word</label><input type="text" size="16" class="text ui-widget-content ui-corner-all" id="knowledgeword" name="knowledgeword"></div>';
		temporynetknowledgecode += '<div><label for="knowledgelink">Knowledge Link</label><input type="text" size="30"  value="" class="text ui-widget-content ui-corner-all" id="knowledgelink" name="knowledgelink" ></div>';
		temporynetknowledgecode += '<button type="submit" class="submit" id="knowledgesave" >Save</button></form>';
		temporynetknowledgecode += '<section id="knowledgelive"></section>';
			
			$("#makeknowledge").html(temporynetknowledgecode);
			$("#knowledge").data("knowledgestatus", "inactive");

		}
		else
		{
			$("#makeknowledge").empty();
			$("#knowledge").data("knowledgestatus", "active");

		}	
		
	}		


		
};

