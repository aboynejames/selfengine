/**
*  jQuery listen for clicks and interaction	
* 
*/	
$(document).ready(function(){
//PouchDB.destroy('selfengine', function(err, info) { });

	liveLogic = new selfLogic();
	
	// need to build live data based on active attention
	// first capture active attention
	var liveattentiondata = {};
	liveattentiondata.knowledgewords = {};	
	var liveattentionget = $("#activeself ul#dragselfnow.connectedSortable").children();	
	var liveattentionlength = liveattentionget.length;
	for (var i=0;i<liveattentionlength;i++)
	{
		liveattentiondata.knowledgewords[i] = liveattentionget[i].id;
	}
	liveattentiondata.knowledgewords = $("#activeself select#Sex").val();
console.log(liveattentiondata);

	// make dragable UI part sortable
	$( "#dragselfnow" ).sortable({
	connectWith: ".connectedSortable"
	}).disableSelection();

		$("a").click(function(e) {
			e.preventDefault(e);
			liveLogic.frameworklogic(this);
		});

		$("#networkflow").click(function(e) {
			e.preventDefault(e);
			var networkflowin = $(e.target);	
			// present to UI and save to Pouchdb, sync to cloud
			if(networkflowin.attr("id") == 'networkidentitysave')
			{
				var getnetworkidentity = $("#networkidentity").val();
				var getidentitylink = $("#identitylink").val();

				$('#activenetwork').append('<a href="' + getidentitylink + '" id="identitylive" >' + getnetworkidentity + '</a>');
				savenetworkid = {};
				savenetworkid.networkidentity = getnetworkidentity;
				savenetworkid.networkidentitylink = getidentitylink;
//console.log(savenetworkid);					

//livepouch.allDocs();
				// empty the form fields	
				$("#networkidentity").val("");
				$("#identitylink").val("");
					
				livepouch.singleSave(savenetworkid);
			}

		});
		
		$("#toolsflow").click(function(e) {
			e.preventDefault(e);
			var toolsflowin = $(e.target);	
			// present to UI and save to Pouchdb, sync to cloud
			if(toolsflowin.attr("id") == 'knowledgesave')
			{
				var getknowledgeword = $("#knowledgeword").val();
				var getknowledgelink = $("#knowledgelink").val();

				$('#knowledgelive').append('<a href="' + getknowledgelink + '" id="knowledgewordlive" >' + getknowledgeword + '</a>');
				savewordid = {};
				savewordid.knowledgeword = getknowledgeword;
				savewordid.knowledgelink = getknowledgelink;
//console.log(savewordid);					
				livepouch.singleSave(savewordid);

				// empty the form fields	
				$("#knowledgeword").val("");
				$("#knowledgelink").val("");
					
			}
			
			else if (toolsflowin.attr("id") == 'recordtimesave')
			{
				// prepare object ready for pouchdb saving
				var recordtimein = {};
				recordtimein.knowledgewords = {};
				knowlegeelementsin = [];	
				// get data elements from primary relationship TODO AUTO MATE CAPUTURE
				var gettherecordcontext = 	["Sex","Sport","Swimming_stroke","Distance","Measurement","Swimmingpool"];

				// now get values for each list box
				gettherecordcontext.forEach(function(listdropname){

					recordtimein.knowledgewords[listdropname] = $("#buildrecordtimetemplate.connectedSortable select#" + listdropname).val();
				});
			
				recordtimein.networkidentity = $("#buildrecordtimeidentity.connectedSortable li").attr("id");
				recordtimein.date = Date.parse($( "#newrecordtime input#datepicker" ).datepicker( "getDate" ));
				recordtimein.time = parseInt($("form#newrecordtime input#time").val());
				// save in context of tool knowledge template name
				var savedatatool = {};
				savedatatool.tooltemplate = 'Worldrecord-template';
				savedatatool.lifedata = recordtimein;
//console.log(savedatatool);				
				// save to the pouchdb
					// push to d1 data object and save to Pouchdb
					d1.push([recordtimein.date, recordtimein.time]);
				//sort so the time ie first element of each array element is in time order
				d1.sort(function(a,b){return a+b});
				livepouch.singleSave(savedatatool);		
				var container = "pastchart";
				liveattentiondata = '';
				liveData.chartproduction(d1, liveattentiondata, container);				
	
				$( "#newrecordtime input#datepicker" ).val('');
				$("form#newrecordtime input#time").val('');
			}
			
			else if (toolsflowin.attr("id") == 'relationshipknowledgesave')
			{
				var relationshiplist = [];
				var relationshipfirst = $("#dragmakerelationshipknowledge.connectedSortable li").attr("id");
				var relationshiplistget = $("#listrelationshipknowledge.connectedSortable ").children();
console.log(relationshiplistget);					
				var relationshiplistlength = relationshiplistget.length;
				for (var i=0;i<relationshiplistlength;i++)
				{
					relationshiplist[i] = relationshiplistget[i].id;
				}
			// save to Pouchdb - knowledge - bond - socialnetwork - 
				relationshipin = {};
				relationshipin.bond = 1;
				relationshipin.knowledgestart = relationshipfirst;
				relationshipin.knowledgelist = relationshiplist;	
				livepouch.singleSave(relationshipin);
//console.log(relationshipin);				
				
			}


		});
				
	livepouch = new pouchdbSettings();
	liveprediction = new selfprediction();	
	liveData = new livedata(livepouch, liveprediction, liveattentiondata);
	
		$("#activeself select#Sex").change(function () {
console.log('a sex selection has changed');
	// start of a new live data and chart production
		liveattentiondata.knowledgewords = $("#activeself select#Sex").val();
		liveData.livedatain(liveattentiondata);

	});
	
});