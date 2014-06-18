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

	this.splittimedatalog = {};
	this.finishedTimes = {};
	this.preparedSplitsData = {};
	this.knowledgelog = {};
	this.comeptitiondata = {};
	this.comeptitionsplitdata = {};		
	this.knowledgeWord = {};
	this.knowledgeRelationship = {};
	this.knowledgeRecord = {};
	this.knowledgeRecordtime		
	this.comeptitionknowledge = {};
	this.knowledteTemplate = {};		
	this.groupattention = {};
	this.groupattentionrace = {};
};

/**
* Sets the data coming in from the cloud
* @method setDatain		
*
*/	
datamodel.prototype.setDatain = function(dataidin, clouddata) {  

	if(dataidin == "attentionflow" || dataidin == "idnumbers")
	{

	}
	else
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

	if(dataidin == 'knowledgechain' || dataidin == 'attentionflow' || dataidin == 'idnumbers')
	{

	}
	else
	{
		this.knowledgelog[dataidin] = cloudknowledge;
	}
};

/**
* Returns knowledge relationship words 
* @method returnKnowledgerelationship		
*
*/	
datamodel.prototype.returnKnowledgerelationship = function(krwordin) {  

	var krelationshipout = this.knowledgeRelationship[krwordin];
	
	return krelationshipout;

};


/**
* Sets the competition knowledge data
* @method setCompetitionKnowledge		
*
*/	
datamodel.prototype.setCompetitionKnowledge = function(dataidin, compknowledge) {  

	if(dataidin != 'compKnowledge')
	{
		this.comeptitionknowledge[dataidin] = compknowledge;
	}
};

/**
* Sets the competition finish time data coming in
* @method setCompetitiondata		
*
*/	
datamodel.prototype.setCompetitiondata = function(dataidin, compdatain) {  

	if(dataidin != 'competitionData')
	{
		this.comeptitiondata[dataidin] = compdatain;
	}
};

/**
* Sets the competition split data coming in
* @method setsplitsCompetitiondata		
*
*/	
datamodel.prototype.setsplitsCompetitiondata = function(dataidin, compsplits) {  

	if(dataidin != 'competitionData')
	{
		this.comeptitionsplitdata[dataidin] = compsplits;
	}
};


