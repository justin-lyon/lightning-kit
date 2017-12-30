window.acumen = (function Debouncer(acumen) {

	var debounce = function(func, delay) {
		var inDebounce = undefined;

		return function() {
			var context = this;
			var args = arguments;
			clearTimeout(inDebounce);
			inDebounce = setTimeout(function() {
				inDebounce = undefined;
				return func.apply(context, args);
			}, delay);
		};
	};

	acumen.debouncer = {
		debounce: debounce
	};

	return acumen;
})(window.acumen || {});
