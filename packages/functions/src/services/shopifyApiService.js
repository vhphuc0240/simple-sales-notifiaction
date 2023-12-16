const FUNCTION_URL = 'https://5cf0-2a09-bac5-d45f-16d2-00-246-2a.ngrok-free.app';

async function getProductById(shopify, productId) {
  return await shopify.product.get(productId);
}

export async function parseOrdersToNotifications(shopify, orders) {
  return await Promise.all(
    orders.map(async order => {
      const product = await getProductById(shopify, order.line_items[0].product_id);
      return {
        orderId: order.id,
        firstName: order.billing_address.first_name,
        city: order.billing_address.city,
        country: order.billing_address.country,
        productId: order.line_items[0].product_id,
        productTitle: order.line_items[0].title,
        productImage: product.image.src,
        timestamp: new Date(order.created_at).getTime() / 1000
      };
    })
  );
}

export async function getNotifications(shopify) {
  const orders = await shopify.order.list({
    status: 'active'
  });
  return parseOrdersToNotification(shopify, orders);
}

export async function registerScriptTags() {}

export async function registerWebhook(shopify) {
  const webhook = {
    topic: 'orders/create',
    address: `${FUNCTION_URL}/webhook/order/new`,
    format: 'json'
  };
  await shopify.webhook.create(webhook);
  return webhook;
}
