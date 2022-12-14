require('dotenv').config();

const express = require('express');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

const smsKey = process.env.SMS_SECRET_KEY;

const app = express();

app.use(express.json());

app.listen('/sendOTP', (req, res) => {
  const phone = req.body.phone;
});
