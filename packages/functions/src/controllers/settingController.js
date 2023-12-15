import {
  getShopSettingsByShopId,
  updateShopSettingsByShopId
} from '@functions/repositories/settingController';
import {getCurrentShop} from '@functions/helpers/auth';

export async function getShopSettingsById(ctx) {
  const shopId = getCurrentShop(ctx);
  const shopSettings = await getShopSettingsByShopId(shopId);
  console.log(shopSettings);
  ctx.body = {data: shopSettings, success: true};
}

export async function updateShopSettingsById(ctx) {
  const shopId = getCurrentShop(ctx);
  const {data} = ctx.req.body;
  const shopSettings = await updateShopSettingsByShopId(shopId, data);
  ctx.body = {data: shopSettings, success: true};
}
