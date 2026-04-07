const mindee = require('mindee');

const apiKey = process.env.MINDEE_API_KEY;
const modelId = '6e291fe0-7b92-4bed-927a-6370098fd8c4';

const mindeeClient = new mindee.Client({ apiKey });

const productParams = {
  modelId,
  rag: undefined,
  rawText: undefined,
  polygon: undefined,
  confidence: undefined,
};

module.exports = { mindeeClient, productParams };
