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
	 * @param string $path
	 * @return array
	 */
	private static function getImages($path) {
		$files = array();

		// try to get a directory handle
		if ($handle = opendir($path)) {

			// loop through the contents of the directory
    		while (false !== ($file = readdir($handle))) {

				// check if the file has a jpeg or gif extension
				if (preg_match('/\.(gif|jpe?g)/', $file)) {
					$files[] = $file;
        		}
    		}

			// close the directory handle
    		closedir($handle);
		}

		return $files;
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
		$files = self::getImages($path);

		shuffle($files);

		//header('Content-Type: application/json');
		header('Content-Type: text/plain');
		echo json_encode(array_slice($files, 0, $number_of_images));
	}
}