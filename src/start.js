/**
*  jQuery listen for clicks and interaction	
* 
*/	
$(document).ready(function(){

	liveSettings = {};
	liveSettings.cloudIP = "http://localhost:8881"; //"http://192.168.1.44:8881";
	liveSettings.localIP = "http://localhost:8881";  //"http://192.168.1.44:8881";	
	liveLogic = new selfLogic();
		

	
//console.log($(location).attr('search'));
	var qs = $.param.querystring();
	var qsobject = $.deparam(qs, true);
//console.log(qs);	
//console.log(qsobject);
//console.log(qsobject.token);
	
	if(qsobject.token)
	{
		//liveLogic.secondDatacall();
		// return leg of authorisation, keep 
		liveLogic.setToken(qsobject.swimmer, qsobject.token);
		// now ask for list of swimmers and display them
		var makeSwimmerRequest = function(){

            // Make the PUT request.
            $.ajax({
                type: "GET",
                url: liveSettings.cloudIP  + "/swimmers/token/" + liveLogic.tokenid,
                contentType: "application/json",
                dataType: "text",
						
						success: function( swimmersback ){
//console.log('success back froms swimmers');
//console.log(swimmersback);
							//$("#testswimmers").html(swimmersback);
							$("#welcome").remove();
							liveLogic.firstDatacall();
							liveLogic.secondDatacall();
							

						},
						error: function( error ){
					// Log any error.
//console.log( "ERROR:", error );
						},
						complete: function(){

						}
			});

		};

		makeSwimmerRequest();



		
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
				
				// Wrap up the POST/get request execution.
				var makePUTRequest = function(){

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
		
	$("#activeself").click(function(e) {
		e.preventDefault(e);			
		var historyin = $(e.target);	
//console.log(historyin);	
//console.log(historyin.data('date-id'));
//console.log(historyin.attr('class'));
//console.log(historyin.attr('id'));			
		var attentionidlive = historyin.data('date-id');
		var classclickedin = historyin.attr('class');
		var divclickedin = historyin.attr('id');
		var contextin = {};
		var d1chart = {};
		contextin.live = {};	
		contextin.live.knowledgewords = {};	
		contextin.live.knowledgewords[0] = 'training tesst title';
		var dataelements = 1;
		var accumdataSet = {};
		var statisticsummarydata = {};
		var container = '';
		// set state in memory and URL string and set	
			
		// what filters  (take into account historical state for UI/client)
		// data source, memory, local or cloud
		// identity
		// time
		// knowledge
			
		// what visualisation
		// pick up context and visualisation option act realtime
		if(divclickedin == "historyfix" || divclickedin == "activity")
		{
			// add placer html markup			
			viewTemplates.analysisPlacer(attentionidlive);

			container = "chart-vis-" + attentionidlive;
			d1chart[0] = dataModel.timeDataprep(attentionidlive);
			d1chart[1] =  dataModel.splitDataprep(attentionidlive);
			dataModel.onelementchart(d1chart, contextin, container, dataelements);

			// produce summary table starts
			statisticsummarydata = dataModel.statisticsDataprep(attentionidlive);
			statisticscolorcode = dataModel.splitColorCode(d1chart[1]);		
			var statisticsvisualisation = "#analysis-statistics-" + attentionidlive;
			viewTemplates.summaryStatisticsbox(statisticsvisualisation, d1chart, statisticsummarydata, statisticscolorcode);		
		
		}
		else if (classclickedin== "exit-anaylsis")
		{
//console.log('exit anaysys mode');			
			$("#anlaysisid-" + attentionidlive).empty();
		}
		else if (classclickedin== "cummulative-anaylsis")
		{
//console.log('cummulative chart modal');	
			
			//produce accumulated chart ( first check if other daily train element exist then prepare data and chart)
			accumdataSet = dataModel.accumulationDataprep(attentionidlive);
			//container = "accum-chart-vis-" +attentionidlive;
			container = "chart-modal";		
			// add to modol code
			//$( "#accumulative-modal" ).html('<div id="' + container + '" class="accum-chart-flow" ></div>');
			dataModel.onelementchart(accumdataSet, contextin, container, dataelements);
			
			$( "#chart-modal" ).dialog({
				height: 700,
				width:940,
				modal: true,
				close: function( event, ui ) {
					// add back placer
					$(".ui-dialog").remove();
					
					}
				 
			});			

		}		
		else if (classclickedin== "splitsratio-anaylsis")
		{
//console.log('splits ration modal');	
			
			//produce accumulated chart ( first check if other daily train element exist then prepare data and chart)
			//accumdataSet = dataModel.accumulationDataprep();
			container = "splits-ratio-vis-" +attentionidlive;
			//container = "splitsratio-modal";
			// add to modol code
			$( "#splitsratio-modal" ).html('<div id="' + container + '" class="split-ratio-flow" ></div>');
			
			$( "#splitsratio-modal" ).dialog({
				height: 600,
				width:800,
				modal: true
			});			

		}
		
	});	
		
				
	livepouch = new pouchdbSettings();
	liveprediction = new selfprediction();
	//liveData = new livedata(livepouch, liveprediction);
	dataModel = new datamodel();
	viewTemplates = new viewtemplates();
	
		// connect to socket.io
	var socketpi = io.connect(liveSettings.localIP );
	
		
	/*
	* stopwatchwatch listening socket
	*/
	// when you get a serialdata event, do this:
	socketpi.on('stopwatchEvent', function (data) {
//console.log(data);	
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