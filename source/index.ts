import * as path from 'path';
import * as fs from 'fs';
import {EOL} from 'os';
import * as loadJSON from 'load-json-file';

const movieData = loadJSON.sync(path.join(__dirname, '..', 'data', 'tmdb.json'));

let ndJSON = '';

for (const key of Object.keys(movieData)) {
	ndJSON += JSON.stringify(movieData[key]) + EOL;
}

fs.writeFileSync(path.join(__dirname, '..', 'data', 'tmdb.ndjson'), ndJSON);
