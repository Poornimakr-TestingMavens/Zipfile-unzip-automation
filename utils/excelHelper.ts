import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';

export const PathConfig = {
    zipFilePath: path.resolve(__dirname, '../test-data/test-data.zip'),
    extractedFilesDir: path.resolve(__dirname, '../test-data/extracted')
};

export class FileHelper {

    static unzipFile(zipFilePath: string, extractToDir: string): string[] {
        if (!fs.existsSync(extractToDir)) {
            fs.mkdirSync(extractToDir, { recursive: true });
        }

        const zip = new AdmZip(zipFilePath);

        // Extract each Excel file into its own folder
        zip.getEntries().forEach(entry => {
            if (entry.entryName.endsWith('.xlsx')) {
                const fileName = path.basename(entry.entryName);
                const folderName = path.basename(fileName, '.xlsx'); // e.g. "Asia"
                const targetDir = path.join(extractToDir, folderName);

                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }

                zip.extractEntryTo(entry, targetDir, false, true);
                console.log(`Extracted ${fileName} → ${targetDir}`);
            }
        });

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
