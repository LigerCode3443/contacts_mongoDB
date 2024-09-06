import sgMail from "@sendgrid/mail";
import "dotenv/config";

const { SENDGRID_API_KEY, SENDGRID_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const msg = {
//   to: "Zero_go@meta.ua", // Change to your recipient
//   from: SENDGRID_FROM, // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

const sendEmail = (data) => {
  const email = { ...data, from: SENDGRID_FROM };

  sgMail
    .send(email)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

export default sendEmail;
