/**
* SelfEngine
*
* prediction analystics
* @class livedata
*
* @package    selfengine  open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var livedata = function() {
	//console.log('livedata started');	
	this.d1 = [];
	this.k1 = {};
	this.r1 = {};
	this.ni1 = {};
	this.datasort = [];
//livepouch.allDocs(this.liveprediction);
/*
	this.livecontext = {};
	this.livecontext.live = {};
	this.livecontext.previous = {};
		// need to gathe last loaded active attention fix and say last 4 history(make history scrollable)
	this.livecontext.live.knowledgewords = ['Female']; 
	this.livecontext.live.relationshipliststart = 'Worldrecord';
	this.livecontext.previous.statusactive = "off";

	this.previousattention = {};
	this.previousattention = this.livecontext;
		
	// need to build live data based on active attention
	// first capture active attention
	// need to display first sub item from each active focus attention,(should keep track of history of attention fixes)
	this.livedatain(this.d1, this.livecontext);
	this.liveknowledgein(this.k1, this.livecontext);
	this.liverelationshipsin(this.r1, this.livecontext);
	this.livennetworkidenityin(this.ni1, this.livecontext);	
*/		
};


/**
* Controls the logic for quick analysis, individual in context of worldrecord
* @method quickanalysisControl		
*
*/	
livedata.prototype.quickanalysisControl = function(contextIn) {  
console.log('set context quick analysisi control');
	// extract knowledge chain
	var knowledgequick = dataModel.buildRecordknowledgeFilter(contextIn.lifedata.knowledgewords);
console.log(knowledgequick);
	
	
	this.quickworldrecordAnalysis(knowledgequick, contextIn);
	
};


/**
* Performs quick analysis on world record times
* @method quickworldrecordAnalysis		
*
*/	
livedata.prototype.quickworldrecordAnalysis = function(wordrecordin, individualrecord) {  
console.log('set context');
console.log(wordrecordin);
console.log(individualrecord);	
	// take individual time and compare % to current world record
	var wordrecordtime = wordrecordin.time;
	var individualrecordtime = individualrecord.lifedata.time;
	var percentagerecord = ((individualrecordtime/wordrecordtime)*100) - 100;
//console.log('worldrecord percentage' + percentagerecord.toFixed(1));	
	var datarec = new Date(parseInt(wordrecordin.date));
	var datarecshort = datarec.toString();
	
	var quickstatement = '<div id="quickanalysis">Time is ' + percentagerecord.toFixed(1) + '%  Slower than the World Record holder <b>' + wordrecordin.identity + '</b> for that distance with a time of <b>' + viewTemplates.formatTime(wordrecordin.time) + '</b> Date: ' + datarecshort.substring(0,16) + '.';// <a href="" id="fullcomparison" >Full comparison</a>.</div>';
	
	quickstatement += '<section id="merecords" ><a href="" id="merecords-start" >View Records</a></section>';
	//	return quickstatement;
	$("#timeformfeedback").append(quickstatement);
	$("#quickanalysis section#merecords").show();
	
	
};

/**
* Performs analysis on world record times
* @method worldrecordAnalysis		
*
*/	
livedata.prototype.worldrecordAnalysis = function(pouchdblive, liveprediction) {  
//console.log('set context');
	this.livepouch = pouchdblive;
	this.liveprediction = liveprediction;
	
};
	
/**
* Sets the attention fix and co ordinates the filtering  and HTML display code paths
* @method setContext		
*
*/	
livedata.prototype.setContext = function(attentionin) {  
//console.log('set context');
//console.log(attentionin);
	// first check if data is from a compairson switchon or change of main active attention fix
	if(attentionin.status == "compare")
	{
		if(attentionin.statusactive == "on")
		{
//console.log('compare clicked on');		
		this.livecontext.previous = attentionin;
		this.livefilter(this.livecontext); 
		this.filternetwork(this.livecontext.live);
		}
		else
		{
//console.log('compare clicked off');		
		this.livecontext.previous =  attentionin;
		this.livefilter(this.livecontext); 
		this.filternetwork(this.livecontext.live);
			
		}
			
	}
	
	else if (attentionin.status == "fix") 
	{
//console.log('new fix set');		
		//first transper current settings to previous
		this.previousattention = this.livecontext;
		// append attention history  need to keep track of previous in class object
		this.attentionhistoryHTML(this.previousattention.live);	
		
		this.livecontext.live = attentionin;
				// now pass on context to filter data, filter socialnetwork
//console.log(this.livecontext);
	this.livefilter(this.livecontext); 
	this.filternetwork(this.livecontext.live);
			
	}
	
};

