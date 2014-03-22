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
	this.comeptitiondata = {};
	this.knowledgeWord = {};
	this.knowledgeRelationship = {};
	this.comeptitionknowledge = {};
	this.knowledteTemplate = {};		
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
* Sets the competition knowledge data
* @method setCompetitionKnowledge		
*
*/	
datamodel.prototype.setCompetitionKnowledge = function(dataidin, compknowledge) {  
console.log('comp set');
	if(dataidin != 'compKnowledge')
	{
		this.comeptitionknowledge[dataidin] = compknowledge;
	}
};

/**
* Sets the competition data coming in
* @method setCompetitiondata		
*
*/	
datamodel.prototype.setCompetitiondata = function(dataidin, compdatain) {  
console.log('comp data');
	if(dataidin != 'competitionData')
	{
		this.comeptitiondata[dataidin] = compdatain;
	}
};

/**
* Sets the knowledge words
* @method setKnowledgeWord
*/	
datamodel.prototype.setKnowledgeWord = function(kWordin) {  
console.log('knowledge words');
//console.log(kWordin);	
	if(kWordin)
	{
		
		knowledgeWordbuild ={};
		var kkeys = Object.keys(kWordin.knowledgeword);
//console.log(kkeys);		
		kkeys.forEach(function(kdata) {
//console.log(kWordin.knowledgeword[kdata]);			
			knowledgeWordbuild[kWordin.knowledgeword[kdata].key] = kWordin.knowledgeword[kdata].value;
		});
	}
	this.knowledgeWord = knowledgeWordbuild;
};

/**
* Sets the knowledge relationships
* @method setKnowledgeRelationship
*/	
datamodel.prototype.setKnowledgeRelationship = function(kRel) {  
console.log('knowledge relatinship');
//console.log(kRel);	
	if(kRel)
	{
		
		knowledgeRbuild ={};
		var kRkeys = Object.keys(kRel.knowledgerelationship);
//console.log(kRkeys);		
		kRkeys.forEach(function(krdata) {
//console.log(kRel.knowledgerelationship[krdata]);			
			knowledgeRbuild[kRel.knowledgerelationship[krdata].key] = kRel.knowledgerelationship[krdata].value;
		});
	}
	this.knowledgeRelationship = knowledgeRbuild;
};

