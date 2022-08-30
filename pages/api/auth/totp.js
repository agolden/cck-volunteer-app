import { totp } from 'otplib';
import DBConnection from '@/components/db-connection';
var jwt = require('jsonwebtoken');

// To generate a key: openssl genrsa -out private-key.pem 4096
// Replace \n with \\n and place in .env.local, then reverse the process in code (see below)

export default async function handler(req, res) {

	let query = JSON.parse(req.body.query)
	const data = await DBConnection.getUserByEmail(query.email);

	if (data.length == 1) {
		let person = data[0]

    	totp.options = { window: 5 };
		const isValid = totp.check(query.totp, person.totpsecret);
		
		if (isValid) {
			var private_value = process.env.JWT_KEY.replace(/\\n/g, '\n');
			const {...personn} = person
			delete personn.totpsecret;
			var token = jwt.sign(personn, private_value, { algorithm: 'RS256'})
			res.status(200).json({ result: "User successfully authenticated", jwt: token });
		} else {
			res.status(401).json({ result: "Invalid email or totp code" });
		}
    } else {
    	res.status(401).json({ result: "Invalid email or totp code" });
    }
}