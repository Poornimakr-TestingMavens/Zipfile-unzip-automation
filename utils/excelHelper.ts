import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';

export class FileHelper {

    static unzipFile(zipFilePath: string, extractToDir: string): string[] {
        if (!fs.existsSync(extractToDir)) {
            fs.mkdirSync(extractToDir, { recursive: true });
        }

        const zip = new AdmZip(zipFilePath);
        zip.extractAllTo(extractToDir, true);

        // Return list of top-level folders extracted
        const extractedFolders = fs.readdirSync(extractToDir)
                                   .map(name => path.join(extractToDir, name))
                                   .filter(filePath => fs.lstatSync(filePath).isDirectory());

        return extractedFolders;
    }

    static getExcelFilesInFolder(folderPath: string): string[] {
        return fs.readdirSync(folderPath)
                 .filter(file => file.endsWith('.xlsx'))
                 .map(file => path.join(folderPath, file));
    }
}
