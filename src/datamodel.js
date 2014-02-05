/**
* SelfEngine
*
* data held in memory ready for visualisation and analysis
* @class datamodel
*
* @package    selfengine  open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var datamodel = function() {
//console.log('datamodel started');
	this.splittimedatalog = {};
	this.finishedTimes = {};
	this.preparedSplitsData = {};
	this.knowledgelog = {};
	this.groupattention = {};
};

/**
* Sets the data coming in from the cloud
* @method setDatain		
*
*/	
datamodel.prototype.setDatain = function(dataidin, clouddata) {  

	if(dataidin != 'attentionflow')
	{
		this.splittimedatalog[dataidin] = clouddata;
	}
};

/**
* Sets knowledge chain coming in
* @method setKnowledgein		
*
*/	
datamodel.prototype.setKnowledgein = function(dataidin, cloudknowledge) {  

	if(dataidin != 'knowledgechain')
	{
		this.knowledgelog[dataidin] = cloudknowledge;
	}
};

/**
* Return knowledge chain item
* @method knowledgechainback
*
*/	
datamodel.prototype.knowledgechainback = function(dataidin) {  

	return this.knowledgelog[dataidin];
};

/**
* Extract individual knowldge words
* @method knowledgewordsextraction
*
*/	
datamodel.prototype.knowledgewordsextraction = function(knowledgein) {  
//console.log('knoweldge word extraction');
//console.log(knowledgein);	
	var singlewords = [];
	
	var knowledgewords = Object.keys(knowledgein);
	knowledgewords.forEach(function(kwords) {
		singlewords.push(knowledgein[kwords]);
	});

	return singlewords;
};

/**
* Take a input knowledge chain and return other sessionids that match
* @method knowledgechainfiltering
*
*/	
datamodel.prototype.knowledgechainfiltering = function(datamodellive, attidin) {  
//console.log('knoweldge model filtering');
	
	var knowledgewordsobject = this.knowledgelog;
	var matchingknowledge = [];
	var samematch = [];
	var knowledgelist = this.knowledgewordsextraction(datamodellive);

	// take all knowledge chains and keep those that match
	var listfixids = Object.keys(this.splittimedatalog);
	
		listfixids.forEach(function(matchid) {		
			// extract all knowledge info into an array
			var itemwords =dataModel.knowledgewordsextraction(knowledgewordsobject[matchid]);		
			// now compare the knowledge works
			knowledgelist.forEach(function(kidw) {
				itemwords.forEach(function(kidm) {
					
					if(kidw == kidm)
					{
						matchingknowledge.push(matchid);
					}
				});
			});
		
//console.log(matchingknowledge);
			// count the number of matches 
			var countmatches = matchingknowledge.length;		
			if(countmatches >= 5 )
			{
				samematch.push(matchid);
			}
			countmatches = 0;
			matchingknowledge = [];
		});
//console.log(samematch);
		this.groupattention[attidin] = samematch;
		
		return  samematch;

};

/**
* Extract the final time
* @method timeFinal		
*
*/	
datamodel.prototype.timeFinish = function(dataidin) {  
	var finishtime = '';
	finishtime = this.splittimedatalog[dataidin].slice(-1)[0];
	
	this.finishedTimes[dataidin] = finishtime;
	return finishtime;
	
};

/**
* Takes accumulated time data and prepares for charting
* @method timeDataprep		
*
*/	
datamodel.prototype.timeDataprep = function(dataidin) {  
	
	preparedchartdata = [];
	var spid = 0;
	// accumulated time preparation
	this.splittimedatalog[dataidin].forEach(function(acctime) {
	
		preparedchartdata[spid] = [(dataidin + acctime), acctime];
		spid++;
	});
	

	return preparedchartdata;
	
};

/**
* Takes accumulated time and produced splits
* @method splitDataprep		
*
*/
datamodel.prototype.splitDataprep = function(sdataidin) {  
	
	preparedsplitchartdata = [];
	var sspid = 0;
	var previoustime = 0;
	// accumulated time preparation
	this.splittimedatalog[sdataidin].forEach(function(sptime) {
		// caluate splits	
		var splitcalc = sptime - previoustime;	
		preparedsplitchartdata[sspid] = [parseInt((sdataidin),10)  + sptime, splitcalc];
		sspid++;
		previoustime = sptime;
	});

	this.preparedSplitsData[sdataidin] = preparedsplitchartdata;	
	return preparedsplitchartdata;
	
};

