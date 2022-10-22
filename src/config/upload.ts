import multer from "multer";
import { resolve } from "path"
import crypto from "crypto"

const tpmFolder = resolve(__dirname, "..", "..", "tmp")

export default {
  tpmFolder,

  storage: multer.diskStorage({
    destination: tpmFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex")
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}