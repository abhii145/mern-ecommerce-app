import multer from 'multer';


const storage = multer.diskStorage({
    destination(req, file, callback) {
callback(null, 'uploads');
    },
    filename(req, file, callback) {
        const date = new Date().toISOString().replace(/:/g, "-"); // replace ":" (not valid in filename) with "-"
        callback(null, `${date}-${file.originalname}`);
    }

});


export const singleUpload = multer({ storage}).single('photo');