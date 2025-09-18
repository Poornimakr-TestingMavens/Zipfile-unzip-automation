**📂 ZipFile Automation with Playwright**

This project automates the process of unzipping Excel files, reading their contents, and validating data against predefined expectations using Playwright.

🚀 Features

Unzips .zip archives containing .xlsx files.

Organizes extracted Excel files into respective folders.

Reads Excel data into a 2D array for easy comparison.

Validates data against parameterized expected values.

Uses Playwright Test Runner for structured test execution.

📁 Project Structure
ZIPFILE-AUTOMATION/

ZIPFILE-AUTOMATION/
├── node_modules/               # Dependencies
├── pages/
│   └── zipFileOpen.ts          # ExcelValidator (read & validate Excel data)
├── playwright-report/          # Test reports
├── test-data/
│   ├── extracted/              # Extracted Excel files
│   └── test-data.zip           # Sample zip with Excel files
├── test-results/               # Playwright output results
├── tests/
│   └── example.spec.ts         # Main test spec (unzip & validation)
├── utils/
│   ├── excelDataValidation.ts  # Expected Excel data
│   └── excelHelper.ts          # FileHelper (unzipping & file handling)
├── playwright.config.ts        # Playwright configuration
├── package.json
└── README.md

🛠️ Installation & Setup

Clone the repository

git clone <repo-url>
cd ZIPFILE-AUTOMATION


Install dependencies

npm install


Run tests

npx playwright test


Generate report

npx playwright show-report

📜 Key Components
🔹 ExcelValidator (pages/zipFileOpen.ts)

Reads Excel files into a 2D array.

Validates actual vs expected Excel data row-by-row.

const actualData = ExcelValidator.readExcelFile('path/to/file.xlsx');
const isValid = ExcelValidator.validateExcelData(actualData, expectedData);

🔹 FileHelper (utils/excelHelper.ts)

Unzips Excel files into folders.

Finds .xlsx files inside extracted folders.

const folders = FileHelper.unzipFile(zipPath, extractDir);
const excelFiles = FileHelper.getExcelFilesInFolder(folders[0]);

🔹 ExcelValidationData (utils/excelDataValidation.ts)

Stores expected data for validation in a parameterized way.

export const ExcelValidationData = {
  'Asia.xlsx': [
    ['Country', 'Capital'],
    ['India', 'New Delhi'],
    ['China', 'Beijing']
  ]
};

🔹 Playwright Test (tests/example.spec.ts)

Defines step-by-step test flow:

Extract zip file.

Collect all Excel files.

Validate their contents against ExcelValidationData.

**Example Test Run Output**
Extracted Asia.xlsx → test-data/extracted/Asia
Extracted India.xlsx → test-data/extracted/India
Validation passed for Asia.xlsx in folder Asia
Validation passed for India.xlsx in folder India

📦 Dependencies

Playwright
 - Test runner

xlsx
 - Excel file parser

adm-zip
 - Zip extractor

Node.js fs, path
