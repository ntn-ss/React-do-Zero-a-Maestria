const multer = require("multer")
const path = require("path")

// Destination to store image
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = ""

        if (req.baseUrl.includes("users")) {
            folder = "users"
        } else if (req.baseUrl.includes("photos")){
            folder = "photos"
        }
        cb(null, `uploads/${folder}/`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const imageUpload = multer ({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)){
            // upload only .PNG and .JPG formats
            return cb(new error("Por favor, envie apenas arquivos PNG ou JPG."))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }