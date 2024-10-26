const multer = require('multer');

var storage = multer.memoryStorage();

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            callback(null, true);
        } else {
            console.log('Only JPEG or JPG files are supported');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5 
    }
});

module.exports = upload;