/**
* One stage serial control flow helper function
* @method localDatacall		
*
*/	
livedata.prototype.localDatacall = function(callback) {  

	this.livepouch.mapQueryLIVE(callback);

};  

/**
* Get all the relationship data
* @method knowledgeDatacall		
*
*/	
livedata.prototype.knowledgeDatacall = function(callback) {  
	
	this.livepouch.mapQueryknowledge(callback);

}; 

/**
* Get all the networkidentity data
* @method networkidentityDatacall		
*
*/	
livedata.prototype.networkidentityDatacall = function(callback) {  
	
	this.livepouch.mapQueryname(callback);

}; 

/**
* Get all the relationship data
* @method relationshipDatacall		
*
*/	
livedata.prototype.relationshipDatacall =	function(callback) {  
	
	this.livepouch.mapQueryknowledgelist(callback);

}; 

/**
* Sort low to high helper function
* @method sortlowtohigh		
*
*/	
livedata.prototype.sortlowtohigh =	function(datatsort) {  
//console.log('low to high sort');
		this.datasort = [];
		this.datasort = datatsort;
		this.datasort.sort(function(a,b) {return a[0] > b[0]?1:-1;});
	return this.datasort;
};  

/**
* Take in live data and prepare, filter, datamine ready for presentation
* @method livedatain		
*
*/	
livedata.prototype.livedatain = function(d1in, setlivecontext) {

	this.localDatacall(function(rtmap) {  

				rtmap.rows.forEach(function(rowliveat){

					d1in.push([rowliveat.key, rowliveat.value]);
					
				});
//console.log(d1in);				
			if(d1in.length > 2)
			{
				liveData.livefilterknowlegeword(d1in, setlivecontext.live);						
			}

			});
	return d1in;
};

/**
* Form object of all the knowledge words
* @method liveknowledgein		
*
*/	
livedata.prototype.liveknowledgein = function(k1in) {

	this.knowledgeDatacall(function(rtmap) {  
			//this.k1 = {};
		rtmap.rows.forEach(function(rowliveatk){

			k1in[rowliveatk.key] = rowliveatk.value;
			
		});
		return k1in;
	});

};

/**
* Form object of all the networkidentity words
* @method livennetworkidenityin		
*
*/	
livedata.prototype.livennetworkidenityin = function(ni1in) {
      
	this.networkidentityDatacall(function(rtmap) {  
		//this.ni1 = {};
		rtmap.rows.forEach(function(rowliveatni){

			ni1in[rowliveatni.key] = rowliveatni.value;
			
		});
		return ni1in;		
	});

};

/**
* Form object of all the relationship data
* @method liverelationshipsin
*
*/	
livedata.prototype.liverelationshipsin = function(r1in, livecontextin) {
      
	this.relationshipDatacall(function(rtmap) {  
		//this.r1 = {};
		rtmap.rows.forEach(function(rowliveatr){

			r1in[rowliveatr.key] = rowliveatr.value;
			
		});
//console.log(r1in);
		if(r1in)
		{
		liveData.relationshipfilter(r1in, livecontextin.live);
		}
	
		return r1in;
	});


};

/**
* Filter direct on the live data (in memory) post start use
* @method livefilterknowlegeword		
*
*/	
livedata.prototype.livefilterknowlegeword = function(datauniverse, setlivecontext) {
	var dataliveholder = {};
	var contextlivedata = [];
//console.log(datauniverse);	
// start now need to be extracted to context
	datauniverse.forEach(function(dataobj) {
//console.log(dataobj);
		if(dataobj[0].knowledgewords.Sex == setlivecontext.knowledgewords)
		{
		contextlivedata.push([parseInt(dataobj[0].date, 10), parseInt(dataobj[0].time, 10)]);
		}
	});

	sorteddata = this.sortlowtohigh(contextlivedata);
	// data sorted pass on to chart visualisation 
	dataliveholder[1] = sorteddata;
	this.startchart(dataliveholder);	
	
};


