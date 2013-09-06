/**
* SelfEngine
*
* SelefEngine Pouchdb utility class
*
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/

/**
* pouchdb utility class
* @class pouchdbSettings
*/
var pouchdbSettings = function() {
  this.account = {};
	this.account.pouchdbname = 'selfengine';
	this.livepouch = this.createPouchdb();

};

/**
* create or make live pouchdb database
* @method createPouchdb		
*
*/	
pouchdbSettings.prototype.createPouchdb = function() {
	
	db = new PouchDB(this.account.pouchdbname);
	return db;

};


/**
* save more than one documents to pouchdb
* @method bulkSave		
*
*/
pouchdbSettings.prototype.bulkSave = function(datain) {
	
	this.livepouch.bulkDocs({docs: datain}, function(err, response) {
console.log(response);
	});

};

/**
* save data to a single document
* @method singleSave		
*
*/	
pouchdbSettings.prototype.singleSave = function(datain) {
	
	this.livepouch.post(datain, function (err, response) {

	});

};

pouchdbSettings.prototype.updateSingle = function(datain) {
		

};


/**
* get list of all pouchdb documents
* @method allDocs		
*
*/	
pouchdbSettings.prototype.allDocs = function() {

		this.livepouch.allDocs({include_docs: true}, function(err, response) { 
	
console.log(response);	
	});
		

};

/**
* get data on one pouchdb document
* @method getDoc		
*
*/	
pouchdbSettings.prototype.getDoc = function(docid) {

		this.livepouch.get(docid, function(err, response) {
console.log(response);

			});

};

/**
*  Update specific document if ID provided
* @method putDoc		
*
*/	
pouchdbSettings.prototype.putDoc = function(designdoc) {
	
	/*this.livepouch.put({
		_id: 'mydoc',
		_rev: '1-A6157A5EA545C99B00FF904EEF05FD9F',
		title: 'Lets Dance',
	}, function(err, response) { })*/

	this.livepouch.put(designdoc, function(err, response) {

console.log(response);
		});
	
};

/**
* delete one pouchdb document
* @method deleteDoc		
*
*/	
pouchdbSettings.prototype.deleteDoc = function(docid) {
	
	this.livepouch.get(docid, function(err, doc) {
		db.remove(doc, function(err, response) { });
	});

};

/**
* a mapquery on pouchdb documents by NAME
* @method mapQueryname		
*
*/	
pouchdbSettings.prototype.mapQueryname = function(callbackin) {
		
			function map(selfengine) {
				if(selfengine.networkidentity) {
				emit(selfengine.networkidentity, selfengine.networkidentitylink);
				}
			}
			this.livepouch.query({map: map}, {reduce: false}, function(err, response) {
//console.log(response);
				callbackin(response);
		});

};

/**
* list changes on pouchdb log
* @method changeLog		
*
*/	
pouchdbSettings.prototype.changeLog = function() {

	this.livepouch.changes({complete: function(err, response) {
		
		
		}
		
	});
	
};

/**
* filter applied to pouchdb logs data
* @method filterchangeLog
*
*/	
pouchdbSettings.prototype.filterchangeLog = function(callbackin) {
	


};

/**
* copy pouchdb locally or to couchdb?
* @method replicate		
*
*/	
pouchdbSettings.prototype.replicate = function() {

PouchDB.replicate(this.account.pouchdbname, 'selfbackup', {
  onChange: onChange,
  complete: onComplete
});
	

};

/**
* Delete a whole database 
* @method deletePouch		
*
*/	
pouchdbSettings.prototype.deletePouch = function() {

	PouchDB.destroy(this.account.pouchdbname, function(err, info) { });


};

