const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix+".jpg")
//   }
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileExtension = file.originalname.split('.').pop(); // Get the file extension
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension); // Append the file extension to the file name
  }
})

const upload = multer({
  storage: storage
});


module.exports = upload ;