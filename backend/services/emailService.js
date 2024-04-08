// services/emailService.js
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        // Configure transporter
        host:'smtp.gmail.com',
        port:465,
        secure:true, // upgrade later with STARTTLS and support for 8bitm
        auth:{
            user:'developershamshad@gmail.com',
            pass:"vhfb gwyg xytu isgw"

        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject,
        text
    });
};

module.exports = sendEmail;
