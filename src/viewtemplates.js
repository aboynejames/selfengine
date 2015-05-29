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
	var effortcheck = '';
	for(var i=0; i< splitlength; i++) 
	{
		 if(!isNaN(statsdatain.effortsplits[i]) == true)
		{
			effortcheck = statsdatain.effortsplits[i];
		}
		else
		{
			var effortcheck = '--';
		}
		
		statsvisualisation += '<div class="actualsp"><font color="' + colorcode[i] + '">' + this.formatTime(fixdatain[1][i][1]) + '</font></div><div class="avgstat">' + this.formatTime(statsdatain.individualsplits[i]) + '</div><div class="acctime"><font color="' + colorcode[i] + '">' + this.formatTime(fixdatain[0][i][1]) + '</font></div><div class="accavgstat">' + this.formatTime(statsdatain.accumulatedsplits[i]) + '</div><div class="effortratio">' + effortcheck + '</div>';
	
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
	swimdataelement += '<div class="exit-anaylsis"><a  id="exit-analysis-' + attentionidlive + '" data-date-id="' + attentionidlive + '" data-identity-id="' + attentionidlive + '" class="exit-anaylsis">close</a></div>';

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
* build digital time
* @method digitalTime
*/
viewtemplates.prototype.digitalTime = function(hr, min, sec, hnrdths) {

	var digitaltime = 0;

	digitaltime = (hr * 3600000000) + (min * 60000) + (sec * 1000) + (hnrdths * 10);
	
	return digitaltime;
};

/**
* validate is an integer
* @method validateInteger
*/
viewtemplates.prototype.validateInteger = function(formdataIn) {

	var numbervalid =  !isNaN(formdataIn) && parseInt(formdataIn) == formdataIn;
	if(numbervalid == 1)
	{				
		// check length is greater than 1 ie got to have one digital 0 to 9
		if(formdataIn.length > 0)
		{
								
			var hourinpass = formdataIn;
						
		}		
	}
	
	return hourinpass;
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
	swimdataelement += '<div id="activity" class="activity-id-' + swimdatain.sessionid + '" data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '" data-activity-status-id="on">';
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
	
	swimdataelement += '<div id="feedback-" class="feedback-fix"  data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '">Effort = </div>';
	swimdataelement += '<div id="action-" class="action-fix" data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '" >Future:</div>';
	//swimdataelement += '<div id="clear"></div>';
	swimdataelement += '</div>';

	swimdataelement += '<div class="visualisation-flow" id="anlaysisid-'+ swimdatain.sessionid + '" data-date-id="' + swimdatain.sessionid + '" data-identity-id="' + swid + '">';

	swimdataelement += '</div>';
	swimdataelement += '</li>';

	return swimdataelement;

};

/**
* active attention HTML UI code
* @method knowledgeHTML
*
*/
viewtemplates.prototype.knowledgeHTML = function(knowledgeTemplate) {

	var insettingKnowledge = knowledgeTemplate;
	
	HTMLattentionfix = '';
	//HTMLattentionfix +='<ul id="dragselfnow" class="connectedSortable"></ul>';
	HTMLattentionfix += '<div id="attentionfix">';
		
	
	insettingKnowledge.forEach(function(grouptitle){
		
		
		if(grouptitle[0] == 'Distance')
		{
			//pass the lane data to get html ready
			HTMLattentionfix += '<li class="fixgroup" id="' + grouptitle[0] + '" data-attentionfixttitle="inactive" >';
			HTMLattentionfix += '<a href="" id="' + grouptitle[0] + '" class="fixgrouptitle" data-knowledgeword="knowledgeword" style=""> ' + grouptitle[0] + '</a>';
			HTMLattentionfix += '<ul class="active-sub" id="' + grouptitle[0] + '" >';
			var countelements = 1;

			grouptitle[1].forEach(function(listelement){
				// make first element class selectedof empty
				if(countelements == 1)
				{
					HTMLattentionfix += '<li id="n' + listelement + '" class="focuselement" style="" data-knowledgeword="knowledgeword">';
					HTMLattentionfix += '<a href="" id="n' + listelement + '" class="selected" >' + listelement + '</a>';
					HTMLattentionfix += '</li>';
					countelements++
				}
				else
				{
					HTMLattentionfix += '<li id="n' + listelement + '" class="focuselement" style="" data-knowledgeword="knowledgeword">';
					HTMLattentionfix += '<a href="" id="n' + listelement + '" class="selectedoff" >' + listelement + '</a>';
					HTMLattentionfix += '</li>';
				}
			});
		
			HTMLattentionfix += '</ul>';
			HTMLattentionfix += '</li>';			
			
		}
		else
		{
			//pass the lane data to get html ready
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
			
		}	
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
	
	recordtimetemplate += '<div id="record-date"><label for="date">Date</label> <input type="text" id="datepicker" readonly="readonly" /></div>';
	//recordtimetemplate += '<div><label for="time">Time</label><input type="text" size="20"  value="" class="text ui-widget-content ui-corner-all" id="time" name="time" >hh</div>';
	recordtimetemplate += '<div id="record-time">';	
	recordtimetemplate += '<ul>';
        recordtimetemplate += '<li class="time-part-date" >';
        recordtimetemplate += '<h2>Enter Time</h2>';
        //recordtimetemplate += '<span class="required_notification">* Denotes Required Field</span>';
        recordtimetemplate += '</li>';
	recordtimetemplate += '</ul>';
	recordtimetemplate += '<ul class="timeparts">';
        recordtimetemplate += '<li class="time-part" >';
        recordtimetemplate += '<input type="number" id="hourholder" value="0" min="00" max="59" required />';
	recordtimetemplate += '<label for="name">Hours</label>';	
        recordtimetemplate += '</li>';
        recordtimetemplate += '<li class="time-part" >';
        recordtimetemplate += '<input type="number" id="minuteholder"   placeholder="--" min="00" max="59" required />';
	recordtimetemplate += '<label for="name">Minutes</label>';
	recordtimetemplate += '</li>';	
	recordtimetemplate += '<li class="time-part" >';
        recordtimetemplate += '<input type="number" id="secondsholder"   placeholder="--" min="00" max="59" required />';
	recordtimetemplate += '<label for="name">Seconds</label>';
        recordtimetemplate += '</li>';
        recordtimetemplate += '<li class="time-part" >';
        recordtimetemplate += '<input type="number" id="hundredthsholder"   placeholder="--" min="00" max="99" required />';
	recordtimetemplate += '<label for="name">Hundredths</label>';
        recordtimetemplate += '</li>';
	recordtimetemplate += '</ul>';	
	recordtimetemplate += '<button type="submit" class="submit" id="recordtimesave" >Save</button></form>';
	recordtimetemplate += '<div id="timeformfeedback"></div>';
	recordtimetemplate += '</div>';		

	$("#makerecordtime").append(recordtimetemplate);

		// datepicker 
		$( "#datepicker" ).datepicker({
		changeMonth: true,
		changeYear: true,
		yearRange: "-130:+0"
		});			
		
		$( "#buildrecordtimeidentity" ).sortable({
			connectWith: ".connectedSortable"
		}).disableSelection();
	

	
};

/**
* table layout of personal records
* @method recordtable
*
*/
viewtemplates.prototype.recordtable = function() {

	var recordtableHTML = ''
	
	recordtableHTML += '<div id="record-table"><div class="record-heading" >Stroke</div><div class="record-heading-distance" >Distance</div><div class="record-heading" >Pool</div><div class="record-heading" >Time</div><div class="record-heading" >on Date</div></div>';
	//recordtableHTML += '<div><div class="record-heading" >Backstroke</div><div class="record-heading" >100m</div><div class="record-heading" >Pool</div><div class="record-heading" >01.23.21</div><div class="record-heading" >21 Jan 2014</div></div>'
		
	$("#record-modal").html(recordtableHTML);
	
	$("#record-modal").dialog({
		height: 700,
		width:940,
		modal: true,
		close: function( event, ui ) {
		// add back placer
			$(".ui-dialog").remove();
			$("#record-modal").empty();
		}
	});
	
};

/**
* table layout of world records
* @method worldrecordtable
*
*/
viewtemplates.prototype.worldrecordtable = function() {

	var recordtableHTML = ''
	
	recordtableHTML += '<div id="record-table"><div class="record-heading" >Stroke</div><div class="record-heading-distance" >Distance</div><div class="record-heading" >Pool</div><div class="record-heading-identity" >Identity</div><div class="record-heading" >Time</div><div class="record-heading" >on Date</div></div>';
	//recordtableHTML += '<div><div class="record-heading" >Backstroke</div><div class="record-heading" >100m</div><div class="record-heading" >Pool</div><div class="record-heading" >01.23.21</div><div class="record-heading" >21 Jan 2014</div></div>'
		
	$("#record-modal").html(recordtableHTML);
	
	$("#record-modal").dialog({
		height: 700,
		width:940,
		modal: true,
		close: function( event, ui ) {
		// add back placer
			$(".ui-dialog").remove();
			$("#record-modal").empty();
		}
	});
	
};

/**
* add record content line at a time
* @method recordtableFill
*
*/
viewtemplates.prototype.recordtableFill = function(recFilldata, reid) {
	
	var recordtablefillHTML = '';
	
	function isOdd(num) { return num % 2;}
	var oddnumbercheck = isOdd(reid);
	if(oddnumbercheck == true) {	
	
	recordtablefillHTML = '<div class="record-chain-odd" id="recid-' + reid + '"><div class="record-heading" >' + recFilldata[1] + '</div><div class="record-heading-distance" >' + recFilldata[2] + '</div><div class="record-heading" >' + recFilldata[4] + '</div><div class="record-heading" id="recid-time-' + reid + '">' + recFilldata[5] + '</div><div class="record-heading" id="recid-date-' + reid + '">' + recFilldata[6] + '</div></div>';
	}
	else
	{
		recordtablefillHTML = '<div class="record-chain" id="recid-' + reid + '"><div class="record-heading" >' + recFilldata[1] + '</div><div class="record-heading-distance" >' + recFilldata[2] + '</div><div class="record-heading" >' + recFilldata[4] + '</div><div class="record-heading" id="recid-time-' + reid + '">' + recFilldata[5] + '</div><div class="record-heading" id="recid-date-' + reid + '">' + recFilldata[6] + '</div></div>';
	}

	$("#record-table").append(recordtablefillHTML);

};

/**
* add world record content line at a time
* @method worldrecordtableFill
*
*/
viewtemplates.prototype.worldrecordtableFill = function(recFilldata, reid) {
	
	var recordtablefillHTML = '';
	//  odd number
	function isOdd(num) { return num % 2;}
	var oddnumbercheck = isOdd(reid);
	if(oddnumbercheck == true) {
		recordtablefillHTML = '<div class="record-chain-odd" id="recid-' + reid + '"><div class="record-heading" >' + recFilldata[1] + '</div><div class="record-heading-distance" >' + recFilldata[2] + '</div><div class="record-heading" >' + recFilldata[4] + '</div><div class="record-heading-identity" id="recid-identity-' + reid + '"></div><div class="record-heading" id="recid-time-' + reid + '">' + recFilldata[5] + '</div><div class="record-heading" id="recid-date-' + reid + '">' + recFilldata[6] + '</div></div>'
	}
	else
	{
		recordtablefillHTML = '<div class="record-chain" id="recid-' + reid + '"><div class="record-heading" >' + recFilldata[1] + '</div><div class="record-heading-distance" >' + recFilldata[2] + '</div><div class="record-heading" >' + recFilldata[4] + '</div><div class="record-heading-identity" id="recid-identity-' + reid + '"></div><div class="record-heading" id="recid-time-' + reid + '">' + recFilldata[5] + '</div><div class="record-heading" id="recid-date-' + reid + '">' + recFilldata[6] + '</div></div>'
		
	}
	
	$("#record-table").append(recordtablefillHTML);

};

/**
* upate table of records
* @method recordtableUpdate
*
*/
viewtemplates.prototype.recordtableUpdate = function(recUpdatein, reid) {
	
	var datainteger = parseInt((recUpdatein.fasttime[0]),10);
	var recordtimeextract = recUpdatein.fasttime[1];
	
	var datarec = new Date(datainteger);
	var datarecshort = datarec.toString();
	$("#recid-time-" + reid).text(this.formatTime(recordtimeextract));
	$("#recid-date-" + reid).text(datarecshort.substring(0,16));
	
};

/**
* upate table of world records
* @method worldrecordtableUpdate
*
*/
viewtemplates.prototype.worldrecordtableUpdate = function(recUpdatein, reid) {
	
	var datainteger = recUpdatein.date;
	var recordtimeextract = recUpdatein.time;
	var wridentity = recUpdatein.identity;
	
	var datarec = new Date(datainteger);
	var datarecshort = datarec.toString();
	$("#recid-time-" + reid).text(this.formatTime(recordtimeextract));
	$("#recid-date-" + reid).text(datarecshort.substring(0,16));
	$("#recid-identity-" + reid).text(wridentity);
	
};
