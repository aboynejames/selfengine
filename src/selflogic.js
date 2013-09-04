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
//console.log(intentionin);
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
		temporynetworkcode += '<div><label for="identity">Name</label><input type="text" size="16" class="text ui-widget-content ui-corner-all" id="networkidentity"></div>';
		temporynetworkcode += '<div><label for="identitylink">IDlink</label><input type="text" size="30"  value="" class="text ui-widget-content ui-corner-all" id="identitylink"></div>';
		temporynetworkcode += '</form>';
			
			$("#makenetwork").append('<section id="addmakenetwork" >' +  temporynetworkcode + '</section>');
			$("#addnetwork").data("addnetworkstatus", "inactive");

		}
		else
		{
			$("#makenetwork").empty();
			$("#addnetwork").data("addnetworkstatus", "active");

		}	
	
	break;			
	}

		
};

