import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import app from './firbaseConfig';

function updateUserStory(url, username) {
  const db = getFirestore(app);

  const countRef = doc(db, 'users', username);
  updateDoc(countRef, {
    story: url,
  });
}

export default updateUserStory;
