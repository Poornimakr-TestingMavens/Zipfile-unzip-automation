import * as XLSX from 'xlsx';

export class ExcelValidator {

    /**
     * Reads the first sheet of an Excel file and converts it into a 2D array.
     *
     * @param filePath - Full path to the Excel file
     * @returns 2D array representing rows and columns of the Excel sheet
     */
    static readExcelFile(filePath: string): any[][] {
        const workbook = XLSX.readFile(filePath); 
        const firstSheetName = workbook.SheetNames[0]; 
        const worksheet = workbook.Sheets[firstSheetName]; 
        return XLSX.utils.sheet_to_json(worksheet, { header: 1 }); 
    }

    /**
     * Compares actual Excel data with expected data to validate correctness.
     * - Compares row by row, ensuring values match in order.
     *
     * @param actualData - Data extracted from the Excel file (2D array)
     * @param expectedData - Reference data to validate against (2D array)
     * @returns true if data matches row by row, otherwise false
     */
    static validateExcelData(actualData: any[][], expectedData: any[][]): boolean {
  
        if (actualData.length !== expectedData.length) return false;

        // Compare each row
        for (let rowIndex = 0; rowIndex < actualData.length; rowIndex++) {
            const actualRow = actualData[rowIndex];
            const expectedRow = expectedData[rowIndex];

            // Simple comparison: join arrays into comma-separated strings and check equality
            if (actualRow.join() !== expectedRow.join()) return false;
        }

        return true; 
    }
}

