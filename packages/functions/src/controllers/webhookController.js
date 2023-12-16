import {getShopByShopifyDomain} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';
import {parseOrdersToNotifications} from '@functions/services/shopifyApiService';
import {addNotifications} from '@functions/repositories/notificationRepository';

export async function listNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const ordersData = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      shopName: shop.shopifyDomain,
      accessToken: shop.accessToken
    });
    const notifications = await parseOrdersToNotifications(shopify, [ordersData]);
    await addNotifications(shop.id, shopifyDomain, notifications);
    return (ctx.body = {
      success: true
    });
  } catch (e) {
    console.log(e);
    return (ctx.body = {
      success: false
    });
  }
}
