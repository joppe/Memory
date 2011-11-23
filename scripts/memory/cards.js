/*global memory, jQuery */

memory.cards = (function ($) {
    /**
     * Shuffle the images
     * Double them (make pairs)
     *
     * @param {Array} images
     * @return {Array}
     */
    function shuffle(images) {
        var random_images = [],
            image_pool = [],
            number_of_pairs = images.length,
            length = 2 * number_of_pairs,
            random_index,
            i;

        for (i = 0; i < number_of_pairs; i += 1) {
            image_pool.push(images[i]);
            image_pool.push(images[i]);
        }

        for (i = 0; i < length; i += 1) {
            random_index = Math.round((image_pool.length - 1) * Math.random());
            random_images.push(image_pool[random_index]);
            image_pool.splice(random_index, 1);
        }

        return random_images;
    }

    /**
     *
     * @param {Object} game_api
     * @param {String} image_file_name
     * @param {Object} options
     * @param {jQuery} list_element
     * @param {Function} callback
     * @return {Object}
     */
	function createCard(game_api, image_file_name, options, list_element, callback) {
        var card,
            list_item_element = $('<li/>'),
            image_html = '<img src="images/' + image_file_name + '">';

        list_item_element.css({
            width: options.card_size,
            height: options.card_size,
            marginRight: options.card_margin,
            marginBottom: options.card_margin
        });

        aap.preload(image_html, function (image_size) {
            var image_element = $(image_html),
                ratio = image_size.width / image_size.height,
                new_width = image_size.width,
                new_height = image_size.height,
                padding_top = 0,
                padding_left = 0;

            if (ratio > 1) {
                // landscape
                new_width = options.card_size;
                new_height = Math.round((options.card_size / image_size.width) * image_size.height);

                padding_top = Math.round((options.card_size - new_height) / 2);
            } else {
                // portrait
                new_width = Math.round((options.card_size / image_size.height) * image_size.width);
                new_height = options.card_size;

                padding_left = Math.round((options.card_size - new_width) / 2);
            }

            image_element.css({
                paddingTop: padding_top,
                paddingLeft: padding_left
            });

            image_element.attr('width', new_width);
            image_element.attr('height', new_height);

            image_element.appendTo(list_item_element);

            callback();
        });

        card = {
            show: function () {
                list_item_element.addClass('show');
            },
            hide: function () {
                list_item_element.removeClass('show');
            },
            getIdentifier: function () {
                return image_file_name;
            },
            remove: function () {
            }
        };

        list_item_element.click(function (event) {
            event.preventDefault();

            game_api.onCardClick(card);
        });

        list_item_element.appendTo(list_element);

        return card;
	}

    /**
     * @param {Object} options
     * @param {String} cards_container_selector
     * @return {Object}
     */
    function createCards(options, cards_container_selector) {
        var cards,
            cards_container = $(cards_container_selector),
            card_items = [],
            list_element = $('<ul id="cards" />');

        list_element.appendTo(cards_container);

        cards = {
            /**
             * Get the cards with an ajax call
             * 
             * @param {Number} number_of_images
             * @param {Function} callback
             */
            getCards: function (number_of_images, callback) {
                $.ajax({
                    url: '/memory/php/images.php',
                    type: 'get',
                    data: {
                        number_of_images: number_of_images
                    },
                    dataType: 'json',
                    success: function (images) {
                        callback(images);
                    }
                });
            },

            /**
             * Create the cards
             *
             * @param {Object} game_api
             * @param {Array} images
             * @param {Function} callback
             */
            createCards: function (game_api, images, callback) {
                var loaded = 0,
                    number_of_cards = images.length,
                    card_width = options.card_size + options.card_margin + 2, // +2 for the border
                    cards_per_row = Math.floor(options.max_width / card_width);

                // get the amount of cards per row
                while (cards_per_row > 1 && (number_of_cards % cards_per_row !== 0)) {
					cards_per_row -= 1;
				}

                list_element.css({
                    width: cards_per_row * card_width
                });

                $.each(images, function (index) {
                    var card = createCard(game_api, images[index], options, list_element, function () {
                        loaded += 1;

                        if (loaded === number_of_cards) {
                            callback();
                        }
                    });

                    card_items.push(card);
                });
            },

            /**
             * Hide all cards
             */
            reset: function () {
                $.each(card_items, function (index) {
                    card_items[index].hide();
                });
            }
        };

        return cards;
    }

	return {
		/**
		 * Create the cards
		 *
		 * @param {Object} game_api
         * @param {Object} options
		 * @param {String} cards_container_selector
		 * @return {Object}
		 */
		create: function (game_api, options, cards_container_selector) {
			var cards = createCards(options, cards_container_selector),
                cards_api;
			
			cards_api = {
                /**
                 * Load the cards
                 * 
                 * @param {Number} number_of_images
                 * @param {Function} callback
                 */
                load: function (number_of_images, callback) {
                    cards.getCards(number_of_images, function (images) {
                        var random_images = shuffle(images);

                        cards.createCards(game_api, random_images, callback);
                    });
				},

                /**
                 * Reset the cards
                 */
                reset: function () {
                    cards.reset();
                }
			};

			return cards_api;
		}
	};
}(jQuery));