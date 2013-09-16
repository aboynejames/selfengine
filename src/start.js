/**
*  jQuery listen for clicks and interaction	
* 
*/	
$(document).ready(function(){

	liveLogic = new selfLogic();
	// live attention data (Chart)
	var container = "pastchart";	
	var d1 = [];
	
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
console.log(networkidjson);					
				livepouch.singleSave(savenetworkid);
//livepouch.allDocs();
				// empty the form fields	
				$("#networkidentity").val("");
				$("#identitylink").val("");
					

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
livepouch.allDocs();
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

				var gettherecordcontext = 	$("#buildrecordtimetemplate.connectedSortable select#Worldrecord option");

				var knowledgeelements  = Object.keys(gettherecordcontext);
				knowledgelength = gettherecordcontext.length;
					
					for (var i=0;i<knowledgelength;i++)
				{

					knowlegeelementsin[i] = $(gettherecordcontext[i]).val();	
				};	

				// now get values for each list box
				knowlegeelementsin.forEach(function(listdropname){
					recordtimein.knowledgewords[listdropname] = $("#buildrecordtimetemplate.connectedSortable select#" + listdropname).val()
				});
			
				recordtimein.networkidentity = $("#buildrecordtimeidentity.connectedSortable li").attr("id");
				recordtimein.date = Date.parse($( "#newrecordtime input#datepicker" ).datepicker( "getDate" ));
				recordtimein.time = parseInt($("form#newrecordtime input#time").val());
				// save to the pouchdb
					// push to d1 data object and save to Pouchdb
					d1.push([recordtimein.date, recordtimein.time]);
				//sort so the time ie first element of each array element is in time order
				d1.sort(function(a,b){return a+b});
				//livepouch.singleSave(recordtimein);			
				
						(function basic(container, d1) {
console.log('past chard draw called');
console.log(d1);
						// Draw Graph
							graph = Flotr.draw(container, [
		
					{
						data: d1,
						label: 'World Records 100m Freestyle men',
						lines: {
            show: true
						},
						points: {
							show: true
						}
					}],
					{
								xaxis: {
										//majorTickFreq: 1
									mode: 'time',
									timeUnit:'millisecond',
									timeformat: "%m/%d/%y",
									labelsAngle: 45
								},
								grid: {
										//minorVerticalLines: true
								},
								yaxis: {
									min: 0
								},
								title: 'Recorded Times'
						});
						
//console.log(graph);		
		
	})(document.getElementById(container), d1);
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
				relationshipin.knowledgeword = relationshipfirst;
				relationshipin.knowledgelist = relationshiplist;	
				livepouch.singleSave(relationshipin);
console.log(relationshipin);				
				
			}


		});
		

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
//console.log(liveattentiondata);
	
	
	livepouch = new pouchdbSettings();
	// goal  X and Y axis
	// X axis this case world records, data world record set
	// Y axis time recorded for world record
	// context  each point is a persons name  implied social network is context
	//example data structure
livepouch.allDocs();
	
	// setup map to pouchdb
function localDatacall(callback) {  
				livepouch.mapQueryLIVE(callback);
			}  
      
			localDatacall(function(rtmap) {  
//console.log(rtmap);						
				rtmap.rows.forEach(function(rowliveat){
//console.log(rowliveat.key)
					d1.push([rowliveat.key, rowliveat.value]);
					
				});
//console.log('data before chart');				
//console.log(d1);				
					//var d1 = [[0, 3],[4, 8],[8, 5],[9, 13] ];
			//d1 =[[-1391040000000, 11232], [ -979977200000, 9000], [179977200000, 8022]];
						(function basic(container, d1) {
//console.log('past chard draw called');
//console.log(d1);
						// Draw Graph
							graph = Flotr.draw(container, [
		
					{
						data: d1,
						label: 'World Records 100m Freestyle men',
						lines: {
            show: true
						},
						points: {
							show: true
						}
					}],
					{
								xaxis: {
										//majorTickFreq: 1
									mode: 'time',
									timeUnit:'millisecond',
									timeformat: "%m/%d/%y",
									labelsAngle: 45
								},
								grid: {
										//minorVerticalLines: true
								},
								yaxis: {
									min: 0
								},
								title: 'Recorded Times'
						});
						
//console.log(graph);		
		
	})(document.getElementById(container), d1);
				
			});	
	


		var fcontainer = "futurechart";	
	var f1 = [[0, 3],[4, 8],[8, 5],[9, 13] ];

(function basic_candle(container) {

    var
    d1 = [],
        price = 3.206,
        graph, i, a, b, c;

    for (i = 0; i < 50; i++) {
        a = Math.random();
        b = Math.random();
        c = (Math.random() * (a + b)) - b;
        d1.push([i, price, price + a, price - b, price + c]);
        price = price + c;
    }

    // Graph
    graph = Flotr.draw(container, [d1], {
        candles: {
            show: true,
            candleWidth: 0.6
        },
        xaxis: {
            noTicks: 10
        },
				title: 'Predicted Times'
			});
		})(document.getElementById(fcontainer));
		

		
});