/**
* Filter relationships to build knowledge template
* @method buildknowledgeFilter		
*
*/	
datamodel.prototype.buildknowledgeFilter = function(knowledgeTempIn) {
//console.log('relationship filter');
//console.log(reldatain);
//console.log(relationshipin.relationshipliststart);
	var livestartlistword = knowledgeTempIn;
//console.log(livestartlistword);
	var rellistout = [];
	rellistout = this.knowledgeRelationship[livestartlistword];
//console.log(rellistout);	
	
	var relmatrix = [];
	// now see and built other relationships
	rellistout.forEach(function(relelement) {
//console.log( reldatain[relelement]);		
		if(typeof dataModel.knowledgeRelationship[relelement] != 'undefined')
		{
			relmatrix.push([relelement, dataModel.knowledgeRelationship[relelement]]);
		}
	});
//console.log(relmatrix);	
	// produce HTML for UI
	viewTemplates.knowledgeTimeIn(relmatrix);
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
	var splitslivein = this.splittimedatalog;

	var matchingknowledge = [];
	var samematch = [];
	var knowledgelist = this.knowledgewordsextraction(datamodellive);
//console.log(knowledgelist);
	// take all knowledge chains and keep those that match
	var listfixids = Object.keys(splitslivein);
//console.log(listfixids);	
		listfixids.forEach(function(matchid) {		
			// extract all knowledge info into an array
			var itemwords =dataModel.knowledgewordsextraction(knowledgewordsobject[matchid]);
//console.log(itemwords);			
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
* Take training knowledge chain and match with race knowledge
* @method knowledgechainfilteringRace
*
*/	
datamodel.prototype.knowledgechainfilteringRace = function(datamodellive, attidin) {  
console.log('knoweldge model filtering RACE');
				
	var knowledgewordsobject = this.comeptitionknowledge;
	var splitslivein = this.comeptitiondata;

	var matchingknowledge = [];
	var samematch = [];
	var knowledgelist = this.knowledgewordsextraction(datamodellive);
//console.log(knowledgelist);
	// take all knowledge chains and keep those that match
	var listfixids = Object.keys(splitslivein);
//console.log(listfixids);	
		listfixids.forEach(function(matchid) {		
			// extract all knowledge info into an array
			var itemwords =dataModel.knowledgewordsextraction(knowledgewordsobject[matchid]);
//console.log(itemwords);			
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
			if(countmatches >= 3 )
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
* Extract the final RACE time
* @method racetimeFinal		
*
*/	
datamodel.prototype.racetimeFinal = function(racetimein) {  
//console.log(racetimein);	
	var finishtimeface = '';
	finishtimeface = racetimein.slice(-1)[0];
	
	//this.finishedTimes[dataidin] = finishtime;
	return finishtimeface;
	
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
	accumsplitchartdata.charttime = [];
	accumsplitchartdata.splittime = [];
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
		accumsplitchartdata.charttime.push([parseInt((attenteleid),10),finishtimeelement]);
		
		var splitsperelement = dataModel.splitDataprep(attenteleid);	
		accumsplitchartdata.splittime.push(splitsperelement);
		
	});
	
	// split time preparation into one array
	totalaccumuldated = [];
	
	var splitdatalength = accumsplitchartdata.splittime.length;
	
	var listofarraysstring = '';
	for (var isp = 1; isp < splitdatalength; isp++) {

		//listofarraysstring += 'accumsplitchartdata["splittime"][' + isp + ']');
//console.log(listofarraysstring);	(accumsplitchartdata['splittime']));
		if(totalaccumuldated.length === 0)
		{
			totalaccumuldated = accumsplitchartdata.splittime[0].concat(accumsplitchartdata.splittime[1]);			
		}
		else
		{
			totalaccumuldated = totalaccumuldated.concat(accumsplitchartdata.splittime[isp]);
		}
		
	}
	accumsplitchartdata.totalaccumuldated = totalaccumuldated;
	
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
	//var racedatamodellive = this.knowledgechainback('competition', statsisin);
console.log(datamodellive);	
	
	// filter down data fixes that match the knowledgechian
	var matchingknowledge = this.knowledgechainfiltering(datamodellive, statsisin);
//console.log('matching knowedge training');
//console.log(matchingknowledge);	
		
	// filter down to get the fast race time for this knowledge chain
	var matchingCompetition = this.knowledgechainfilteringRace(datamodellive, statsisin);
//console.log('matchcomp');		
//console.log(matchingCompetition);		
	// find fast time and set as one to compare effort against
	var fastestraceTime = this.fastestTimes(matchingCompetition);
console.log('fastest race time end');
console.log(fastestraceTime);
	// order the array fastest to slow	
		
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
				
	var sumelength = matchingknowledge.length;	
	
	var orderarraylength = livedatastats[statsisin].length; 
		
	for(var oi=0; oi< orderarraylength; oi++) {
			
		matchingknowledge.forEach(function(matid) {
			dataModel.splitDataprep(matid);		
			neworderarray.push(livedatastats[matid][oi]);

			newsplitsarray.push(livesplitsdatain[matid][oi][1]);
		});

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
	
	// calculate the effort ratio best race time to 
	var effortperSplit = this.effortCalculation(livedatastats[statsisin], fastestraceTime);
	
	accandsplits.effortsplits = effortperSplit;
	accandsplits.individualsplits = splitaverage;
	accandsplits.accumulatedsplits = accsplitaverage;
//console.log(accandsplits);
	return accandsplits;
	
};

/**
* Takes splits and color codes for faster  slower the previous
* @method splitColorCode		
*
*/
datamodel.prototype.splitColorCode = function(splitarray) {  

	var fasterslowercolor = [];
	var previoustime = 0;
	
	splitarray.forEach(function(sptime) {
	
		if(sptime[1] > previoustime)
		{
			fasterslowercolor.push('red');
		}
		else
		{
			fasterslowercolor.push('green');
		}
	previoustime  = sptime[1];		

	});
		
//console.log(fasterslowercolor);
	return fasterslowercolor;
	
};

/**
* Find the fastest times history of competitions
* @method fastestTimes		
*
*/	
datamodel.prototype.fastestTimes = function(complistin) {  
//console.log('fastest times prep');
//console.log(complistin);	
	var fasttime = '';
	var collecttimes = {};
	var finishracetime = [];
	var liveracestats = this.comeptitiondata;

		
	// match up to time/split race data
	complistin.forEach(function (racesid) {
//console.log(dataModel.racetimeFinal(liveracestats[racesid]));		
		collecttimes[racesid] = liveracestats[racesid];
		finishracetime.push([dataModel.racetimeFinal(liveracestats[racesid]),racesid]);
		
	});
//console.log('working on fastest times');	
//console.log(finishracetime);	
	// extract the end times and order fastest to slowest
	var fastarrayordered = finishracetime.sort(function(a,b){return b-a});
	var fastestraceEver = fastarrayordered.slice(0,1);
//console.log(fastestraceEver);
	// has any race times been set?
	var racerecordlength = fastestraceEver.length;
//console.log('race record length ==' + racerecordlength);	
	if(racerecordlength !== 0)
	{
		// match up to all the splits data from race
		fasttime = liveracestats[fastestraceEver[0][1]]; 
//console.log(fasttime);	
		return fasttime;
	}
	else
	{
		fasttime = 'notset';
//console.log(fasttime);		
		return fasttime;

		
	}
};

/**
* Calculate the percentage ratio of training time to race time
* @method effortCalculation		
*
*/	
datamodel.prototype.effortCalculation = function(trainingsplits, racesplits) {  
//console.log(trainingsplits);
//console.log(racesplits);	
	var effeortratios = [];
	var noelementse = trainingsplits.length;
	var ie = 0;
//console.log(noelementse);	
	if(racesplits[0] == 'notset')
	{
		for(ei=0; ei< noelementse; ei++)
		{
			effeortratios.push('nil');
		
		}
//console.log(effeortratios);	
		return effeortratios;
	}
	else
	{
		for(ei=0; ei< noelementse; ei++)
		{
			effeortratios.push(((racesplits[ei]/trainingsplits[ei])*100).toFixed(1));
		
		}
//console.log(effeortratios);	
		return effeortratios;
	}
	
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
									mode: 'time',
									timeUnit:'millisecond',
									timeformat: "%m",
									labelsAngle: 0
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
							barWidth: 10,
							lineWidth: 20,
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
							autoscale:true,
							//majorTickFreq: 100000000,
							mode: 'time'
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
console.log('past char draw SINGLE 3');
				// Draw Graph
				graph = Flotr.draw(locationcontainer, [

						// preprae the two data set and charting details.
				{
					data: d2chart.totalaccumuldated,
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
					data: d2chart.totalaccumuldated,
					markers: {
								show: true,
								position: 'ct'
					}
				},
				
				{
					data: d2chart.charttime,
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
				
console.log(graph);		

			})(document.getElementById(locationcontainer), d2chart);		
		
		
		
		
		
		
		
	}

};	