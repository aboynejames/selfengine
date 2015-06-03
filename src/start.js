/**
*  jQuery listen for clicks and interaction	
* 
*/	
$(document).ready(function(){

	liveSettings = {};
	liveSettings.cloudIP = "http://localhost:8881"; //"http://192.168.1.44:8881";  // change to Server address node server
	liveSettings.localIP = "http://localhost:8881";  //"http://192.168.1.44:8881";	// change to local IP e.g. a raspberry pi
	liveSettings.localURL = "http://localhost/ll/selfengine/src/index.html";	// change to hosted URL
	liveLogic = new selfLogic();
	
	var qs = $.param.querystring();
	var qsobject = $.deparam(qs, true);

	if(qsobject.token)
	{
		//liveLogic.secondDatacall();
		// return leg of authorisation, keep 
		liveLogic.setToken(qsobject.swimmer, qsobject.token);
		// now ask for list of swimmers and display them

		$("#welcome").remove();
		$("#identity").css('display', 'inline-block');
		$("#network").css('display', 'inline-block');
		$("#tools").css('display', 'inline-block');
		
		liveLogic.firstDatacall();
		liveLogic.secondDatacall();
		liveLogic.knowledgeDatacall();
		
	}
	else
	{
		// only allow public data.
	}

	$("form.signin_form").hide();
	$("#signincloser").hide();

	// make dragable UI part sortable
	$( "#dragselfnow" ).sortable({
	connectWith: ".connectedSortable"
	}).disableSelection();

	$("a,#testswimmers").click(function(e) {
		e.preventDefault(e);			
		liveLogic.frameworklogic(this);
	});
	
	$("button").click(function(e) {
		e.preventDefault(e);			
		idform = $(this).attr("id");		
		switch(idform){
			
			case"signinbutton":
				// collect signin email and password
				var emailin = $("#signinform.signin_form ul li input#emailin").val();
				var passwordin = $("#signinform.signin_form ul li input#passwordin").val();
				var cookieidhash = 123123123;
				
				liveLogic.emailsignincall(emailin, cookieidhash, passwordin);
			
			break;
			
			case"stopwatch-id-save":
				// stopwatch id save
				var stopwatchidin = $("#stopwatch-form input#stopwatch-id").val();		
				// need TODO valide it is a string of number		 		
				var buildsavestopw = {};
				buildsavestopw.sensorid = stopwatchidin;	
				buildsavestopw.sensortype = 'smart-stopwatch';			
				liveLogic.swimdataCloud(buildsavestopw);

			break;	
					
			case"wearablebtsave":
				// bluetooth tag ID number  
				var databtigin = $("#wearable-form input#bluetoothtag").val();		
				// need TODO valide it is a string of numbers
				var buildsavebt = {};
				buildsavebt.sensorid = databtigin;
				buildsavebt.sensortype = 'bluetooth-tag';						
				liveLogic.swimdataCloud(buildsavebt);

			
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
		var attentionidlive = attentionfocusin.attr('id');	
/*
		switch(attentionclick){
			
			case "twoattention":
			
				var secondfix = '';
				// is the click for alsoactive or unactive
				var secondactive = attentionfocusin.attr('id');
				if(secondactive == "alsoactive")
				{
					// collect the comparison attention fix of elements
					secondfix = attentionfocusin.parent().attr('id');
					attentionfixall.knowledgewords = [secondfix];
									
					$("#previousattention li#" + secondfix + ".twoattention a#alsoactive").text("on");
					$("#previousattention li#" + secondfix + ".twoattention a#alsoactive").attr('id', "unactive");
					attentionfixall.status = "compare";	
					attentionfixall.statusactive = "on";	
					liveData.setContext(attentionfixall);
				}
				else if (secondactive == "unactive")
				{			
					secondfix = attentionfocusin.parent().attr('id');						
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
		
*/			
		if(attentionidlive == 'maketraining' )
		{
	
			window.open("http://www.opensportproject.com", "_blank");
		}
		else if(attentionidlive == 'toolsstart' )
		{	
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
		}

	});	

	$("#makerecordtime").click(function(e) {
		
		e.preventDefault(e);
		var attentionfocusin = $(e.target);	
		var attentionfixall = {};
		// first time live attention set at start
		// need to see what context attention action e.g. select new group element or switch on comparison
		var attentionclick = attentionfocusin.parent().attr('class');
		var attentionclicktime = attentionfocusin.attr('id');
			
		switch(attentionclick){
			
			case "twoattention":
			
				var secondfix = '';
				// is the click for alsoactive or unactive
				var secondactive = attentionfocusin.attr('id');
				if(secondactive == "alsoactive")
				{
					// collect the comparison attention fix of elements
					secondfix = attentionfocusin.parent().attr('id');
					attentionfixall.knowledgewords = [secondfix];
									
					$("#previousattention li#" + secondfix + ".twoattention a#alsoactive").text("on");
					$("#previousattention li#" + secondfix + ".twoattention a#alsoactive").attr('id', "unactive");
					attentionfixall.status = "compare";	
					attentionfixall.statusactive = "on";	
					liveData.setContext(attentionfixall);
				}
				else if (secondactive == "unactive")
				{			
					secondfix = attentionfocusin.parent().attr('id');						
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
					//$("#" + groupactive + ".fixgrouptitle").hide();
					// now need to remove list but keep the one active element
					$("#" + groupactive + ".active-sub li.focuselement").hide();
					var ainttostring = liveattentionclick.toString();
					
					$(".focuselement a#" + ainttostring).removeClass("selectedoff");
					$(".focuselement a#" + ainttostring).addClass("selected");
					$("#" + groupactive + ".active-sub li#" + liveattentionclick + ".focuselement").show();

					if(groupactive == "Distance")
					{
						// the current selected focus element needs set to selectedoff
						var groupoptions = {};
						groupoptions = Object.create(dataModel.returnKnowledgerelationship(groupactive));  
						// remove the first n for number ids
						var removefirstn = liveattentionclick.substring(1);
				
						// remove the active element and  make all other option de-selected
						var groupindex = groupoptions.indexOf(removefirstn);
						groupoptions.splice(groupindex, 1)
						groupoptions.forEach(function(deselectw) {	
							
							$(".focuselement a#n" + deselectw).removeClass("selected");
							$(".focuselement a#n" + deselectw).addClass("selectedoff");
						});
					}
					else
					{
						
						// the current selected focus element needs set to selectedoff
						var groupoptions = {};
						groupoptions = Object.create(dataModel.returnKnowledgerelationship(groupactive));  					
						// remove the active element and  make all other option de-selected
						var groupindex = groupoptions.indexOf(liveattentionclick);
						groupoptions.splice(groupindex, 1)

						groupoptions.forEach(function(deselectw) {	

							$(".focuselement a#" + deselectw).removeClass("selected");
							$(".focuselement a#" + deselectw).addClass("selectedoff");

						});						
					}
				}
				else if (changeattention == 'focuselement')
				{
					// is the element selected the same or changed
					//$("#" + groupactive + ".fixgrouptitle").show();
					$("#" + groupactive + ".active-sub li.focuselement").show();
					$("#" + groupactive + ".active-sub .selectedoff").show();
					// set group as being active
					$("#" + groupactive + ".fixgroup").data("attentionfixttitle", 'active');
				}
			break;

		}	
		

		if(attentionclicktime == "recordtimesave" )
		{
			//case "hourholder":
			var timefeedback = '';
			var recordtimein = {};
			var recordholder = {};	
			recordholder['lifedata'] = {};
			recordholder['tooltemplate'] = "Individualrecord-template"; //"Worldrecord-template"; 
			recordtimein['networkidentity'] = liveLogic.idname;				
			recordtimein.knowledgewords = {};
			var whatsselected = '';				
			// knowledge context of swim
			var gettherecordcontext = dataModel.knowledgeRelationship.individualrecord;

			// now get values for each list box   #attentionfix li#Sex.fixgroup ul#Sex.active-sub
			gettherecordcontext.forEach(function(listdropname){
				// need to iterate over the options and find which one is selected.
				var optiontofindselected = $("#attentionfix li#" + listdropname + ".fixgroup ul#" + listdropname + ".active-sub").children().children();
				var numberkoptions = optiontofindselected.length;
				
				for(var i=0;i<numberkoptions;i++)
				{					
					if($(optiontofindselected[i]).attr('class') == "selected")
					{					
						// selected options
						whatsselected = $(optiontofindselected[i]).attr('id');//$("#attentionfix li#" + listdropname + ".fixgroup ul#" + listdropname + 						
						//recordtimein.knowledgewords[listdropname] = whatsselected;
						if(listdropname == "Distance")
						{
							recordtimein.knowledgewords[listdropname] = whatsselected.substring(1);
						}
						else
						{
							recordtimein.knowledgewords[listdropname] = whatsselected;
						}					
					}
				}
				
			});		
			
			// validate the caldendar date
			var racedate = $("#datepicker").datepicker( "getDate" );
			if(!racedate)
			{
				// no date selected prompt to select
				timefeedback += 'Please select a date ';
			}
			else
			{
				var passdate = 1;	
			}
			var racedatemilliseconds = Date.parse(racedate);
			recordtimein.date = racedatemilliseconds;	
			// need to validte date has been selected
			
				/*
				* Validation of time inputs   form#newrecordtime ul.timeparts li input#hourholder
				*/
				var hourin = $("form#newrecordtime ul.timeparts li input#hourholder").val();	
				var minutein = $("form#newrecordtime ul.timeparts li input#minuteholder").val();
				var secondsin = $("form#newrecordtime ul.timeparts li input#secondsholder").val();
				var hundredthsin = $("form#newrecordtime ul.timeparts li input#hundredthsholder").val();
				// check two digit and the entries are numbers
				var hourinpass = viewTemplates.validateInteger(hourin);			
				var minutein = viewTemplates.validateInteger(minutein);	
				var secondsin = viewTemplates.validateInteger(secondsin);							
				var hundredthsin = viewTemplates.validateInteger(hundredthsin);	
				
				// if length greater two or value not between 00 and 59
				if(hourinpass >= 0 && hourinpass <100)
				{
					var passhour = 1;						
				}
				else
				{
					timefeedback += '<b>Hour</b> value 0 and 99 ';
					
				}
				if(minutein >= 0 && minutein <60)
				{
					var passminute = 1;							
				}
				else
				{
					timefeedback += '<b>minute</b> value 0 and 59 ';							
				}						
				if(secondsin >= 0 && secondsin <60)
				{
					var passseconds = 1;
				}
				else
				{
					timefeedback += '<b>seconds</b> value 0 and 59 ';							
				}
				if(hundredthsin >= 0 && hundredthsin <100)
				{
					var passhundredths = 1;							
				}
				else
				{
					timefeedback += '<b>Hundredths</b> value 0 and 99 ';
					
				}
				
			$("#timeformfeedback").html(timefeedback);	
					
			if(passhour == 1 &&  passminute == 1 && passseconds == 1 && passhundredths  == 1 && passdate == 1)
			{			
				recordtimein.time = viewTemplates.digitalTime(hourin, minutein, secondsin, hundredthsin);
				recordtimein.splittimes = []; // empty for now. promt or get from other video split tools
				// make post call
				recordholder['lifedata'] = recordtimein;			
				liveLogic.swimdataCloud(recordholder);
				passhour = passminute = passseconds = passhundredths = 0;
				hourin = minutein = secondsin = hundredthsin = 0;
				$("form#newrecordtime ul.timeparts li input#hourholder").val('');
				$("form#newrecordtime ul.timeparts li input#minuteholder").val('');
				$("form#newrecordtime ul.timeparts li input#secondsholder").val('');
				$("form#newrecordtime ul.timeparts li input#hundredthsholder").val('');
				
				// set the competition time and knowledge in the DOM
				dataModel.setCompetitiondata(recordholder['lifedata'].date, recordholder['lifedata'].time);								
				dataModel.setCompetitionKnowledge(recordholder['lifedata'].date, recordholder['lifedata'].knowledgewords);
			}	
						
		}
		else if (attentionclicktime == "fullcomparison" )
		{
			// setup model comparison
			$( "#comparison-modal" ).dialog({
				height: 700,
				width:940,
				modal: true,
				close: function( event, ui ) {
					// add back placer
					$(".ui-dialog").remove();
					
					}
				 
			});
		}
		else if(attentionclicktime == "merecords-start")
		{
			// prepare record data
			dataModel.merecords();
		
			$( "#record-modal" ).dialog({
				height: 700,
				width:940,
				modal: true,
				close: function( event, ui ) {
					// add back placer
					$(".ui-dialog").remove();
					}
			});
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
			
			// local pouchsave
			//livepouch.singleSave(savenetworkid);
			// cloud save couchdb
			liveLogic.swimdataCloud(savenetworkid);
			
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
			
			// validation of time and time format
			
			// save in context of tool knowledge template name
			var savedatatool = {};
			savedatatool.tooltemplate = 'Worldrecord-template';
			savedatatool.lifedata = recordtimein;		
			// save to the pouchdb or couchdb if cloud is open
			//livepouch.singleSave(savedatatool);	
			

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

		
	$("#activeself").click(function(e) {
		e.preventDefault(e);			
		var historyin = $(e.target);			
		var attentionidlive = historyin.data('date-id');
		var classclickedin = historyin.attr('class');
		var divclickedin = historyin.attr('id');
		var contextin = {};
		var d1chart = {};
		contextin.live = {};	
		contextin.live.knowledgewords = {};	
		contextin.live.knowledgewords[0] = 'training';
		var dataelements = 1;
		var accumdataSet = {};
		var statisticsummarydata = {};
		var container = '';
		// set state in memory and URL string and set	TODO
			
		// what filters  (take into account historical state for UI/client)
		// data source, memory, local or cloud
		// identity
		// time
		// knowledge
			
		// what visualisation
		// pick up context and visualisation option act realtime
		if(divclickedin == "historyfix" || divclickedin == "activity" || classclickedin == "feedback-fix" || classclickedin == "timefocus" || classclickedin == "visualisation-flow" )
		{
			var activefixstatus = $(".activity-id-" + attentionidlive).data("activity-status-id")
			if(activefixstatus ==  "on")
			{
				// add placer html markup			
				viewTemplates.analysisPlacer(attentionidlive);

				container = "chart-vis-" + attentionidlive;
				d1chart[0] = dataModel.timeDataprep(attentionidlive);
				d1chart[1] =  dataModel.splitDataprep(attentionidlive);
				dataModel.onelementchart(d1chart, contextin, container, dataelements);			
				$(".activity-id-" + attentionidlive).data('activity-status-id', "off");

				// produce summary table starts
				statisticsummarydata = dataModel.statisticsDataprep(attentionidlive);
				statisticscolorcode = dataModel.splitColorCode(d1chart[1]);		
				var statisticsvisualisation = "#analysis-statistics-" + attentionidlive;
				viewTemplates.summaryStatisticsbox(statisticsvisualisation, d1chart, statisticsummarydata, statisticscolorcode);		
			}
			else
			{
				// turn off the expanded view
				$(".activity-id-" + attentionidlive).data('activity-status-id', "on");
				$("#anlaysisid-" + attentionidlive).empty();
				$("#chart-modal").empty();
				
			}
		}
		else if (classclickedin== "exit-anaylsis")
		{
			
			$("#anlaysisid-" + attentionidlive).empty();
			$("#chart-modal").empty();
		}
		else if (classclickedin == "action-fix")
		{
			// future prediction (LMS statistics and other self organisation and simulations (project goal)
			$("#future-modal").dialog({
				height: 700,
				width:940,
				modal: true,
				close: function( event, ui ) {
					// add back placer
					$(".ui-dialog").remove();
					$("#future-modal").empty();
				}			
			});
		}
		else if (classclickedin== "cummulative-anaylsis")
		{
			//produce accumulated chart ( first check if other daily train element exist then prepare data and chart)
			accumdataSet = dataModel.accumulationDataprep(attentionidlive);
			//container = "accum-chart-vis-" +attentionidlive;
			container = "chart-modal";		
			// add to modol code
			//$( "#accumulative-modal" ).html('<div id="' + container + '" class="accum-chart-flow" ></div>');
			dataModel.onelementchart(accumdataSet, contextin, container, dataelements);
			
			$("#chart-modal").dialog({
				height: 700,
				width:940,
				modal: true,
				close: function( event, ui ) {
					// add back placer
					$(".ui-dialog").remove();
					$("#chart-modal").empty();
				}
				 
			});			

		}		
		else if (classclickedin== "splitsratio-anaylsis")
		{
			//produce accumulated chart ( first check if other daily train element exist then prepare data and chart)
			//accumdataSet = dataModel.accumulationDataprep();
			container = "splits-ratio-vis-" +attentionidlive;
			//container = "splitsratio-modal";
			// add to modol code
			$( "#splitsratio-modal" ).html('<div id="' + container + '" class="split-ratio-flow" ></div>');
			
			$("#splitsratio-modal").dialog({
				height: 600,
				width:800,
				modal: true,
				close: function( event, ui ) {
					// add back placer
					$(".ui-dialog").remove();
					$("#splitsratio-modal").empty();
				}
			});			

		}
		
	});	
		
	livepouch = new pouchdbSettings();
	liveprediction = new selfprediction();
	liveData = new livedata();
	dataModel = new datamodel();
	viewTemplates = new viewtemplates();
	
		// connect to socket.io
	var socketpi = io.connect(liveSettings.localIP );
	
	/*
	* stopwatchwatch listening socket
	*/
	// when you get a serialdata event, do this:
	socketpi.on('stopwatchEvent', function (data) {
		
		serialin = JSON.parse(data.value);
		inser = Object.keys(serialin);
		inser.forEach(function(thein) {
		textaction = thein;
		timein = serialin[thein];

	});

		if(data.value == 1)
		{
			// call the split function
		
		}
		else if(textaction == 'lap')
		{
			
		}

		else if(textaction == "Start")
		{
			
		}
		else if (textaction == 'Reset')
		{
			
		}

	});
	
	socketpi.counterlive = 0;
	socketpi.previsousessionid = '';
	/*
	* listening of context Display Data
	*/
	socketpi.on('contextEventdisplay', function (contextdata) {

		var livedisplayin = '';
		var dataelements = '';
		var container = '';
		var statisticsvisualisation = '';
		
		if(socketpi.counterlive > 0)
		{		
			// display the live feed
			livedisplayin = viewTemplates.formswimmers(contextdata.swimmerid, contextdata.swimmername, contextdata.session);
			// previous attention fix live analysis closed down
			$("#anlaysisid-" + socketpi.previsousessionid).empty();
			socketpi.previsousessionid = contextdata.session.sessionid;
			
			// add the split data to data class
			dataModel.setDatain(contextdata.session.sessionid, contextdata.session.splittimes);								
			dataModel.setKnowledgein(contextdata.session.sessionid, contextdata.session.swiminfo);
						
			$("#liveattention").prepend(livedisplayin);
			d1chart = {};
			contextin = {};
			contextin.live = {};	
			contextin.live.knowledgewords = {};	
			contextin.live.knowledgewords[0] = 'training tesst title';	
			dataelements = 1;
				
			viewTemplates.analysisPlacer(contextdata.session.sessionid);

			container = "chart-vis-" + contextdata.session.sessionid;
			d1chart[0] = dataModel.timeDataprep(contextdata.session.sessionid);
			d1chart[1] =  dataModel.splitDataprep(contextdata.session.sessionid);
			dataModel.onelementchart(d1chart, contextin, container, dataelements);

			// produce summary table starts
			statisticsummarydata = dataModel.statisticsDataprep(contextdata.session.sessionid);
			statisticscolorcode = dataModel.splitColorCode(d1chart[1]);
			statisticsvisualisation = "#analysis-statistics-" + contextdata.session.sessionid;
			viewTemplates.summaryStatisticsbox(statisticsvisualisation, d1chart, statisticsummarydata, statisticscolorcode);	
		
			socketpi.counterlive++;	
		}
		else
		{
			socketpi.counterlive = 1;
			socketpi.previsousessionid = contextdata.session.sessionid;
			$("#welcome").remove();
	
			// display the live feed
			livedisplayin = viewTemplates.formswimmers(contextdata.swimmerid, contextdata.swimmername, contextdata.session);

			// add the split data to data class
			dataModel.setDatain(contextdata.session.sessionid, contextdata.session.splittimes);								
			dataModel.setKnowledgein(contextdata.session.sessionid, contextdata.session.swiminfo);
			
			$("#liveattention").prepend(livedisplayin);
			d1chart = {};
			contextin = {};
			contextin.live = {};	
			contextin.live.knowledgewords = {};	
			contextin.live.knowledgewords[0] = 'training tesst title';	
			dataelements = 1;
				
			viewTemplates.analysisPlacer(contextdata.session.sessionid);

			container = "chart-vis-" + contextdata.session.sessionid;
			d1chart[0] = dataModel.timeDataprep(contextdata.session.sessionid);
			d1chart[1] =  dataModel.splitDataprep(contextdata.session.sessionid);
			dataModel.onelementchart(d1chart, contextin, container, dataelements);

			// produce summary table starts
			statisticsummarydata = dataModel.statisticsDataprep(contextdata.session.sessionid);
			statisticscolorcode = dataModel.splitColorCode(d1chart[1]);
			statisticsvisualisation = "#analysis-statistics-" + contextdata.session.sessionid;
			viewTemplates.summaryStatisticsbox(statisticsvisualisation, d1chart, statisticsummarydata, statisticscolorcode);	
			
		}
	});

	
	
});