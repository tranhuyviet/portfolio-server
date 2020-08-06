import nodemailer from 'nodemailer';

const from = '"Viet Tran" <viet@viet.fi>';

const setup = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

export const sendEmailToContact = (email) => {
    const transport = setup();
    const emailOuput = {
        from,
        to: email,
        subject: 'Auto reply from www.viet.fi',
        html: `
            <h3>Thanks for your message from www.viet.fi/contact</h3>
            <p>I will reply to you as soon as possible</p>
            <h4>Viet Tran</h4>
        `,
    };

    transport.sendMail(emailOuput);
};

export const sendEmailToViet = (name, email, message) => {
    const transport = setup();
    const emailOuput = {
        from,
        to: 'viet@viet.fi',
        subject: `${name} has just sent message from contact`,
        html: `
            <h3>Name: ${name}</h3>
            <h3>Email: ${email}</h3>
            <p>Message: ${message}</p>
        `,
    };

    transport.sendMail(emailOuput);
};
