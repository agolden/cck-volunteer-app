export interface RecordIdentifier {
	id?: number;
	id_ref?: string;
}

import * as fs from 'fs';

/**
 * Builds a where clause using the database record id, if available,
 * and unique reference string otherwise
 *  
 * @returns A tuple containing the field name and value, for inclusion in the database query
 * @throws An error if neither the object id nor its unique reference is provided.
 */
export function getReference(org: RecordIdentifier): [string, string | number] {
	const fieldName = org.id ? "id" : "id_ref";
	const fieldValue = org.id ? org.id : org.id_ref;

	if (!fieldName || !fieldValue) {
		throw new Error('The object ID or ref must be provided');
	}

	return [fieldName, fieldValue];
}

/**
 * Sets the database URL environment variable so that prisma knows how to connect to the database
 */
export function setDatabaseUrl() {
	process.env.DATABASE_URL = `mysql://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}?schema=public`;

	console.log("About to check if it should be ssl");
	if (process.env.NO_DB_SSL !== "true" && process.env.DB_HOST.includes('aws.com')) {
		console.log("it should be ssl");
		console.log(__dirname);
		const testFolder = __dirname;
		fs.readdirSync(testFolder).forEach(file => {
			console.log(file);
		});
		
		process.env.DATABASE_URL += `&sslaccept=strict&sslcert=${encodeURIComponent('../aws/eu-west-2-bundle.pem')}`;
	}
}