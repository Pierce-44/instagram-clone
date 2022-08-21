/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import TextareaAutosize from 'react-textarea-autosize';
import {
  getFirestore,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import CommentSVG from './svg/CommentSVG';
import HeartHollow from './svg/HeartHollow';
import CloseBtnSVG from './svg/CloseBtnSVG';
import EmojiSelector from './EmojiSelector';
import HeartSVG from './svg/HeartSVG';
import app from '../util/firbaseConfig';
import atoms from '../util/atoms';

type postObject = {
  comments: [];
  imgURL: string;
  likes: any;
  createdAt: any;
  postID: string;
};

type commentObject = {
  text: string;
  avatarURL: string;
  username: string;
  createdAt: string;
};

function UserPost({
  postInformation,
  postUserDetails,
}: {
  postInformation: postObject;
  postUserDetails: any;
}) {
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [darkMode] = useAtom(atoms.darkMode);

  const [postInfo, setPostInfo] = React.useState(false);
  const [postPopUp, setPostPopUp] = React.useState(false);
  const [inputText, setInputText] = React.useState('');
  const [displayEmojiSelector, setDisplayEmojiSelector] = React.useState(false);

  const date = new Date().toLocaleDateString();

  // console.log(postInformation);

  function addComment(e: any) {
    // submit on key enter
    if (
      e.code === 'Enter' ||
      e.code === 'NumpadEnter' ||
      e.target.id === 'sendMessage'
    ) {
      const db = getFirestore(app);
      const docRef = doc(
        db,
        `${postUserDetails.username}Posts`,
        postInformation.postID
      );

      const newComment = {
        text: inputText,
        avatarURL: userDetails.photoURL,
        username: userDetails.displayName,
        createdAt: date,
      };

      updateDoc(docRef, {
        comments: arrayUnion(newComment),
      });
      setInputText('');
    }
  }

  function handleLikePost(e: any) {
    const db = getFirestore(app);
    const postDocRef = doc(
      db,
      `${postUserDetails.username}Posts`,
      postInformation.postID
    );
    const userRef = doc(db, 'users', userDetails.displayName);

    if (e.target.id === 'like') {
      updateDoc(postDocRef, {
        likes: arrayUnion(userDetails.displayName),
      });
      updateDoc(userRef, {
        likedPosts: arrayUnion(postInformation.postID),
      });
    } else if (e.target.id === 'unlike') {
      updateDoc(postDocRef, {
        likes: arrayRemove(userDetails.displayName),
      });
      updateDoc(userRef, {
        likedPosts: arrayRemove(postInformation.postID),
      });
    }
  }

  return (
    <div className="relative overflow-hidden">
      <picture>
        <img
          className="h-[300px] w-[300px] object-cover"
          src={postInformation.imgURL}
          alt="user post"
        />
      </picture>
      <div
        className="absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center hover:bg-[#00000049]"
        role="button"
        tabIndex={0}
        onMouseEnter={() => setPostInfo(true)}
        onMouseLeave={() => setPostInfo(false)}
        onClick={() => {
          setPostPopUp(true);
          document.body.style.overflow = 'hidden';
        }}
      >
        {postInfo ? (
          <div className="flex items-center gap-5 text-white">
            <div className="flex items-center">
              <HeartSVG fillColor="white" height="20" width="20" />
              <p className="pl-1 text-lg font-semibold">
                {postInformation.likes.length}
              </p>
            </div>
            <div className="flex items-center">
              <CommentSVG />
              <p className="pl-1 text-lg font-semibold">
                {postInformation.comments?.length}
              </p>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      {postPopUp ? (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[#000000a4]">
          <div
            className="fixed top-10 right-10"
            role="button"
            tabIndex={0}
            onClick={() => {
              setPostPopUp(false);
              document.body.style.overflow = 'initial';
            }}
          >
            <CloseBtnSVG lightColor="white" darkColor="white" />
          </div>
          <div className="mx-20 flex h-[520px] overflow-hidden rounded-md dark:border dark:border-stone-700">
            <div className="flex items-center bg-black">
              <picture>
                <img
                  className="h-[520px] w-[520px] object-contain"
                  src={postInformation.imgURL}
                  alt="post"
                />
              </picture>
            </div>
            <div className="flex flex-col bg-white dark:bg-[#131313]">
              <div className="flex w-[500px] items-center justify-start gap-3 border-b border-stone-200 p-4 dark:border-stone-700">
                <picture>
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={postUserDetails.avatarURL}
                    alt="avatar"
                  />
                </picture>
                <p className="text-sm font-semibold">
                  {postUserDetails.username}
                </p>
              </div>
              <div className="w-[500px] flex-grow overflow-y-auto bg-[#fafafa] text-sm dark:bg-[#1c1c1c]">
                {postInformation.comments?.map(
                  (commentInfo: commentObject, index) => (
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={`post${index}`}
                      className="flex p-4"
                    >
                      <div className="flex-shrink-0">
                        <Link href={`/${commentInfo.username}`}>
                          <button
                            type="button"
                            onClick={() => {
                              setPostPopUp(false);
                              document.body.style.overflow = 'initial';
                            }}
                          >
                            <picture>
                              <img
                                className="mr-4 h-8 w-8 flex-shrink-0 rounded-full object-cover"
                                src={commentInfo.avatarURL}
                                alt="avatar"
                              />
                            </picture>
                          </button>
                        </Link>
                      </div>
                      <div>
                        <p className="">
                          <Link href={`/${commentInfo.username}`}>
                            <button
                              type="button"
                              onClick={() => {
                                setPostPopUp(false);
                                document.body.style.overflow = 'initial';
                              }}
                            >
                              <b>{commentInfo.username}</b>
                            </button>
                          </Link>

                          {` - ${commentInfo.text}`}
                        </p>
                        <p className="pt-1 text-xs text-[#a5a5a5]">
                          {commentInfo.createdAt}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="dark:bg-[#131313]">
                <div className="border-t border-stone-200 px-5 py-4 dark:border-stone-700">
                  {userNotifications.likedPosts.includes(
                    postInformation.postID
                  ) ? (
                    <button
                      id="unlike"
                      type="button"
                      onClick={(e) => handleLikePost(e)}
                    >
                      <HeartSVG fillColor="#ed4956" height="24" width="24" />
                    </button>
                  ) : (
                    <button
                      id="like"
                      type="button"
                      onClick={(e) => handleLikePost(e)}
                    >
                      <HeartHollow />
                    </button>
                  )}
                  <p className="text-sm">
                    Liked by <b>{postInformation.likes[0]}</b>{' '}
                    {postInformation.likes.length > 0 ? 'and' : ''}{' '}
                    <b>
                      {postInformation.likes.length} other
                      {postInformation.likes.length === 1 ? '' : 's'}
                    </b>
                  </p>
                  <p className="pt-2 text-xs text-[#a5a5a5]">
                    {new Date(
                      postInformation.createdAt.seconds * 1000
                    ).toDateString()}
                  </p>
                </div>
                <div className="relative flex justify-between border-t border-stone-200 pb-1 dark:border-stone-700">
                  <button
                    className="px-5"
                    type="button"
                    onClick={() =>
                      setDisplayEmojiSelector(!displayEmojiSelector)
                    }
                  >
                    <div>
                      <svg
                        data-emoji="emoji"
                        aria-label="Emoji"
                        fill={darkMode ? '#a9a9a9' : '#262626'}
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z" />
                      </svg>
                    </div>
                  </button>
                  <TextareaAutosize
                    className="my-3 w-[80%] resize-none text-sm focus:outline-none dark:bg-[#131313]"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Message..."
                    maxRows={4}
                    minRows={1}
                    onKeyPress={(e) => addComment(e)}
                  />
                  <button
                    id="sendMessage"
                    className="pr-4 pl-2 text-sm font-semibold text-[#0095F6]"
                    type="button"
                    onClick={(e) => addComment(e)}
                  >
                    Send
                  </button>
                  <div
                    id="emojiSelector"
                    className={`${
                      displayEmojiSelector ? '' : 'hidden'
                    } absolute left-0 top-[-340px] `}
                  >
                    <EmojiSelector
                      setInputText={setInputText}
                      inputText={inputText}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default UserPost;
