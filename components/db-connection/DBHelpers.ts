export interface RecordIdentifier {
	id?: number;
	id_ref?: string;
}

export function getReference(org: RecordIdentifier): [string, string | number] {
	const fieldName = org.id ? "id" : "id_ref";
	const fieldValue = org.id ? org.id : org.id_ref;

	if (!fieldName || !fieldValue) {
		throw new Error('The object ID or ref must be provided');
	}

	return [fieldName, fieldValue];
}