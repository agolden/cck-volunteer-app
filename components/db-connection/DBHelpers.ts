export interface RecordIdentifier {
	id?: number;
	id_ref?: string;
}

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