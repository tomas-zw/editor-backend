// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'tomzwo@gmail.com', // Change to your recipient
  from: 'toza21@student.bth.se', // Change to your verified sender
  subject: 'New shared document.',
  text: 'Login to http://www.student.bth.se/~toza21/editor to see the new document.TEXT',
  // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  html: '<a href="http://www.student.bth.se/~toza21/editor">login to see the new doc.</a>',
}
async function sendEmail() {
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

module.exports = {
    "sendEmail": sendEmail
};
