export async function requestOTP({baseURL, email}) {
	
	var endpointUrl = baseURL + "/api/auth/email"
	const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email})
    };
	await fetch(endpointUrl, settings);
};