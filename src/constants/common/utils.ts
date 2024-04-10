const nodemailer = require("nodemailer");
import { Injectable } from '@nestjs/common';

const transporter = nodemailer.createTransport({
	service: "Gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "w069485@gmail.com",
		pass: "Webdev@12345",
	},
});

@Injectable()
export class SendEmailService {
	sendEmail(email, subject, message="You are invited to this event") {
		const mailOptions = {
			from: "",
			to: email,
			subject: subject,
			text: message,
		};
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error("Error sending email: ", error);
			} else {
				console.log("Email sent: ", info.response);
			}
		});

	}
}