About SelfEngine
==========

Vision: Augmented Self Intelligence

Hosting a SelfEngine
=============

1.  Edit the start.js file settings to your hosting URL
	liveSettings.cloudIP = "http://localhost:8881";
	liveSettings.localIP = "http://192.168.1.44:8881"; 	
	liveSettings.localURL = "http://localhost/ll/selfengine/src/index.html";	

2.  Update the self.appcache date (if edits have been made)


Data & Cloud Storage
--------------------------------

The SelfEngine works in conjunction with the SelfSever https://github.com/aboynejames/selfserver to populate knowledge and data ie. swimming world records on first use of the website.

Every selfengine has its own personal data store created by the SelfServer, a couchdb database.


Using the Self Engine
=============

Online: Login using Facebook or Twitter authentication.  Historical data and analysis will be displayed.  On first time use, data can be entered e.g. sporting records.

Offline: Will connect to a local sensor network (sportsPi) and display timing and other wearable data and analysis in real time.


Future Developments
=============

Peer to Peer online / offline data sharing.
Advanced analysis tools and peer comparisons.


Browsers & Mobile
===========

All HTML5 compliant.



Developers
=======

HTML5, Javascript

Testing tools:  CasperJS
NB.  need to pass in path to where code is to run tests e.g. casperjs test test/ --baseUrl=http://localhost/ll/selfengine/src/index.html --xunit=reports/test-casper.xml

Libraries
======

jQuery, jQueryUI, PouchDB