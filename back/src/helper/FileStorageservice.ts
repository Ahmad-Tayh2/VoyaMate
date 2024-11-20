import { BadRequestException, Injectable } from "@nestjs/common";
import * as fs from 'fs'
import * as path from 'path'
@Injectable()
export class FileStorageService {
    private readonly uploadPath = path.join(__dirname, '..', 'uploads');
    constructor() {
       
        if (!fs.existsSync(this.uploadPath)) {
          fs.mkdirSync(this.uploadPath, { recursive: true });
        }
        
      }
      saveFile(file: { originalname: string; buffer: Buffer }): string {
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(this.uploadPath, fileName);
    
        try {
          console.log('before write')
          console.log(filePath);
          console.log(file.buffer)
          fs.writeFileSync(filePath, file.buffer); 
          
          console.log('after write')// Enregistrer le fichier
        } catch (error) {
          throw new BadRequestException('Failed to save file');
        }
        return fileName;
      }
      deleteFile(fileName: string): boolean {
        const filePath = path.join(this.uploadPath, fileName);
    
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Supprimer le fichier
          return true;
        }
    
        throw new BadRequestException('File not found');
      }
      
}