import nodemailer from 'nodemailer';

const nodemailerConfig = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS,
    },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendVerificationEmail = async (email: string, token: string) => {
    const domain = process.env.DOMAIN_URL;

    const confirmationLink = `${domain}/verify-email?token=${token}`;

    const verifyEmail = {
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: 'Verify your email',
        html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email</p>`,
    };

    return transport.sendMail(verifyEmail);
};

export default sendVerificationEmail;
