/*global aap, jQuery*/

aap.dom = (function () {
	var cached_elements = {};

	return {
		getCachedElement: function (selector) {
			if (aap.utils.isUndefined(cached_elements[selector])) {
				cached_elements[selector] = jQuery(selector);
			}

			return cached_elements[selector];
		}
	};
}());