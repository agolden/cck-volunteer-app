import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextRequest } from 'next/server';
import type { IncomingMessage } from 'http';
import { jwtVerify } from 'jose';

const hasMappedHeaders = (headers: Headers | IncomingMessage['headers']): headers is Headers => {
    return headers instanceof Headers;
};

export async function getUserContext(req: Request | IncomingMessage) {
    
    var token;
    let isAPIRequest = !hasMappedHeaders(req.headers);
    let authHeader = isAPIRequest ? (req as Request).headers['authorization'] : (req.headers as Headers).get('authorization');

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

export async function isUserAuthorized(req: NextApiRequest | NextRequest, res: NextApiResponse, authorizedRoles: string[]) {
    let user = await getUserContext(req);

    const isUserAuthorized = authorizedRoles.some(role => (user['roles'] as string[]).indexOf(role) >= 0);

    if (!isUserAuthorized) {
        res.status(403).json({ result: "User does not have the appropriate permissions."});
    }

    return isUserAuthorized;
}