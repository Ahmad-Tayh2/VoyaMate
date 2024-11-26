import { BadRequestException, Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileStorageService {
  private readonly uploadPath = path.join(process.cwd(), 'uploads'); 

  constructor() {
    try {
      // Ensure the uploads directory exists
      if (!fs.existsSync(this.uploadPath)) {
        fs.mkdirSync(this.uploadPath, { recursive: true });
        console.log('Uploads directory created:', this.uploadPath);
      } else {
        console.log('Uploads directory already exists:', this.uploadPath);
      }
    } catch (error) {
      console.error('Error creating uploads directory:', error);
      throw new BadRequestException('Failed to initialize file storage');
    }
  }

  saveFile(file: { originalname: string; buffer: Buffer }): string {
    const extension = path.extname(file.originalname); // Get file extension
    const fileName = `${Date.now()}-${path.basename(file.originalname, extension)}${extension}`;
    const filePath = path.join(this.uploadPath, fileName);

    try {
      console.log('Saving file...');
      console.log('File Path:', filePath);
      console.log('Buffer Size:', file.buffer.length);

      // Write file to disk
      fs.writeFileSync(filePath, file.buffer);
      console.log('File saved successfully:', filePath);
    } catch (error) {
      console.error('Error saving file:', error);
      throw new BadRequestException('Failed to save file');
    }

    return fileName; // Return the saved file's name
  }

  deleteFile(fileName: string): boolean {
    const filePath = path.join(this.uploadPath, fileName);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete file
        console.log('File deleted successfully:', filePath);
        return true;
      } else {
        throw new Error('File not found');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new BadRequestException('File not found');
    }
  }
}
