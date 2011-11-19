/*global aap*/

// create the aap namespace
var aap = {};

/**
 * @param {Object} global_namespace, the Window object
 */
aap.core  = (function (global_namespace) {
	return {
		/**
		 * Get the global namespace
		 *
		 *  @return {Object}
		 */
		getGlobalNamespace: function () {
			return global_namespace;
		},

		/**
		 * 
		 * @param namespace
		 */
		createNamespace: function(namespace) {
			var object_names = namespace.split('.'),
				target = global_namespace;

			jQuery.each(object_names, function (index, object_name) {
				if (aap.utils.isUndefined(target[object_name]) === true) {
					target[object_name] = {};
				}

				target = target[object_name];
			});
		}
	};
}(this));
