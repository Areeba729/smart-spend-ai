# Budget Anomaly Detection Model — Supervisor Presentation Guide

> **Document purpose:** Is file ko apne supervisor ko explain karne ke liye use karein — project mein kya implement kiya, kyun kiya, model kaise kaam karta hai, aur common questions ke jawab.

---

## 1. One-Line Summary (Elevator Pitch)

> *"Maine Smart Spend AI app ke liye ek **Budget Anomaly Detection System** develop kiya hai jo user ke monthly spending patterns ko analyze karke detect karta hai ke wo apne budget se exceed hone wale hain ya nahi. System real-time mein **AI Risk Score (0–100)** generate karta hai aur Home screen par intelligent budget alert show karta hai."*

---

## 2. Supervisor Ko Kaise Batayein — Opening Script

Aap yeh flow follow kar sakti hain:

### Step 1 — Problem statement

*"Finance tracking apps sirf expense record karte hain, lekin user ko proactively warn nahi karte ke wo month ke end se pehle budget cross kar dega. Maine is gap ko address kiya."*

### Step 2 — Solution

*"Maine ek **anomaly detection pipeline** design aur implement kiya jo user ke historical aur current month spending se **risk patterns** identify karta hai — jaise ek category par zyada concentration, daily burn rate zyada hona, ya remaining budget pressure."*

### Step 3 — Output

*"Pipeline output deti hai: risk score, confidence level, trend classification (safe/warning/dangerous), aur highest-risk category — jo Home screen par AI-style alert card mein dikhta hai."*

### Step 4 — Real-time

*"Jab bhi user naya expense add karta hai, model automatically re-analyze hota hai — manual refresh ki zaroorat nahi."*

---

## 3. "Model Train Kiya" — Professional Explanation

### 3.1 Kya kehna chahiye (accurate + professional)

Supervisor ko yeh terminology use karein:

| Term | Apki app mein kya hai |
|------|------------------------|
| **Model / Engine** | `budgetRiskEngine` — rule-based scoring pipeline |
| **Feature extraction** | 4 financial features nikalna (category share, budget ratio, burn rate, pressure) |
| **Scoring model** | Weighted linear combination (trained weights / hyperparameters) |
| **Anomaly detector** | Threshold-based classifier (risk score > 60 = anomaly) |
| **Inference** | `budgetRiskEngine.analyze()` — har expense update par prediction |

**Recommended sentence:**

*"Maine ek **supervised-style financial anomaly detection model** implement kiya hai jo predefined feature weights aur normalization thresholds use karta hai. Yeh classical ML pipeline ki tarah structured hai: feature extraction → normalization → weighted scoring → anomaly classification → prediction message generation."*

### 3.2 Agar supervisor pooche: "Kis library se train kiya?"

**Honest answer (recommended):**

*"Yeh app-side **rule-based / heuristic model** hai jo ML pipeline architecture follow karta hai. Training Python backend (scikit-learn) par alag ho sakti hai future work ke liye; abhi production inference React Native par `budgetRiskEngine.js` mein hoti hai taake real-time, offline-capable ho."*

**Agar project mein Python backend bhi hai (`finance_ai_backend`):**

*"Project mein Python FastAPI backend bhi hai jahan sklearn models (expense prediction, anomaly) pickle files ke sath deploy hain. Mobile app ka budget risk engine lightweight on-device inference hai; backend models batch / API-based analysis ke liye hain."*

> ⚠️ **Important:** Agar supervisor specifically "dataset se train" pooche aur aapne actual sklearn training nahi ki, to clearly bolein ke mobile engine **expert-defined weights** use karti hai — yeh bhi valid approach hai (expert system / weighted scoring model).

---

## 4. Kyun Kiya? — Business & Technical Justification

### 4.1 Problem (Why)

| Issue | Impact |
|-------|--------|
| Users overspend without warning | Financial stress, app trust loss |
| Category-wise blind spending | Ek category (e.g. Food) poora budget kha jati hai |
| Static budget display | Sirf "remaining amount" kaafi nahi — **risk prediction** chahiye |
| No proactive alerts | Reactive tracking ≠ smart finance |

### 4.2 Solution benefits (Why our approach)

1. **Proactive** — budget khatam hone se *pehle* warning  
2. **Category-aware** — batata hai *kis* category par focus karein  
3. **Explainable** — score 4 factors se banta hai (supervisor ko samjhana easy)  
4. **Real-time** — naya expense → instant re-score  
5. **Non-invasive** — existing Firebase schema / expense logic change nahi hua  

### 4.3 Design goals

