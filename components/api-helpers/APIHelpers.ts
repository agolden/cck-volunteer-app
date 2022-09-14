import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextRequest } from 'next/server';
import type { IncomingMessage } from 'http';
import { jwtVerify } from 'jose';

const hasMappedHeaders = (headers: Headers | IncomingMessage['headers']): headers is Headers => {
    return headers instanceof Headers;
};

export enum UserRole {
    MASTER_ADMIN = 'master-admin',
    EVENT_ADMIN = 'event-admin'
}

/**
 * Validates the JWT and retrieves the logged in user information
 */
export async function getUserContext(req: Request | IncomingMessage) {
    
    let token: string;
    const isAPIRequest = !hasMappedHeaders(req.headers);
    const authHeader = isAPIRequest ? (req as Request).headers['authorization'] : (req.headers as Headers).get('authorization');

    if (authHeader) {
        token = authHeader.split(" ")[1];
    } else {
        token = isAPIRequest ? (req as Request)['cookies']['AuthJWT'] : (req as IncomingMessage)['cookies'].get("AuthJWT");
    }

    const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SS)
    );

    return verified.payload;
}

/**
 * Determines whether the user has one or more of the authorized roles to perform a given action
 */
export async function isUserAuthorized(req: NextApiRequest | NextRequest, res: NextApiResponse, authorizedRoles: string[], orgRef?: string) {
    
    try {
        const user = await getUserContext(req);

        const relevantRoles = orgRef == undefined ? user['roles'] : user['organizations'][orgRef]['roles'];

        const isUserAuthorized = authorizedRoles.some(role => (relevantRoles['roles'] as string[]).indexOf(role) >= 0);

        if (!isUserAuthorized) {
            res.status(403).json({ result: "User does not have the appropriate permissions."});
        }

        return isUserAuthorized;
    } catch (e) {
        if (process.env.DEBUG === "true") {
            console.log("Error when attempting authorize user:");
            console.log(e);
        }
    }

    return false;
}