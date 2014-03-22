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
viewtemplates.prototype.summaryStatisticsbox = function(csslocationin, fixdatain, statsdatain, colorcode) {  
	// produce statistic html presentation code
	var statsvisualisation = '';
	
	statsvisualisation += '<div class="statistics-summary">';
	splitlength = fixdatain[1].length;
	
	// two types of splits and acctime averages
	statsvisualisation += '	<div class="actualsp">Actual</div><div class="avgstat">Average</div><div class="acctime">Acc Time</div><div class="accavgstat">Acc Average</div><div class="effortratio">Effort%Race</div>';
	
	for(var i=0; i< splitlength; i++) 
	{
		
		statsvisualisation += '	<div class="actualsp"><font color="' + colorcode[i] + '">' + this.formatTime(fixdatain[1][i][1]) + '</font></div><div class="avgstat">' + this.formatTime(statsdatain.individualsplits[i]) + '</div><div class="acctime"><font color="' + colorcode[i] + '">' + this.formatTime(fixdatain[0][i][1]) + '</font></div><div class="accavgstat">' + this.formatTime(statsdatain.accumulatedsplits[i]) + '</div><div class="effortratio">' + statsdatain.effortsplits[i] + '</div>';
	
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
	swimdataelement += '<div class="chart-flow-placer">';
	swimdataelement += '<div class="chart-flow" id="chart-vis-' + attentionidlive + '">';
	swimdataelement += '</div>';
	swimdataelement += '<div class="cummulative-chart-anaylsis"><a  id="cummulative-analysis-' + attentionidlive + '" data-date-id="' + attentionidlive + '" data-identity-id="' + attentionidlive + '" class="cummulative-anaylsis">Accumulate Chart</a></div>';	
	swimdataelement += '</div>';
	
	swimdataelement += '<div class="analysis-statistics-flow-placer">';
	swimdataelement += '<div class="analysis-statistics-flow" id="analysis-statistics-' + attentionidlive + '">';
	swimdataelement += '</div>';
	swimdataelement += '<div class="splits-ratio-anaylsis"><a  id="splitsratio-analysis-' + attentionidlive + '" data-date-id="' + attentionidlive + '" data-identity-id="' + attentionidlive + '" class="splitsratio-anaylsis">Stroke Splits Ratio Analysis</a></div>';
	swimdataelement += '</div>';
	
	swimdataelement += '<div class="clear" ></div>';
	swimdataelement += '<div class="exit-anaylsis"><a  id="exit-analysis-' + attentionidlive + '" data-date-id="' + attentionidlive + '" data-identity-id="' + attentionidlive + '" class="exit-anaylsis">exit</a></div>';

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
	swimdataelement += '<a id="' + swimdatain.sessionid + '"  href="" class="focuselement-date" data-knowledgeword="' + swimdatain.swiminfo.swimdate + '">' + swimdatain.swiminfo.swimdate + '</a>';
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

};

/**
* active attention HTML UI code
* @method knowledgeHTML
*
*/
viewtemplates.prototype.knowledgeHTML = function(knowledgeTemplate) {
//console.log('build knowledge fix');
	// get the knowledge data live from login
	
	HTMLattentionfix = '';
	//HTMLattentionfix +='<ul id="dragselfnow" class="connectedSortable"></ul>';
	HTMLattentionfix += '<div id="attentionfix">';
		
	
	knowledgeTemplate.forEach(function(grouptitle){
		//pass the lane data to get html ready
//console.log(grouptitle);
		HTMLattentionfix += '<li class="fixgroup" id="' + grouptitle[0] + '" data-attentionfixttitle="inactive" >';
		HTMLattentionfix += '<a href="" id="' + grouptitle[0] + '" class="fixgrouptitle" data-knowledgeword="knowledgeword" style=""> ' + grouptitle[0] + '</a>';
		HTMLattentionfix += '<ul class="active-sub" id="' + grouptitle[0] + '" >';
		var countelements = 1;

		grouptitle[1].forEach(function(listelement){
			// make first element class selectedof empty
			if(countelements == 1)
			{
				HTMLattentionfix += '<li id="' + listelement + '" class="focuselement" style="" data-knowledgeword="knowledgeword">';
				HTMLattentionfix += '<a href="" id="' + listelement + '" class="selected" >' + listelement + '</a>';
				HTMLattentionfix += '</li>';
				countelements++
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
	
	HTMLattentionfix += '</div>';

	//$("#knowledgefix").html(HTMLattentionfix);
	return HTMLattentionfix;
	
}; 

/**
* active knowledge input form
* @method knowledgeTimeIn
*
*/
viewtemplates.prototype.knowledgeTimeIn = function(knowledgeIn) {

	// get recordtime HTML tool code
	recordtimetemplate = '';
	recordtimetemplatecontext = '';
	knowledgeoptions = '';
	// have three default input tabs me club world
	//recordtimetemplatecontext += '<a href="" id="recordtimeme" >me</a> <a href="" id="recordtimeclub" >club</a> <a href="" id="Worldrecord" >world</a>';
	//recordtimetemplatecontext = 'me';
	$("#makerecordtime").show();
	//$("#toolsactive").append('<section id="makerecordtime" >' + recordtimetemplatecontext + '</section>');

	// given recordtime context produce a necessary forms (ready for use)
	//me code
	recordtimetemplate += '<form id="newrecordtime" action="#" method="post">';
	
	// knowledge tool, build for enter swimming time individual
	recordtimetemplate += viewTemplates.knowledgeHTML(knowledgeIn);
	
		
	recordtimetemplate += '<div><label for="date">Date</label> <input type="text" id="datepicker" /></div>';
	recordtimetemplate += '<div><label for="time">Time</label><input type="text" size="20"  value="" class="text ui-widget-content ui-corner-all" id="time" name="time" >hh.mm.ss.dd</div>';
	recordtimetemplate += '<button type="submit" class="submit" id="recordtimesave" >Save</button></form>';

	$("#makerecordtime").append(recordtimetemplate);

		// datepicker 
		$( "#datepicker" ).datepicker({
		changeMonth: true,
		changeYear: true
		});			
		
		$( "#buildrecordtimeidentity" ).sortable({
			connectWith: ".connectedSortable"
		}).disableSelection();
	

	
};
