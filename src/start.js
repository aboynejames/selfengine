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
	
});