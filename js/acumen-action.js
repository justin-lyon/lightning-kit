window.acumen = (function Action(acumen) {

	var call = function(component, event, helper, action){
		var a = component.get(action.name);
		if(typeof action.params !== 'undefined') {
			a.setParams(action.params);
		}
		a.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				if(typeof action.onSuccess !== 'undefined'){
					action.onSuccess(response);
				}
			}
			else if (state === "ERROR") {
				if(typeof action.onError !== 'undefined'){
					action.onError(response);
    			}
				var errors = response.getError();
				if (errors) {
					if (errors[0] && errors[0].message) {
						console.log("Error message: " +	errors[0].message);
					}
				} else {
					console.log("Unknown error");
				}
			}
		});
		$A.enqueueAction(a);
	};

	acumen.action = {
		call: call
	};

	return acumen;
})(window.acumen || {});
