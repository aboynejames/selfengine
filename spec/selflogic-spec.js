buster.spec.expose(); // Make spec functions global

var spec = describe("master logic class ", function () {
	before(function () {
		
		this.testselflogic = new selfLogic();
	
	});

	it("check object defined", function () {
	   
		buster.assert.defined(selfLogic); 
		
	});
	
	it("object is created", function () {
	 
			buster.assert.isObject(this.testselflogic);
	});
	
	it("set knowledge template function", function () {
		
		buster.assert.isFunction(this.testselflogic.knowledgeTemplate);

	});

	it("set knowledge context function", function () {
		
		buster.assert.isFunction(this.testselflogic.knowledgeContext);

	});
		
	it("controls attention focus of framework function", function () {
		
		buster.assert.isFunction(this.testselflogic.frameworklogic);

	});

	it("set API token of live session function", function () {
		
		buster.assert.isFunction(this.testselflogic.setToken);

	});

	it("call for source data on start function", function () {
		
		buster.assert.isFunction(this.testselflogic.firstDatacall);

	});

	it("call for race data on start function", function () {
		
		buster.assert.isFunction(this.testselflogic.secondDatacall);

	});

	it("call for knowledge data on start function", function () {
		
		buster.assert.isFunction(this.testselflogic.knowledgeDatacall);

	});

	it("check email login via cloud function", function () {
		
		buster.assert.isFunction(this.testselflogic.emailsignincall);

	});
	
	it("save data back to cloud function", function () {
		
		buster.assert.isFunction(this.testselflogic.swimdataCloud);

	});

});
