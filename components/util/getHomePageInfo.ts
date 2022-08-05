import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from './firbaseConfig';

const db = getFirestore(app);

const getMessageCount = async () => {
  const docRef = doc(db, 'profile1', 'messageCount');
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const result = data?.messageCount;

  return result;
};

export default getMessageCount;
