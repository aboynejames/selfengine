buster.spec.expose(); // Make spec functions global

var spec = describe("given live context produce analysis", function () {
	before(function () {
		
		this.testlivecontext = new livedata();
	
	});

	it("check object defined", function () {
	   
		buster.assert.defined(livedata); 
		
	});
	
	it("object is created", function () {
	 
			buster.assert.isObject(this.testlivecontext);
	});
	
	it("control function for analysis", function () {
		
		buster.assert.isFunction(this.testlivecontext.quickanalysisControl);

	});
	
	it("world record analysis calculations", function () {
		
		buster.assert.isFunction(this.testlivecontext.quickworldrecordAnalysis);

	});	
	
	it("local world record analysis", function () {
		
		buster.assert.isFunction(this.testlivecontext.worldrecordAnalysis);

	});	

	it("sets live context for the analysis", function () {
		
		buster.assert.isFunction(this.testlivecontext.setContext);

	});
	
	it("check and get for local data", function () {
		
		buster.assert.isFunction(this.testlivecontext.localDatacall);

	});	
	
	it("check and get local knowledge", function () {
		
		buster.assert.isFunction(this.testlivecontext.knowledgeDatacall);

	});	

	
	it("check get local identity network data", function () {
		
		buster.assert.isFunction(this.testlivecontext.networkidentityDatacall);

	});
	
	it("check get local word relationship data", function () {
		
		buster.assert.isFunction(this.testlivecontext.relationshipDatacall);

	});	
	
	it("sort low to high data  ", function () {
		
		buster.assert.isFunction(this.testlivecontext.sortlowtohigh);

	});	

	
	it("query local database", function () {
		
		buster.assert.isFunction(this.testlivecontext.livedatain);

	});
	
	it("query local knowledge from database", function () {
		
		buster.assert.isFunction(this.testlivecontext.liveknowledgein);

	});	
	
	it("query local identity social network database ", function () {
		
		buster.assert.isFunction(this.testlivecontext.livennetworkidenityin);

	});	

	
	it("relationship between knowledge data query", function () {
		
		buster.assert.isFunction(this.testlivecontext.liverelationshipsin);

	});
	
	it("match live context to knowledge history of data", function () {
		
		buster.assert.isFunction(this.testlivecontext.livefilterknowlegeword );

	});	
	
	it("filter data based on knowledge context ", function () {
		
		buster.assert.isFunction(this.testlivecontext.livefilter);

	});		

	it("build knowledge data from relationship profile", function () {
		
		buster.assert.isFunction(this.testlivecontext.relationshipfilter);

	});	

	
	it("filter indentity list given knowledge context ", function () {
		
		buster.assert.isFunction(this.testlivecontext.filternetwork);

	});	

	it("start preparation of chart data", function () {
		
		buster.assert.isFunction(this.testlivecontext.startchart);

	});	

	it("start preparation of real time chart ", function () {
		
		buster.assert.isFunction(this.testlivecontext.realtimechart);

	});	
	
	it("creation of a new chart object", function () {
		
		buster.assert.isFunction(this.testlivecontext.chartproduction);

	});	
	
	it("product HTML table of word records ", function () {
		
		buster.assert.isFunction(this.testlivecontext.activeattentionHTML);

	});	
	
	it("prepare HTML code of attention fix histories", function () {
		
		buster.assert.isFunction(this.testlivecontext.attentionhistoryHTML);

	});	

	it("prepare HTML code display social indentity network", function () {
		
		buster.assert.isFunction(this.testlivecontext.socialNetworkHTML);

	});	

	
});