import {getShopSettingsByShopDomain} from '@functions/repositories/settingRepository';
import {getNotificationsByShopDomain} from '@functions/repositories/notificationRepository';

export async function getShopDataByShopDomain(ctx) {
  const {shopDomain} = ctx.req.query;
  const shopSettings = await getShopSettingsByShopDomain(shopDomain);
  const notifications = await getNotificationsByShopDomain(shopDomain);
  return (ctx.body = {
    data: {
      settings: shopSettings[0],
      notifications
    },
    success: true
  });
}
