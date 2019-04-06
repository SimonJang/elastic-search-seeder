// tslint:disable:no-floating-promises
import * as userGenerator from './data-generation/user';
import * as seeder from './elasticsearch/seed';

/**
 * Seed users
 */
(async () => {
	// Generate 10 bulks of 500 users each, accounting for 5k users
	for (let x = 1; x <= 10; x++) {
		const userData = userGenerator.generateUsers(500, undefined, true) as string;
		await seeder.seedElasticSearch('users', 'user', userData);
	}
})();
