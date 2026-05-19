from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel
import pandas as pd
import joblib
from datetime import datetime
from typing import List, Optional

# source venv/bin/activate
# uvicorn main:app --reload

app = FastAPI(
    title="Personal Finance AI API",
    description="AI-powered expense prediction, anomaly detection & smart recommendations",
    version="1.0"
)

# ==================== LOAD MODELS ====================
model_reg = joblib.load("models/improved_expense_prediction_model.pkl")
iso_forest = joblib.load("models/anomaly_detection_model.pkl")
le_category = joblib.load("models/category_encoder.pkl")

print("✅ All AI models loaded successfully!")

# ==================== API KEY SETUP ====================
API_KEY = "your_secret_finance_ai_key_2025"   # ←←← YAHAN APNI KHUD KI STRONG KEY DAAL DO

def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API Key")
    return x_api_key

# ==================== DATA MODELS ====================
class Transaction(BaseModel):
    date: str
    category: str
    amount: float
    type: str
    description: Optional[str] = None

class TransactionList(BaseModel):
    transactions: List[Transaction]

# Global storage (demo ke liye)
all_transactions = pd.DataFrame(columns=['Date', 'Category', 'Amount', 'Type', 'Transaction Description'])

# ==================== HELPER FUNCTIONS (same as before) ====================
def detect_anomaly(amount: float, category: str):
    try:
        cat_encoded = le_category.transform([category])[0]
        month_num = datetime.now().month
        test_df = pd.DataFrame({
            'Amount': [amount],
            'CategoryEncoded': [cat_encoded],
            'MonthNum': [month_num],
            'DayOfWeek': [datetime.now().weekday()]
        })
        score = iso_forest.predict(test_df)[0]
        return score == -1
    except:
        return False

def get_monthly_summary(df: pd.DataFrame):
    if df.empty:
        return {"income": 0.0, "expense": 0.0, "net": 0.0}
    
    current_month = df['Date'].dt.to_period('M').max()
    month_df = df[df['Date'].dt.to_period('M') == current_month]
    
    income = month_df[month_df['Type'] == 'Income']['Amount'].sum()
    expense = month_df[month_df['Type'] == 'Expense']['Amount'].sum()
    
    return {
        "month": str(current_month),
        "income": round(income, 2),
        "expense": round(expense, 2),
        "net_savings": round(income - expense, 2)
    }

# ==================== API ENDPOINTS (with API Key) ====================

@app.get("/")
async def root():
    return {
        "message": "Personal Finance AI API is running ::)",
        "note": "Use X-API-Key header for authentication"
    }

@app.post("/add-transactions")
async def add_transactions(data: TransactionList, x_api_key: str = Depends(verify_api_key)):
    global all_transactions
    new_data = []
    for t in data.transactions:
        new_data.append({
            'Date': pd.to_datetime(t.date),
            'Category': t.category,
            'Amount': t.amount,
            'Type': t.type,
            'Transaction Description': t.description or "User Entry"
        })
    
    if new_data:
        new_df = pd.DataFrame(new_data)
        all_transactions = pd.concat([all_transactions, new_df], ignore_index=True)
    
    return {"message": f"{len(new_data)} transactions added successfully", "total_records": len(all_transactions)}

@app.get("/analyze")
async def analyze(x_api_key: str = Depends(verify_api_key)):
    global all_transactions
    
    if all_transactions.empty:
        raise HTTPException(status_code=400, detail="No transactions found")
    
    summary = get_monthly_summary(all_transactions)
    last_expense = summary["expense"] if summary["expense"] > 0 else 45000.0
    
    # Next month prediction
    predicted = model_reg.predict(pd.DataFrame({
        'MonthNum': [datetime.now().month % 12 + 1],
        'TotalExpense_lag1': [last_expense],
        'TotalExpense_lag2': [last_expense * 0.95],
        'Net_lag1': [summary["net_savings"]],
        'TotalExpense_lag3': [last_expense * 1.02],
        'TotalExpense_lag6': [last_expense * 0.98]
    }))[0]
    
    # Anomaly detection (last 10 transactions)
    anomalies = []
    recent = all_transactions.tail(10)
    for _, row in recent.iterrows():
        if detect_anomaly(row['Amount'], row['Category']):
            anomalies.append({
                "date": row['Date'].strftime("%Y-%m-%d"),
                "category": row['Category'],
                "amount": float(row['Amount']),
                "message": "Unusual spending detected"
            })
    
    # Recommendations
    recommendations = []
    if predicted > last_expense * 1.12:
        recommendations.append("Projected expense increase of more than 12%. Review budget.")
    if summary["net_savings"] < 0:
        recommendations.append("Current month is in deficit.")
    
    # Category-wise forecast
    cat_forecast = {}
    if last_expense > 0:
        expense_df = all_transactions[all_transactions['Type'] == 'Expense']
        for cat in expense_df['Category'].unique():
            cat_sum = expense_df[expense_df['Category'] == cat]['Amount'].sum()
            ratio = cat_sum / last_expense
            cat_forecast[cat] = round(predicted * ratio, 2)
    
    return {
        "predicted_next_month_expense": round(predicted, 2),
        "monthly_summary": summary,
        "anomalies": anomalies,
        "recommendations": recommendations,
        "category_wise_forecast": cat_forecast
    }