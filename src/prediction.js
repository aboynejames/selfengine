/**
* SelfEngine
*
* prediction analystics
* @class selfprediction
*
* @package    selfengine  open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var selfprediction = function() {
		this.predictiondataout = {};
	
};

/**
* Figureout the number of incoming data element to process
* @method predictionlogic		
*
*/	
selfprediction.prototype.predictionlogic = function(livecontextdata, numberdatain, liveattentionin) {
//console.log('data logic preparation ready for processing');	
//console.log(livecontextdata);
	// how many data sources to calcuate check and then perform statistics
	datasetlength = Object.keys(livecontextdata).length;
//console.log(livecontextdata);
	for (var i=1; i <= datasetlength; i++) {
	// based on number of array, perform independent predictions
//console.log('number of predictions going on' + i);
//console.log(livecontextdata[i]);		
			this.predictionout(livecontextdata[i], i, datasetlength, liveattentionin);
	}
		
};

/**
* Take in live data context and make prediction and charts
* @method predictionout		
*
*/	
selfprediction.prototype.predictionout = function(livepredictiondata, elementpart, totalelements, attentionfixin) {
//console.log('first prediction staged called');	
	
//var datain = {1:1,2:2,3:1.3,4:3.75,5:2.25};
var datainx = [];
var datainy = [];

	// for now form x array and y array to feed sums below
livepredictiondata.forEach(function(xypairs) {
//console.log(xypairs[0]);	
		datainx.push(xypairs[0]);
		datainy.push(xypairs[1]);
});
//console.log(datainx);
//console.log(datainy);
// sum x and average
var totalsumx = datainx.reduce(function(previousValue, currentValue, index, array){
  return previousValue + currentValue;
});
//console.log(totalsumx);
var xlength = datainx.length;

//sum y and average
var totalsumy = datainy.reduce(function(previousValue, currentValue, index, array){
  return previousValue + currentValue;
});
//console.log(totalsumy);
var ylength = datainy.length;


// calcualate the means
var meanx = totalsumx/xlength;
//console.log(meanx);

var meany = totalsumy/ylength;
//console.log(meany);


// calculate variance for x
//each x value minus the mean squared divided by number of datapionts

var variancex = '';
var sdeviationx = [];
var sdeviationsquaredarr = [];
datainx.forEach(function(xnum) {
	
//console.log(xnum);	
	var sdeviationsquared = Math.pow((xnum - meanx),2);
	sdeviationsquaredarr.push(sdeviationsquared);
	sdeviationx.push(xnum - meanx);
//console.log(sdeviationsquared);
	});

//console.log('deviation from mean for x');	
//console.log(sdeviationx);
//console.log('deviation squared from mean for x');		
//console.log(sdeviationsquaredarr);
	var totalsumxdev = sdeviationsquaredarr.reduce(function(previousValue, currentValue, index, array){
  return previousValue + currentValue;
});

variancex = totalsumxdev/(xlength-1);
//console.log(variancex);
// standard devication is square root of variance
var sdx = Math.sqrt(variancex);
//console.log('sd for x');
//console.log(sdx);

// calculate variance for y
var variancey = '';
var sdeviationy = [];
var sdeviationsquaredarry = [];
datainy.forEach(function(ynum) {
	
//console.log(ynum);	
	var sdeviationsquaredy = Math.pow((ynum - meany),2);
	sdeviationsquaredarry.push(sdeviationsquaredy);
		sdeviationy.push(ynum - meany);
//console.log(sdeviationsquaredy);
	});

//console.log('deviation from mean for y');	
//console.log(sdeviationy);
//console.log('deviation squared from mean for y');			
//console.log(sdeviationsquaredarry);
	var totalsumydev = sdeviationsquaredarry.reduce(function(previousValue, currentValue, index, array){
  return previousValue + currentValue;
});

variancey = totalsumydev/(ylength-1);
//console.log(variancey);
// standard devication is square root of variance
var sdy = Math.sqrt(variancey);
//console.log('sd for y');
//console.log(sdy);


// calculate persons R

var  personsr = '';

// sum of the differences
var sumofdifferences = '';
var devbetweenxv = [];

// loop two arrays and perform sum
var result = 0;
for (var i=0; i < sdeviationx.length; i++) {
  result += (sdeviationx[i] * sdeviationy[i]);
}
//console.log('sum of deviation of x times y deviations');
//console.log(result);

var sumdiffsquarex =  Math.sqrt(totalsumxdev);
var sumdiffsquarey = Math.sqrt(totalsumydev);
//console.log('squre root products');
//console.log(sumdiffsquarex*sumdiffsquarey);

personsr = result/(sumdiffsquarex*sumdiffsquarey);

//console.log(' persons r is')
//console.log(personsr);


// build forulate for straight line linear regress chart

// beta co efficient
var beta = '';

beta = (personsr * sdy)/sdx;
//console.log('beta co efficient');
//console.log(beta);

// where does it cross the y axis ie x = 0;

var crossy = '';

crossy = meany - (beta * meanx);
//console.log('crosses y axis at when x is zero');
//console.log(crossy);

// produce the regression line x y pairs

var dregdata = [];

// take todays date and add 10 years
var startdateprediction = new Date().valueOf();
//console.log(startdateprediction);
var tenyeartimeframe = [1,2,3,4,5,6,7,8,9,10];
var yearinmilliseconds = 31536000000;

var regx = [];

tenyeartimeframe.forEach(function(yearno) {

	regx.push(startdateprediction + (yearno * yearinmilliseconds));
	
});
//console.log(regx);
//var regx = [1,2,3,4,5,6,7,8,9,10]
var regy = '';
var regxy = [];

regx.forEach(function(rx) {
	
	regy = ((beta*rx) + crossy);
	regxy.push([rx, regy]);
	
});

// regression line co ordinates
//console.log('the regression line');
//console.log(regxy);
	this.predictionchartdata(regxy, elementpart, totalelements, attentionfixin);
};

/**
* Holds prediction data ready for charting
* @method predictionchartdata		
*
*/	
selfprediction.prototype.predictionchartdata = function(readypredictiondata, epart, totalelements, attentionset) {
//console.log('holding data ready for execution to charting' + epart);

	var fcontainer = "futurechart";
	liveattentiondata = {};
		// always deliver data to chart as an array
//console.log(this.predictiondataout);	
	this.predictiondataout[epart] = readypredictiondata;
//console.log(this.predictiondataout);	
	completeset = Object.keys(this.predictiondataout).length;
//console.log(completeset + 'and another number' + totalelements);		
	if(completeset == totalelements)	
	{		
//console.log(this.predictiondataout);		
		liveData.chartproduction(this.predictiondataout, attentionset, fcontainer,  totalelements);
		this.predictiondataout = {};
	}


};	