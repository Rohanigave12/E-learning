import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    const id = uuid();

    const extName = file.originalname.split(".").pop();
    console.log(extName)

    const fileName = `${id}.${extName}`;

    cb(null, fileName);
  },
});

export const  uploadFiles = multer({ storage }).single("file");
