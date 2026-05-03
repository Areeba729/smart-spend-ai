# Receipt Scanner Expense Feature (React Native + Firebase)

## 1. Goal

Implement a feature that allows a user to **scan a receipt and
automatically add an expense** in the app.

The app already has an **"Add Expense"** feature implemented.\
The new feature will:

1.  Allow the user to scan a receipt using the phone camera.
2.  Extract text from the receipt using OCR.
3.  Attempt to detect the **total amount and date** from the extracted
    text.
4.  Pre-fill the expense form.
5.  Allow the user to **edit/confirm** the expense.
6.  Save the expense using the existing Firebase logic.

This feature is intended for a **Final Year Project**, so the
implementation should prioritize:

-   Low cost (preferably free)
-   Simplicity
-   Reliability
-   Clean user experience

The chosen solution uses **Google ML Kit (on-device OCR)** which is free
and works offline.

------------------------------------------------------------------------

# 2. Technology Choices

## OCR Engine

Use:

Google ML Kit Text Recognition

Reasons:

-   Free
-   Works on device
-   Good enough accuracy for receipts
-   No API cost
-   No backend required

------------------------------------------------------------------------

# 3. High-Level Architecture

Flow:

User scans receipt\
↓\
Image captured from camera\
↓\
ML Kit OCR extracts text\
↓\
App parses text for: - Total amount - Date ↓\
Auto-fill expense form\
↓\
User confirms or edits\
↓\
Save expense to Firebase

------------------------------------------------------------------------

# 4. Feature Flow (User Experience)

## Step 1 --- Open Scanner

User taps:

"Scan Receipt"

This opens a **camera screen**.

User takes a picture of the receipt.

------------------------------------------------------------------------

## Step 2 --- OCR Processing

After the image is captured:

1.  Show loading indicator:

    "Scanning receipt..."

2.  Run OCR using ML Kit.

3.  Extract all text from the receipt.

Example OCR result:

Walmart Supercenter Date: 12/03/2026

Milk 4.50 Bread 2.00 Eggs 3.50

TOTAL: 10.00

------------------------------------------------------------------------

## Step 3 --- Parse Important Fields

From the extracted text, try to detect:

### Amount

Search for patterns like:

TOTAL Total Amount Grand Total

Extract the number next to it.

Example:

TOTAL: 10.00

Detected amount = 10.00

------------------------------------------------------------------------

### Date

Look for common date patterns:

-   DD/MM/YYYY
-   MM/DD/YYYY
-   DD-MM-YYYY

Example:

12/03/2026

Detected date = 12/03/2026

------------------------------------------------------------------------

### Merchant Name

Use the **first line of the receipt text** as merchant name.

Example:

Walmart Supercenter

------------------------------------------------------------------------

# 5. Pre-fill Expense Form

After parsing the text, open the existing **Add Expense screen**.

Pre-fill:

Amount → detected amount\
Title → merchant name\
Date → detected date

Category can remain empty or default.

User can edit any field.

------------------------------------------------------------------------

# 6. User Confirmation

Before saving, the user should see:

Auto-detected fields.

Example UI:

Merchant: Walmart Supercenter\
Amount: 10.00\
Date: 12/03/2026\
Category: \[select\]

Button:

Confirm Expense

------------------------------------------------------------------------

# 7. Save Expense

Once the user confirms:

Use the **existing expense creation logic** already implemented in the
app.

This will save the expense to **Firebase**.

No backend changes are required.

------------------------------------------------------------------------

# 8. Recommended Libraries

For React Native:

Camera:

react-native-vision-camera

OCR:

@react-native-ml-kit/text-recognition

------------------------------------------------------------------------

# 9. Implementation Steps

## Step 1

Install camera library.

## Step 2

Install ML Kit text recognition library.

## Step 3

Create new screen:

ReceiptScannerScreen

Responsibilities:

-   open camera
-   capture image

## Step 4

After capturing image:

Run OCR on the image.

## Step 5

Extract text blocks returned by ML Kit.

Combine them into a single string.

## Step 6

Write a parser utility function:

parseReceiptText()

This function should attempt to extract:

-   amount
-   date
-   merchant name

## Step 7

Navigate to:

AddExpenseScreen

Pass detected values as parameters.

## Step 8

Populate form fields using the passed values.

## Step 9

User edits or confirms.

## Step 10

Call existing Firebase expense creation function.

------------------------------------------------------------------------

# 10. Edge Cases

Handle cases where:

-   No amount detected
-   No date detected
-   OCR fails

In these cases:

Open Add Expense screen with empty fields.

User fills manually.

------------------------------------------------------------------------

# 11. Demo Tips (For Final Year Project)

To make the feature look impressive:

Show loading message:

"AI Scanning Receipt..."

Highlight detected amount.

Always allow manual correction.

------------------------------------------------------------------------

# 12. Copilot Implementation Prompt

Use the following prompt with your AI coding assistant:

------------------------------------------------------------------------

PROMPT:

I am building a React Native app that already has an Add Expense feature
using Firebase.

I want to implement a new feature called "Scan Receipt".

Requirements:

1.  Use react-native-vision-camera to capture a receipt image.
2.  Use @react-native-ml-kit/text-recognition for OCR.
3.  After capturing the image, extract text from the receipt.
4.  Parse the extracted text to detect:
    -   total amount
    -   date
    -   merchant name (first line of text)
5.  Navigate to the existing AddExpenseScreen.
6.  Pre-fill the form fields using detected values.
7.  Allow the user to edit the fields.
8.  When the user confirms, use the existing Firebase logic to save the
    expense.

Structure the implementation cleanly with:

-   a ReceiptScannerScreen
-   a parseReceiptText utility function
-   navigation to AddExpenseScreen with detected values

Focus on simple and reliable implementation suitable for a final year
project.

Do not overcomplicate the architecture.
