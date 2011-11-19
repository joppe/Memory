/*global memory, jQuery */

/**
 * memory module
 */
var memory = (function ($) {
	var cards,
		game,
        image;

	game = (function () {
        var default_options = {card_size: 100, number_of_pairs: 8, card_margin: 5},
        	options,
        	clicked,
            solved,
            cards_loaded;

        function start() {
            clicked = [];
            solved = {};
            cards_loaded = 0;

            cards.shuffle();
        }

		return {
			start: function (preferred_options) {
				options = $.extend({}, default_options, preferred_options);
				
                cards.initialize(options);

                start();
			},
            reset: function () {
                start();
            },
            cardLoaded: function () {
                cards_loaded += 1;
            },
            handleCardClick: function (card) {
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
            }
		};
	}());

    image = (function () {
        var getPreloadElement;

        getPreloadElement = (function () {
            var preload_element;

            return function () {
                if (!preload_element) {
                    preload_element = $('<div class="preloader"/>');

                    preload_element.appendTo(aap.dom.getCachedElement('body'));
                }

                return preload_element;
            };
        }());

        function resize(image_element, target_size, callback) {
            var width = image_element.width(),
                height = image_element.height(),
                ratio = width / height,
                new_width = width,
                new_height = height,
                padding_top = 0,
                padding_left = 0;

            if (ratio > 1) {
                // landscape
                new_width = target_size;
                new_height = (target_size / width) * height;

                padding_top = (target_size - new_height) / 2;
            } else {
                // portrait
                new_width = (target_size / height) * width;
                new_height = target_size;

                padding_left = (target_size - new_width) / 2;
            }

            image_element.css({
                paddingTop: padding_top,
                paddingLeft: padding_left
            });

            image_element.attr('width', new_width);
            image_element.attr('height', new_height);

            callback(image_element);
        }

        return {
            create: function (image_path, target_size, callback) {
                var preload_element = getPreloadElement(),
                    image_element = $('<img src="' + image_path + '">'),
                    loaded = false;

                image_element.load(function () {
                    if (!loaded) {
                        loaded = true;

                        resize(image_element, target_size, callback);
                    }
                });

                image_element.error(function () {
                    if (!loaded) {
                        loaded = true;

                        resize(image_element, target_size, callback);
                    }
                });

                image_element.appendTo(preload_element);

                if (image_element.width() > 0 && image_element.height() > 0) {
                    loaded = true;
                    
                    resize(image_element, target_size, callback);
                }
            }
        };
    }());

	cards = (function () {
		var list_element,
			options;

        /**
         * Get the images randomized
         */
		function getRandomizedImages() {
			var images = [],
				random_images = [],
				i,
				length = 2 * options.number_of_pairs,
				random_index;

			// we have now a source array
			for (i = 1; i <= options.number_of_pairs; i += 1) {
				images.push(i);
				images.push(i);
			}

			// randomize the images
			for (i = 1; i <= length; i += 1) {
				random_index = Math.floor(images.length * Math.random());
				random_images.push('images/' + images[random_index] + '.jpg');
				images.splice(random_index, 1);
			}

			return random_images;
		}

        /**
         * Create a card
         * 
         * @param {String} image_path
         */
		function createCard(image_path) {
			var card,
				list_item_element = $('<li/>'),
                ready = false;
                
          	list_item_element.css({
          		width: options.card_size,
          		height: options.card_size,
          		marginRight: options.card_margin,
          		marginBottom: options.card_margin
          	});

            image.create(image_path, options.card_size, function (image_element) {
                ready = true;

                game.cardLoaded();
                
                image_element.appendTo(list_item_element);
            });

			card = {
                show: function () {
                    list_item_element.addClass('show');
                },
                hide: function () {
                    list_item_element.removeClass('show');
                },
				getIdentifier: function () {
					return image_path;
				}
			};

			list_item_element.click(function (event) {
                event.preventDefault();
                
				game.handleCardClick(card);
			});

			list_item_element.appendTo(list_element);
		}

        /**
         * Create the cards
         */
		function createCards() {
			var image_array = getRandomizedImages(),
				i,
				length = 2 * options.number_of_pairs;

			for (i = 0; i < length; i += 1) {
				createCard(image_array[i]);
			}
		}

		return {
			initialize: function (given_options) {
				var number_of_cards,
					cards_per_row = 8,
					width;
				
				options = given_options;
				
				number_of_cards = options.number_of_pairs * 2;
				
				while (cards_per_row > 1) {
					if (number_of_cards % cards_per_row == 0) {
						// i want more rows than columns
						if (number_of_cards/cards_per_row < cards_per_row) {
							cards_per_row /= 2;
						}
						break;
					}
					
					cards_per_row /= 2;
				}

				width = (options.card_size + options.card_margin + 2) * cards_per_row; // the 2 is for the border width
				
				list_element = $('<ul id="cards" />');
				list_element.css({
					width: width
				});
				list_element.appendTo(aap.dom.getCachedElement('body'));
			},
			shuffle: function () {
				list_element.empty();
				
				createCards();
			}
		};
	}());

	// start the game when the document is ready
	$(function () {
		game.start();
	});
}(jQuery));
