import { doc, arrayUnion, updateDoc, getFirestore } from 'firebase/firestore';
import app from './firbaseConfig';

function handleFollowUser({
  userName,
  otherUserName,
}: {
  userName: string;
  otherUserName: string;
}) {
  if (userName && otherUserName) {
    const db = getFirestore(app);
    const userRef = doc(db, 'users', userName);
    const otherUserRef = doc(db, 'users', otherUserName);

    updateDoc(userRef, {
      following: arrayUnion(otherUserName),
    });

    updateDoc(otherUserRef, {
      followers: arrayUnion(userName),
    });
  }
}

export default handleFollowUser;
