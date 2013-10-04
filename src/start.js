/**
*  jQuery listen for clicks and interaction	
* 
*/	
$(document).ready(function(){
//PouchDB.destroy('selfengine', function(err, info) { });

	liveLogic = new selfLogic();

	// make dragable UI part sortable
	$( "#dragselfnow" ).sortable({
	connectWith: ".connectedSortable"
	}).disableSelection();

		$("a").click(function(e) {
			e.preventDefault(e);			
			liveLogic.frameworklogic(this);
		});

	$("#livedata").click(function(e) {
		e.preventDefault(e);
//console.log('attention focus clicked');		
		var attentionfocusin = $(e.target);
		var attentionfixall = {};
		// first time live attention set at start
//console.log(attentionfocusin);	
		// need to see what context attention action e.g. select new group element or switch on comparison
		var attentionclick = attentionfocusin.parent().attr('class');
		
		switch(attentionclick){

			case "twoattention":
//console.log('change of comparison');
			// is the click for alsoactive or unactive
			var secondactive = attentionfocusin.attr('id');
			if(secondactive == "alsoactive")
			{
				// collect the comparison attention fix of elements
				var secondfix = attentionfocusin.parent().attr('id');
				attentionfixall.knowledgewords = [secondfix];
								
				$("#previousattention li#" + secondfix + ".twoattention a#alsoactive").text("on");
				$("#previousattention li#" + secondfix + ".twoattention a#alsoactive").attr('id', "unactive");
				
				// pass on the attentionfix set and check to see if a history element are also acitve ie chart two or more.
//console.log($("#previousattention").children().first().attr('id'));
//console.log($("#previousattention").children().first().children().attr('class'));
//				if($("#previousattention").children().first().children().attr('class') == 'compareitem')
		//		{
				//	var twocomparelive = $("#previousattention").children().first().attr('id');
					attentionfixall.status = "compare";	
					attentionfixall.statusactive = "on";	
					liveData.setContext(attentionfixall);
			}
			else if (secondactive == "unactive")
			{
//console.log('un select swtich off comparison');				
				var secondfix = attentionfocusin.parent().attr('id');
//console.log(secondfix);								
				$("#previousattention li#" + secondfix + ".twoattention a#unactive").text("off");
				$("#previousattention li#" + secondfix + ".twoattention a#unactive").attr('id', "alsoactive");
				// need to remove the second data element
					attentionfixall.status = "compare";	
					attentionfixall.statusactive = "off";	
					liveData.setContext(attentionfixall);
				
				
			}
			break;
			
			case "focuselement":
//console.log('select new focus context and change live data');

		var liveattentionclick = attentionfocusin.attr('id');
//console.log(liveattentionclick);
		// given active element click, show title and other options extract  attentiongroup and sub elements
		var changeattention = attentionfocusin.parent().attr('class');
		var groupactive = attentionfocusin.parent().parent().attr('id');
		var groupelementlist = attentionfocusin.parent().parent().children(); // easier just to look up form array relationhip data

		var activetitle = $("#" + groupactive + ".fixgroup").data("attentionfixttitle");
		// click to view other group element or to close open grouplist
			if(activetitle == 'active')
			{
	//console.log('the active is active');
			$("#" + groupactive + ".fixgroup").data("attentionfixttitle", 'inactive');
			$("#" + groupactive + ".fixgrouptitle").hide();
			// now need to remove list but keep the one active element
			$("#" + groupactive + ".active-sub li.focuselement").hide();
			$(".focuselement a#" + liveattentionclick).removeClass("selectedoff");
			$(".focuselement a#" + liveattentionclick).addClass("selected");
			$("#" + groupactive + ".active-sub li#" + liveattentionclick + ".focuselement").show();
			//next pass on new setting to datalive chartproduction
			attentionfixall.status = "fix";	
			attentionfixall.knowledgewords = [liveattentionclick];

				// go start the filtering and production of the data / charts
				liveData.setContext(attentionfixall);
						
			}
			else if (changeattention == 'focuselement')
			{
		//console.log('focus element clicked');		
				// is the element selected the same or changed
					$("#" + groupactive + ".fixgrouptitle").show();
					$("#" + groupactive + ".active-sub li.focuselement").show();
					$("#" + groupactive + ".active-sub .selectedoff").show();
					// set group as being active
					$("#" + groupactive + ".fixgroup").data("attentionfixttitle", 'active');
			}
			break;
			
		}
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
				var gettherecordcontext = ["Sex","Sport","Swimming_stroke","Distance","Measurement","Swimmingpool"];

				// now get values for each list box
				gettherecordcontext.forEach(function(listdropname){

					recordtimein.knowledgewords[listdropname] = $("#buildrecordtimetemplate.connectedSortable select#" + listdropname).val();
				});
			
				recordtimein.networkidentity = $("#buildrecordtimeidentity.connectedSortable li").attr("id");
				recordtimein.date = Date.parse($( "#newrecordtime input#datepicker" ).datepicker( "getDate" ));
				recordtimein.time = parseInt($("form#newrecordtime input#time").val(),10);
				// save in context of tool knowledge template name
				var savedatatool = {};
				savedatatool.tooltemplate = 'Worldrecord-template';
				savedatatool.lifedata = recordtimein;
//console.log(savedatatool);				
				// save to the pouchdb
					// push to d1 data object and save to Pouchdb
					d1record.push([recordtimein.date, recordtimein.time]);
				//sort so the time ie first element of each array element is in time order
				d1record.sort(function(a,b){return a+b;});
				livepouch.singleSave(savedatatool);		
				var container = "pastchart";
				liveattentiondata = '';
				liveData.chartproduction(d1record, liveattentiondata, container);				
	
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
	liveData = new livedata(livepouch, liveprediction);
//console.log(liveData);	
});