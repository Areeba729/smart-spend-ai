import { images } from '../assets/images';

export const FAQ_CONTENT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;
export const PRIVACY_POLICY_CONTENT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `;
export const CONTACT_CONTENT = `You can contact us at support@example.com or call us at +1 234 567 890.`;

export const APP_NAME = 'Smart Spend AI';
export const APP_SUPPORT_EMAIL = 'support@smartspend.ai';
export const APP_VERSION = '1.0.0';

export const PRIVACY_SECURITY_SECTIONS = [
  {
    title: 'Data we collect',
    body:
      'Smart Spend AI stores your account details (name, email), expense records, budgets, categories, receipt scans, and app preferences. This data is linked to your Firebase account so your finances stay synced across sessions.',
  },
  {
    title: 'How we use your data',
    body:
      'Your spending history powers budget tracking, monthly reports, AI spending insights, and budget risk alerts. We do not sell your personal data to third parties. Aggregated, anonymized patterns may be used only to improve in-app recommendations.',
  },
  {
    title: 'Security measures',
    body:
      'Sign-in is handled through Firebase Authentication. Sensitive local settings use encrypted storage on your device. Data in transit is protected with industry-standard TLS. Access to your Firestore data is restricted to your authenticated user ID.',
  },
  {
    title: 'Receipt & AI processing',
    body:
      'When you scan a receipt, image data may be sent to our OCR service to extract merchant, amount, and date. AI advice and budget predictions run on your expense summaries—not on data unrelated to your finances.',
  },
  {
    title: 'Your controls',
    body:
      'You can update your profile, change notification preferences in Settings, and sign out at any time. To request account or data deletion, contact our support team using the email below.',
  },
  {
    title: 'Account security tips',
    body:
      'Use a strong, unique password. Do not share your login credentials. Keep your device OS and Smart Spend AI updated. Sign out on shared devices.',
  },
];

export const HELP_FEEDBACK_FAQ = [
  {
    question: 'How do I set my monthly budget?',
    body:
      'Go to the Budget tab, tap Edit Budget or set budget when prompted, and enter your monthly limit. The app tracks spending against that amount for the current month.',
  },
  {
    question: 'How does receipt scanning work?',
    body:
      'From Home, use the scan option to capture or upload a receipt. We extract the total, date, and merchant so you can confirm and save the expense quickly.',
  },
  {
    question: 'What are AI budget alerts?',
    body:
      'Smart Spend AI analyzes your spending pace and predicts if you are likely to exceed your budget. Alerts appear on Home when risk is elevated, with tips to stay on track.',
  },
  {
    question: 'Can I change currency or language?',
    body:
      'Currency and language options are available under Settings → General. PKR and English are supported in the current release.',
  },
  {
    question: 'How do I export or view reports?',
    body:
      'Open the Reports tab to see summaries by category and time period. You can preview and share report details from the report screen.',
  },
];

export const HELP_ABOUT_TEXT =
  'Smart Spend AI helps you track daily expenses, set monthly budgets, scan receipts, and receive intelligent spending insights—so you stay in control of your money.';

export const onboardingSteps = [
  {
    img: images.boarding1,
    title: 'Welcome to Green Covers',
    description: 'Your journey to a greener life starts here.',
  },
  {
    img: images.boarding2,
    title: 'Welcome to Green Covers',
    description: 'Your journey to a greener life starts here.',
  },
  {
    img: images.boarding3,
    title: 'Welcome to Green Covers',
    description: 'Your journey to a greener life starts here.',
  },
];

export const SERVER_URL = 'http://192.168.18.74:8080';
