const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, from) {
    const msg = {
        to: to, // Change to your recipient
        from: 'toza21@student.bth.se', // Change to your verified sender
        subject: `${from} has shared a document.`,
        text: 'Login to http://www.student.bth.se/~toza21/editor to see the new document.TEXT',
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        html: '<a href="http://www.student.bth.se/~toza21/editor">login to see the new doc.</a>',
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
}

module.exports = {
    "sendEmail": sendEmail
};
