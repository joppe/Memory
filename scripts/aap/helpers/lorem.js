/*global aap*/

aap.lorem = (function () {
	var sample = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec enim in justo iaculis tincidunt non congue sapien. Suspendisse potenti. Donec suscipit, eros et adipiscing viverra, risus lorem laoreet justo, quis ultrices dui mauris a velit. Duis nec tellus elit. Donec sollicitudin condimentum massa, et volutpat odio cursus sed. Donec vel tortor sapien, eget pellentesque quam. Quisque tempor libero non orci iaculis sollicitudin. Mauris pulvinar pulvinar lacus sed tempor. Proin adipiscing, ipsum eu congue pharetra, nulla lacus varius nibh, vitae fringilla metus eros ut sapien. Maecenas molestie adipiscing ante et molestie. Integer sem ligula, posuere vitae commodo condimentum, viverra sed mauris.		Sed pretium ipsum vitae nulla sodales quis posuere felis egestas. Nam condimentum magna non mi congue tincidunt. Etiam luctus auctor nibh, non pellentesque mi placerat eget. Nam urna ligula, porta dictum vehicula sit amet, hendrerit non nisl. Donec a arcu risus. Cras ut purus quis turpis fringilla dapibus. Nulla facilisi. Mauris at arcu sit amet eros varius varius in ut mi. Mauris lobortis congue diam, id pretium eros fringilla non. Sed non mauris vitae est feugiat dapibus et non tortor. Integer ligula nulla, lobortis sed euismod vitae, viverra ac est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean quis orci odio. Integer in odio nulla, at posuere libero. Cras imperdiet, sem at ultrices sollicitudin, libero felis blandit nunc, at volutpat sem lectus sed risus. Nam suscipit ullamcorper leo eu fermentum. Fusce vel nunc metus, a facilisis mi. Maecenas vel erat a lorem imperdiet semper vel sed nisi. Ut feugiat laoreet lobortis. Vestibulum elementum sem vel lectus bibendum suscipit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse laoreet convallis leo, quis tempor odio rhoncus eu.Nunc ultricies velit nec felis accumsan condimentum sit amet ac nulla. Curabitur imperdiet ligula vel odio tristique fringilla rutrum tellus luctus. Duis ac nunc mauris. Curabitur aliquet est sit amet neque mattis luctus. Pellentesque pretium orci dapibus metus consectetur lobortis. Fusce nec neque et quam euismod vestibulum. Donec tellus orci, volutpat a hendrerit non, aliquet vitae metus. Integer eget tellus urna. Donec vitae felis eget quam vestibulum viverra. Integer sit amet elit leo, et euismod dui. Proin lobortis blandit augue sit amet hendrerit. Pellentesque id dolor leo. Donec ultricies tempor rutrum. Aliquam quam augue, viverra ut lobortis et, elementum sed justo. Pellentesque risus metus, gravida ac aliquam sit amet, tempus eget velit. Nullam consectetur, metus vel varius convallis, urna eros viverra nisi, sit amet commodo nunc dui vitae justo. Integer cursus, justo nec porta faucibus, eros purus viverra lectus, vel iaculis dui ipsum rhoncus quam. Vivamus tellus massa, luctus eget bibendum posuere, venenatis id justo. Suspendisse justo purus, faucibus sed semper vitae, mattis non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis pellentesque enim. Nulla interdum pulvinar massa.',
        getWords,
        getRandomWord,
        getLines,
        getRandomLine,
        getRandomPhrase;

    /**
     * Get an array of lines
     */
    getLines = (function () {
        var lines;

        return function () {
            if (aap.utils.isUndefined(lines) === true) {
                lines = sample.split('.');
            }

            return lines;
        };
    }());

    /**
     * Get a random line
     */
    getRandomLine = (function () {
        var lines = getLines(),
            length = lines.length - 1;

        return function () {
            return lines[aap.utils.getRandomNumber(0, length)];
        };
    }());

    /**
     * Get an array of words
     */
    getWords = (function () {
        var words;

        return function () {
            if (aap.utils.isUndefined(words) === true) {
                words = sample.toLowerCase().split(/[\s\.,]/);
            }

            return words;
        };
    }());

    /**
     * Get a random word
     */
    getRandomWord = (function () {
        var words = getWords(),
            length = words.length - 1;

        return function () {
            return words[aap.utils.getRandomNumber(0, length)];
        };
    }());

    getRandomPhrase = (function () {
        return function () {
            var number_of_lines = aap.utils.getRandomNumber(4, 10),
                i,
                text = '';

            for (i = 0; i < number_of_lines; i += 1) {
                text += getRandomLine() + '.';
            }

            return text;
        };
    }());

	return {
        /**
         * Generate lorem ipsum
         *
         * @param {String} mode "phrases"|"lines"|"words"
         * @param {Number} count
         */
		generate: function (mode, count) {
            var function_name,
                text = '',
                i;

            switch (mode) {
                case 'phrases':
                    for (i = 0; i < count; i += 1) {
                        text += '<p>' + getRandomPhrase() + '</p>';
                    }
                    break;
                case 'lines':
                    for (i = 0; i < count; i += 1) {
                        text += getRandomLine() + '. ';
                    }
                    break;
                case 'words':
                default:
                    for (i = 0; i < count; i += 1) {
                        text += getRandomWord() + ' ';
                    }
            }

            return text;
		}
	};
}());