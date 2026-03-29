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

module.exports = { mapMindeeReceipt };
