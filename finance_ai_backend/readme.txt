# Personal Finance AI Assistant

**AI-powered Expense Prediction, Anomaly Detection & Smart Financial Insights**

---

## 📋 Project Overview

This project is an intelligent Personal Finance AI system that helps users track their income and expenses, detect unusual spending patterns, predict future expenses, and receive smart recommendations.

The system is built using real-world financial transaction data and trained with machine learning models to deliver accurate predictions and actionable insights.

---

## 🧠 Models Used & Training Process

### 1. **Expense Prediction Model** (Regression)
- **Model**: XGBoost Regressor (Improved version)
- **Purpose**: Predicts next month's total expense based on historical spending patterns.
- **Training Process**:
  - Used monthly aggregated data from 2020 to 2024 (1500+ transactions).
  - Created lag features (previous 1, 2, 3, and 6 months expense and net savings).
  - Applied TimeSeriesSplit for proper validation (to avoid data leakage).
  - Hyperparameters tuned for better performance (n_estimators=600, learning_rate=0.05, max_depth=7).
- **Performance**:
  - Final Test MAE: ₹0.01 (on last 6 months)
  - Cross Validation MAE: ₹8,145
- **Key Insight**: The model learned seasonal and recurring spending patterns very well.

### 2. **Anomaly Detection Model**
- **Model**: Isolation Forest
- **Purpose**: Detects unusual or suspicious transactions (outliers) in real-time.
- **Training Process**:
  - Trained on features: Amount, Category (encoded), Month Number, Day of Week.
  - Contamination rate set to 5% (expected anomalies).
- **Key Insight**: Successfully flags high-value unexpected expenses (especially in Travel and Shopping).

### 3. **Category Encoder**
- LabelEncoder used to convert categorical features (like "Food & Drink", "Rent", etc.) into numerical format for machine learning models.

---

## 📊 Dataset Insights

- **Total Transactions**: 1,500
- **Time Period**: January 2020 – December 2024
- **Total Income**: ₹7,34,087
- **Total Expense**: ₹12,27,194
- **Net Savings**: **-₹4,93,107** (overall deficit observed)
- **Highest Spending Categories**: Travel, Rent, and Food & Drink
- **Key Observation**: High variance in Travel and Food & Drink categories — perfect for anomaly detection.

---

## 🚀 How to Run the API

### Prerequisites
- Python 3.9 or higher
- All models (`improved_expense_prediction_model.pkl`, `anomaly_detection_model.pkl`, `category_encoder.pkl`) must be placed in the `models/` folder.

### Installation

1. Clone or download this project.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the API server:
   ```bash
   python -m uvicorn main:app --reload
   ```

The API will start at: `http://127.0.0.1:8000`

---

## 🔑 API Authentication

All protected endpoints require an **API Key** in the request header.

**Header Name**: `X-API-Key`  
**Value**: `your_secret_finance_ai_key_2025`   ← Change this in `main.py` to your own secure key.

---

## 📡 Available API Endpoints

### 1. **Root Check**
- **GET** `/`
- Description: Check if API is running.

### 2. **Add Transactions**
- **POST** `/add-transactions`
- Description: Add one or multiple transactions.
- Authentication: Required (X-API-Key)

**Example Body**:
```json
{
  "transactions": [
    {
      "date": "2025-04-05",
      "category": "Food & Drink",
      "amount": 1250.50,
      "type": "Expense",
      "description": "Lunch at restaurant"
    },
    {
      "date": "2025-04-05",
      "category": "Salary",
      "amount": 65000,
      "type": "Income",
      "description": "Monthly salary credit"
    }
  ]
}
```

### 3. **Analyze & Get AI Insights**
- **GET** `/analyze`
- Description: Get monthly summary, next month expense prediction, anomalies, category-wise forecast, and smart recommendations.
- Authentication: Required (X-API-Key)

This is the main endpoint that mobile app will call regularly.

---

## 📊 What AI Returns in `/analyze`

- **Monthly Summary**: Income, Expense, Net Savings
- **Next Month Predicted Expense**
- **Category-wise Forecast** (Food, Rent, Travel, etc.)
- **Anomaly Detection**: Flags unusual transactions
- **Smart Recommendations**: Personalized financial advice

---

## 🔄 How the System Works

1. User adds transactions (income or expense) through mobile app.
2. Transactions are sent to `/add-transactions` endpoint.
3. When user wants insights, app calls `/analyze`.
4. AI model analyzes all available data and returns:
   - Current month performance
   - Future expense prediction
   - Unusual spending alerts
   - Practical suggestions

The more data the user adds, the more accurate the predictions and insights become.

---

## 📁 Project Files

- `main.py` → FastAPI backend with all logic
- `models/` → Trained AI models (3 files)
- `requirements.txt` → Required Python packages

---

