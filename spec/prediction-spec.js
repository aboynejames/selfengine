buster.spec.expose(); // Make spec functions global

var spec = describe("statistical Least means square class", function () {
	before(function () {
		
		this.testfuture = new selfprediction();
	
	});

	it("check object defined", function () {
	   
		buster.assert.defined(selfprediction); 
		
	});
	
	it("object is created", function () {
	 
			buster.assert.isObject(this.testfuture);
	});
	
	it("set control logic of calculations ", function () {
		
		buster.assert.isFunction(this.testfuture.predictionlogic);

	});
	
	it("performs statistics calculations ", function () {
		
		buster.assert.isFunction(this.testfuture.predictionout);

	});	
	
	it("prepared data for charting ", function () {
		
		buster.assert.isFunction(this.testfuture.predictionchartdata);

	});	
		
	
});