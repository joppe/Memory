/*global aap, jQuery*/

/**
 * Preload module
 */
aap.preload = (function () {
	var getPreloadElement;

	/**
	 * Get a preload element
	 * The element is cached
	 */
	getPreloadElement = (function () {
		var container;

		function getContainer() {
			// check if the element is already available
			if (aap.utils.isUndefined(container) === true) {
				container = jQuery('<div/>');
				container.css({
					width: 1,
					height: 1,
					overflow: 'hidden',
					position: 'absolute'
				});

				container.appendTo(aap.dom.getCachedElement('body'));
			}

			return container;
		}

		/**
		 * @return {Function}
		 */
		return function () {
			var container = getContainer(),
				preload_element = jQuery('<div/>');

			preload_element.css({
				position: 'absolute'
			});
			
			preload_element.appendTo(container);

			return preload_element;
		};
	}());

	/**
	 * Preload an array of images
	 *
	 * @param {jQuery} images
	 * @param {Function} callback
	 */
	function preloadImages(content, callback) {
		var jContent = jQuery(content),
            images = jContent.find('img'),
			preload_element = getPreloadElement(),
			image_count = images.length;

        // check if the provided content is only a img tag
        if (image_count === 0 && jContent.get(0).tagName.toLowerCase() === 'img') {
            images = jContent;
            image_count = 1;
        }

		/**
		 * All images are loaded
		 * determine the size of the preload element and call the
		 * callback function with the size as argument
		 */
		function onImagesLoaded() {
			var size = {
					width: 0,
					height: 0
				};

			// get the size of the preload element
			size.width = preload_element.outerWidth();
			size.height = preload_element.outerHeight();

			// clean up the preload element
//			preload_element.remove();

			callback(size);
		}
		
		/**
		 * Handle an image load
		 * If all images are loaded call the images loaded function
		 */
		function onImageLoaded() {
			image_count -= 1;

			if (image_count === 0) {
				onImagesLoaded();
			}
		}

		// check if there are even images to preload
		if (image_count === 0) {
			preload_element.html(content);
			
			onImagesLoaded();
		} else {
			// loop through the provided images and load them
			images.each(function (index, image_element) {
				var image = jQuery(image_element);

				// capture the load event
				image.load(function () {
					onImageLoaded();
				});

				// capture the error event, when the image is not found
				image.error(function () {
					onImageLoaded();
				});

				// check if the element has already dimensions
				if (image.width() > 0 && image.height() > 0) {
					// remove all events from the image
					image.off();

					onImageLoaded();
				}
			});

			preload_element.html(content);
		}
	}

	/**
	 * @param {String} content
	 * @param {Function} callback
	 */
	return function (content, callback) {
		preloadImages(content, callback);
	};
}());