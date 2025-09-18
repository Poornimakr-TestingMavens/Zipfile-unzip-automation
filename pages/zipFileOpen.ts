import * as XLSX from 'xlsx';

export class ExcelValidator {

    static readExcelFile(filePath: string): any[][] {
        const workbook = XLSX.readFile(filePath);
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    }

    static validateExcelData(actualData: any[][], expectedData: any[][]): boolean {
        if (actualData.length !== expectedData.length) return false;

        for (let rowIndex = 0; rowIndex < actualData.length; rowIndex++) {
            const actualRow = actualData[rowIndex];
            const expectedRow = expectedData[rowIndex];
            if (actualRow.join() !== expectedRow.join()) return false;
        }
        return true;
    }
}
