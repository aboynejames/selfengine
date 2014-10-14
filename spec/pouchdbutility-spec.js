buster.spec.expose(); // Make spec functions global

var spec = describe("local pouchdb storage class", function () {
	before(function () {
		
		this.testpouch= new pouchdbSettings();

	});

	it("check object defined", function () {
	   		
		buster.assert.defined(pouchdbSettings); 
	});
	
	it("object is created", function () {

			buster.assert.isObject(this.testpouch);
	});
	
	it("check create pouch function ", function () {

		buster.assert.isFunction(this.testpouch.createPouchdb);
	}); 

	it("check bulksave function", function () {
	   
		buster.assert.isFunction(this.testpouch.bulkSave);
	}); 
	
	it("check singlesave pouch function ", function () {

		buster.assert.isFunction(this.testpouch.singleSave);
	}); 

	it("check updatesingle function", function () {
	   
		buster.assert.isFunction(this.testpouch.updateSingle);
	}); 
	
	it("check view all docs pouch function ", function () {

		buster.assert.isFunction(this.testpouch.allDocs);
	}); 

	it("check get document function", function () {
	   
		buster.assert.isFunction(this.testpouch.getDoc);
	}); 

	it("check save single doc", function () {
	   
		buster.assert.isFunction(this.testpouch.putDoc);
	}); 
	
	it("check delete single document pouch function ", function () {

		buster.assert.isFunction(this.testpouch.deleteDoc);
	}); 

	it("check custom query swimmers name function", function () {
	   
		buster.assert.isFunction(this.testpouch.mapQueryname);
	}); 

	it("check custom query local knowledge function", function () {
	   
		buster.assert.isFunction(this.testpouch.mapQueryknowledge);
	}); 
	
	it("check custom query local knowledge LIST function", function () {
	   
		buster.assert.isFunction(this.testpouch.mapQueryknowledgelist);
	}); 	

	it("check custom query local live attention context", function () {
	   
		buster.assert.isFunction(this.testpouch.mapQueryLIVE);
	});
	
	it("check utility changelog data pouch function ", function () {

		buster.assert.isFunction(this.testpouch.changeLog);
	}); 

	it("check utility changelog with filter function", function () {
	   
		buster.assert.isFunction(this.testpouch.filterchangeLog);
	}); 
	
	it("check delete entire  pouchdb function ", function () {

		buster.assert.isFunction(this.testpouch.deletePouch);
	}); 

	it("check replication pouch function", function () {
	   
		buster.assert.isFunction(this.testpouch.replicate);
	}); 
		
	
});