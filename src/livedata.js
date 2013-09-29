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
var livedata = function(pouchdblive, liveprediction) {
	console.log('livedata started');	
	this.livepouch = pouchdblive;
	this.liveprediction = liveprediction;
	this.d1 = [];
	this.k1 = {};
	this.r1 = {};
	this.ni1 = {};
	this.datasort = [];
//livepouch.allDocs(this.liveprediction);

	this.livecontext = {};
	this.livecontext.knowledgewords = 'Male'; 
	this.livecontext.relationshipliststart = 'Worldrecord';
	// need to build live data based on active attention
	// first capture active attention
	// need to display first sub item from each active focus attention,(should keep track of history of attention fixes)
	this.livedatain(this.d1, this.livecontext);
	this.liveknowledgein(this.k1, this.livecontext);
	this.liverelationshipsin(this.r1, this.livecontext);
	this.livennetworkidenityin(this.ni1, this.livecontext);	
	/*
	var liveattentiondata = {};
//console.log($(".fixgroup"));
		liveattentiontitles = {};
		liveattentiontitles = $(".fixgroup");
//console.log($(liveattentiontitles[1]).children());		
		var liveattentionlength = liveattentiontitles.length;
	for (var i=0;i<liveattentionlength;i++)
	{
//console.log($(liveattentiontitles[i]).children().children().first());
		$(liveattentiontitles[i]).children().children().first().show();		
		liveattentiondata[i] = $(liveattentiontitles[i]).children().attr("id");
	}

$("#attentionfix li.fixgroup ul.active-sub li a#Longcourse").removeClass("selectedoff");
$("#attentionfix li.fixgroup ul.active-sub li a#Male").removeClass("selectedoff");
*/		
		
};

/**
* One stage serial control flow helper function
* @method localDatacall		
*
*/	
livedata.prototype.localDatacall =	function(callback) {  

	this.livepouch.mapQueryLIVE(callback);

};  

/**
* Get all the relationship data
* @method knowledgeDatacall		
*
*/	
livedata.prototype.knowledgeDatacall =	function(callback) {  
	
	this.livepouch.mapQueryknowledge(callback);

}; 

/**
* Get all the networkidentity data
* @method networkidentityDatacall		
*
*/	
livedata.prototype.networkidentityDatacall =	function(callback) {  
	
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
console.log('low to high sort');
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
				
			liveData.livefilterknowlegeword(d1in, setlivecontext);
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
		liveData.relationshipfilter(r1in, livecontextin);
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
// start now need to be extracted to context
	datauniverse.forEach(function(dataobj) {
//console.log(dataobj[0].knowledgewords.Sex);
		if(dataobj[0].knowledgewords.Sex == setlivecontext.knowledgewords)
		{
		contextlivedata.push([parseInt(dataobj[0].date), parseInt(dataobj[0].time)]);
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
console.log('livefilter');
//console.log(d1);	
	var dataholder = {};
	// first extract live context then see if a secondary (or more attentionfocus are live?)
	focus = 2;//$(".attentionfocus").length;
//console.log(focus);
	if(focus >0)
	{
		// collect the data foreach active focus
//console.log('two sets of data filter processing going on');		
		focusfilter = ["Male", "Female"];
		iin = 1;
		focusfilter.forEach(function(focusname) {
//console.log(focusname);			
			var contextlivedata = [];
			d1.forEach(function(dataobj) {
//console.log(dataobj);
				if(dataobj[0].knowledgewords.Sex == focusname)
				{
					contextlivedata.push([parseInt(dataobj[0].date), parseInt(dataobj[0].time)]);
				}
			});
//console.log(contextlivedata);
			sorteddata = liveData.sortlowtohigh(contextlivedata);
			dataholder[iin] = sorteddata;
			iin++;
		});
	}
//console.log(dataholder);
		// bundle data in arrays and send to chart		
	liveData.realtimechart(dataholder);


	
};

/**
* Filter relationships
* @method relationshipfilter		
*
*/	
livedata.prototype.relationshipfilter = function(reldatain, relationshipin) {
console.log('relationship filter');
//console.log(reldatain);
//console.log(relationshipin.relationshipliststart);
var livestartlistword = 	relationshipin.relationshipliststart;
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
*  produce starting charts past and future
* @method startchart		
*
*/	
livedata.prototype.startchart = function(di1) {
	// live attention data (Chart)
console.log('start charts');	
console.log(di1);
	var container = "pastchart";
	d1chart = di1;	
	
	this.chartproduction(d1chart, this.livecontext, container);
	// now show the future chart only first time
	liveprediction.predictionlogic(d1chart,1);

};

/**
*  produce ongoing charts past and future
* @method realtimechart		
*
*/	
livedata.prototype.realtimechart = function(di1) {
	// live attention data (Chart)
console.log('start realtime charts');	
//console.log(di1.length);
	var container = "pastchart";
d1chart = di1;
	// discover how many data arrray elements are in 'live' comparison status?
	dataelements = 2;
	
	liveData.chartproduction(d1chart, this.livecontext, container, dataelements);

	// now show the future chart only first time
			liveprediction.predictionlogic(d1chart,dataelements);

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
	contexttitle = chartcontext;
console.log(contexttitle);
	var chartlabel = 'World Records 100m Freestyle ' + contexttitle.knowledgewords;
console.log(d2chart);
	var locationcontainer = chartlocation;	
	
	// look at how many data elements and prepare for appropriate charting
	nochartdatasources = Object.keys(chartdatain).length;
console.log(nochartdatasources);	
	if(nochartdatasources == 1 )
	{
		(function basic(locationcontainer, d2chart) {
//console.log('past chard draw called');

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
//console.log('past chard draw called');

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
console.log('build active attention code');
//console.log(attentionfixlive);	
	HTMLattentionfix = '';
	//HTMLattentionfix +='<ul id="dragselfnow" class="connectedSortable"></ul>';
	HTMLattentionfix += '<div id="attentionfix">';

	attentionfixlive.forEach(function(grouptitle){
		//pass the lane data to get html ready
//console.log(grouptitle[1]);		
		HTMLattentionfix += '<li class="fixgroup">';
		
		HTMLattentionfix += '<a href="" id="' + grouptitle[0] + '"  class="fixgrouptitle" data-knowledgeword="knowledgeword" style=""> ' + grouptitle[0] + '</a>';

		HTMLattentionfix += '<ul class="active-sub" >';

		grouptitle[1].forEach(function(listelement){
			
			HTMLattentionfix += '<li id="' + listelement + '" class="focucelement" style="" data-knowledgeword="knowledgeword">';
			HTMLattentionfix += '<a href="" id="' + listelement + '" class="selectedoff" >' + listelement + '</a>';
			HTMLattentionfix += '</li>';		
		
		});

	HTMLattentionfix += '</ul>';		;		
	HTMLattentionfix += '</li>';		
	});

	HTMLattentionfix += '</div>';	
	HTMLattentionfix += '<section id="attentionhistory">Attention History</section>';	

	$("#activeself").html(HTMLattentionfix);
	$("#attentionfix li.fixgroup ul.active-sub li a#Freestyle").removeClass("selectedoff");
	$("#attentionfix li.fixgroup ul.active-sub li a#Male").removeClass("selectedoff");
	
};
	
