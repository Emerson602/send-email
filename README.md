# Email Sending API
A simple Node.js API for sending emails using Nodemailer.

## Setup
1. Clone the repository:
```
git clone https://github.com/your-username/email-sending-api.git
cd email-sending-api
```
2. Install dependencies:

```npm install express nodemailer dotenv cors body-parser```

3. Configure environment variables in a .env file:

```
EMAIL_USER=your-email@example.com
EMAIL_CC=email-for-copy@example.com
EMAIL_PASS=your-email-password
PORT=3000
```
## Explanation of Environment Variables:
**EMAIL_USER:**
 The email address used as the sender for outgoing emails.

**EMAIL_CC:**
 The email address that will receive a copy of all sent emails.

**EMAIL_PASS:**
 The password for the email account used to send emails.

**PORT:**
 The port on which the server will run (default is 3000).
Start the server:

4. Start the server:

```npm run dev```

## License

This project is licensed under the ISC License.