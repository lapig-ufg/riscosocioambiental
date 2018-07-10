multer = require('multer')
, dateFormat = require('dateformat');

module.exports = function (app) {

	var upload = app.controllers.upload;

	const storage = multer.diskStorage({
	    destination: function (req, file, cb) {
	        cb(null, 'uploads/');
	    },
	    filename: function (req, file, cb) {
	        cb(null,dateFormat(new Date(), "dd-mm-yyyyTHH:MM:ss") + '-' + file.originalname)
	    }
	});

	var multerUpload = multer({ storage });

	app.get('/service/upload', upload.file);
	app.post('/service/upload', multerUpload.single('uploadFile'), upload.file);
}