import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const notificationsRef = firestore.collection('notifications');

export async function addNotifications(data) {
  try {
    const batch = firestore.batch();
    data.map(item => {
      const ref = notificationsRef.doc();
      batch.set(ref, item);
    });
    await batch.commit();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
