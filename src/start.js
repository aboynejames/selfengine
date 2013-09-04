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
		
		$("#networkflow").click(function(e) {
			e.preventDefault(e);
			var networkflowin = $(e.target);	
console.log(networkflowin.attr("id"));
			// present to UI and save to Pouchdb, sync to cloud
			if(networkflowin.attr("id") == 'networkidentitysave')
			{
				$('#activenetwork').html('<a href="" id="identitylive" >micheal Phelps</a>');
				
			}

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
								title: 'Recorded Times'
						});
						
//console.log(graph);		
		
	})(document.getElementById(container), d1);

		var fcontainer = "futurechart";	
	var f1 = [[0, 3],[4, 8],[8, 5],[9, 13] ];

(function basic_candle(container) {

    var
    d1 = [],
        price = 3.206,
        graph, i, a, b, c;

    for (i = 0; i < 50; i++) {
        a = Math.random();
        b = Math.random();
        c = (Math.random() * (a + b)) - b;
        d1.push([i, price, price + a, price - b, price + c]);
        price = price + c;
    }

    // Graph
    graph = Flotr.draw(container, [d1], {
        candles: {
            show: true,
            candleWidth: 0.6
        },
        xaxis: {
            noTicks: 10
        },
				title: 'Predicted Times'
			});
		})(document.getElementById(fcontainer));
		
});