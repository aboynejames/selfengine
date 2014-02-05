/**
* SelfEngine
*
* produced html display code for UI
* @class viewtemplates
*
* @package    selfengine  open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var viewtemplates = function() {
//console.log('viewtemplates started');
		
};

/**
* 
* @method setView	
*
*/	
viewtemplates.prototype.setView = function() {  
	
	
	
};

/**
*  Produce summary statistics per attention fix
* @method summaryStatisticsbox	
*
*/	
viewtemplates.prototype.summaryStatisticsbox = function(csslocationin, fixdatain, statsdatain) {  
	// produce statistic html presentation code
	var statsvisualisation = '';
	
	statsvisualisation += '<div class="statistics-summary">';
	splitlength = fixdatain[1].length;
	
	// two types of splits and acctime averages
	statsvisualisation += '	<div class="actualsp">Actual</div><div class="avgstat">Average</div><div class="acctime">Acc Time</div><div class="accavgstat">Acc Average</div>';
	
	for(var i=0; i< splitlength; i++) 
	{
		
		statsvisualisation += '	<div class="actualsp">' + this.formatTime(fixdatain[1][i][1]) + '</div><div class="avgstat">' + this.formatTime(statsdatain['individualsplits'][i]) + '</div><div class="acctime">' + this.formatTime(fixdatain[0][i][1]) + '</div><div class="accavgstat">' +this.formatTime(statsdatain['accumulatedsplits'][i]) + '</div>';
	
	}
	statsvisualisation += '</div>';
	statsvisualisation += '<div class="clear"></div>';

	
	$(csslocationin).html(statsvisualisation);	
	
	
};

/**
*  Placer analysis markup
* @method analysisPlacer	
*
*/	
viewtemplates.prototype.analysisPlacer = function(attentionidlive) {  
	
	var swimdataelement = '';

	swimdataelement += '<div class="chart-flow" id="chart-vis-' + attentionidlive + '"></div>';
	//swimdataelement += '<div class="accum-chart-flow" id="accum-chart-vis-' + attentionidlive + '"></div>';
	swimdataelement += '<div class="analysis-statistics-flow" id="analysis-statistics-' + attentionidlive + '"></div>';
	swimdataelement += '<div class="cummulative-chart-anaylsis"><a  id="cummulative-analysis-' + attentionidlive + '" data-date-id="' + attentionidlive + '" data-identity-id="' + attentionidlive + '" class="cummulative-anaylsis">Accumulate Chart</a></div>';
	swimdataelement += '<div class="splits-ratio-anaylsis"><a  id="splitsratio-analysis-' + attentionidlive + '" data-date-id="' + attentionidlive + '" data-identity-id="' + attentionidlive + '" class="splitsratio-anaylsis">Stroke Splits Ratio Analysis</a></div>';
	swimdataelement += '<div class="exit-anaylsis"><a  id="exit-analysis-' + attentionidlive + '" data-date-id="' + attentionidlive + '" data-identity-id="' + attentionidlive + '" class="exit-anaylsis">exit</a></div>';
	swimdataelement += '<div class="clear" ></div>';//'<div style="clear:both;"></div>'; 
	$("#anlaysisid-" + attentionidlive).html(swimdataelement);
	
};


/**
* format a digital number string to time format presentation
* @method formatTime
*/
viewtemplates.prototype.formatTime = function(ms) {

	function leading0(number){ return number < 10 ? "0" : "";}

	var hundredths = ms;
	mins = parseInt((hundredths / 1000) / 60);
	secs = parseInt((hundredths / 1000) % 60);
	huns = parseInt(hundredths % 1000);
	
	output = leading0(mins) + mins + ":" + leading0(secs) + secs + "." + leading0(huns) + huns;
	
	return output;
};	
		
/**
* main attention fix UI template
* @method formatTime
*/
viewtemplates.prototype.formswimmers = function(swid, swimmername, swimdatain) {

	var markanddata = {};
	var displaytime = this.formatTime(swimdatain.splittimes.slice(-1));
	var swimdataelement = '';
	
	swimdataelement += '<li class="attentionhistory" id="historyfix" data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '">';
	swimdataelement += '<div id="activity" data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '" >';
	swimdataelement += '<div class="socialdata"  id="' + swid + '" data-networkidentity="networkidentity" >' + swimmername + '</div>';

	swimdataelement += '<div class="activitydetail" >';	
	swimdataelement += '<div class="focuselement-h"  id="' + swimdatain.sessionid + '" >Training</div>';

	// first extra object key
	var swimcategories = Object.keys(swimdatain.swiminfo);
	swimcategories.forEach(function(swimcat) {
		if(swimcat != 'swimdate' ) {	
			swimdataelement += '<div id="' + swimdatain.sessionid + '"  class="focuselement-h" data-knowledgeword="' + swimdatain.swiminfo[swimcat] + '">' + swimdatain.swiminfo[swimcat] + '</div> ';
			
		}
		else 
		{
		}
	});	
	

	//swimdataelement += '<a id="analysis"  href=""  data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '">Analysis</a>';
	swimdataelement += '<div id="datetime" >';
	swimdataelement += '<a id="' + swimdatain.sessionid + '"  href="" class="focuselement-date" data-knowledgeword="' + swimdatain.swiminfo['swimdate'] + '">' + swimdatain.swiminfo['swimdate'] + '</a>';
	swimdataelement += '</div>';
	swimdataelement += '</div>';
	swimdataelement += '<div class="timefocus-fix"><div id="endtime" class="timefocus" data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '">' + displaytime + '</div>';
	swimdataelement += '</div>';
	
	swimdataelement += '<div id="feedback-" class="feedback-fix" >Faster/slower</div>';
	swimdataelement += '<div id="action-" class="action-fix" >Action:</div>';
	//swimdataelement += '<div id="clear"></div>';
	swimdataelement += '</div>';

	swimdataelement += '<div class="visualisation-flow" id="anlaysisid-'+ swimdatain.sessionid + '" data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '">';

	swimdataelement += '</div>';
	swimdataelement += '</li>';
	
	//markanddata['attentionmarkup'] = swimdataelement;
	//markanddata['knowledgechain'] = swimdatain.swiminfo;
	//markanddata['splitdata'] = swimdatain.splittimes;
//console.log(swimdataelement);
	return swimdataelement;

}
