/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  DocumentData,
} from 'firebase/firestore';
import { useAtom } from 'jotai';
import SearchBtnSVG from '../svgComps/SearchBtnSVG';
import CloseBtnSVG from '../svgComps/CloseBtnSVG';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';
import app from '../../util/firbaseConfig';
import SelectionBtnSVG from '../svgComps/SelectionBtnSVG';
import atoms from '../../util/atoms';

function CreateChatRoom({ setCreateChatRoom }: { setCreateChatRoom: any }) {
  const db = getFirestore(app);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [search, setSearch] = React.useState('');
  const [error, setError] = React.useState('');
  const [searchedUser, setSearchedUser] = React.useState(false);
  const [searchedUserData, setSearchedUserData] = React.useState<
    DocumentData | undefined
  >({});
  const [ticked, setTicked] = React.useState(false);
  const [imgLoadStatus, setImgLoadStatus] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);

  async function handleSearch(e: any) {
    e.preventDefault();

    if (search === '') {
      setError('Please input a username');
      setSearchedUser(false);
    } else if (search === userNotifications.username) {
      setError('Can not create a chatroom with yourself ');
      setSearchedUser(false);
    } else {
      const docRef = doc(db, 'users', search);
      const docSnap = await getDoc(docRef);

      if (docSnap.data()) {
        setSearchedUserData(docSnap.data());
        setSearchedUser(true);
      } else {
        setError('User not found');
        setSearchedUser(false);
      }
    }
  }

  async function handleCreateChatRoom() {
    const firstCheck = userNotifications.chatRoomIds.includes(
      searchedUserData?.userId + userNotifications.userId
    );
    const secondCheck = userNotifications.chatRoomIds.includes(
      userNotifications.userId + searchedUserData?.userId
    );

    if (firstCheck || secondCheck) {
      setError('Chatroom already exists');
      setSearchedUser(false);
    } else {
      // create chatroom collection
      setLoading(true);
      await setDoc(
        doc(db, userNotifications.userId + searchedUserData?.userId, 'users'),
        {
          createdAt: serverTimestamp(),
          [`${searchedUserData?.username}ChatName`]: userNotifications.username,
          [`${searchedUserData?.username}Avatar`]: searchedUserData?.avatarURL,
          [`${userNotifications.username}ChatName`]: searchedUserData?.username,
          [`${userNotifications.username}Avatar`]: userNotifications.avatarURL,
        }
      );
      const userOne = doc(db, 'users', userNotifications.username);
      const userTwo = doc(db, 'users', searchedUserData?.username);

      // subscribe the users to the chatroom (add chatroom ID to the users details)
      await updateDoc(userOne, {
        chatRoomIds: arrayUnion(
          userNotifications.userId + searchedUserData?.userId
        ),
      });
      await updateDoc(userTwo, {
        chatRoomIds: arrayUnion(
          userNotifications.userId + searchedUserData?.userId
        ),
      });
      setCreateChatRoom(false);
    }
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex h-[100vh] w-full items-center justify-center bg-[#0000008f] dark:bg-[#000000d7]">
      <div className="w-[400px] rounded-xl bg-white dark:border dark:border-stone-300 dark:bg-[#000000]">
        <div
          className={
            loading
              ? 'hidden'
              : 'flex items-center justify-between border-b border-stone-300 p-3 dark:border-stone-700'
          }
        >
          <button onClick={() => setCreateChatRoom(false)} type="button">
            <CloseBtnSVG lightColor="#262626" darkColor="#f1f5f9" />
          </button>
          <p className="font-bold">New message</p>
          <button
            className={`${ticked ? 'text-[#0095f6]' : 'pointer-events-none'}`}
            type="button"
            onClick={() => handleCreateChatRoom()}
          >
            Create
          </button>
        </div>
        <div className="mb-5 flex items-center justify-between border-b border-stone-300 py-5 dark:border-stone-700">
          <form action="" onSubmit={(e) => handleSearch(e)}>
            <label className=" pl-3 text-lg" htmlFor="searchForUser">
              To:
              <input
                className="ml-5 text-sm focus:outline-none dark:bg-[#131313]"
                type="text"
                id="searchForUser"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </form>
          <div className="mr-5">
            <SearchBtnSVG heightWidth="20" />
          </div>
        </div>
        <div>
          {searchedUser ? (
            <div className="mb-3 p-3">
              <p className="pb-3 font-bold">Result:</p>
              <div className="flex items-center justify-start">
                <div className="flex h-14 w-14 items-center justify-center">
                  <div
                    className={`${
                      imgLoadStatus ? 'hidden' : ''
                    } h-14 w-14 rounded-full bg-[#efefef] dark:bg-[#070707]`}
                  >
                    <ProfilePicSVG height="56" width="56" strokeWidth="1.5" />
                  </div>
                  <picture>
                    <img
                      className={`${
                        imgLoadStatus ? '' : 'hidden'
                      } h-14 w-14 rounded-full`}
                      src={searchedUserData?.avatarURL}
                      alt="avatar"
                      onLoad={() => setImgLoadStatus(true)}
                    />
                  </picture>
                </div>
                <p className="mr-auto ml-3">{searchedUserData?.username}</p>
                <button onClick={() => setTicked(!ticked)} type="button">
                  <SelectionBtnSVG ticked={ticked} />
                </button>
              </div>
            </div>
          ) : (
            <p className="p-3 font-bold text-red-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateChatRoom;
