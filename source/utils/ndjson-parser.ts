import * as loadJSON from 'load-json-file';

/**
 * Convert a JSON file to a NDJSON data structure.
 *
 * @param filePath - Path to the JSON file.
 */
export const JSONtoNDJSON = (filePath: string) => {
	const data = loadJSON.sync(filePath);

	let ndJSON = '';

	for (const key of Object.keys(data as any[])) {
		ndJSON += JSON.stringify((data as any[])[key]) + '\n';
	}

	return ndJSON;
}
