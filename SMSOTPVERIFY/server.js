require('dotenv').config();

const express = require('express');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

const smsKey = process.env.SMS_SECRET_KEY;
let refreshTokens = [];

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const PORT = 5000;

app.post('/sendOTP', (req, res) => {
  const phone = req.body.phone;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const tti = 2 * 60 * 1000;
  const expires = Date.now() + tti;
  const data = `${phone}.${otp}.${expires}`;
  console.log('what is data', data);
  const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
  const fullHash = `${hash}.${expires}`;
  console.log('what is full hash', fullHash);
  client.messages
    .create({
      body: `Your one time Login password is ${otp}`,
      from: process.env.PHONE,
      to: phone,
    })
    .then((messages) => console.log(messages))
    .catch((err) => console.log(err));

  res.status(200).send({ phone, hash: fullHash, otp });
});

app.post('/verifyOTP', (req, res) => {
  const phone = req.body.phone;
  const hash = req.body.hash;
  console.log('what is hash here', hash);
  const otp = req.body.otp;
  let [hashValue, expires] = hash.split('.');
  console.log('hash valuse', hashValue);
  console.log('hash expires', expires);
  let now = Date.now();
  if (now > parseInt(expires)) {
    return res.status(404).send({ message: `Timeout please Try again later` });
  }

  const data = `${phone}.${otp}.${expires}`;
  const newCalculatedHash = crypto
    .createHmac('sha256', smsKey)
    .update(data)
    .digest('hex');

  console.log('new calculate', newCalculatedHash);
  if (newCalculatedHash === hashValue) {
    const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, {
      expiresIn: '30s',
    });
    const refreshToken = jwt.sign({ data: phone }, JWT_REFRESH_TOKEN, {
      expiresIn: '1y',
    });
    refreshTokens.push(refreshToken);

    return res
      .status(202)
      .cookie('accessToken', accessToken, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: 'strict',
        httpOnly: true,
      })
      .cookie('refreshToken', refreshToken, {
        expires: new Date(new Date().getTime() + 31557600000),
        sameSite: 'strict',
        httpOnly: true,
      })
      .cookie('authSession', true, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: 'strict',
      })
      .cookie('refreshTokenID', true, {
        expires: new Date(new Date().getTime() + 31557600000),
        sameSite: 'strict',
      })
      .send({ msg: 'Device verified' });
  } else {
    return res
      .status(403)
      .send({ verification: false, message: `user not confirmed` });
  }
});

app.post('/home', authenticateUser, (req, res) => {
  console.log('home private route');
  res.status(202).send('Private Protected Route - Home');
});

async function authenticateUser(req, res, next) {
  const accessToken = req.cookies.accessToken;

  jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
    if (phone) {
      req.phone = phone;
      next();
    } else if (err.message === 'TokenExpiredError') {
      return res.status(403).send({
        success: false,
        msg: 'Access token expired',
      });
    } else {
      console.log(err);
      return res.status(403).send({ err, msg: 'User not authenticated' });
    }
  });
}

app.post('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res
      .status(403)
      .send({ message: 'Refresh token not found, login again' });
  if (!refreshTokens.includes(refreshToken))
    return res
      .status(403)
      .send({ message: 'Refresh token blocked, login again' });

  jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, phone) => {
    if (!err) {
      const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, {
        expiresIn: '30s',
      });
      return res
        .status(200)
        .cookie('accessToken', accessToken, {
          expires: new Date(new Date().getTime() + 30 * 1000),
          sameSite: 'strict',
          httpOnly: true,
        })
        .cookie('authSession', true, {
          expires: new Date(new Date().getTime() + 30 * 1000),
          sameSite: 'strict',
        })
        .send({ previousSessionExpired: true, success: true });
    } else {
      return res.status(403).send({
        success: false,
        msg: 'Invalid refresh token',
      });
    }
  });
});

app.get('/logout', (req, res) => {
  res
    .clearCookie('refreshToken')
    .clearCookie('accessToken')
    .clearCookie('authSession')
    .clearCookie('refreshTokenID')
    .send('logout');
});

app.listen(PORT, () => console.log(`List to server on port ${PORT}....`));
