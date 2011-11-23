/*global memory, jQuery */

/**
 * memory module
 */
var memory = (function ($) {
    var game_api,
        timer,
        score,
        navigation,
        cards;

    function start() {

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
            var clicked,
                solved,
                is_playing = false,
                number_of_images = 10;
            
			// create the game api
			game_api = {
                newGame: function () {
                    cards.load(number_of_images, function () {
                        clicked = [];
                        solved = {};

                        navigation.gameReady();
                    });
                },
				start: function () {
                    is_playing = true;
                    timer.start();
                    navigation.gameStarted();
				},
				pause: function () {
                    is_playing = false;
					timer.stop();
                    navigation.gamePaused();
				},
				stop: function () {
                    is_playing = false;
					timer.stop();
					timer.set(0);
				},
				reset: function () {
                    clicked = [];
                    solved = {};
                    
					timer.reset();
                    cards.reset();

                    game_api.start();
                    navigation.gameStarted();
				},
				finished: function () {
                    is_playing = false;
                    timer.stop();
					navigation.gameFinished();
				},
                onCardClick: function (card) {
                    if (is_playing === false) {
                        return;
                    }

                    if (solved[card.getIdentifier()]) {
                        return;
                    }

                    if ($.inArray(card, clicked) !== -1) {
                        return;
                    }

                    // if there are already two cards shown hide them
                    if (clicked.length === 2) {
                        clicked[0].hide();
                        clicked[1].hide();

                        clicked = [];
                    }

                    card.show();

                    if (clicked.length === 1 && clicked[0].getIdentifier() == card.getIdentifier()) {
                        solved[card.getIdentifier()] = true;
                        clicked = [];
                    } else {
                        clicked.push(card);
                    }

                    if (aap.utils.objectLength(solved) === number_of_images) {
                        game_api.finished();
                    }
                }
			};

			// create the cards
			cards = memory.cards.create(game_api, {
                    card_size: 130,
                    card_margin: 5,
                    max_width: 720
                }, cards_container_selector);

			// create the timer
			timer = memory.timer.create(game_api, time_element_selector, 120);

			// create the score
			score = memory.score.create(score_element_selector);

			// create the navigation
			navigation = memory.navigation.create(game_api, navigation_container_selector);

			// start the game
			game_api.newGame();
		}
	};
}(jQuery));