/**
* Add together multiple attention element and prepares for charting
* @method accumulationDataprep		
*
*/
datamodel.prototype.accumulationDataprep = function(attidin) {  
	
	accumsplitchartdata = {};
	accumsplitchartdata['charttime'] = [];
	accumsplitchartdata['splittime'] = [];
	// state, filter data will be passed in
	
	// accumulated time preparation
//	var selecteddatakeys = Object.keys(this.splittimedatalog);
	// match to group
	var attentiongrouplist = this.groupattention[attidin];
	var refinedgrouplist = [];	
	// further filter grouplist for 2 hours back and forth
	var twohourback = attidin - 7200000;
	var twohourforward = attidin + 7200000;
	attentiongrouplist.forEach(function(groupatt) {
		if(groupatt > twohourback && groupatt <  twohourforward)
		{
			refinedgrouplist.push(groupatt);
		}
		
	});
//console.log(refinedgrouplist);		
		
	refinedgrouplist.forEach(function(attenteleid) {
		// prepare time and accumulate splits
		var finishtimeelement = dataModel.timeFinish(attenteleid);
		accumsplitchartdata['charttime'].push([parseInt((attenteleid),10),finishtimeelement]);
		
		var splitsperelement = dataModel.splitDataprep(attenteleid);	
		accumsplitchartdata['splittime'].push(splitsperelement);
		
	});
	
	// split time preparation into one array
	totalaccumuldated = [];
	
	var splitdatalength = accumsplitchartdata['splittime'].length;
	
	var listofarraysstring = '';
	for (var isp = 1; isp < splitdatalength; isp++) {

		//listofarraysstring += 'accumsplitchartdata["splittime"][' + isp + ']');


//console.log(listofarraysstring);	(accumsplitchartdata['splittime']));
		if(totalaccumuldated.length == 0)
		{
			totalaccumuldated = accumsplitchartdata['splittime'][0].concat(accumsplitchartdata['splittime'][1]);
			
		}
		else
		{
			totalaccumuldated = totalaccumuldated.concat(accumsplitchartdata['splittime'][isp]);
		
		}
		
	}
	accumsplitchartdata['totalaccumuldated'] = totalaccumuldated;
	
	return accumsplitchartdata;
	
};

/**
* produce summary statistics
* @method statisticsDataprep		
*
*/
datamodel.prototype.statisticsDataprep = function(statsisin) {  
//console.log(statsisin);
	// check what has been prepared already
	// check in history lastest from the cloud or local
	var accandsplits = {};
	// extract the knowlegechain and find all other data element that meet that criteria
	var datamodellive = this.knowledgechainback(statsisin);
//console.log(datamodellive);	
	
	// filter down data fixes that match the knowledgechian
	var matchingknowledge = this.knowledgechainfiltering(datamodellive, statsisin);
//console.log(matchingknowledge);	
	var livedatastats = this.splittimedatalog;
	var livesplitsdatain = this.preparedSplitsData;
//console.log(livedatastats);	
	var listcurrentSessiondata = [];
	var eachsplitordersum = {};
	var eachsplitarray = {};
	
	var splitgroup = {};
	var elementone = [];
		
	elementarray = [];
	firstelement = {};
	accfirstelement = {};
	neworderarray = [];
	newsplitsarray = [];		
		
	//listcurrentSessiondata = Object.keys(livedatastats);
//console.log(listcurrentSessiondata);		
	//var sumelength = listcurrentSessiondata.length;
	var sumelength = matchingknowledge.length;	
//console.log(sumelength);		
	var orderarraylength = livedatastats[statsisin].length; 
//console.log(orderarraylength);		
	for(var oi=0; oi< orderarraylength; oi++) {
			
		//for(var i=0; i< sumelength; i++) {
		matchingknowledge.forEach(function(matid) {
			dataModel.splitDataprep(matid);
//console.log(matid);
//console.log(oi);
//console.log(matchingknowledge[i]);
//console.log(livedatastats[matid]);	
//console.log(livedatastats[matchingknowledge[matid][oi]);		
			neworderarray.push(livedatastats[matid][oi]);
//console.log(neworderarray);
			newsplitsarray.push(livesplitsdatain [matid][oi][1]);
		});
	
		//}	
		firstelement[oi] = neworderarray;
		accfirstelement[oi] = newsplitsarray;
		neworderarray = [];
		newsplitsarray = [];
	
	}
	
	splitaverage = [];
	accsplitaverage = [];
	// sum the array values
	for (var j in firstelement) {
//console.log(j);	 
		var noelements = firstelement[j].length;
//console.log(noelements);		
		var countall = 0;
		var countsplits = 0;
		for(var ei=0; ei< noelements; ei++)
		{	
//console.log(ei);			
			countall = countall + firstelement[j][ei]; 
			countsplits = countsplits  + accfirstelement[j][ei];

		}
		 // for array to keep split averages
		 accsplitaverage.push((countall/noelements).toFixed(0));
		 splitaverage.push((countsplits/noelements).toFixed(0));		
		 
	}			
	accandsplits['individualsplits'] = splitaverage;
	accandsplits['accumulatedsplits'] = accsplitaverage;
	return accandsplits;
	
};
	

