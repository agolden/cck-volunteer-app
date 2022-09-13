import { totp } from 'otplib';
import { DBConnection } from '@/components/db-connection';
import { sendOTP } from '@/components/email';

export default async function handler(req, res) {

	var body = req.body;
	const data = await DBConnection.getUserByEmail(body.email);

	if (data.length == 1) {
		let person = data[0];
		const token = totp.generate(person.totpsecret);
		
		if(process.env.SEND_EMAIL || !process.env.DEBUG) {
			await sendOTP({otp: token, email: person.email});
		} else {
			console.log(`OTP requested for ${person.email}: ${token}`);
		}
		
		res.status(200).json({ result: "Email dispatched" });
	} else {
		res.status(404).json({ result: "User unknown" });
	}
}

/*

// Demonstrates consumption of graphcms endpoints, kept for future reference

export default function handler(req, res) {

	var graphcmsToken = process.env.GRAPHCMS_AUTH_TOKEN

	const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL, {
    	headers: {
    		authorization: 'Bearer ' + graphcmsToken,
    	},
  	});

	return new Promise((resolve, reject) => {
		graphcms.request(`
		{	
			person(where: {email: "cck@agolden.com"}) {
				sha1
			}
		}
		`).then(data => {
			
			if (data.person !== null) {
				const token = authenticator.generate(data.person.sha1);
				console.log(token)
			} else {
        		console.log("Email not found")
			}

			res.status(200).json({ result: "Email dispatched if known" });
			resolve();
		});
	});
}*/