/**
* Sets the knowledge words
* @method setKnowledgeWord
*/	
datamodel.prototype.setKnowledgeWord = function(kWordin) {  
	
	if(kWordin)
	{
		
		knowledgeWordbuild ={};
		var kkeys = Object.keys(kWordin.knowledgeword);	
		kkeys.forEach(function(kdata) {
		
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

	if(kRel)
	{
		
		knowledgeRbuild ={};
		var kRkeys = Object.keys(kRel.knowledgerelationship);
	
		kRkeys.forEach(function(krdata) {
		
			knowledgeRbuild[kRel.knowledgerelationship[krdata].key] = kRel.knowledgerelationship[krdata].value;
		});
	}
	this.knowledgeRelationship = knowledgeRbuild;
};


/**
* Sets the knowledge relationships
* @method setKnowledgeRecord
*/	
datamodel.prototype.setKnowledgeRecord = function(recordsin) {  
	
	if(recordsin)
	{
		
		knowledgeRcbuild ={};
		knowledgeRcbuildtime ={};	
		var kRckeys = Object.keys(recordsin.recordtemplate);
		
		kRckeys.forEach(function(krcdata) {
		
			knowledgeRcbuild[krcdata] = recordsin.recordtemplate[krcdata].value;
			knowledgeRcbuildtime[krcdata] = recordsin.recordtemplate[krcdata].value.time;
		});
	}
	
	this.knowledgeRecord = knowledgeRcbuild;
	this.knowledgeRecordtime = knowledgeRcbuildtime;
};

/**
* Filter relationships to build knowledge template
* @method buildknowledgeFilter		
*
*/	
datamodel.prototype.buildknowledgeFilter = function(knowledgeTempIn) {

	var livestartlistword = knowledgeTempIn;
	var rellistout = [];
	rellistout = this.knowledgeRelationship[livestartlistword];
	
	var relmatrix = [];
	// now see and built other relationships
	rellistout.forEach(function(relelement) {		
		if(typeof dataModel.knowledgeRelationship[relelement] != 'undefined')
		{
			relmatrix.push([relelement, dataModel.knowledgeRelationship[relelement]]);
		}
	});

	return relmatrix;

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
	
	var singlewords = {};
	
	var knowledgewords = Object.keys(knowledgein);
	knowledgewords.forEach(function(kwords) {
		
		singlewords[kwords] = knowledgein[kwords];
	});

	return singlewords;
};

/**
* Take a input knowledge chain and return other sessionids that match
* @method knowledgechainfiltering
*
*/	
datamodel.prototype.knowledgechainfiltering = function(datamodellive, attidin) {  
			
	var knowledgewordsobject = this.knowledgelog;
	var splitslivein = this.splittimedatalog;

	var matchingknowledge = [];
	var samematch = [];
	// take all knowledge chains and keep those that match
	var listfixids = Object.keys(splitslivein);

		listfixids.forEach(function(matchid) {	
		// match on  swim stroke and distance		
		if(knowledgewordsobject[matchid].Distance == datamodellive.Distance && knowledgewordsobject[matchid].Swimming_stroke == datamodellive.Swimming_stroke)
		{		
			matchingknowledge.push(matchid);			
		}
		else
		{
//console.log('failed');			
		}
				
		});

	this.groupattention[attidin] = matchingknowledge;
		
	return  matchingknowledge;

};

/**
* Take training knowledge chain and match with race/competition knowledge
* @method knowledgechainfilteringRace
*
*/
datamodel.prototype.knowledgechainfilteringRace = function(datamodellive, attidin) {  
			
	var knowledgewordsobject = this.comeptitionknowledge;
	var compfinishtime = this.comeptitiondata;
	var splitslivein = this.comeptitionsplitdata;	
	var matchingknowledge = [];
	var samematch = [];
	// take all knowledge chains and keep those that match
	var listfixids = Object.keys(compfinishtime);
	
		listfixids.forEach(function(matchid) {				
			// match on  swim stroke and distance		
			if(knowledgewordsobject[matchid].Distance == datamodellive.Distance && knowledgewordsobject[matchid].Swimming_stroke == datamodellive.Swimming_stroke && knowledgewordsobject[matchid].Swimmingpool == datamodellive.Swimmingpool)
			{
				// passed matching
				matchingknowledge.push(matchid);			
				
			}
			else
			{
//console.log('failed');			
			}
		
		});

		// form time object
		var mecordseries = {};
		var meholderrecords = {};	
		var meonerecord = {};
		
		if(matchingknowledge.length > 0)
		{
			// find current world record rank for fastest time ie lowest number
			matchingknowledge.forEach(function(rid) {
			
				meholderrecords['time'] = compfinishtime[rid];
				meholderrecords['splittimes'] = splitslivein[rid];
				meholderrecords['identity'] = knowledgewordsobject[rid].networkidentity;
				meholderrecords['date'] = knowledgewordsobject[rid].date;
				mecordseries[rid] = meholderrecords;
				meholderrecords = {};
			});
	
			// order and extract the fastest time
			var merecordtimes = [];
			var merecarray = Object.keys(mecordseries);

			merecarray.forEach(function(wrid) {			
				merecordtimes.push([mecordseries[wrid].time, mecordseries[wrid].splittimes, wrid]);
				
			});	

			// sort low to high
			merecordtimes.sort(function(a,b) {return a[0] > b[0]?1:-1;});
			// take the top elelment form object
			var fastcomptime = merecordtimes.slice(-1)[0];
			meonerecord['fasttime'] = [fastcomptime[2] ,fastcomptime[0]];
			meonerecord['fastsplittimes'] = [fastcomptime[2],fastcomptime[1]];	
				
			return meonerecord;
		}
		else
		{
			//empty no records set
			meonerecord['empty'] = "empty";
			return meonerecord
		}
		
};
	
/**
* Take record knowledge chain and map to world record time(s)
* @method buildRecordknowledgeFilter
*
*/	
datamodel.prototype.buildRecordknowledgeFilter = function(recordknowledge) {  
	
	var knowledgewordsobject = this.knowledgeRecord;
	
	var splitslivein = this.knowledgeRecordtime;

	var matchingknowledge = [];
	var samematch = [];
	var knowledgelist = this.knowledgewordsextraction(recordknowledge);

	// take all knowledge chains and keep those that match
	var listfixids = Object.keys(splitslivein);

		listfixids.forEach(function(matchid) {
		// match on  swim stroke and distance					
			if(knowledgewordsobject[matchid].knowledgewords.Distance == recordknowledge.Distance && knowledgewordsobject[matchid].knowledgewords.Swimming_stroke == recordknowledge.Swimming_stroke && knowledgewordsobject[matchid].knowledgewords.Swimmingpool == recordknowledge.Swimmingpool && knowledgewordsobject[matchid].knowledgewords.Sex == recordknowledge.Sex)
			{				
				matchingknowledge.push(matchid);
			}
			else
			{
//console.log('failed');			
			}
		});
	
		// form time object
		var worldrecordseries = {};
		var holderrecords = {};	
		// find current world record rank for fastest time ie lowest number
		matchingknowledge.forEach(function(rid) {
			holderrecords['time'] = splitslivein[rid];
			holderrecords['identity'] = knowledgewordsobject[rid].networkidentity;
			holderrecords['date'] = knowledgewordsobject[rid].date;
			worldrecordseries[rid] = holderrecords;
			holderrecords = {};
		});
		
		// order and extract the fastest time
		var wordrecordtimes = [];
		var worldrecarray = Object.keys(worldrecordseries);
	
		worldrecarray.forEach(function(wrid) {			
			wordrecordtimes.push([worldrecordseries[wrid].time, wrid]);
			
		});	
		// sort low to high
		wordrecordtimes.sort(function(a,b) {return a[0] < b[0]?1:-1;});
		// take the top elelment form object
		var oneworldrecord = wordrecordtimes.slice(-1)[0];	
		var theworldrecord = {};
		// check there is a world record
		if(oneworldrecord)
		{
			theworldrecord = worldrecordseries[oneworldrecord[1]];
	
			return theworldrecord;
		}
		else
		{
			theworldrecord['empty'] = "empty";
			return theworldrecord;
		}

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

	// check what has been prepared already
	// check in history lastest from the cloud or local
	var accandsplits = {};
	// extract the knowlegechain and find all other data element that meet that criteria
	var datamodellive = this.knowledgechainback(statsisin);	
	// filter down data fixes that match the knowledgechian ie. data of the same type	
	var matchingtrainingknowledge = this.knowledgechainfiltering(datamodellive, statsisin);
		
	// filter down to get the fast race time for this knowledge chain
	var matchingCompetition = this.knowledgechainfilteringRace(datamodellive, statsisin);	
	var livedatastats = this.splittimedatalog;
	var livesplitsdatain = this.preparedSplitsData;

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
	
	var orderarraylength = livedatastats[statsisin].length; 
		
	for(var oi=0; oi< orderarraylength; oi++) {
			
		matchingtrainingknowledge.forEach(function(matid) {
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

		var noelements = firstelement[j].length;		
		var countall = 0;
		var countsplits = 0;
		for(var ei=0; ei< noelements; ei++)
		{		
			countall = countall + firstelement[j][ei]; 
			countsplits = countsplits  + accfirstelement[j][ei];
		}
		// for array to keep split averages
		accsplitaverage.push((countall/noelements).toFixed(0));
		splitaverage.push((countsplits/noelements).toFixed(0));		
		 
	}	
	
	// calculate the effort ratio best race time to
	var effortperSplit = [];	
	// does split exist

	if(matchingCompetition != 0 && matchingCompetition.fastsplittimes.length > 0)
	{
		// split exist
		effortperSplit = this.effortCalculation(livedatastats[statsisin], matchingCompetition.fastsplittimes);
		
		accandsplits.effortsplits = effortperSplit;
		accandsplits.individualsplits = splitaverage;
		accandsplits.accumulatedsplits = accsplitaverage;
	}
	else
	{
		// just end time,  
		effortperSplit = this.effortCalculation(livedatastats[statsisin], matchingCompetition['none'] = "empty");
		accandsplits.effortsplits = effortperSplit;
		accandsplits.individualsplits = splitaverage;
		accandsplits.accumulatedsplits = accsplitaverage;

	}
	
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
		
	return fasterslowercolor;
	
};

/**
* Find the fastest times history of competitions
* @method fastestTimes		
*
*/	
datamodel.prototype.fastestTimes = function(complistin) {  

	var fasttime = '';
	var collecttimes = {};
	var finishracetime = [];
	var liveracestats = this.comeptitiondata;
		
	// match up to time/split race data
	complistin.forEach(function (racesid) {	
		collecttimes[racesid] = liveracestats[racesid];		
		finishracetime.push([dataModel.racetimeFinal(liveracestats[racesid]),racesid]);
		
	});

	// extract the end times and order fastest to slowest
	var fastarrayordered = finishracetime.sort(function(a,b){return b-a});
	var fastestraceEver = fastarrayordered.slice(0,1);
	// has any race times been set?
	var racerecordlength = fastestraceEver.length;
	
	if(racerecordlength !== 0)
	{
		// match up to all the splits data from race
		fasttime = liveracestats[fastestraceEver[0][1]]; 

		return fasttime;
	}
	else
	{
		fasttime = 'notset';	
		return fasttime;
		
	}
};

/**
* Calculate the percentage ratio of training time to race time
* @method effortCalculation		
*
*/	
datamodel.prototype.effortCalculation = function(trainingsplits, racesplits) {  
	
	var effeortratios = [];
	var noelementse = trainingsplits.length;
	
	if(racesplits['none'] == "empty")
	{
		effeortratios.push(0);
		// no race splits 
		return effeortratios;
	}
	// fastest end time or individual splits given?
/*	else if(trainingsplits.length == 1)
	{
		effeortratios.push(((racesplits[0]/trainingsplits[noelementse-1])*100).toFixed(1));
		return effeortratios;
		
	}*/
	else
	{
		var ie = 0;
//console.log(noelementse);	
/*		if(racesplits[0] == 'notset')
		{
			for(ei=0; ei< noelementse; ei++)
			{
				effeortratios.push('nil');
			
			}
//console.log(effeortratios);	
			return effeortratios;
		}
		else
		{*/
			for(ei=0; ei< noelementse; ei++)
			{
				effeortratios.push(((racesplits[1][ei]/trainingsplits[ei])*100).toFixed(1));
			
			}
			return effeortratios;
		//}
	}
	
};

/**
* Produce chart of current personal recoreds
* @method merecords		
*
*/	
datamodel.prototype.merecords = function() {
	
	var bestrecords = [];
	// sort to get fastest and other record stats
	//build record knowledge categorisation
	var recordmodellive = dataModel.buildknowledgeFilter("individualrecord"); //dataModel.knowledgeRelationship.Swimming_stroke;	
	// need to stich together the knowledge chain options and filter on each of those.
	//first has the sex of the ID between established?
	var livesex = 'Male';
	
	// now create the indivdiual knowledge chains
	var iknowledgechains = {};
	var recordholder = [];
	var knowlegerecordholder = {};
	var matrixcounter = 1;

	viewTemplates.recordtable();	
		
	recordmodellive[4][1].forEach(function(istroke) {	
		recordmodellive[2][1].forEach(function(rdistance) {
			recordmodellive[5][1].forEach(function(rpool) {
		
				recordholder.push(livesex);
				recordholder.push(istroke);
				recordholder.push(rdistance);
				recordholder.push('Metre');
				recordholder.push(rpool);
				recordholder.push('---');
				recordholder.push('---');
				
				knowlegerecordholder['Sex'] = livesex;
				knowlegerecordholder['Distance'] = rdistance;
				knowlegerecordholder['Swimming_stroke'] = istroke;
				knowlegerecordholder['Swimmingpool'] = rpool;
				
				viewTemplates.recordtableFill(recordholder, matrixcounter);
				
				dataModel.prepareRecordtimes(knowlegerecordholder, matrixcounter);
				
				//iknowledgechains[matrixcounter] = recordholder;
				recordholder = [];
				knowlegerecordholder = {};
				matrixcounter++;
			});	
		});
	});

};

/**
* manages the  preparation of fast record swim times
* @method prepareRecordtimes	
*
*/	
datamodel.prototype.prepareRecordtimes = function(recordKnowledge, reid) {

	var matchingCompetition = dataModel.knowledgechainfilteringRace(recordKnowledge, statsisin = '');
	var recUpdate = {};		
	if(matchingCompetition['empty'] != "empty" && Object.keys(matchingCompetition).length > 0)
	{		
		viewTemplates.recordtableUpdate(matchingCompetition, reid);
	}

};	
	
/**
* Produce chart of current personal recoreds
* @method worldrecords		
*
*/	
datamodel.prototype.worldrecords = function() {
	
	var bestrecords = [];
	// sort to get fastest and other record stats
	//build record knowledge categorisation
	var recordmodellive = dataModel.buildknowledgeFilter("Worldrecord"); //dataModel.knowledgeRelationship.Swimming_stroke;	
	// need to stich together the knowledge chain options and filter on each of those.
	//first has the sex of the ID between established?
	var livesex = 'Male';
	
	// now create the indivdiual knowledge chains
	var iknowledgechains = {};
	var recordholder = [];
	var knowlegerecordholder = {};
	var matrixcounter = 1;

	viewTemplates.worldrecordtable();	
		
	recordmodellive[4][1].forEach(function(istroke) {	
		recordmodellive[2][1].forEach(function(rdistance) {
			recordmodellive[5][1].forEach(function(rpool) {
		
				recordholder.push(livesex);
				recordholder.push(istroke);
				recordholder.push(rdistance);
				recordholder.push('Metre');
				recordholder.push(rpool);
				recordholder.push('---');
				recordholder.push('---');
				
				knowlegerecordholder['Sex'] = livesex;
				knowlegerecordholder['Distance'] = rdistance;
				knowlegerecordholder['Swimming_stroke'] = istroke;
				knowlegerecordholder['Swimmingpool'] = rpool;
				
				viewTemplates.worldrecordtableFill(recordholder, matrixcounter);
				
				dataModel.prepareworldRecordtimes(knowlegerecordholder, matrixcounter);
				
				//iknowledgechains[matrixcounter] = recordholder;
				recordholder = [];
				knowlegerecordholder = {};
				matrixcounter++;
			});	
		});
	});

};

/**
* manages the  preparation of current world record swim times
* @method prepareworldRecordtimes	
*
*/	
datamodel.prototype.prepareworldRecordtimes = function(recordKnowledge, reid) {

	var matchingCompetition = dataModel.buildRecordknowledgeFilter(recordKnowledge);
	var recWUpdate = {};
		
	if(matchingCompetition['empty'] != "empty" && Object.keys(matchingCompetition).length > 0)
	{		
		viewTemplates.worldrecordtableUpdate(matchingCompetition, reid);
	}

};	


/**
* chart production single attention element
* @method onelementchart		
*
*/	
datamodel.prototype.onelementchart = function(chartdatain, chartcontext, chartlocation, dataelements) {
// regression line co ordinates
	d2chart = {};
	d2chart = chartdatain;
	contexttitle = chartcontext.live;
	var chartlabel = 'Chart ' + contexttitle.knowledgewords[0];
	var locationcontainer = '';
	locationcontainer = chartlocation;	
	// look at how many data elements and prepare for appropriate charting
	nochartdatasources = Object.keys(chartdatain).length;	
	if(nochartdatasources == 1 )
	{
		(function basic(locationcontainer, d2chart) {

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
		
						})(document.getElementById(locationcontainer), d2chart);

	}
	else if(nochartdatasources == 2) {
		// prapare the preentation code for the chart
			(function basic(locationcontainer, d2chart) {
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

			})(document.getElementById(locationcontainer), d2chart);
	}
	else if(nochartdatasources == 3)
	{
		// prapare the preentation code for the chart
			(function basic(locationcontainer, d2chart) {
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

			})(document.getElementById(locationcontainer), d2chart);		
	}

};	