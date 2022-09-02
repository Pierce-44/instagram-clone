import { getFirestore, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import app from './firbaseConfig';

function handleWatchedStory({
  storyUsername,
  watcherUsername,
}: {
  storyUsername: string;
  watcherUsername: string;
}) {
  const db = getFirestore(app);
  const userRef = doc(db, 'users', storyUsername);

  updateDoc(userRef, {
    storyViews: arrayUnion(watcherUsername),
  });
}

export default handleWatchedStory;
