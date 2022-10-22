import upload from "@config/upload";
import fs from "fs"
import { resolve } from "path"

import { IStorageProvider as IStorageProvider_1 } from "../IStorageProvider";

export class LocalStorageProvider implements IStorageProvider_1 {
  
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tpmFolder, file),
      resolve(`${upload.tpmFolder}/${folder}`, file)
    )

    return file
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tpmFolder}/${folder}`, file)

    try {
      //? stat() verifica se um arquivo existe no diretório indicado
      await fs.promises.stat(filename)
    } catch {
      return
    }
  
    //* Remove o arquivo do diretório
    await fs.promises.unlink(filename)
  }

}