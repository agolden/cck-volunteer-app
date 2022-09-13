import type { RecordIdentifier } from './DBHelpers';
import prisma from '@/components/db-connection-prisma';
import * as Organization from './Organization';

export interface EventIdentifier extends RecordIdentifier {
	id_organization?: number;
	id_organization_ref?: string;
	id_event?: number;
	id_event_ref?: string;
}

export interface EventInsert {
    id_organization: number;
    id_event_category?: number;
    id_ref?: string;
    start_date: Date;
    end_date?: Date;
    name: string;
    description?: string;
}

export interface Event extends EventInsert {
	id: number;
}

export async function create(event: EventInsert) {
	return await prisma.event.create({
		data: event,
	});
}

async function getUniqueEventWhereClause(event: EventIdentifier) {
	const where = {};
	if (event.id) {
		where['id'] = event.id;
	} else {
		if (event.id_organization_ref) {
			const org = await Organization.get({id_ref: event.id_organization_ref});
			event.id_organization = org.id;
		}
		where['id_organization'] = event.id_organization;
		where['id_ref'] = event.id_ref;
	}

	return where;
}

export async function get(event: EventIdentifier): Promise<Event> {
	const where = await getUniqueEventWhereClause(event);
	return await prisma.event.findFirst({
		where: where
	});
}

/*
 *	Removes an event from the database
 */
export async function remove(event: EventIdentifier) {
	const where = await getUniqueEventWhereClause(event);
	await prisma.event.delete({
		where: where
	});
}