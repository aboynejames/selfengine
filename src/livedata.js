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
var livedata = function(pouchdblive, liveprediction, contextlivein) {
	console.log('livedata started');	
	this.livepouch = pouchdblive;
	this.liveprediction = liveprediction;
	this.livecontext = contextlivein;
	this.datasort = [];
livepouch.allDocs(this.liveprediction);
	
	this.livedatain(this.livecontext);

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
livedata.prototype.livedatain = function(setlivecontext) {
	//d1 = [];
      
			this.localDatacall(function(rtmap) {  
				this.d1 = [];
				rtmap.rows.forEach(function(rowliveat){
//console.log(rowliveat.key)
					this.d1.push([rowliveat.key, rowliveat.value]);
					
				});
//console.log(d1);
//console.log(setlivecontext.knowledgewords);				
					var contextlivedata = [];
				// start now need to be extracted to context
				this.d1.forEach(function(dataobj) {
//console.log(dataobj[0].knowledgewords.Sex);
					if(dataobj[0].knowledgewords.Sex == setlivecontext.knowledgewords)
					{
						contextlivedata.push([parseInt(dataobj[0].date), parseInt(dataobj[0].time)]);
					}
				});

				sorteddata = liveData.sortlowtohigh(contextlivedata);
				// data sorted pass on to chart visualisation 
				liveData.startchart(sorteddata);
			});


};


/**
*  produce starting charts past and future
* @method startchart		
*
*/	
livedata.prototype.startchart = function(di1) {
	// live attention data (Chart)
console.log('start charts');	
	var container = "pastchart";
d1 = di1;	
	
	liveData.chartproduction(d1, this.livecontext, container);

	// now show the future chart only first time

		if(d1.length > 2)
		{
			liveprediction.predictionout(d1);
		}

};

/**
* chart production
* @method chartprojection		
*
*/	
livedata.prototype.chartproduction = function(chartdatain, chartcontext, chartlocation) {
	
// regression line co ordinates
console.log('start of chart production');
	d2chart = [];
	d2chart = chartdatain;
	contexttitle = chartcontext;
console.log(contexttitle);
	var chartlabel = 'World Records 100m Freestyle ' + contexttitle.knowledgewords;
//console.log(d2chart);
	var locationcontainer = chartlocation;	
	(function basic(locationcontainer, d2) {
//console.log('past chard draw called');

						// Draw Graph
							graph = Flotr.draw(locationcontainer, [

					{
						data: d2,
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
									max: 120000
								},
								//title: 'Times'
						});
						
//console.log(graph);		
		
						})(document.getElementById(locationcontainer), d2chart);

};