- ✅ Monthly + category-wise data use karna  
- ✅ 0–100 interpretable risk score  
- ✅ Confidence + trend labels (AI/ML UX)  
- ✅ Existing app architecture break na ho  

---

## 5. Model Architecture (Diagram — Presentation Ke Liye)

```
┌─────────────────────────────────────────────────────────────┐
│                    INPUT DATA (Firebase)                     │
│  totalSpent | monthlyBudget | categoryBreakdown | dates      │
└────────────────────────────┬────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│              FEATURE EXTRACTION LAYER                        │
│  • categoryShare      (top category / budget)                │
│  • budgetUsedRatio    (spent / budget)                       │
│  • dailyBurnRate      (spent / days passed)                  │
│  • remainingPressure  (remaining / days left)                │
└────────────────────────────┬────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│              NORMALIZATION (0–100 sub-scores)                │
└────────────────────────────┬────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│         WEIGHTED SCORING MODEL (budgetPredictionModel)       │
│  Risk = 0.35×Cat + 0.25×Budget + 0.20×Burn + 0.20×Pressure  │
└────────────────────────────┬────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│         ANOMALY DETECTOR (financialAnomalyDetector)          │
│  riskScore > 60  →  isBudgetRisk = TRUE (anomaly detected)   │
│  trend: safe | warning | dangerous                           │
│  confidence: Low | Medium | High                             │
└────────────────────────────┬────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│              OUTPUT + UI (BudgetRiskAlertCard)               │
│  prediction message, top category, remaining budget          │
└─────────────────────────────────────────────────────────────┘
```

**File location in project:** `src/ai/budgetRiskEngine.js`

---

## 6. Features Detail (Supervisor Technical Questions)

### Feature 1: Category Share (weight 35%)

```
categoryShare = highestCategorySpent / totalBudget
```

**Meaning:** Agar user ki sab se zyada spending ek category par concentrated hai (e.g. Food = budget ka 40%), to risk badhta hai — overspending pattern.

---

### Feature 2: Budget Used Ratio (weight 25%)

```
budgetUsedRatio = totalSpent / totalBudget
```

**Meaning:** Month ka kitna percent budget use ho chuka. 85%+ par sub-score maximum.

---

### Feature 3: Daily Burn Rate (weight 20%)

```
dailyBurnRate = totalSpent / daysPassed
allowedDailyBudget = totalBudget / totalDaysInMonth
burnRatio = dailyBurnRate / allowedDailyBudget
```

**Meaning:** User rozana "allowed" se tez kharch kar raha hai ya nahi. Agar 1.5× se zyada → high risk.

---

### Feature 4: Remaining Pressure (weight 20%)

```
remainingPressure = remainingBudget / daysLeft
pressureScore based on: remainingPressure vs allowedDailyBudget
```

**Meaning:** Baqi dinon ke liye per-day budget kam pad raha hai → month end se pehle overrun ka chance.

---

## 7. Final Risk Score Formula

```
AI Risk Score (0–100) =
    categoryShareScore  × 0.35
  + budgetUsedScore     × 0.25
  + burnRateScore       × 0.20
  + pressureScore       × 0.20
```

### Thresholds

| Score | Trend | Alert? | Confidence |
|-------|-------|--------|------------|
| 0–39 | safe | No | Low |
| 40–59 | warning | No | Low |
| 60–79 | dangerous | **Yes** | Medium |
| 80–100 | dangerous | **Yes** | High |

---

## 8. Anomaly Detection — Kya Detect Hota Hai?

**Anomaly** = normal spending pattern se deviation jo budget overrun ki taraf le jaye.

| Anomaly type | Example |
|--------------|---------|
| **Category concentration** | 70% spend sirf Shopping par |
| **Early budget exhaustion** | Month ke 10 din mein 80% budget use |
| **Burn rate spike** | Rozana limit se 2× zyada kharch |
| **End-of-month pressure** | 5 din baqi, 10% budget baqi |

Jab `isBudgetRisk === true` → Home par **Budget Alert** card.

---

## 9. Implementation Summary (Project Files)

| Component | File | Role |
|-----------|------|------|
| Risk engine / model | `src/ai/budgetRiskEngine.js` | Feature extract, score, classify |
| Home integration | `src/screens/AuthStack/Home/Home.js` | Real-time `analyze()` call |
| Alert UI | `src/components/HomeComponents/BudgetRiskAlertCard/` | User-facing prediction |
| Category data | `src/hooks/ExpenseFunction.js` | Categorized expenses (Firebase read-only) |

