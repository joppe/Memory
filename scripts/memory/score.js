/*global memory, jQuery*/

/**
 * Score module
 */
memory.score = (function ($) {
	// return the public interface
	return {
		/**
		 * Initialise the timer
		 *
		 * @param {String} score_element_selector
		 * @return {Object}
		 */
		create: function (score_element_selector) {
			var score_element = $(score_element_selector),
				digits = memory.digits.create(4, 0, score_element);

			return {
				/**
				 * @param {Number} value
				 */
				update: function (value) {
					digits.update(value);
				},

				/**
				 * Reset
				 */
				reset: function () {
					digits.update(0);
				}
			};
		}
	};
}(jQuery));