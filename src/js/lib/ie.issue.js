/**
 * Created by YAD on 03/05/2017.
 */
/**
 *  Main script for the application
 * */

/**
 * IE issue
 * */
if (Object.keys)
	Object.keys = require('object-keys');

if (!Object.assign) {


	function keys(object) {
		return Object.keys(object == null ? object : Object(object));
	}

	/**
	 * IE issue
	 * */
	function value(value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	}

	/**
	 * IE issue
	 * */
	Object.assign = function (dest, src/*, …srcn*/) {
		let error, i, l = Math.max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = (key) => {
			try {
				dest[key] = src[key];
			} catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};

}
