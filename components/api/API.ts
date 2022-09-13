const defaultHeaders = Object.freeze({
    Accept: 'application/json',
    'Content-Type': 'application/json',
});

const endpoints = Object.freeze({
    totpRequest: "/api/auth/totp/request",
    totpValidate: "/api/auth/totp/validate",
    registerUser: "/api/auth/register"

});

/**
 * Makes an HTTP request to the request OTP endpoint
 */
export async function requestOTP({baseURL, email}) {
	
	const endpointUrl = baseURL + endpoints.totpRequest;
	const settings = {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({email: email})
    };
	return await fetch(endpointUrl, settings);
}

/**
 * Makes an HTTP request to the validate OTP endpoint
 */
export async function validateOTP({baseURL, email, otp}) {
    
    const endpointUrl = baseURL + endpoints.totpValidate;
    const settings = {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({email: email, totp: otp})
    };
    return await fetch(endpointUrl, settings);
}

/**
 * Makes an HTTP request to the register user endpoint
 */
export async function registerUser({baseURL, email, nickname}) {
    
    const endpointUrl = baseURL + endpoints.registerUser;
    const settings = {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({email: email, nickname: nickname})
    };
    return await fetch(endpointUrl, settings);
}