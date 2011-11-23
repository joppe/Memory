/*global memory, aap, jQuery*/

/**
 * Digits module
 */
memory.digits = (function ($) {
	/**
	 * Create a digit element
	 *
	 * @param {String} value
	 * @param {jQuery} container_element
	 * @return {jQuery}
	 */
	function createDigitElement(value, container_element) {
		var element = $('<span class="digit"/>');

		element.text(value);
		element.appendTo(container_element);

		return element;
	}

	/**
	 * Create the digits
	 *
	 * @param {Number} number_of_digits
	 * @param {Number} value
	 * @param {jQuery} container_element
	 * @return {Object}
	 */
	function createDigits(number_of_digits, value, container_element) {
		var digits = {},
			digit_values = aap.utils.strPad(Number(value).toString(10), number_of_digits, '0').split(''),
			index;

		// create the digit elements
		for (index = 0; index < number_of_digits; index += 1) {
			digits[index] = createDigitElement(digit_values[index], container_element);
		}

		return {
			/**
			 * Update the value
			 *
			 * @param {Number} new_value
			 */
			update: function (new_value) {
				var digit_values = aap.utils.strPad(Number(new_value).toString(10), number_of_digits, '0').split('');

				$.each(digits, function (index) {
					digits[index].text(digit_values[index]);
				});
			}
		};
	}

	// return the public interface
	return {
		/**
		 * Create a digit
		 *
		 * @param {Number} number_of_digits
		 * @param {Number} value
		 * @param {jQuery} container_element
		 * @return {Object} a digit
		 */
		create: function (number_of_digits, value, container_element) {
			return createDigits(number_of_digits, value, container_element);
		}
	};
}(jQuery));