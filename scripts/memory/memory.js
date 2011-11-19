/*global memory, jQuery */

/**
 * memory module
 */
var memory = (function ($) {

	function createMemory() {
	}

	// return the public interface
	return {
		/**
		 * Create the memory game
		 * 
		 * @param {String} cards_container_selector
		 * @param {String} navigation_container_selector
		 * @param {String} score_element_selector
		 * @param {String} time_element_selector
		 */
		create: function (cards_container_selector, navigation_container_selector, score_element_selector, time_element_selector) {
			var game_api,
				timer,
				score,
				navigation;

			// create the game api
			game_api = {
				start: function () {
					timer.start();
				},
				pause: function () {
					timer.stop();
				},
				stop: function () {
					timer.stop();
					timer.set(0);
				},
				reset: function () {
					timer.reset();
				},
				finished: function () {
					console.log('finished');
				}
			};

			// create the timer
			timer = memory.timer.create(game_api, time_element_selector, 120);

			// create the score
			score = memory.score.create(score_element_selector);

			// create the navigation
			navigation = memory.navigation.create(game_api, navigation_container_selector);

//			// start the timer
//			memory.timer.start();
		}
	};
}(jQuery));
