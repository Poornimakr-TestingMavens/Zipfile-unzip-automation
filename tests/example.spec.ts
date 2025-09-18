import { test, expect } from '@playwright/test';
import { PathConfig } from '../path-config/paths';
import { FileHelper } from '../utils/excelHelper';
import { ExcelValidator } from '../pages/zipFileOpen';
import { ExcelValidationData } from '../utils/excelDataValidation';

// Expected data for Excel files
// const expectedDataMap: { [fileName: string]: any[][] } = {
//     'Asia.xlsx': [
//         ['Country', 'Capital'],
//         ['India', 'New Delhi'],
//         ['China', 'Beijing']
//     ],
//     'India.xlsx': [
//         ['State', 'Capital'],
//         ['Maharashtra', 'Mumbai'],
//         ['Karnataka', 'Bengaluru']
//     ]
// };


test.describe('Unzip and Validate Excel Data in Folders', () => {

    let extractedFolders: string[] = [];

    test('Step 1: Extract zip file and list top-level folders', async () => {
        extractedFolders = FileHelper.unzipFile(PathConfig.zipFilePath, PathConfig.extractedFilesDir);
        console.log('Extracted folders:', extractedFolders);
        expect(extractedFolders.length).toBeGreaterThan(0);
    });

    test('Step 2: Validate all Excel files inside each extracted folder', async () => {
        for (const folderPath of extractedFolders) {
            const excelFiles = FileHelper.getExcelFilesInFolder(folderPath);

            expect(excelFiles.length).toBeGreaterThan(0);

            for (const excelFilePath of excelFiles) {
                const fileName = excelFilePath.split('/').pop() || excelFilePath.split('\\').pop()!;
                const actualExcelData = ExcelValidator.readExcelFile(excelFilePath);

                expect(ExcelValidationData[fileName]).toBeDefined();
                const isDataValid = ExcelValidator.validateExcelData(actualExcelData, ExcelValidationData[fileName]);
                expect(isDataValid).toBe(true);

                console.log(`Validation passed for ${fileName} in folder ${folderPath.split('/').pop()}`);
            }
        }
    });
});
