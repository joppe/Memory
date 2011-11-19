<?php

Images::main();

/**
 * Images class
 */
class Images {
	/**
	 * Render a list of images in JSON
	 * 
	 * @static
	 * @param int $number_of_images
	 * @param string $path
	 * @return string
	 */
	private static function renderImages($number_of_images, $path) {
		$files = array();

		// try to get a directory handle
		if ($handle = opendir($path)) {

			// loop through the contents of the directory
    		while (false !== ($file = readdir($handle))) {

				// check if the file has a jpeg or gif extension
				if (preg_match('/\.(gif|jpe?g)/', $file)) {
					$number_of_images -= 1;
					
					$files[] = $file;

					if ($number_of_images === 0) {
						break;
					}
        		}
    		}

			// close the directory handle
    		closedir($handle);
		}

		return json_encode($files);
	}

	/**
	 * Main point of entry
	 * 
	 * @static
	 * @return void
	 */
	public static function main() {
		// get the amount of images
		$number_of_images = 10;

		if (isset($_GET['number_of_images'])) {
			$number_of_images = intval($_GET['number_of_images'], 10);
		}

		$path = dirname(__FILE__) . '/../images/';

		//header('Content-Type: application/json');
		header('Content-Type: text/plain');
		echo self::renderImages($number_of_images, $path);
	}
}