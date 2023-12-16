import {addNotifications} from '@functions/repositories/notificationRepository';

export async function syncNotifications(data) {
  try {
    return await addNotifications(data);
  } catch (e) {
    console.log(e);
    return false;
  }
}
