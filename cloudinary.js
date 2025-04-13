const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: "ddblbrvxl",
    api_key: "674549153778279",
    api_secret: "tdXOWN_-uNiQUxj8Emqd8KvJcUA",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'multi_uploads',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

module.exports = {
  cloudinary,
  storage
};
