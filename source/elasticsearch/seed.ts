import * as path from 'path';
import * as got from 'got';
import throttle from 'p-throttle';
import * as loadJSON from 'load-json-file';

const eol = '\n';
const createHeader = (index: string, type: string, id: string) => ({create: {_index: index, _type: type, _id: id}});
const configurationPath = path.join(__dirname, '..', '..', '.elasticsearch.json');

/**
 * Insert data in ElasticSearch
 */
const bulkInsert = throttle(
	async (host: string, port: string, index: string, body: any) => {
		console.log(`Executing bulk insert at ${host}:${port}/${index}/_bulk`);

		return got.post(`${host}:${port}/${index}/_bulk`, {headers: {'content-type': 'application/x-ndjson'}, body});;
	},
	1,
	2000
);

export const seedElasticSearch = async (index: string, type: string, data: string) => {
	const body = data
		.split('\n')
		.filter(substr => substr.trim())
		.map(record => {
			const parsedData = JSON.parse(record) as {id: string};

			return `${JSON.stringify(createHeader(index, type, parsedData.id))}${eol}${record}`;
		})
		.join(eol)
		+ eol;

	const {host, port} = loadJSON.sync(configurationPath);

	try {
		await bulkInsert(host, port, index, body);
	} catch {
		console.log('Something went wrong');
	}
};
