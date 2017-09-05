var acumen = (function Navigator(acumen) {

	var navigateToObjectHome = function(objectApiName) {
		var homeEvent = $A.get("e.force:navigateToObjectHome");
		homeEvent.setParams({
			scope: objectApiName,
		});
		homeEvent.fire();
	};

	var navigateToSObject = function(recordId, slideDevName) {
		var navEvent = $A.get("e.force:navigateToSObject");
		slideDevName = (slideDevName) ? slideDevName : "detail";
		navEvent.setParams({
			recordId: recordId,
			slideDevName, slideDevName
		});
		navEvent.fire();
	};

	var navigateToURL = function(url) {
		var urlEvent = $A.get("e.force:navigateToURL");
		urlEvent.setParams({
			url: url,
		});
		urlEvent.fire();
	};

	acumen.navigator = {
		navigateToObjectHome: navigateToObjectHome,
		navigateToSObject: navigateToSObject,
		navigateToURL: navigateToURL,
	};

	console.log("Navigator loaded.");
	return acumen;
})(acumen || {});