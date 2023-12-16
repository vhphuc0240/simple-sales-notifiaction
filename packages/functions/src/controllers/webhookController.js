import {getShopByShopifyDomain} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';

export async function listNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      shopName: shop.shopifyDomain,
      accessToken: shop.accessToken
    });
    console.log(shopify);
    // const notification = await ;
  } catch (e) {
    console.log(e);
    return (ctx.body = {
      success: false
    });
  }
}
