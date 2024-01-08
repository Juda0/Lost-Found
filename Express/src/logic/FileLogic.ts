import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs/promises';
import * as path from 'path';

export class FileLogic {
  async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uniqueFileName = `${uuidv4()}-${file.originalname}`;
      const relativePath = path.join('src/uploads', uniqueFileName); // Use a relative path

      // Use process.cwd() to get the current working directory of the Node.js process (instead of full machines directory)
      const filePath = path.join(process.cwd(), relativePath);

      await fs.writeFile(filePath, file.buffer);

      // Use minimal path for saving to db withoout 'src/'
      const dbFilePath = path.join('uploads',uniqueFileName)
      
      return dbFilePath
    } catch (error) {
      throw error;
    }
  }
}
