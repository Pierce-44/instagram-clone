/* eslint-disable jsx-a11y/click-events-have-key-events */
import { doc, arrayRemove, updateDoc, getFirestore } from 'firebase/firestore';
import CloseBtnSVG from '../svgComps/CloseBtnSVG';
import app from '../../util/firbaseConfig';

function UnfollowUser({
  setUnfollow,
  imgURL,
  username,
  userNotifications,
  profileNotifications,
}: {
  setUnfollow: any;
  imgURL: string | undefined;
  username: string | undefined;
  userNotifications: any;
  profileNotifications: any;
}) {
  function handleUnfollow() {
    setUnfollow(false);
    document.body.style.overflow = 'initial';

    const db = getFirestore(app);
    const userRef = doc(db, 'users', userNotifications.username);
    const otherUserRef = doc(db, 'users', profileNotifications.username);

    updateDoc(userRef, {
      following: arrayRemove(profileNotifications.username),
    });

    updateDoc(otherUserRef, {
      followers: arrayRemove(userNotifications.username),
    });
  }

  return (
    <div
      id="close"
      className="fixed top-0 left-0 z-10 flex h-full w-full cursor-default  items-center justify-center bg-[#0000008f] dark:bg-[#000000d7]"
      role="button"
      tabIndex={0}
      onClick={(e: any) => {
        if (e.target.id === 'close') {
          setUnfollow(false);
          document.body.style.overflow = 'initial';
        }
      }}
    >
      <div
        className="fixed top-10 right-10"
        role="button"
        tabIndex={0}
        onClick={() => {
          setUnfollow(false);
          document.body.style.overflow = 'initial';
        }}
      >
        <CloseBtnSVG lightColor="white" darkColor="white" heightWidth="18" />
      </div>
      <div className="flex w-[400px] flex-col items-center justify-center rounded-xl bg-white text-center text-sm font-normal dark:border dark:border-stone-300 dark:bg-[#000000]">
        <picture>
          <img
            className="my-9 h-[90px] w-[90px] rounded-full object-cover"
            src={imgURL}
            alt="avatar"
          />
        </picture>
        <p className="px-6 pb-7">
          If you change your mind, you can always follow @{username} again.
        </p>
        <div
          className="w-full border-y border-stone-300 py-3  font-semibold  text-[#ED4956] dark:border-stone-700"
          role="button"
          tabIndex={0}
          onClick={() => {
            handleUnfollow();
          }}
        >
          Unfollow
        </div>
        <div
          className="w-full py-3"
          role="button"
          tabIndex={0}
          onClick={() => {
            setUnfollow(false);
            document.body.style.overflow = 'initial';
          }}
        >
          Cancel
        </div>
      </div>
    </div>
  );
}

export default UnfollowUser;
