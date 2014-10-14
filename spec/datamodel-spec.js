buster.spec.expose(); // Make spec functions global

var spec = describe("handles the data around the app ", function () {
	before(function () {
		
		this.testdata = new datamodel();
	
	});

	it("check object defined", function () {
	   
		buster.assert.defined(datamodel); 
		
	});
	
	it("object is created", function () {
	 
		buster.assert.isObject(this.testdata);
	});
	
	it("set data coming in from the cloud", function () {
		
		buster.assert.isFunction(this.testdata.setDatain);

	});

	it("set knowledge data coming in from the cloud", function () {
		
		buster.assert.isFunction(this.testdata.setKnowledgein);
	});

	it("sets knowledge relationships coming in from cloud", function () {
		
		buster.assert.isFunction(this.testdata.returnKnowledgerelationship);
	});

	it("set competition knowledge coming from cloud", function () {
		
		buster.assert.isFunction(this.testdata.setCompetitionKnowledge);
	});

	it("sets competition data coming from cloud", function () {
		
		buster.assert.isFunction(this.testdata.setCompetitiondata);
	});

	it("set competition is split time format from cloud", function () {
		
		buster.assert.isFunction(this.testdata.setsplitsCompetitiondata);
	});

	it("set individual knowledge word data format", function () {
		
		buster.assert.isFunction(this.testdata.setKnowledgeWord);

	});

	it("set knowledge relationship data format", function () {
		
		buster.assert.isFunction(this.testdata.setKnowledgeRelationship);
	});

	it("set knowledge record data format", function () {
		
		buster.assert.isFunction(this.testdata.setKnowledgeRecord);
	});

	it("build knowledge data mode base on a filter", function () {
		
		buster.assert.isFunction(this.testdata.buildknowledgeFilter);
	});

	it("returns a knowledge chain data format", function () {
		
		buster.assert.isFunction(this.testdata.knowledgechainback);
	});

	it("build knowledge data object of words", function () {
		
		buster.assert.isFunction(this.testdata.knowledgewordsextraction);
	});

	it("return matching data items based on specific knowledge context", function () {
		
		buster.assert.isFunction(this.testdata.knowledgechainfiltering);
	});

	it("return matching competition data items given knowledge context", function () {
		
		buster.assert.isFunction(this.testdata.knowledgechainfilteringRace);
	});

	it("filter of race data given knowledge context", function () {
		
		buster.assert.isFunction(this.testdata.buildRecordknowledgeFilter);
	});

	it("return one end time data", function () {
		
		buster.assert.isFunction(this.testdata.timeFinish);
	});

	it("return on race end time data", function () {
		
		buster.assert.isFunction(this.testdata.racetimeFinal);
	});

	it("prepare time data for chart production", function () {
		
		buster.assert.isFunction(this.testdata.timeDataprep);
	});

	it("Returns individual splits from accumlated data", function () {
		
		buster.assert.isFunction(this.testdata.splitDataprep);
	});

	it("aggregate data for chart production", function () {
		
		buster.assert.isFunction(this.testdata.accumulationDataprep);
	});

	it("produces summary statistics", function () {
		
		buster.assert.isFunction(this.testdata.statisticsDataprep);
	});

	it("allocates color to time data based on analysis", function () {
		
		buster.assert.isFunction(this.testdata.splitColorCode);
	});

	it("returns fastest compettition time data", function () {
		
		buster.assert.isFunction(this.testdata.fastestTimes);
	});

	it("effort calculation based on percentage of race pace to training", function () {
		
		buster.assert.isFunction(this.testdata.effortCalculation);
	});

	it("chart production of individual records", function () {
		
		buster.assert.isFunction(this.testdata.merecords);
	});

	it("list fastest race times", function () {
		
		buster.assert.isFunction(this.testdata.prepareRecordtimes);
	})

	it("Chart production of world records", function () {
		
		buster.assert.isFunction(this.testdata.worldrecords);
	})

	it("list word record time data", function () {
		
		buster.assert.isFunction(this.testdata.prepareworldRecordtimes);
	})

	it("Single chart production", function () {
		
		buster.assert.isFunction(this.testdata.onelementchart);
	})
	
	
});