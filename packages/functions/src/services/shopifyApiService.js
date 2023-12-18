const FUNCTION_URL = ' https://4e1d-2a09-bac1-7aa0-50-00-246-81.ngrok-free.app';

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
        timestamp: new Date(order.created_at).getTime()
      };
    })
  );
}

export async function getNotifications(shopify) {
  const orders = await shopify.order.list({
    status: 'active'
  });
  return parseOrdersToNotifications(shopify, orders);
}

export async function registerScriptTags(shopify) {
  await shopify.scriptTag.create({
    event: 'onload',
    src: 'https://localhost:3000/scripttag/index.min.js'
  });
}

export async function registerWebhook(shopify) {
  const webhook = {
    topic: 'orders/create',
    address: `${FUNCTION_URL}/webhook/order/new`,
    format: 'json'
  };
  await shopify.webhook.create(webhook);
  return webhook;
}
