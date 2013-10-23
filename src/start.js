/**
*  jQuery listen for clicks and interaction	
* 
*/	
$(document).ready(function(){

	liveLogic = new selfLogic();
	$("form.signin_form").hide();
	$("#signincloser").hide();

	// make dragable UI part sortable
	$( "#dragselfnow" ).sortable({
	connectWith: ".connectedSortable"
	}).disableSelection();

		$("a").click(function(e) {
			e.preventDefault(e);			
			liveLogic.frameworklogic(this);
		});
		
		$("button").click(function(e) {
			e.preventDefault(e);			
			idform = $(this).attr("id");
console.log(idform);			
			switch(idform){
				
				case"signinbutton":
				// collect signin email and password
				var emailin = $("#signinform.signin_form ul li input#emailin").val();
				var passwordin = $("#signinform.signin_form ul li input#passwordin").val();
				var cookieidhash = 123123123;
				
        // Wrap up the POST/get request execution.
        var makePUTRequest = function(){

            // Make the PUT request.
            $.ajax({
                type: "GET",
                url: "http://www.mepath.co.uk:8833/signinmepath/" + emailin + '/' + cookieidhash + '/' + passwordin,
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

		// Execute the PUT request.
		makePUTRequest();
				
				break;
				
				
			}
		});		

	$("#livedata").click(function(e) {
		e.preventDefault(e);
		var attentionfocusin = $(e.target);
		var attentionfixall = {};
		// first time live attention set at start
		// need to see what context attention action e.g. select new group element or switch on comparison
		var attentionclick = attentionfocusin.parent().attr('class');
		
		switch(attentionclick){

			case "twoattention":
			// is the click for alsoactive or unactive
			var secondactive = attentionfocusin.attr('id');
			if(secondactive == "alsoactive")
			{
				// collect the comparison attention fix of elements
				var secondfix = attentionfocusin.parent().attr('id');
				attentionfixall.knowledgewords = [secondfix];
								
				$("#previousattention li#" + secondfix + ".twoattention a#alsoactive").text("on");
				$("#previousattention li#" + secondfix + ".twoattention a#alsoactive").attr('id', "unactive");
				attentionfixall.status = "compare";	
				attentionfixall.statusactive = "on";	
				liveData.setContext(attentionfixall);
			}
			else if (secondactive == "unactive")
			{			
				var secondfix = attentionfocusin.parent().attr('id');						
				$("#previousattention li#" + secondfix + ".twoattention a#unactive").text("off");
				$("#previousattention li#" + secondfix + ".twoattention a#unactive").attr('id', "alsoactive");
				// need to remove the second data element
					attentionfixall.status = "compare";	
					attentionfixall.statusactive = "off";	
					liveData.setContext(attentionfixall);
				
			}
			break;
			
			case "focuselement":

		var liveattentionclick = attentionfocusin.attr('id');
		// given active element click, show title and other options extract  attentiongroup and sub elements
		var changeattention = attentionfocusin.parent().attr('class');
		var groupactive = attentionfocusin.parent().parent().attr('id');
		var groupelementlist = attentionfocusin.parent().parent().children(); // easier just to look up form array relationhip data

		var activetitle = $("#" + groupactive + ".fixgroup").data("attentionfixttitle");
		// click to view other group element or to close open grouplist
			if(activetitle == 'active')
			{
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
				
			}


		});
				
	livepouch = new pouchdbSettings();
	liveprediction = new selfprediction();
	liveData = new livedata(livepouch, liveprediction);
});