/**
* Filter direct on the live data (in memory) post start use
* @method livefilter		
*
*/	
livedata.prototype.livefilter = function(setlivecontext) {
//console.log('livefilter');
//console.log(setlivecontext);	
	// build decision modle  one active attention or more, ie one data source on chart of more?
	var focuscount = '';
	
	var dataholder = {};
		
		//check if second attention fix is on or off
		if(setlivecontext.previous.statusactive == "on")
		{
		// how many attention context to filter data on? 
			Object.size = function(obj) {
				var size = 0, key;
				for (key in obj) {
					if (obj.hasOwnProperty(key)) size++;
				}
				return size;
			};
			// Get the size of an object
			focuscount = Object.size(setlivecontext);
			
		}
		else
		{
			focuscount= 1;
		}


	
//console.log(focuscount);
	if(focuscount >1)
	{
		// collect the data foreach active focus
//console.log('two sets of data filter processing going on');		
		datainkeys = Object.keys(setlivecontext);
//console.log(datainkeys);		
		iin = 1;
		datainkeys.forEach(function(attobjecttype) {
//console.log(attobjecttype);			
					var contextlivedata = [];
			
					liveData.d1.forEach(function(dataobj) {
//console.log(dataobj);
						if(dataobj[0].knowledgewords.Sex == setlivecontext[attobjecttype].knowledgewords[0])
						{
							contextlivedata.push([parseInt(dataobj[0].date,10), parseInt(dataobj[0].time,10)]);
						}
					});
		//console.log(contextlivedata);
					sorteddata = liveData.sortlowtohigh(contextlivedata);
					dataholder[iin] = sorteddata;
					iin++;
		//		});
				
			});
		
	}
	else
	{
		var contextlivedata = [];
		var iin = 1;
			
					liveData.d1.forEach(function(dataobj) {
//console.log(dataobj);
						if(dataobj[0].knowledgewords.Sex == setlivecontext.live.knowledgewords[0])
						{
							contextlivedata.push([parseInt(dataobj[0].date,10), parseInt(dataobj[0].time,10)]);
						}
					});
		//console.log(contextlivedata);
					sorteddata = liveData.sortlowtohigh(contextlivedata);
					dataholder[iin] = sorteddata;
					iin++;
		
	}
	
//console.log(dataholder);
		// bundle data in arrays and send to chart		
	liveData.realtimechart(dataholder, setlivecontext, focuscount);


	
};

/**
* Filter relationships
* @method relationshipfilter		
*
*/	
livedata.prototype.relationshipfilter = function(reldatain, relationshipin) {
//console.log('relationship filter');
//console.log(reldatain);
//console.log(relationshipin.relationshipliststart);
	var livestartlistword = relationshipin.relationshipliststart;
//console.log(livestartlistword);
	var rellistout = [];
	rellistout = reldatain[livestartlistword];
//console.log(rellistout);	
	
	var relmatrix = [];
	// now see and built other relationships
	rellistout.forEach(function(relelement) {
//console.log( reldatain[relelement]);		
		if(typeof reldatain[relelement] != 'undefined')
		{
			relmatrix.push([relelement, reldatain[relelement]]);
		}
	});
//console.log(relmatrix);	
	// produce HTML for UI
	this.activeattentionHTML(relmatrix);
};



/**
*  build social network context data
* @method filternetwork		
*
*/	
livedata.prototype.filternetwork = function(networkcontext) {
//console.log('network filter');
//console.log(networkcontext);
	var networklivedata = [];
//console.log(liveData.ni1);	
//console.log(liveData.d1);	
	
	liveData.d1.forEach(function(dataobj) {
	
		if(dataobj[0].networkidentity)
				{
//console.log('pass first filter');					
					if(dataobj[0].knowledgewords.Sex ==  networkcontext.knowledgewords[0] )
					{		
//console.log('second filter');						
						networklivedata.push(dataobj[0].networkidentity);
					}
				}
//console.log(networklivedata);		
	});
	
	function eliminateDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}

