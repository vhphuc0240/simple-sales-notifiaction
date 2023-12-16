import {getShopById} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';

async function getProductById(shopify, productId) {
  return await shopify.product.get(productId);
}

export async function getNotifications(shopId) {
  const shopData = await getShopById(shopId);
  const shopify = new Shopify({
    accessToken: shopData.accessToken,
    shopName: shopData.shopifyDomain
  });
  const orders = await shopify.order.list({
    status: 'active'
  });
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

export async function registerScriptTags() {}

export async function registerWebhook() {}
