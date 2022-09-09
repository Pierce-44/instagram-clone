import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import app from './firbaseConfig';

interface Props {
  username: string;
  chatRoomId: string;
}

export default function handleResetNewMessage({ username, chatRoomId }: Props) {
  const db = getFirestore(app);

  const ref = doc(db, chatRoomId, 'users');
  updateDoc(ref, {
    [`${username}NewMessage`]: false,
  });
}
