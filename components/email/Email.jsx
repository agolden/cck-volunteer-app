import AWSEmail from './AWS';

function otpEmailBody(otp) {
	return `Hello,\n\nWe received a request to log in to the CCK volunteer app.\n\n${otp}\n\nEnter this code on the login screen to confirm your identity.\n\nThanks,\nApp Administrators`;
}

export const EMAIL_PROVIDER = Object.freeze({
	aws: "AWS"
});

function getEmailSender(provider) {
	switch (provider) {
		case EMAIL_PROVIDER.aws:
		default:
			return AWSEmail;
	}
}

export async function sendOTP({otp, email, provider = EMAIL_PROVIDER.aws}) {
	
	let emailFrom = 'admin@cckitchen-app.uk';
	let emailTo = [email];
	let emailSubject = 'CCK verification code';
	let emailBody = otpEmailBody(otp);

	let sender = getEmailSender(provider);
	await sender.sendEmail({from: emailFrom, to: emailTo, subject: emailSubject, body: emailBody});
}