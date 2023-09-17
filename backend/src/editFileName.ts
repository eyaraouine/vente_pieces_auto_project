import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
export const editFileName = (req, file, cb) => {
const randomName = uuidv4()

+file.originalname.replace(/\s/g, "");

cb(null, randomName);
};

export const fileUploadOptions = {
    storage: diskStorage({
      destination: '../frontend/public',
      filename: editFileName,
    }),
    };