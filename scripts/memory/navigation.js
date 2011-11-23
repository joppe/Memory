/*global memory, jQuery*/

memory.navigation = (function ($) {
	/**
	 * Set the display property of a navigation element
	 * 
	 * @param {jQuery} control
	 * @param {String} display "hidden"|"block"
	 */
	function setControlDisplay(control, display) {
		control.css({
			display: display
		});
	}

	/**
	 * Create a navigation element
	 * 
	 * @param {jQuery} navigation_container
	 * @param {String} title
	 * @param {Function} callback
	 * @return {jQuery}
	 */
	function createNavigationElement(navigation_container, title, callback) {
		var element = $('<li><a href="#">' + title + '</a></li>');

        element.css({
            display: 'none'
        });

		element.click(function (event) {
			event.preventDefault();

			callback();
		});

		element.appendTo(navigation_container);

		return element;
	}

	/**
	 * Create the navigation
	 * 
	 * @param {Object} game_api
	 * @param {jQuery} navigation_container
	 * @return {Object}
	 */
	function createNavigation(game_api, navigation_container) {
		var navigation,
			start_control = createNavigationElement(navigation_container, 'start', game_api.start),
			pause_control = createNavigationElement(navigation_container, 'pauze', game_api.pause),
			reset_control = createNavigationElement(navigation_container, 'reset', game_api.reset);

		navigation = {
			showStart: function () {
				setControlDisplay(start_control, 'block');
			},
			hideStart: function () {
				setControlDisplay(start_control, 'none');
			},
			showPause: function () {
				setControlDisplay(pause_control, 'block');
			},
			hidePause: function () {
				setControlDisplay(pause_control, 'none');
			},
			showReset: function () {
				setControlDisplay(reset_control, 'block');
			},
			hideReset: function () {
				setControlDisplay(reset_control, 'none');
			}
		};

		return navigation;
	}

	return {
		/**
		 * Create the navigation
		 *
		 * @param {Object} game_api
		 * @param {String} navigation_container_selector
		 * @return {Object}
		 */
		create: function (game_api, navigation_container_selector) {
			// start(start) pauze(pause) opnieuw(resrart)
			var navigation_container = $(navigation_container_selector),
				navigation = createNavigation(game_api, navigation_container),
				navigation_api;

			navigation_api = {
                gameReady: function () {
                    navigation.showStart();
                    navigation.hidePause();
                    navigation.hideReset();
                },
                
                gameStarted: function () {
                    navigation.hideStart();
                    navigation.showPause();
                    navigation.showReset();
                },
                
                gamePaused: function () {
                    navigation.showStart();
                    navigation.hidePause();
                    navigation.showReset();
                },

                gameFinished: function () {
                    navigation.hideStart();
                    navigation.hidePause();
                    navigation.showReset();
                }
			};

			return navigation_api;
		}
	};
}(jQuery));