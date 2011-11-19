/*global memory, jQuery , setInterval, clearInterval*/

memory.timer = (function ($) {
	/**
	 * Stop the timer
	 *
	 * @param {Object} timer
	 */
	function stop(timer) {
		var interval_identifier = timer.intervalIdentifier();

		clearInterval(interval_identifier);
	}

	/**
	 * Update the timer
	 *
	 * @param {Object} timer
	 */
	function update(timer) {
		var digits = timer.getDigits(),
			value = timer.value(),
			timer_element = timer.getElement(),
			triggers = timer.triggers();

		digits.update(value);

		if (triggers.length > 0) {
			$.each(triggers, function (index) {
				if (triggers[index].value === value) {
					triggers[index].callback();
				}
			});
		}

		if (value < 20) {
			if (value % 2 === 0) {
				timer_element.addClass('alert');
			} else {
				timer_element.removeClass('alert');
			}
		}
	}

	/**
	 * Start the timer
	 *
	 * @param {Object} timer
	 */
	function start(timer) {
		var interval_identifier = timer.intervalIdentifier();

		// clear the interval
		clearInterval(interval_identifier);

		// create a new interval
		interval_identifier = setInterval(function () {
			var value = timer.value();

			value -= 1;

			timer.value(value);

			update(timer);

			if (value === 0) {
				stop(timer);
			}
		}, 200);

		timer.intervalIdentifier(interval_identifier);
	}

	/**
	 * Create the timer
	 *
	 * @param {String} timer_element_selector
	 * @param {Number} seconds
	 */
	function createTimer(timer_element_selector, seconds) {
		var timer,
			timer_element = $(timer_element_selector),
			start_value = Number(seconds),
			digits = aap.digits.create(Number(start_value).toString(10).length, start_value, timer_element),
			value = Number(seconds),
			interval_identifier,
			triggers = [];

		timer = {
			/**
			 * @return {Number}
			 */
			getStartValue: function () {
				return start_value;
			},

			/**
			 * @return {jQuery}
			 */
			getElement: function () {
				return timer_element;
			},

			/**
			 * @return {Object}
			 */
			getDigits: function () {
				return digits;
			},

			/**
			 * @param {Number} [new_value]
			 * @return {Number}
			 */
			value: function (new_value) {
				if (aap.utils.isUndefined(new_value) === false) {
					value = new_value;
				}

				return value;
			},

			/**
			 * @param {Number} [new_interval_identifier]
			 * @return {Number}
			 */
			intervalIdentifier: function (new_interval_identifier) {
				if (aap.utils.isUndefined(new_interval_identifier) === false) {
					interval_identifier = new_interval_identifier;
				}

				return interval_identifier;
			},

			/**
			 * @param {Number} value
			 * @param {Function} callback
			 * @return {Array}
			 */
			triggers: function (value, callback) {
				if (aap.utils.isUndefined(value) === false && aap.utils.isUndefined(callback) === false) {
					triggers.push({
						value: value,
						callback: callback
					});
				}

				return triggers;
			}
		};

		return timer;
	}

	// return the public interface
	return {
		/**
		 * Create the timer
		 *
		 * @param {Object} game_api
		 * @param {String} timer_element_selector
		 * @param {Number} seconds
		 * @return {Object}
		 */
		create: function (game_api, timer_element_selector, seconds) {
			var timer = createTimer(timer_element_selector, seconds),
				timer_api;

			// add a trigger for when the time is up
			timer.triggers(0, function () {
				game_api.finished();
			});

			timer_api = {
				/**
				 * Start the timer
				 */
				start: function () {
					timer.getElement().removeClass('alert');

					start(timer);
				},

				/**
				 * Stop the timer
				 */
				stop: function () {
					stop(timer);
				},

				/**
				 * Set the value
				 * 
				 * @param {Number} value
				 */
				set: function (value) {
					timer.value(Number(value));
					update(timer);
				},

				/**
				 * Reset the timer
				 */
				reset: function () {
					timer.getElement().removeClass('alert');

					stop(timer);
					timer.value(timer.getStartValue());
					update(timer);
				},

				/**
				 * @return {Number}
				 */
				getValue: function () {
					return timer.value();
				},

				/**
				 * @param {Number} value
				 * @param {Function} callback
				 */
				addTrigger: function (value, callback) {
					timer.triggers(value, callback);
				}
			};

			return timer_api;
		}
	};
}(jQuery));