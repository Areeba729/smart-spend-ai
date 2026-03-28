const express = require('express');
require('dotenv').config();
const mindee = require('mindee');
const fs = require('fs');
const upload = require('./uploadMiddleware');

const app = express();

const apiKey = process.env.MINDEE_API_KEY;
const modelId = '6e291fe0-7b92-4bed-927a-6370098fd8c4';

// Client is created once, not on every request
const mindeeClient = new mindee.Client({ apiKey: apiKey });

const productParams = {
  modelId: modelId,

  // Options: set to `true` or `false` to override defaults

  // Enhance extraction accuracy with Retrieval-Augmented Generation.
  rag: undefined,
  // Extract the full text content from the document as strings.
  rawText: undefined,
  // Calculate bounding box polygons for all fields.
  polygon: undefined,
  // Boost the precision and accuracy of all extractions.
  // Calculate confidence scores for all fields.
  confidence: undefined,
};

app.post('/scan', upload.single('receipt'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    // const inputSource = new mindee.PathInput({ inputPath: req.file.path });

    // const response = await mindeeClient.enqueueAndGetResult(
    //   mindee.product.Extraction,
    //   inputSource,
    //   productParams,
    // );

    // // print a string summary

    // // Access the result fields
    // const fields = response.inference.result.fields;

    // const result = mapMindeeReceipt(fields);

    // res.json({
    //   data: result,
    // });

    res.json({
      data: dummyResponse,
    });
  } catch (error) {
    console.log('Receipt scan error:', error);

    res.status(500).json({ error: 'Failed to process receipt.' });
  } finally {
    fs.unlink(req.file.path, () => {});
  }
});

function mapMindeeReceipt(fields) {
  console.log('fields ---', fields);
  
  const supplier_name = fields.get('supplier_name')?.value || null;
  const purchase_category = fields.get('purchase_category')?.value || null;
  const date = fields.get('date')?.value || null;
  const time = fields.get('time')?.value || null;
  const total_amount = fields.get('total_amount')?.value || null;

  // currency is inside locale -> ObjectField
  const currency = fields.get('locale')?.fields?.get('currency')?.value || null;

  // extract line items
  const line_items =
    fields.get('line_items')?.items?.map(item => {
      const f = item.fields;

      return {
        description: f.get('description')?.value || null,
        quantity: f.get('quantity')?.value || null,
        unit_price: f.get('unit_price')?.value || null,
        total: f.get('total_amount')?.value || null,
      };
    }) || [];

  return {
    supplier_name,
    date,
    time,
    line_items,
    total_amount,
    currency,
    purchase_category,
  };
}

app.listen(8080, () => console.log('Server running on port 8080'));

const dummyResponse = {
  supplier_name: 'CIDER CELLAR',
  date: '2023-12-08',
  time: null,
  line_items: [
    {
      description: 'Bulmers Original Bottle',
      quantity: 1,
      unit_price: 4,
      total: null,
    },
    {
      description: 'Price Override: Manager Override',
      quantity: null,
      unit_price: null,
      total: null,
    },
    {
      description: 'Bulmers Pear Bottle',
      quantity: 1,
      unit_price: 4,
      total: null,
    },
    {
      description: 'Line Discount: Wrongly Advertised',
      quantity: null,
      unit_price: null,
      total: null,
    },
  ],
  total_amount: 4.5,
  currency: 'GBP',
  purchase_category: 'FOOd',
};
