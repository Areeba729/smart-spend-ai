# Personal Budget Tracker App — Architecture & Design

A design and implementation guide for a **Personal Budget Tracker** mobile app built with **React Native**, **TypeScript**, **React Navigation**, and local/cloud storage. The app helps users set a monthly income, plan category budgets, track expenses, and get alerts when limits are exceeded.

---

## Table of Contents

1. [App Concept](#app-concept)
2. [Core Features](#core-features)
3. [App Architecture](#app-architecture)
4. [Folder Structure](#folder-structure)
5. [Reusable Components](#reusable-components)
6. [Example Code Snippets](#example-code-snippets)
7. [UI/UX Best Practices](#uiux-best-practices)
8. [State Management](#state-management)
9. [Technical Stack](#technical-stack)

---

## App Concept

The app helps users manage their **monthly budget**. Users enter their **monthly salary**, and the app tracks expenses across categories, analyzes spending habits, and notifies when they are **close to or exceeding** budget limits.

**Goals:**

- Clean, simple, and powerful UX
- Control spending and follow a monthly budget plan
- Improve financial habits through visibility and alerts

---

## Core Features

| Feature | Description |
|--------|-------------|
| **Monthly Income Setup** | User enters monthly salary; app calculates total available budget. Income can be updated anytime. |
| **Budget Planning** | Create a monthly plan with spending limits per category (Food, Transport, Shopping, Bills, Entertainment, Health, Education, Other). |
| **Expense Tracking** | Add expense with amount, category, date, optional notes. Remaining budget updates automatically. |
| **Category Spending Analysis** | Per-category spent amount, remaining budget, and percentage of budget used. |
| **Budget Limit Alerts** | Warnings when a category is exceeded; highlight category in red (e.g. "You have exceeded your Food budget by $25."). |
| **Monthly Summary** | Total income, total expenses, total savings, most expensive category. |
| **Dashboard** | Remaining monthly budget, spending progress, category breakdown, quick add expense. |
| **Visual Analytics** | Pie chart for category spending, progress bars for limits, monthly spending graph. |

---

## App Architecture

### High-Level Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                         │
│  Screens (Home, Budget, AddExpense, Report, Profile) + Components │
└───────────────────────────────┬─────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                     STATE MANAGEMENT (Redux)                      │
│  userSlice, budgetSlice, expenseSlice, themeSlice                 │
└───────────────────────────────┬─────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                    DATA LAYER / SERVICES                          │
│  AsyncStorage / EncryptedStorage (persist) | Firestore (sync)      │
└─────────────────────────────────────────────────────────────────┘
```

### Navigation Structure

- **Auth Stack**: Login, Signup, Forgot Password, OTP, Onboarding
- **Main Tabs** (after login):
  - **Home** — Dashboard (remaining budget, progress, category breakdown, quick add)
  - **Budget** — Monthly budget plan, category limits, edit income
  - **AddExpense** — Add/Edit expense (amount, category, date, notes)
  - **Report** — Monthly summary, charts, analytics
  - **Profile** — Settings, income update, notifications, help

### Data Flow

1. **Income** → Stored in user profile (Redux + persist/Firestore).
2. **Category budgets** → Stored per month (e.g. `budgetPlans[year-month]`).
3. **Expenses** → List keyed by user and date; filtered by month for calculations.
4. **Derived state** → Remaining budget, spent per category, percentages, alerts computed from income, plans, and expenses (in selectors or components).

---

## Folder Structure

Recommended structure (aligned with a typical React Native + Redux app):

```
src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── components/           # Reusable UI building blocks
│   ├── AddExpenseForm/
│   ├── BudgetSlider/
│   ├── BudgetDateRange/
│   ├── CategoryBudgetItem/
│   ├── CircularProgress/
│   ├── ExpenseChart/
│   ├── ExpenseItem/
│   ├── Header/
│   ├── NativeButton/
│   ├── NativeInput/
│   ├── NativeText/
│   ├── PageHeader/
│   └── SafeFlexView/
├── screens/
│   ├── AuthStack/        # Logged-in main screens
│   │   ├── Home/
│   │   ├── BudgetScreen/
│   │   ├── AddExpense/
│   │   ├── Report/
│   │   ├── DailyExpenses/
│   │   ├── CategoryDetail/
│   │   └── ProfileScreen/
│   ├── LoginScreen/
│   ├── SignupScreen/
│   ├── OnboardingScreen/
│   └── SplashScreen/
├── navigation/
│   ├── TabNavigator.js
│   ├── AuthNavigator.js
│   └── RootNavigator.js
├── redux/
│   ├── store.js
│   ├── slices/
│   │   ├── userSlice.js      # user, monthlyBudget, income
│   │   ├── budgetSlice.js    # category limits per month
│   │   ├── expenseSlice.js   # expenses list
│   │   └── themeSlice.js
│   └── selectors/            # Optional: computed state
│       ├── budgetSelectors.js
│       └── expenseSelectors.js
├── hooks/
│   ├── useAuth.js
│   ├── useBudget.js
│   ├── useExpenses.js
│   └── ExpenseFunction.js    # Firestore read/write
├── utils/
│   ├── dateUtils.js
│   ├── currencyUtils.js
│   └── validation.js
├── constants/
│   ├── categories.js        # Category list + icons/colors
│   └── theme.js
├── libs/
│   ├── Theme.json
│   └── platform.js
└── types/                   # TypeScript types (if migrating)
    ├── expense.ts
    ├── budget.ts
    └── user.ts
```

---

## Reusable Components

| Component | Purpose |
|-----------|---------|
| **AddExpenseForm** | Form for amount, category picker, date, notes; used in AddExpense and modals. |
| **BudgetSlider** | Adjust budget limit for a category (min/max, step). |
| **BudgetDateRange** | Display or pick month/year for budget/report. |
| **CategoryBudgetItem** | One row: category icon, name, limit, spent, remaining, progress bar, alert state. |
| **CircularProgress** | Circular progress (e.g. overall budget used %). |
| **ExpenseChart** | Pie or bar chart for category breakdown (e.g. react-native-chart-kit). |
| **ExpenseItem** | Single expense row: amount, category, date, notes; tappable for edit. |
| **Header / SimpleHeader** | Screen title and optional actions. |
| **NativeButton / NativeInput** | Themed button and text input. |
| **PageHeader** | Back + title + optional right action. |
| **SafeFlexView** | SafeAreaView + default flex layout. |
| **StatCard** | KPI card: label, value, optional trend (e.g. remaining budget, savings). |
| **SuccessModal** | Confirmations (e.g. "Expense added", "Budget updated"). |

Each component should live in its own folder with `ComponentName.js` (or `.tsx`) and `style.js` (or `Styles.ts`).

---

## Example Code Snippets

### 1. Category constants

```javascript
// src/constants/categories.js
export const EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food', icon: 'restaurant', color: '#4CAF50' },
  { id: 'transport', label: 'Transport', icon: 'directions-car', color: '#2196F3' },
  { id: 'shopping', label: 'Shopping', icon: 'shopping-cart', color: '#FF9800' },
  { id: 'bills', label: 'Bills', icon: 'receipt', color: '#9C27B0' },
  { id: 'entertainment', label: 'Entertainment', icon: 'movie', color: '#E91E63' },
  { id: 'health', label: 'Health', icon: 'local-hospital', color: '#00BCD4' },
  { id: 'education', label: 'Education', icon: 'school', color: '#673AB7' },
  { id: 'other', label: 'Other', icon: 'more-horiz', color: '#607D8B' },
];
```

### 2. Redux slice: budget (category limits)

```javascript
// src/redux/slices/budgetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getMonthKey = (date = new Date()) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  return `${y}-${String(m).padStart(2, '0')}`;
};

const initialState = {
  categoryLimits: {}, // { '2025-03': { food: 300, transport: 150, ... } }
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setCategoryLimit(state, { payload: { monthKey, categoryId, limit } }) {
      if (!state.categoryLimits[monthKey]) state.categoryLimits[monthKey] = {};
      state.categoryLimits[monthKey][categoryId] = limit;
    },
    setMonthPlan(state, { payload: { monthKey, plan } }) {
      state.categoryLimits[monthKey] = plan;
    },
  },
});

export const { setCategoryLimit, setMonthPlan } = budgetSlice.actions;
export const selectCategoryLimits = (state, monthKey) =>
  state.budgetReducer?.categoryLimits?.[monthKey] ?? {};
export default budgetSlice.reducer;
```

### 3. Selector: spent per category and alerts

```javascript
// src/redux/selectors/budgetSelectors.js
import { createSelector } from '@reduxjs/toolkit';

const getMonthKey = (date = new Date()) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  return `${y}-${String(m).padStart(2, '0')}`;
};

export const selectSpentByCategory = createSelector(
  [
    (state) => state.expenseReducer?.items ?? [],
    (_, monthKey) => monthKey,
  ],
  (expenses, monthKey) => {
    const [year, month] = monthKey.split('-').map(Number);
    const filtered = expenses.filter((e) => {
      const d = new Date(e.date);
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    });
    const byCategory = {};
    filtered.forEach((e) => {
      const cat = e.categoryId || 'other';
      byCategory[cat] = (byCategory[cat] || 0) + parseFloat(e.amount || 0);
    });
    return byCategory;
  }
);

export const selectCategorySummary = createSelector(
  [
    (state) => selectCategoryLimits(state, getMonthKey()),
    (state) => selectSpentByCategory(state, getMonthKey()),
  ],
  (limits, spentByCategory) => {
    return Object.entries(limits || {}).map(([categoryId, limit]) => {
      const spent = spentByCategory[categoryId] || 0;
      const remaining = Math.max(0, limit - spent);
      const percentUsed = limit > 0 ? (spent / limit) * 100 : 0;
      const isExceeded = spent > limit;
      const overBy = isExceeded ? spent - limit : 0;
      return {
        categoryId,
        limit,
        spent,
        remaining,
        percentUsed,
        isExceeded,
        overBy,
      };
    });
  }
);
```

### 4. Dashboard: remaining budget and quick add

```jsx
// Example usage in Home/Dashboard
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
import { selectSpentByCategory } from '../redux/selectors/budgetSelectors';
import { getMonthKey } from '../utils/dateUtils';

const Dashboard = () => {
  const user = useSelector(selectUser);
  const monthKey = getMonthKey();
  const totalSpent = useSelector((state) => {
    const byCat = selectSpentByCategory(state, monthKey);
    return Object.values(byCat).reduce((s, n) => s + n, 0);
  });
  const monthlyBudget = Number(user?.monthlyBudget ?? 0);
  const remaining = Math.max(0, monthlyBudget - totalSpent);

  return (
    <SafeFlexView>
      <StatCard
        label="Remaining budget"
        value={`$${remaining.toFixed(2)}`}
        subText={`of $${monthlyBudget.toFixed(2)}`}
      />
      <CircularProgress
        progress={monthlyBudget ? totalSpent / monthlyBudget : 0}
        size={120}
      />
      <CategoryBreakdown monthKey={monthKey} />
      <NativeButton
        title="Add expense"
        onPress={() => navigation.navigate('AddExpense')}
      />
    </SafeFlexView>
  );
};
```

### 5. Budget alert message

```jsx
// Show when category is exceeded
const BudgetAlert = ({ categoryLabel, overBy }) => (
  <View style={styles.alert}>
    <Text style={styles.alertText}>
      You have exceeded your {categoryLabel} budget by ${overBy.toFixed(2)}.
    </Text>
  </View>
);
```

### 6. Persist with AsyncStorage (alternative to EncryptedStorage)

```javascript
// store.js — using AsyncStorage for persist
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userReducer', 'budgetReducer', 'expenseReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
```

---

## UI/UX Best Practices

1. **Hierarchy**
   - Primary: remaining budget and “Add expense”.
   - Secondary: category breakdown and progress.
   - Tertiary: history, reports, settings.

2. **Feedback**
   - Success toasts or modals after add/update (e.g. SuccessModal).
   - Inline validation on forms (amount required, valid date).
   - Skeleton or loading state when fetching expenses/budget.

3. **Alerts**
   - Exceeded category: red highlight + short message (“Exceeded Food budget by $25”).
   - Near limit (e.g. >90%): warning color (amber), no alarm tone unless you add one.

4. **Accessibility**
   - Labels for inputs, semantic roles where applicable.
   - Sufficient contrast (text on background); avoid “red only” for critical info.

5. **Consistency**
   - One design system (Theme.json): colors, spacing, font sizes.
   - Same patterns for list items (ExpenseItem, CategoryBudgetItem).

6. **Performance**
   - Virtualize long expense lists (FlatList with getItemLayout if fixed height).
   - Memoize heavy selectors and list item components.

7. **Offline / Sync**
   - If using Firestore, queue writes when offline and sync when online; show “Saved locally” vs “Synced” if needed.

---

## State Management

**Recommended: Redux Toolkit + persist**

- **userSlice**: `user`, `monthlyBudget` (income), profile fields. Persist for login and budget.
- **budgetSlice**: `categoryLimits` keyed by month. Persist so plans survive app restart.
- **expenseSlice**: list of `expenses` (or ids + map). Persist and/or sync to Firestore.
- **themeSlice**: light/dark. Persist.

**Selectors**

- Use `createSelector` (Reselect) for derived data: spent per category, remaining per category, totals, exceeded categories. This keeps components simple and avoids duplicate logic.

**Async**

- Use Redux Toolkit `createAsyncThunk` for login, fetch expenses, sync to Firestore. Store loading/error in slice; components only read state and dispatch thunks.

**Local-first option**

- Keep expenses in Redux + EncryptedStorage/AsyncStorage; optionally mirror to Firestore for backup or multi-device. Same read path from Redux; write path updates Redux and then syncs.

---

## Technical Stack

| Concern | Technology |
|--------|------------|
| Framework | React Native |
| Language | JavaScript (TypeScript recommended for new code) |
| Navigation | React Navigation (native-stack, bottom-tabs) |
| State | Redux Toolkit |
| Persist | reduxjs-toolkit-persist + EncryptedStorage or AsyncStorage |
| Backend (optional) | Firebase Auth, Firestore |
| Charts | react-native-chart-kit (or victory-native, react-native-svg) |
| Forms | Formik + Yup (or react-hook-form) |
| Date | date-fns |

---

## Summary

- **Architecture**: Presentation → Redux (slices + selectors) → Storage (persist + optional Firestore).
- **Folders**: Clear separation of `components`, `screens`, `navigation`, `redux` (slices + selectors), `hooks`, `utils`, `constants`.
- **Reusable components**: AddExpenseForm, CategoryBudgetItem, CircularProgress, ExpenseChart, StatCard, etc.
- **State**: user (income), budget (category limits per month), expenses; derive spent/remaining/alerts in selectors.
- **UX**: Clear hierarchy, immediate feedback, budget alerts, accessible and consistent design.

This document can be used as the single reference for implementing and evolving the Personal Budget Tracker app.