var neworkfiltered = [];

neworkfiltered =eliminateDuplicates(networklivedata);

	// next hook up the names to URLs
//	console.log(liveData.ni1);	
	
	// pass on to create htmlcode
		this.socialNetworkHTML(neworkfiltered);
};

/**
*  produce starting charts past and future
* @method startchart		
*
*/	
livedata.prototype.startchart = function(di1) {
	// live attention data (Chart)
//console.log('start charts');	
//console.log(di1);
	var container = "pastchart";
	d1chart = di1;	
//console.log(this.livecontext);	
	this.chartproduction(d1chart, this.livecontext, container);
	// now show the future chart only first time
	liveprediction.predictionlogic(d1chart,1, this.livecontext);

};

/**
*  produce ongoing charts past and future
* @method realtimechart		
*
*/	
livedata.prototype.realtimechart = function(di1, contextin, itemcount) {
	// live attention data (Chart)
//console.log('start realtime charts');	
//console.log(di1.length);
	var container = "pastchart";
d1chart = di1;
	// discover how many data arrray elements are in 'live' comparison status?
	dataelements = itemcount;
	
	liveData.chartproduction(d1chart, contextin, container, dataelements);

	// now show the future chart only first time
			liveprediction.predictionlogic(d1chart,dataelements, contextin);

};

/**
* chart production
* @method chartprojection		
*
*/	
livedata.prototype.chartproduction = function(chartdatain, chartcontext, chartlocation, dataelements) {
// regression line co ordinates
console.log('start of chart production');	
	d2chart = {};
	d2chart = chartdatain;
	contexttitle = chartcontext.live;
console.log(chartcontext.live);
	var chartlabel = 'World Records 100m Freestyle ' + contexttitle.knowledgewords[0];
console.log(d2chart);
	var locationcontainer = chartlocation;	
	
	// look at how many data elements and prepare for appropriate charting
	nochartdatasources = Object.keys(chartdatain).length;
console.log(nochartdatasources);	
	if(nochartdatasources == 1 )
	{
		(function basic(locationcontainer, d2chart) {
//console.log('past char draw SINGLE');

						// Draw Graph
							graph = Flotr.draw(locationcontainer, [

					{
						data: d2chart[1],
						label: chartlabel,
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
									//mode: 'time',
									//timeUnit:'millisecond',
									//timeformat: "%S",
									min: 40000,
									max: 90000
								},
								//title: 'Times'
						});
						
//console.log(graph);		
		
						})(document.getElementById(locationcontainer), d2chart);
		
	}
	else if(nochartdatasources == 2)
	{
(function basic(locationcontainer, d2chart) {
//console.log('past chard draw DOUBLE');
//console.log(d2chart);
						// Draw Graph
							graph = Flotr.draw(locationcontainer, [d2chart[1], d2chart[2] ],
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
									//mode: 'time',
									//timeUnit:'millisecond',
									//timeformat: "%S",
									min: 40000,
									max: 90000
								},
								//title: 'Times'
						});
						
//console.log(graph);		
		
						})(document.getElementById(locationcontainer), d2chart);
	}
	
};


