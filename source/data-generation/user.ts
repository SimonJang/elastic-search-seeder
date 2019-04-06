import * as fs from 'fs';
import * as path from 'path';
import * as faker from 'faker';

const defaultPath = path.join(__dirname, '..', '..', 'data');

/**
 * Generate users.
 *
 * @param amount - Number of users that need to be generated
 * @param path - Path to store the generated users
 * @param ndjson - Flag to indicate if the data needs to be NDJSON
 */
export const generateUsers = (amount: number, filePath: string = path.join(defaultPath, 'users.json'), ndjson: boolean = false) => {
	const data: any[] = [];

	for (let x = 0; x < amount; x++) {
		data.push({
			id: faker.random.uuid().split('-').join(''),
			firstName: faker.name.firstName(),
			name: faker.name.lastName()
		});
	}

	if (ndjson) {
		const ndjsonData = data.map(record => JSON.stringify(record)).join('\n') + '\n';
		fs.writeFileSync(filePath, ndjsonData);

		return ndjsonData;
	}

	fs.writeFileSync(filePath, JSON.stringify(data, undefined, '\t'));

	return data;
};
