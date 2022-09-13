import type { RecordIdentifier } from './DBHelpers';
import { getReference } from './DBHelpers';
import prisma from '@/components/db-connection-prisma';

export interface OrganizationInsert {
    id_ref: string;
    name: string;
    description?: string;
}

export interface Organization extends OrganizationInsert {
	id: number;
}

export async function create(org: OrganizationInsert) {
	return await prisma.organization.create({
		data: {
			id_ref: org.id_ref,
			name: org.name,
			description: org.description,
		},
	});
}

export async function remove(org: RecordIdentifier) {
	const orgId = getReference(org);

	const where = {};
	where[orgId[0]] = orgId[1];

	await prisma.organization.delete({
		where: where
	});
}


export async function get(org: RecordIdentifier): Promise<Organization> {
	const orgId = getReference(org);

	const where = {};
	where[orgId[0]] = orgId[1];

	return await prisma.organization.findUnique({
		where: where
	});
}