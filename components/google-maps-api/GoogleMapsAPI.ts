let googleBaseUrl = "https://maps.googleapis.com/maps/api";

export async function findLocation(location) {
	
    const url = new URL(googleBaseUrl);
    url.pathname += '/place/findplacefromtext/json';
    url.searchParams.append("input", location);
    url.searchParams.append("inputtype", "textquery");
    url.searchParams.append("key", process.env.GOOGLE_MAPS_API_KEY);
    url.searchParams.append("fields", "formatted_address,geometry");
    
    let response = await fetch(url.href);
    return response.json()
}