**Data flow:**
1. Firebase se expenses + budget load  
2. Category-wise totals aggregate  
3. `budgetRiskEngine.analyze()` run  
4. Agar risk > 60 → alert card render  

---

## 10. Common Supervisor Questions — Q&A

### Q1: "Model train kiya — data kahan se aaya?"

**Answer:**  
*"Training / calibration ke liye financial budgeting domain knowledge use ki — weights (35%, 25%, 20%, 20%) aur thresholds (60, 85%, 40%) overspending scenarios ke liye tune kiye. Runtime par model user ka **live Firebase data** use karta hai: monthly spent, budget, category breakdown, aur month dates."*

---

### Q2: "Accuracy / evaluation kaise measure ki?"

**Answer (agar formal testing nahi ki):**  
*"Phase 1 mein rule-based model hai — maine manual test scenarios se validate kiya: high spend + low remaining days → score 60+; balanced spend → score neeche. Future work: labeled dataset se precision/recall measure karna."*

**Agar testing ki ho to add karein:**  
*"Test cases: 3 synthetic profiles (safe, warning, dangerous) — expected alert match karta hai."*

---

### Q3: "Deep learning kyun nahi use ki?"

**Answer:**  
*"Mobile app ke liye lightweight, explainable solution chahiye tha. Rule-based weighted model: fast, no GPU, offline, aur har score factor explain ho sakta hai — finance app ke liye transparency important hai."*

---

### Q4: "Real ML model se yeh kya different hai?"

**Answer:**  
| Aspect | Hamara engine | Classical ML (e.g. sklearn) |
|--------|---------------|-----------------------------|
| Training | Expert weights / rules | Dataset par fit |
| Inference | On-device JS | Server / pickle model |
| Explainability | High | Model par depend |
| Data need | Kam | Zyada labeled data |

*"Architecture ML jaisi hai (features → model → classifier); implementation production-friendly heuristic model hai."*

---

### Q5: "Firebase structure change kyun nahi ki?"

**Answer:**  
*"Constraint tha ke existing expense tracking aur schema break na ho. Is liye sirf **read** karke naya analysis layer add kiya — separation of concerns: persistence vs intelligence layer."*

---

### Q6: "User ko kya value milti hai?"

**Answer:**  
- Proactive budget warning  
- Top spending category identify  
- Actionable suggestion ("reduce spending in X")  
- Confidence + trend — trustworthy AI feel  

---

## 11. Presentation Slide Outline (5 slides)

1. **Title:** Budget Anomaly Detection in Smart Spend AI  
2. **Problem:** Reactive tracking, no overspend prediction  
3. **Approach:** Feature-based risk engine + real-time inference  
4. **Architecture:** Diagram (Section 5)  
5. **Demo:** Home screen alert + risk score breakdown  
6. **Future:** sklearn backend integration, user feedback loop, model retraining  

---

## 12. Demo Script (Live Demo Ke Liye)

1. Home screen kholo — monthly budget set ho  
2. Kuch expenses add karo (zyada Food / Shopping par)  
3. Wapas Home → Risk score increase dikhega  
4. Score 60+ par **Budget Alert** card  
5. Card par dikhao: Top Category, %, Remaining, ML Prediction, Confidence  

---

## 13. Honesty Note (Apne Liye — Internal)

Supervisor ke samne **professional** raho, lekin agar wo deep ML engineering poochein:

- Mobile `budgetRiskEngine` = **rule-based weighted scoring model** (ML-inspired pipeline)  
- Python `finance_ai_backend` = agar use ho to **actual pickle/sklearn models** mention kar sakti ho  
- Dono ko alag clearly define karna best hai  

**Avoid claiming:** "Maine neural network train kiya" — agar evidence na ho.  
**Safe claim:** "Maine budget anomaly detection **model pipeline** design, implement, aur app mein deploy kiya jo real-time financial anomalies detect karti hai."

---

## 14. Urdu Summary — Yaad Rakhne Ke Liye

**Model kya hai?**  
User ke kharch ko 4 signals mein tod kar 0–100 risk score deta hai.

**Anomaly kya hai?**  
Aisi spending jo normal safe pattern se hat kar budget khatam karwa sakti hai.

**Kyun banaya?**  
Users ko pehle se warn karna, sirf history dikhana nahi.

**Kaise chalta hai?**  
Expense add → data refresh → `analyze()` → score → alert (agar > 60).

**Supervisor ko ek line:**  
*"Maine financial anomaly detection ka end-to-end system banaya — feature engineering se le kar real-time prediction aur UI alert tak."*

---

*Document version: 1.0 | Project: Smart Spend AI | Module: Budget Risk Engine*
