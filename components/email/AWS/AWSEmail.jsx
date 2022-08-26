import * as AWS from "@aws-sdk/client-ses";
const util = require('util');

export default class AWSEmail {
	static async sendEmail({from, to, subject, body, region = process.env.AWS_REGION}) {

		let client = new AWS.SES({
			region: region,
		});

		const params = {
			Destination: {
				ToAddresses: to
			},
			Message: {
				Body: {
					Text: {
						Charset: "UTF-8",
						Data: body
					}
				},
				Subject: {
					Charset: 'UTF-8',
					Data: subject
				}
			},
			Source: from,
		};

		const sendEmail = util.promisify(client.sendEmail).bind(client);
		await sendEmail(params);
	}
}