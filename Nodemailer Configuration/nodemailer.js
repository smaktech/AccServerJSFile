const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const main = async (email, otp) => {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp-relay.sendinblue.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: "criptbond@gmail.com", // generated ethereal user
			pass: "9GSpLZ7hdgRUmJnN", // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: 'criptbond@gmail.com', // sender address
		to: `${email}`, // list of receivers
		subject: "Verification Email", // Subject line
		html: `<b>${otp}</b>`, // html body
	});

	console.log("Message sent: %s", info);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = main;
