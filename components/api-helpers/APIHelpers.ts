import type { NextApiRequest } from 'next';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const hasMappedHeaders = (headers: Headers | IncomingMessage['headers']): headers is Headers => {
    return headers instanceof Headers;
};

export async function getUserContext(req: Request | IncomingMessage) {
    
    var token;
    let isAPIRequest = !hasMappedHeaders(req.headers);
    let authHeader = isAPIRequest ? req.headers.authorization : req.headers.get('authorization');

    if (authHeader) {
        token = authHeader.split(" ")[1];
    } else {
        token = isAPIRequest ? req.cookies['AuthJWT'] : req.cookies.get("AuthJWT");
    }

    const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SS)
    );

    return verified.payload;
}

export async function isUserAuthorized(req: NextApiRequest | NextRequest, res: NextApiResponse, authorizedRoles: string[]) {
    let user = await getUserContext(req);

    const isUserAuthorized = authorizedRoles.some(role => user.roles.indexOf(role) >= 0);

    if (!isUserAuthorized) {
        res.status(403).json({ result: "User does not have the appropriate permissions."});
    }

    return isUserAuthorized;
}

/*const hasMappedHeaders = (headers: Headers | IncomingMessage['headers']): headers is Headers => {
    return headers instanceof Headers;
};

const getHeader(headers: Headers, header: string) 

export async function getIdentityToken(req: Request | IncomingMessage): Promise<JwtPayload> {
    
    const jwt = hasMappedHeaders(req.headers)
        ? req.headers.get('x-forwarded-jwt')
        : req.headers['x-forwarded-jwt'];*/