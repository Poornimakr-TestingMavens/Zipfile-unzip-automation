import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';


export const PathConfig = {
    zipFilePath: path.resolve(__dirname, '../test-data/test-data.zip'), 
    extractedFilesDir: path.resolve(__dirname, '../test-data/extracted') 
};

export class FileHelper {

    /**
     * Unzips the given file into the specified directory.
     * @param zipFilePath - Path of the ZIP file to extract
     * @param extractToDir - Directory where the files should be extracted
     * @returns List of paths to the top-level folders created during extraction
     */
    static unzipFile(zipFilePath: string, extractToDir: string): string[] {
        // Ensure extraction directory exists
        if (!fs.existsSync(extractToDir)) {
            fs.mkdirSync(extractToDir, { recursive: true });
        }

        const zip = new AdmZip(zipFilePath);

        // Loop through all entries in the ZIP
        zip.getEntries().forEach(entry => {
            if (entry.entryName.endsWith('.xlsx')) {
                const fileName = path.basename(entry.entryName); 
                const folderName = path.basename(fileName, '.xlsx');
                const targetDir = path.join(extractToDir, folderName);

                // Create target folder if it doesn't exist
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }

                // Extract the Excel file into its folder
                zip.extractEntryTo(entry, targetDir, false, true);
                console.log(`Extracted ${fileName} → ${targetDir}`);
            }
        });

        // Collect and return only the directories created during extraction
        const extractedFolders = fs.readdirSync(extractToDir)
                                   .map(name => path.join(extractToDir, name))
                                   .filter(filePath => fs.lstatSync(filePath).isDirectory());

        return extractedFolders;
    }

    /**
     * Finds all `.xlsx` files in a given folder.
     *
     * @param folderPath - Path to the folder to search
     * @returns Array of full paths to Excel files inside the folder
     */
    static getExcelFilesInFolder(folderPath: string): string[] {
        return fs.readdirSync(folderPath)
                 .filter(file => file.endsWith('.xlsx')) // Only keep Excel files
                 .map(file => path.join(folderPath, file)); // Convert to full path
    }
}
