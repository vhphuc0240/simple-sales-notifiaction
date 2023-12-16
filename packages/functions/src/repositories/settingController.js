import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const shopSettingsRef = firestore.collection('settings');

export async function addSettingsForShopByShopId(shopId, data) {
  try {
    await shopSettingsRef.add({shopId: shopId, ...data});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

const getShopSettings = async shopId => {
  try {
    const shopSettingsSnap = await shopSettingsRef.doc(shopId).get();
    if (!shopSettingsSnap.exists) {
      return null;
    }
    return shopSettingsSnap.data();
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * Get shop settings by given shop ID
 *
 * @param {string} shopId
 * @return {Promise<FirebaseFirestore.DocumentData>}
 */
export async function getShopSettingsByShopId(shopId) {
  return await getShopSettings(shopId);
}

export async function updateShopSettingsByShopId(shopId, data) {
  try {
    await shopSettingsRef.doc(shopId).set(data, {merge: true});
    return await getShopSettings(shopId);
  } catch (err) {
    console.log(err);
    return {data: {}, error: err.message};
  }
}
