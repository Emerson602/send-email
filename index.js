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
    console.error('Erro na configuração SMTP:', error);
  } else {
    console.log('Servidor SMTP pronto para enviar e-mails');
  }
});

app.post('/send-email', (req, res) => {
    const { email, name, phone, message } = req.body;
  
    console.log('Dados recebidos:', { email, name, phone, message });   
  
    const mailOptionsToSelf = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      cc: process.env.EMAIL_CC,     
      replyTo: email,
      subject: 'Nova message do formulário de contato',
      text: `Nome: ${name}\ntelefone: ${phone}\nmensagem: ${message}`     
    }; 

    transporter.sendMail(mailOptionsToSelf, (error, info) => {
      if (error) {
        console.error('Erro ao enviar email para você:', error);
        return res.status(500).json({ error: error.message });
      }
      console.log('Email enviado para você (e cópia para o usuário):', info.response); 
    
      const mailOptionsToUser = { 
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Receipt Confirmation',
        text: `Hello ${name},\n\nWe have received your message and will get back to you shortly.\n\nMessage sent:\n${message}`,
      };

      transporter.sendMail(mailOptionsToUser, (error, info) => {
        if (error) {
          console.error('Erro ao enviar email de confirmação:', error);
          return res.status(500).json({ error: error.message });
        }
        console.log('Email de confirmação enviado:', info.response);
        res.status(200).json({ message: 'Emails enviados com sucesso!' });
      });
    });
  });

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
