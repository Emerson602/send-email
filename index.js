const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());   

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Server ready to send emails');
  }
});

app.post('/send-email', (req, res) => {
    const { email, name, phone, message } = req.body;
  
    console.log('Data received:', { email, name, phone, message });   
  
    const mailOptionsToSelf = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      cc: process.env.EMAIL_CC,     
      replyTo: email,
      subject: 'New contact form message',
      text: `Name: ${name}\nTelephone: ${phone}\nMessage: ${message}`     
    }; 

    transporter.sendMail(mailOptionsToSelf, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: error.message });  
      }
      console.log('Email sent to you:', info.response); 
    
      const mailOptionsToUser = { 
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Receipt Confirmation',
        text: `Hello ${name},\n\nWe have received your message and will get back to you shortly.\n\nMessage sent:\n${message}`,
      };

      transporter.sendMail(mailOptionsToUser, (error, info) => {
        if (error) {
          console.error('Error sending confirmation email:', error);
          return res.status(500).json({ error: error.message });
        }
        console.log('Confirmation email sent:', info.response);
        res.status(200).json({ message: 'Emails sent successfully!' });
      });
    });
  });

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
