export async function autoApproveActions(
  req: SwellRequest,
  model: string,
  record: SwellData,
  review: SwellData,
  settings: SwellData
): Promise<void> {
  const { swell } = req;

  const updates = {} as { approved: boolean; verified_buyer: boolean };

  // Auto approval
  if (settings.approval?.enabled) {
    const autoApproveMinOrders = settings.approval?.auto_approve_min_orders || 0;

    // Only approve if customer has placed at least X orders
    if (autoApproveMinOrders > 0) {
      const orderCount = await swell.get('/orders/:count', {
        account_id: record.account_id,
        canceled: { $ne: true },
      });

      if (orderCount >= autoApproveMinOrders) {
        updates.approved = true;
      }
    }
  }

  // Verified buyer
  if (settings.verified?.enabled) {
    // If customer has purchased the reviewed product
    const productOrder = await swell.get('/orders/:last', {
      account_id: record.account_id,
      items: {
        $elemMatch: {
          product_id: review.product_id,
        },
      },
      canceled: { $ne: true },
      fields: 'id',
    });

    if (productOrder) {
      updates.verified_buyer = true;
    }
  }

  // Update the record
  if (Object.keys(updates).length > 0) {
    await swell.put('/{model}/{id}', {
      model,
      id: review.id,
      ...updates,
    });
  }
}
