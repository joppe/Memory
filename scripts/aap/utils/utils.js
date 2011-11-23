/*global aap, jQuery*/

aap.utils = {
	/**
	 * @param {String/Number/Object/Array} variable
	 * @return {Boolean}
	 */
	isUndefined: function (variable) {
		if (typeof variable === 'undefined') {
			return true;
		} else {
			return false;
		}
	},

	/**
	 * @param {String/Number/Object/Array} supplied_value
	 * @param {String/Number/Object/Array} default_value
	 * @return {String/Number/Object/Array}
	 */
	defaultValue: function (supplied_value, default_value) {
		var value = supplied_value;

		if (aap.utils.isUndefined(supplied_value) === true) {
			value = default_value;
		}

		return value;
	},

    /**
     * Get a random number
     *
     * @param {Number} min
     * @param {Number} max
     */
    getRandomNumber: function (min, max) {
        var range = max - min,
            random_number = min + Math.round(range * Math.random());

        return random_number;
    },

	/**
	 * Pad a string with a character to a certain length
	 *
	 * @param {String} text
	 * @param {Number} target_length
	 * @param {String} char
	 * @param {String} [orientation] "left" or "right""
	 * @return {String}
	 */
	strPad: function (text, target_length, char, orientation) {
		var length = target_length - text.length,
			index;

		if (length <= 0) {
			return text;
		}

		orientation = (aap.utils.isUndefined(orientation) === true ? 'left' : orientation);

		for (index = 0; index < length; index += 1) {
			if (orientation === 'right') {
				text += char;
			} else {
				text = char + text;
			}
		}

		return text;
	},

    /**
     * Count the number of properties for a given object
     * 
     * @param {Object} object
     * @return {Number}
     */
    objectLength: function (object) {
        var count = 0,
            property;

        for (property in object) {
            if (object.hasOwnProperty(property)) {
                count += 1;
            }
        }

        return count;
    }
};
aap.utils.createUniqueId = (function () {
	var unique_ids = {},
		format = '8-4-4-4-12'.split('-');
	/**
     * What this function does is generate a random string of 4 characters (string representation of a hexadecimal number)
     *
     * 1. Math.random() generates a random float between 0 and 1
     * 2. 1 + Math.random() generate a random float between 1 and 2
     * 3. 0x10000 multiply the random number with a hexadecimal number, results in a large float
     * 4. do a bitwise or, results in an integer (like Math.floor)
     * 5. create hexedecimal string of the integer results in a string of five characters
     * 6. skip the first char results in a string of four characters
     *
     * source: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
     */
	function generateRandomString() {
       return (((1+Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

	function generateUniqueId() {
		var unique_id = '';

		jQuery.each(format, function (index, value) {
			var loops = parseInt(value, 10) / 4,
				index;

			if (unique_id !== '') {
				unique_id += '-';
			}

			for (index = 0; index < loops; index += 1) {
				unique_id += generateRandomString();
			}
		});

		return unique_id;
	}

	return function () {
		var unique_id = generateUniqueId();

		while (aap.utils.isUndefined(unique_ids[unique_id]) === false) {
			unique_id = generateUniqueId();
		}

		unique_ids[unique_id] = true;

		return unique_id;
	};
}());
