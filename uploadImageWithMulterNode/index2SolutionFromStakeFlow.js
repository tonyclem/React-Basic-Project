const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const router = express.Router();

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

const imageSchema = mongoose.Schema(
  {
    image: { data: Buffer, contentType: String },
  },
  { timestamps: true }
);

const ImageModel = mongoose.model('images', imageSchema);

router.post('/upload', upload.single('image'), async (req, res, next) => {
  const image = {
    data: new Buffer.from(req.file.buffer, 'base64'),
    contentType: req.file.mimetype,
  };
  const savedImage = await ImageModel.create(image);
  res.send(savedImage);
});

router.get('/getImage/:id', async (req, res, next) => {
  const { id: _id } = req.params;
  // If you dont use lean(), you wont decode image as base64
  const image = await ImageModel.findOne({ _id }).lean().exec();
  res.send(image);
});

module.exports = router;
