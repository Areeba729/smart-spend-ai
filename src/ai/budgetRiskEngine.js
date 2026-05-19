/**
 * Budget Risk Engine — rule-based financial anomaly detection
 * structured as an ML prediction pipeline.
 */

const WEIGHTS = {
  categoryShare: 0.35,
  budgetUsedRatio: 0.25,
  dailyBurnRate: 0.2,
  remainingPressure: 0.2,
};

const RISK_THRESHOLD = 60;
const CATEGORY_NAMES = [
  'Food',
  'Transport',
  'Shopping',
  'Medical',
  'Others',
];

// --- Feature extraction layer ---

const featureExtractor = {
  extract({
    totalSpent,
    totalBudget,
    highestCategorySpent,
    daysPassed,
    totalDaysInMonth,
    remainingBudget,
    daysLeft,
  }) {
    const safeBudget = Math.max(totalBudget, 1);
    const safeDaysPassed = Math.max(daysPassed, 1);
    const safeTotalDays = Math.max(totalDaysInMonth, 1);
    const safeDaysLeft = Math.max(daysLeft, 1);

    const categoryShare = highestCategorySpent / safeBudget;
    const budgetUsedRatio = totalSpent / safeBudget;
    const dailyBurnRate = totalSpent / safeDaysPassed;
    const allowedDailyBudget = totalBudget / safeTotalDays;
    const remainingPressure = remainingBudget / safeDaysLeft;

    return {
      categoryShare,
      budgetUsedRatio,
      dailyBurnRate,
      allowedDailyBudget,
      remainingPressure,
    };
  },
};

// --- Normalization (maps raw features → 0–100 sub-scores) ---

const normalizeFeatureScores = features => {
  const { categoryShare, budgetUsedRatio, dailyBurnRate, allowedDailyBudget, remainingPressure } =
    features;

  const categoryShareScore = Math.min(categoryShare / 0.4, 1) * 100;
  const budgetUsedScore = Math.min(budgetUsedRatio / 0.85, 1) * 100;

  const burnRatio =
    allowedDailyBudget > 0 ? dailyBurnRate / allowedDailyBudget : dailyBurnRate > 0 ? 2 : 0;
  const burnRateScore = Math.min(burnRatio / 1.5, 1) * 100;

  const pressureRatio =
    allowedDailyBudget > 0 ? remainingPressure / allowedDailyBudget : 1;
  const pressureScore = Math.min(Math.max(1 - pressureRatio, 0), 1) * 100;

  return {
    categoryShareScore,
    budgetUsedScore,
    burnRateScore,
    pressureScore,
  };
};

// --- Weighted scoring (prediction model) ---

const budgetPredictionModel = {
  computeRiskScore(normalizedScores) {
    const { categoryShareScore, budgetUsedScore, burnRateScore, pressureScore } =
      normalizedScores;

    const riskScore =
      categoryShareScore * WEIGHTS.categoryShare +
      budgetUsedScore * WEIGHTS.budgetUsedRatio +
      burnRateScore * WEIGHTS.dailyBurnRate +
      pressureScore * WEIGHTS.remainingPressure;

    return Math.round(Math.min(Math.max(riskScore, 0), 100));
  },
};

// --- Anomaly detector ---

const financialAnomalyDetector = {
  detect(riskScore) {
    return riskScore > RISK_THRESHOLD;
  },

  classifyTrend(riskScore) {
    if (riskScore > RISK_THRESHOLD) return 'dangerous';
    if (riskScore >= 40) return 'warning';
    return 'safe';
  },

  resolveConfidence(riskScore) {
    if (riskScore >= 80) return 'High';
    if (riskScore >= 60) return 'Medium';
    return 'Low';
  },
};

// --- Category analysis ---

const detectHighestSpendingCategory = categoryBreakdown => {
  let highestCategory = 'Food';
  let highestAmount = 0;

  CATEGORY_NAMES.forEach(name => {
    const amount = categoryBreakdown[name] || 0;
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = name;
    }
  });

  const totalCategorySpend = CATEGORY_NAMES.reduce(
    (sum, name) => sum + (categoryBreakdown[name] || 0),
    0,
  );

  const categoryPercentage =
    totalCategorySpend > 0
      ? Math.round((highestAmount / totalCategorySpend) * 100)
      : 0;

  return { highestCategory, highestAmount, categoryPercentage };
};

// --- Prediction message generator ---

const generatePredictionMessage = ({
  riskScore,
  highestCategory,
  budgetUsedRatio,
  trend,
  daysLeft,
}) => {
  const usedPct = Math.round(budgetUsedRatio * 100);

  if (trend === 'dangerous') {
    return `Model predicts budget overrun within ${Math.max(daysLeft, 1)} days at current pace. ${usedPct}% of budget consumed — ${highestCategory} is the primary driver.`;
  }
  if (trend === 'warning') {
    return `Spending velocity is elevated. ${usedPct}% of monthly budget used; monitor ${highestCategory} closely.`;
  }
  return `Spending patterns are within expected range. ${usedPct}% of budget used this period.`;
};

// --- Public API ---

const budgetRiskEngine = {
  analyze(input) {
    const {
      totalSpent = 0,
      totalBudget = 0,
      categoryBreakdown = {},
      startDate,
      endDate,
      remainingBudget: inputRemaining,
    } = input;

    if (!totalBudget || totalBudget <= 0) {
      return {
        isBudgetRisk: false,
        riskScore: 0,
        highestCategory: '—',
        categoryPercentage: 0,
        remainingBudget: 0,
        predictionMessage: 'Set a monthly budget to enable AI risk analysis.',
        confidenceLevel: 'Low',
        trend: 'safe',
      };
    }

    const now = new Date();
    const periodStart = startDate ? new Date(startDate) : new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = endDate
      ? new Date(endDate)
      : new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const totalDaysInMonth = Math.max(
      1,
      Math.ceil((periodEnd - periodStart) / (1000 * 60 * 60 * 24)) + 1,
    );
    const daysPassed = Math.max(
      1,
      Math.ceil((now - periodStart) / (1000 * 60 * 60 * 24)),
    );
    const daysLeft = Math.max(
      0,
      Math.ceil((periodEnd - now) / (1000 * 60 * 60 * 24)),
    );

    const remainingBudget =
      inputRemaining !== undefined
        ? inputRemaining
        : Math.max(0, totalBudget - totalSpent);

    const { highestCategory, highestAmount, categoryPercentage } =
      detectHighestSpendingCategory(categoryBreakdown);

    const features = featureExtractor.extract({
      totalSpent,
      totalBudget,
      highestCategorySpent: highestAmount,
      daysPassed,
      totalDaysInMonth,
      remainingBudget,
      daysLeft,
    });

    const normalizedScores = normalizeFeatureScores(features);
    const riskScore = budgetPredictionModel.computeRiskScore(normalizedScores);
    const isBudgetRisk = financialAnomalyDetector.detect(riskScore);
    const trend = financialAnomalyDetector.classifyTrend(riskScore);
    const confidenceLevel = financialAnomalyDetector.resolveConfidence(riskScore);
    const predictionMessage = generatePredictionMessage({
      riskScore,
      highestCategory,
      budgetUsedRatio: features.budgetUsedRatio,
      trend,
      daysLeft,
    });

    return {
      isBudgetRisk,
      riskScore,
      highestCategory,
      categoryPercentage,
      remainingBudget,
      predictionMessage,
      confidenceLevel,
      trend,
    };
  },
};

export default budgetRiskEngine;
