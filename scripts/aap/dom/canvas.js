/*global aap*/

aap.canvas = (function () {
	
	function createCanvas(id, dimesions, parent_container) {
		var canvas,
			element = jQuery('<canvas/>').appendTo(parent_container);
		
		canvas = {
			getElement: function () {
				return element;
			}
		};
		
		return canvas;
	}
	
	return {
		create: function (id, dimesions, parent_container) {
			return createCanvas(id, dimesions, parent_container);
		}
	};
}());