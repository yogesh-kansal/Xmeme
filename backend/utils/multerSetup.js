var multer=require('multer');
const appError=require('./appError');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileFilter =(req, file, cb)  =>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
        return cb(new appError('image files cn be uploaded only!!!',403), null);
    return cb(null,true);
}

const upload=multer({storage:storage, fileFilter:fileFilter})

module.exports=upload;