// import { Resend } from 'resend';

// const resend = new Resend('re_fCJfUeGJ_HkY4gpjK1wonXfGs2XM7EZu3');

// (async function() {
//   try {
//     const data = await resend.emails.send({
//       from: 'onboarding@resend.dev',
//       to: 'brito171196@hotmail.com',
//       subject: 'Hello World',
//       html: '<strong>it works!</strong>'
//     });

//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// })();
// Link del video
// https://www.youtube.com/watch?v=hgXAGfBgR7k&list=PLeZonnGaBMZXxRu9bDZOcaU1cOU3s7XnJ&index=2
// const express = require('express');
// const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Create a new express application
// const app = express();

// // Use the bodyParser middleware to parse JSON request bodies
// app.use(bodyParser.json());

// Define a route for sending an email
// app.post('/send-email', (req, res) => {
//   // Get the subject and recipient email address from the request body
//   const { subject, recipient } = req.body;

  // Create a transporter object that will handle the sending of the email
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'brito171196@hotmail.com',
      pass: 'drago2313'
    }
  });




  // Define the email message
  const mailOptions = {
    from: 'brito171196@hotmail.com',
    to: 'antoniob@lobos.com.mx',
    cc: 'brito171196@hotmail.com',
    subject: 'Prueba desde NODE JS',
    // text: 'This is a <strong>test</strong> email'
    html: '<h1>¡Hola desde Node.js!</h1><p>Este es un correo con contenido HTML.</p>',
  };


  

  // Use the transporter object to send the email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    //   res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
    //   res.status(200).send('Email sent successfully');
    }
  });
// });

// Start the express server
// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });