const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Methods to display directory
console.log("multer-config.js __dirname:    ", __dirname);
console.log("multer-config.js process.cwd() : ", process.cwd());
console.log("multer-config.js ./ : ", path.resolve("./"));
console.log("multer-config.js filename: ", __filename);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').resolve('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');