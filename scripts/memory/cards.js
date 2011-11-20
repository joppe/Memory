/*global memory, jQuery */

memory.cards = (function ($) {
	var cards = {};
	/**
	 * getcards
	 * createcards
	 *
	 * display
	 * -> signal ready
	 *
	 */

	function clearCards() {
		$.each(cards, function (index) {
			cards[index].remove();
		});

		cards = {};
	}

	function createCard(image) {

	}

	function createCards(number_of_images, callback) {
		$.ajax({
			url: '/memory/php/images.php',
			type: 'get',
			data: {
				number_of_images: number_of_images
			},
			dataType: 'json',
			success: function (images) {
				// remove all old cards
				clearCards();

				$.each(images, function (index) {
					var image = images[index];

					cards[image] = createCard(image);
				});

				callback();
			}
		});
	}

	function shuffle() {
	}

	return {
		/**
		 * Create the cards
		 *
		 * @param {Object} game_api
		 * @param {String} cards_container_selector
		 * @param {Number} number_of_cards
		 * @return {Object}
		 */
		create: function (game_api, cards_container_selector, number_of_cards) {
			var cards_api;
			
			createCards(number_of_cards, function () {
			});

			cards_api = {
				shuffle: function () {
				},

				newCards: function() {
				}
			};

			return cards_api;
		}
	};
}(jQuery));