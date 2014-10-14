buster.spec.expose(); // Make spec functions global

var spec = describe("HTML production class", function () {
	before(function () {
		
		this.testHTML = new viewtemplates();
	
	});

	it("check object defined", function () {
	   
		buster.assert.defined(viewtemplates); 
		
	});
	
	it("object is created", function () {
	 
		buster.assert.isObject(this.testHTML);
	});
	
	it("for when multiple view exist", function () {
		
		buster.assert.isFunction(this.testHTML.setView);
	});
	
	it("Statistic displayed in a table div layout", function () {
		
		buster.assert.isFunction(this.testHTML.summaryStatisticsbox);
	});
	
	it("Place HTML code for anlaysis", function () {
		
		buster.assert.isFunction(this.testHTML.analysisPlacer);
	});	
	
	it("time formatting utility", function () {
		
		buster.assert.isFunction(this.testHTML.formatTime);
	});
	
	it("Digital time formatting", function () {
		
		buster.assert.isFunction(this.testHTML.digitalTime);
	});
	
	it("confirm valid integer utility", function () {
		
		buster.assert.isFunction(this.testHTML.validateInteger);
	});	
	
	it("HTML form add now identity data", function () {
		
		buster.assert.isFunction(this.testHTML.formswimmers);
	});
	
	it("knowledge context HTML UI", function () {
		
		buster.assert.isFunction(this.testHTML.knowledgeHTML);
	});
	
	it("form to add new knowledge", function () {
		
		buster.assert.isFunction(this.testHTML.knowledgeTimeIn);
	});
	
	it("table div layout for time record data", function () {
		
		buster.assert.isFunction(this.testHTML.recordtable);
	});	
	
	it("table div layout for time world record data", function () {
		
		buster.assert.isFunction(this.testHTML.worldrecordtable);
	});
	
	it("Fill addiitional data into existing table", function () {
		
		buster.assert.isFunction(this.testHTML.recordtableFill);
	});
	
	it("Fill word record time into existing table", function () {
		
		buster.assert.isFunction(this.testHTML.worldrecordtableFill);
	});
	
	it("update individual time element in table", function () {
		
		buster.assert.isFunction(this.testHTML.recordtableUpdate);
	});
	
	it("update world time element in table", function () {
		
		buster.assert.isFunction(this.testHTML.worldrecordtableUpdate);
	});
	
	
});