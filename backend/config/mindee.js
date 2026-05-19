const mindee = require('mindee');

const apiKey = process.env.MINDEE_API_KEY;
const modelId = '9db9b851-9225-4166-9c27-3f90a7acf26c';

const mindeeClient = new mindee.Client({ apiKey });

const productParams = {
  modelId,
  rag: undefined,
  rawText: undefined,
  polygon: undefined,
  confidence: undefined,
};

module.exports = { mindeeClient, productParams };