/**
* active attention HTML UI code
* @method activeattentionHTML
*
*/	
livedata.prototype.activeattentionHTML = function(attentionfixlive) {
//console.log('build active attention code');
//console.log(attentionfixlive);	
	HTMLattentionfix = '';
	//HTMLattentionfix +='<ul id="dragselfnow" class="connectedSortable"></ul>';
	HTMLattentionfix += '<div id="attentionfix">';
	
	HTMLattentionfix += '<li id="Sport" class="fixgroup" data-attentionfixttitle="inactive">';
	HTMLattentionfix += '<ul id="socialnetwork" class="active-sub">';
	HTMLattentionfix += '<li id="WorldRecord" class="focuselement" data-knowledgeword="knowledgeword" style="">';
	HTMLattentionfix += '<a id="WorldRecord" class="selected" href="">WorldRecord</a>';
	HTMLattentionfix += '</li>';
	HTMLattentionfix += '</ul>';
	HTMLattentionfix += '</li>';

	attentionfixlive.forEach(function(grouptitle){
		//pass the lane data to get html ready
//console.log(grouptitle[1]);		
		HTMLattentionfix += '<li class="fixgroup" id="' + grouptitle[0] + '" data-attentionfixttitle="inactive" >';
		
		HTMLattentionfix += '<a href="" id="' + grouptitle[0] + '"  class="fixgrouptitle" data-knowledgeword="knowledgeword" style=""> ' + grouptitle[0] + '</a>';

		HTMLattentionfix += '<ul class="active-sub" id="' + grouptitle[0] + '" >';
		var countelements = 1;
		grouptitle[1].forEach(function(listelement){
			// make first element class selectedof empty
			if(countelements == 1)
			{			
				HTMLattentionfix += '<li id="' + listelement + '" class="focuselement" style="" data-knowledgeword="knowledgeword">';
				HTMLattentionfix += '<a href="" id="' + listelement + '" class="selected" >' + listelement + '</a>';
				HTMLattentionfix += '</li>';		
				countelements++;
			}
			else
			{
				HTMLattentionfix += '<li id="' + listelement + '" class="focuselement" style="" data-knowledgeword="knowledgeword">';
				HTMLattentionfix += '<a href="" id="' + listelement + '" class="selectedoff" >' + listelement + '</a>';
				HTMLattentionfix += '</li>';		
			}
		});

	HTMLattentionfix += '</ul>';	
	HTMLattentionfix += '</li>';	

		
	});

	/*
			HTMLattentionfix += '<li  class="fixgroup">';
			HTMLattentionfix += '<ul id="visualisation" class="active-sub">';
			HTMLattentionfix += '<li id="Chart" class="focuselement" data-knowledgeword="knowledgeword" style="">';
			HTMLattentionfix += '<a id="Chart" class="selected" href="">Chart</a>';
			HTMLattentionfix += '</li>';
			HTMLattentionfix += '<li id="Table" class="focuselement" data-knowledgeword="knowledgeword" style="">';
			HTMLattentionfix += '<li id="Splits Matrix" class="focuselement" data-knowledgeword="knowledgeword" style="">';
			HTMLattentionfix += '</ul>';
			HTMLattentionfix += '</ul>';
			HTMLattentionfix += '</li>';
	*/
	HTMLattentionfix += '</div>';	
	HTMLattentionfix += '<section id="attentionhistory">Attention History</section>';	

	$("#activeself").html(HTMLattentionfix);
	
};
	
/**
* attention history HTML UI code
* @method attentionhistoryHTML
*
*/	
livedata.prototype.attentionhistoryHTML = function(attentionprevious) {
//console.log('attention history code HTML');
//console.log(attentionprevious);	
	var HTMLatthistory = '';
	
//	HTMLatthistory += '<ul>';
	HTMLatthistory += '<li id="' + attentionprevious.knowledgewords[0] + '" class="twoattention"><a href="" id="alsoactive" class="">off</a>' + attentionprevious.knowledgewords[0] + '</li>';
//	HTMLatthistory += '</ul>';	
	
		$("#attentionhistory ul").html(HTMLatthistory);
	
};

/**
* social network HTML UI code
* @method socialNetworkHTML
*
*/	
livedata.prototype.socialNetworkHTML = function(socialdatain) {
//console.log('produce the in context social network');

	dragHTMLnetworkid = '';
	dragHTMLnetworkid += '<ul id="dragnetworkidentity" class="connectedSortable">';

		socialdatain.forEach(function(indivpeeps){
		//pass the lane data to get html ready
			idstrnospace = indivpeeps;//.replace(/\s+/g, '');
			dragHTMLnetworkid += '<li class="ui-state-default" data-networkidentity="networkidentity" id="' + indivpeeps + '" ><a href="' +indivpeeps + '" >' + indivpeeps + '</a></li>';

			});

		dragHTMLnetworkid += '</ul>';
		
		$("#activenetwork").html(dragHTMLnetworkid);
		$( "#dragnetworkidentity" ).sortable({
		connectWith: ".connectedSortable"
		}).disableSelection();

};