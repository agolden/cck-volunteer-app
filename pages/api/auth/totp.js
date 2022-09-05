import { totp } from 'otplib';
import DBConnection from '@/components/db-connection';
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';


export default async function handler(req, res) {

	var body = req.body;
	const data = await DBConnection.getUserByEmail(body.email);
	if (data.length == 1) {
		let person = data[0];

		totp.options = { window: 5 };
		const isValid = totp.check(body.totp, person.totpsecret);
		
		if (isValid) {
			const {...personn} = person;
			delete personn.totpsecret;

			const token = await new SignJWT(personn)
				.setProtectedHeader({ alg: 'HS256' })
				.setJti(nanoid())
				.setIssuedAt()
				.setExpirationTime('4h')
				.sign(new TextEncoder().encode(process.env.JWT_SS));

			res.status(200).json({ result: "User successfully authenticated", jwt: token, user: personn });
		} else {
			res.status(401).json({ result: "Invalid email or totp code" });
		}
	} else {
		res.status(401).json({ result: "Invalid email or totp code" });
	}
}