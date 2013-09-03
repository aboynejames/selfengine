/**
*  jQuery listen for clicks and interaction	
* 
*/	
$(document).ready(function(){
		
	liveLogic = new selfLogic();
			
		$("a").click(function(e) {
			e.preventDefault(e);
			liveLogic.frameworklogic(this);
			
			
		});
		
	var container = "pastchart";	
	var d1 = [[0, 3],[4, 8],[8, 5],[9, 13] ];
	(function basic(container, d1) {

//console.log(container);
						// Draw Graph
						graph = Flotr.draw(container, [d1], {
								xaxis: {
										//majorTickFreq: 1
									mode: 'time',
									labelsAngle: 45
								},
								grid: {
										//minorVerticalLines: true
								},
								yaxis: {
									min: 0
								},
								title: 'Current Times'
						});
						
//console.log(graph);		
		
	})(document.getElementById(container), d1);

		var fcontainer = "futurechart";	
	var f1 = [[0, 3],[4, 8],[8, 5],[9, 13] ];
	(function basic(container, d1) {

//console.log(container);
						// Draw Graph
						graph = Flotr.draw(container, [f1], {
								xaxis: {
										//majorTickFreq: 1
									mode: 'time',
									labelsAngle: 45
								},
								grid: {
										//minorVerticalLines: true
								},
								yaxis: {
									min: 0
								},
								title: 'Current Times'
						});
						
//console.log(graph);		
		
	})(document.getElementById(fcontainer), f1);
	

		
});