/**
* chart production single attention element
* @method onelementchart		
*
*/	
datamodel.prototype.onelementchart = function(chartdatain, chartcontext, chartlocation, dataelements) {
// regression line co ordinates
//console.log('start of chart production');	
	d2chart = {};
	d2chart = chartdatain;
	contexttitle = chartcontext.live;
//console.log(chartcontext['live']);
	var chartlabel = 'TEST ' + contexttitle.knowledgewords[0];
//console.log(d2chart);
	var locationcontainer = '';
	locationcontainer = chartlocation;	
//console.log(locationcontainer);	
	// look at how many data elements and prepare for appropriate charting
	nochartdatasources = Object.keys(chartdatain).length;
//console.log(nochartdatasources);	
	if(nochartdatasources == 1 )
	{
		(function basic(locationcontainer, d2chart) {
//console.log('past char draw SINGLE');

						// Draw Graph
					graph = Flotr.draw(locationcontainer, [

					{
						data: d2chart[0],
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
									//mode: 'time',
									//timeUnit:'millisecond',
									//timeformat: "%m/%d/%y",
									labelsAngle: 90
								},
								grid: {
										//minorVerticalLines: true
								},
								yaxis: {
									mode: 'time',
									timeUnit:'millisecond',
									timeformat: "%S",
									min: 0,
									max: 60000
								},
								//title: 'Times'
						});
						
//console.log(graph);		
		
						})(document.getElementById(locationcontainer), d2chart);

	}
	else if(nochartdatasources == 2) {
		// prapare the preentation code for the chart
			(function basic(locationcontainer, d2chart) {
//console.log('past char draw SINGLE 2');
				// caculate hight of y-axis
				var yaxismax = (d2chart[0].slice(-1)[0][1]) * 1.25;
				// Draw Graph
				graph = Flotr.draw(locationcontainer, [

						// preprae the two data set and charting details.
				{
					data: d2chart[1],
					bars: {
					    show: true,
					    barWidth: 0.5,
					    lineWidth: 8,
					    fillColor: {
						colors: ['#CB4B4B', '#000'],
						start: 'top',
						end: 'bottom'
					    },
					    fillOpacity: 0.8
					}
				},
				{
					data: d2chart[1],
					markers: {
						show: true,
						position: 'ct'
					}
				},
				
				{
					data: d2chart[0],
					label: chartlabel,
					lines: {
						show: true
				},
				points: {
					show: true
				}
				}

				],
				{
					xaxis: {
						//majorTickFreq: 1
						mode: 'time',
						timeUnit:'millisecond',
						timeformat: "%m",
						labelsAngle: 90
					},
					grid: {
							//minorVerticalLines: true
							verticalLines: false,
							backgroundColor: ['#fff', '#ccc']

					},
					yaxis: {
						mode: 'time',
						timeUnit:'millisecond',
						timeformat: "%S",
						min: 0,
						max: yaxismax
					},
						//title: 'Times'
				});
				
//console.log(graph);		

			})(document.getElementById(locationcontainer), d2chart);
			
			

	}
	else if(nochartdatasources == 3)
	{

		// prapare the preentation code for the chart
			(function basic(locationcontainer, d2chart) {
//console.log('past char draw SINGLE 3');
				// Draw Graph
				graph = Flotr.draw(locationcontainer, [

						// preprae the two data set and charting details.
				{
					data: d2chart['totalaccumuldated'],
					bars: {
					    show: true,
					    barWidth: 0.5,
					    lineWidth: 2,
					    fillColor: {
						colors: ['#CB4B4B', '#000'],
						start: 'top',
						end: 'bottom'
					    },
					    fillOpacity: 0.8
					}
				},
				{
					data: d2chart['totalaccumuldated'],
					markers: {
						show: true,
						position: 'ct'
					}
				},
				
				{
					data: d2chart['charttime'],
					label: chartlabel,
					lines: {
						show: true
				},
				points: {
					show: true
				}
				}

				],
				{
					xaxis: {
						//majorTickFreq: 1
						mode: 'time',
						timeUnit:'millisecond',
						timeformat: "%m",
						labelsAngle: 90
					},
					grid: {
							//minorVerticalLines: true
							verticalLines: false,
							backgroundColor: ['#fff', '#ccc']

					},
					yaxis: {
						mode: 'time',
						timeUnit:'millisecond',
						timeformat: "%S",
						min: 0,
						max: 90000
					},
						//title: 'Times'
				});
				
//console.log(graph);		

			})(document.getElementById(locationcontainer), d2chart);		
		
		
		
		
		
		
		
	}

};	