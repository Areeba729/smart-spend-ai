const fs = require('fs');
const mindee = require('mindee');
const { mindeeClient, productParams } = require('../config/mindee');
const { mapMindeeReceipt } = require('../utils/mapMindeeReceipt');

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

async function scanReceipt(req, res) {
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

    // const fields = response.inference.result.fields;
    // const result = mapMindeeReceipt(fields);
    // return res.json({ data: result });

    res.json({ data: dummyResponse });
  } catch (error) {
    console.log('Receipt scan error:', error);
    res.status(500).json({ error: 'Failed to process receipt.' });
  } finally {
    fs.unlink(req.file.path, () => {});
  }
}

module.exports = { scanReceipt };
