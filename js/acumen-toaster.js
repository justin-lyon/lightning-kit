window.acumen = (function Toaster(acumen) {

	var fireToast = function(title, message, iconName, styleType) {
		var toast = $A.get("e.force:showToast");
		toast.setParams({
			title: title,
			message: message,
			key: iconName,
			type: styleType,
		});
		toast.fire();
	};

	var error = function(title, message) {
		fireToast(title, message, "error", "error");
	};

	var info = function(title, message) {
		fireToast(title, message, "info_alt", "info");
	};

	var success = function(title, message) {
		fireToast(title, message, "success", "success");
	};

	var warning = function(title, message) {
		fireToast(title, message, "warning", "warning");
	};

	acumen.toaster = {
		error: error,
		info: info,
		success: success,
		warning: warning,
	};

	return acumen;
})(window.acumen || {});
