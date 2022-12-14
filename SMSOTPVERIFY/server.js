require('dotenv').config();

const express = require('express');
const crypto = require('crypto');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

const smsKey = process.env.SMS_SECRET_KEY;

const app = express();

app.use(express.json());

const PORT = 5000;

app.post('/sendOTP', (req, res) => {
  const phone = req.body.phone;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const tti = 2 * 60 * 1000;
  const expires = Date.now() + tti;
  const data = `${phone}.${otp}.${expires}`;
  console.log('what is counting', data);
  const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
  const fullHash = `${hash}.${expires}`;

  //   client.messages
  //     .create({
  //       body: `Your one time Login password is ${otp}`,
  //       from: +19707189066,
  //       to: phone,
  //     })
  //     .then((messages) => console.log(messages))
  //     .catch((err) => console.log(err));

  res.status(200).send({ phone, hash: fullHash, otp });
});

app;

app.listen(PORT, () => console.log(`List to server on port ${PORT}....`));
