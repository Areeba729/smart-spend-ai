is# Feature: Download Daily and Weekly Expense Reports

## Overview

This feature will allow users to download their expense reports on a daily and weekly basis. The reports will include detailed information about their expenses, such as:

- **Category**: The category of the expense (e.g., Food, Transport, etc.)
- **Title**: A brief description of the expense
- **Price**: The amount spent
- **Date**: The date of the expense

The reports will be generated dynamically based on the user's expenses and will be available in a downloadable format (e.g., PDF or CSV).

---

## Implementation Plan

### 1. **Firebase Integration**

- Use Firebase Firestore to fetch expense data for daily and weekly reports.
- Use Firebase Storage to upload and store the generated reports (PDF or CSV).
- Ensure Firebase rules are configured to allow secure access to the reports.

### 2. **Frontend Implementation**

#### a. **UI Changes**

- Add a "Download Report" button to the `Report` screen for both daily and weekly tabs.
- Place the button prominently near the statistics or summary section.

#### b. **Data Preparation**

- Use the existing `dailyTransactions` and `weeklyTransactions` data to prepare the report content.
- Format the data into a structured format suitable for PDF or CSV generation.

#### c. **Report Generation**

- Use a library like `react-native-html-to-pdf` or `react-native-share` to generate and share/download the report directly from the app.
- For CSV, use a library like `react-native-csv` to create and download the file.

#### d. **Uploading to Firebase Storage**

- Implement a function to upload the generated report to Firebase Storage.
- Provide users with a download link for the uploaded report.

---

## Steps to Add the Feature

### Step 1: Add "Download Report" Button

- Modify the `Report.js` file to include a button for downloading the report.
- Use `onPress` to trigger the download functionality.

### Step 2: Prepare Data for Reports

- Use the `dailyTransactions` and `weeklyTransactions` arrays to extract the required data.
- Format the data into a table-like structure.

### Step 3: Generate PDF or CSV

- Install the required libraries:
  ```bash
  npm install react-native-html-to-pdf react-native-share
  npm install react-native-csv
  ```
- Create utility functions to generate PDF and CSV files.

### Step 4: Upload to Firebase Storage

- Use Firebase Storage to upload the generated reports.
- Update Firebase rules to allow authenticated users to upload and access their reports securely.

### Step 5: Test the Feature

- Test the download functionality on both Android and iOS devices.
- Verify that the reports are accurate and properly formatted.

---

## Example Code Snippets

### Adding the Download Button

```jsx
import { Button } from 'react-native';

<Button
  title="Download Report"
  onPress={() => handleDownloadReport(activeTab)}
/>;
```

### Generating a PDF

```javascript
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import storage from '@react-native-firebase/storage';

const generateAndUploadPDF = async (data, reportType) => {
  const htmlContent = `
    <html>
      <body>
        <h1>${reportType} Expense Report</h1>
        <table>
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
          ${data
            .map(
              expense => `
            <tr>
              <td>${expense.category}</td>
              <td>${expense.title}</td>
              <td>${expense.price}</td>
              <td>${expense.date}</td>
            </tr>
          `,
            )
            .join('')}
        </table>
      </body>
    </html>
  `;

  const options = {
    html: htmlContent,
    fileName: `${reportType}_Expense_Report`,
    directory: 'Documents',
  };

  const file = await RNHTMLtoPDF.convert(options);

  // Upload to Firebase Storage
  const storageRef = storage().ref(`/reports/${reportType}_Expense_Report.pdf`);
  await storageRef.putFile(file.filePath);

  const downloadURL = await storageRef.getDownloadURL();
  console.log('Report uploaded. Download URL:', downloadURL);

  return downloadURL;
};
```

### Generating a CSV

```javascript
import { writeFile } from 'react-native-fs';
import storage from '@react-native-firebase/storage';

const generateAndUploadCSV = async (data, reportType) => {
  const csvContent = [
    ['Category', 'Title', 'Price', 'Date'],
    ...data.map(expense => [
      expense.category,
      expense.title,
      expense.price,
      expense.date,
    ]),
  ]
    .map(row => row.join(','))
    .join('\n');

  const path = `${RNFS.DocumentDirectoryPath}/${reportType}_Expense_Report.csv`;
  await writeFile(path, csvContent, 'utf8');

  // Upload to Firebase Storage
  const storageRef = storage().ref(`/reports/${reportType}_Expense_Report.csv`);
  await storageRef.putFile(path);

  const downloadURL = await storageRef.getDownloadURL();
  console.log('Report uploaded. Download URL:', downloadURL);

  return downloadURL;
};
```

---

## Libraries to Use

- **PDF Generation**: `react-native-html-to-pdf`
- **CSV Generation**: `react-native-csv`
- **File Handling**: `react-native-fs`
- **Firebase Integration**: `@react-native-firebase/storage`

---

## Future Enhancements

- Add filters to allow users to customize the report (e.g., by date range or category).
- Include charts and graphs in the PDF report for better visualization.
- Allow users to email the report directly from the app.

---

## Conclusion

This feature will enhance the app's usability by providing users with a convenient way to track and analyze their expenses. By implementing the steps outlined above, we can ensure a seamless and user-friendly experience.
