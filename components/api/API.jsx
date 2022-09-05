const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export async function requestOTP({baseURL, email}) {
	
	var endpointUrl = baseURL + "/api/auth/email";
	const settings = {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({email: email})
    };
	return await fetch(endpointUrl, settings);
}

export async function validateOTP({baseURL, email, otp}) {
    
    var endpointUrl = baseURL + "/api/auth/totp";
    const settings = {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({email: email, totp: otp})
    };
    return await fetch(endpointUrl, settings);
}

export async function registerUser({baseURL, email, nickname}) {
    
    var endpointUrl = baseURL + "/api/auth/register";
    const settings = {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({email: email, nickname: nickname})
    };
    return await fetch(endpointUrl, settings);
}