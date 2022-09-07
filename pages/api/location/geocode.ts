import { findLocation } from '@/components/google-maps-api';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isUserAuthorized } from '@/components/api-helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (isUserAuthorized(req, res, ['master-admin'])) {
		let location = req.body.location;
		let locationResponse = await findLocation(location);
		res.status(200).json(locationResponse);
	}
}