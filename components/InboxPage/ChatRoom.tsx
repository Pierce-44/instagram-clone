/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Link from 'next/link';
import {
  getFirestore,
  collection,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';
import TextareaAutosize from 'react-textarea-autosize';
import { useAtom } from 'jotai';
import EmojiSelector from '../EmojiSelector';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';
import app from '../../util/firbaseConfig';
import atoms from '../../util/atoms';

const db = getFirestore(app);

function ChatRoom({
  chatRoomID,
  userID,
  activeChat,
  activeChatId,
}: {
  chatRoomID: string;
  userID: string;
  activeChat: string;
  activeChatId: string;
}) {
  const [darkMode] = useAtom(atoms.darkMode);
  const [allChatRoomMessages] = useAtom(atoms.allChatRoomMessages);

  const [inputText, setInputText] = React.useState('');
  const [displayEmojiSelector, setDisplayEmojiSelector] = React.useState(false);

  const messages = allChatRoomMessages[chatRoomID]?.slice(0, -1);
  const chatName =
    allChatRoomMessages[chatRoomID]?.slice(-1)[0][`${userID}ChatName`];
  const avatarURL =
    allChatRoomMessages[chatRoomID]?.slice(-1)[0][`${chatName}Avatar`];

  function sendMessage(e: any) {
    // submit on key enter
    if (
      e.code === 'Enter' ||
      e.code === 'NumpadEnter' ||
      e.target.id === 'sendMessage'
    ) {
      setInputText('');
      addDoc(collection(db, chatRoomID), {
        createdAt: serverTimestamp(),
        name: userID,
        text: inputText,
      });
    }
  }

  React.useEffect(() => {
    const emojiListner = window.addEventListener('click', (e: any) => {
      // if outside of emoji tab close
      if (e.target.id !== 'emoji') {
        setDisplayEmojiSelector(false);
      }
    });
    return emojiListner;
  }, []);

  return (
    <div className="dark:text-slate-100">
      <div
        className={`${
          activeChat === activeChatId ? 'flex' : 'hidden'
        } absolute top-0 left-[350px] h-[60px] cursor-default items-center gap-4 border-l border-stone-300 pl-10 dark:border-stone-700`}
      >
        {avatarURL === '' ? (
          <ProfilePicSVG height="28" width="28" strokeWidth="1.5" />
        ) : (
          <Link href={`/${chatName}`}>
            <picture>
              <img
                className="h-7 w-7 cursor-pointer select-none rounded-full object-cover"
                src={avatarURL}
                alt="avatar"
              />
            </picture>
          </Link>
        )}
        <Link href={`/${chatName}`}>
          <h1 className="cursor-pointer">{chatName}</h1>
        </Link>
      </div>
      <div
        className={`${
          activeChat === activeChatId
            ? 'bg-[#efefef] dark:bg-[#070707]'
            : 'hover:bg-[#f8f8f8] dark:hover:bg-[#131313]'
        } flex w-[350px] items-center px-5 py-2`}
      >
        <div className="mr-2 flex h-14 w-14 items-center justify-center">
          <div
            className={`${avatarURL ? 'hidden' : ''} h-14 w-14 rounded-full `}
          >
            <ProfilePicSVG height="56" width="56" strokeWidth="1" />
          </div>
          <picture>
            <img
              className={`${
                avatarURL ? '' : 'hidden'
              } h-14 w-14 select-none rounded-full bg-[#ebebeb] object-cover dark:bg-[#313131]`}
              src={avatarURL}
              alt="avatar"
            />
          </picture>
        </div>
        <div
          className={`${
            chatName ? 'hidden' : ''
          } h-5 w-[50%] rounded-md bg-[#efefef] dark:bg-[#070707]`}
        />
        <h1>{chatName}</h1>
      </div>
      {activeChat === activeChatId ? (
        <div className="absolute bottom-0 top-[59px] left-[350px] flex w-[calc(100%-350px)] cursor-default flex-col justify-end  border-l border-t border-stone-300 dark:border-stone-700">
          <div className="flex cursor-default flex-col-reverse gap-5 overflow-y-auto p-5 px-5 py-2 dark:[color-scheme:dark]">
            {messages?.map((message: any, index: number) => (
              <div
                key={`key${index}`}
                className={`${
                  message.name === userID ? 'justify-end' : 'justify-start'
                } flex`}
              >
                {message.name === userID ? (
                  ''
                ) : (
                  <ChatIcon photoURL={avatarURL} chatName={chatName} />
                )}
                <p
                  className={`${
                    message.name === userID
                      ? 'bg-[#efefef] dark:bg-[#070707]'
                      : 'border border-stone-200 dark:border-stone-700'
                  } max-w-[50%] rounded-[30px] p-4 text-sm`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>
          <div className="relative mx-5 mt-3 mb-5 flex justify-between rounded-full border border-stone-200 dark:border-stone-700 dark:bg-[#131313]">
            <button
              className="px-5"
              type="button"
              onClick={() => setDisplayEmojiSelector(!displayEmojiSelector)}
            >
              <div>
                <svg
                  id="emoji"
                  aria-label="Emoji"
                  fill={darkMode ? '#a9a9a9' : '#262626'}
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    id="emoji"
                    d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"
                  />
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
              onKeyPress={(e) => sendMessage(e)}
            />
            <button
              id="sendMessage"
              className={`${
                inputText === ''
                  ? 'pointer-events-none text-[#9dd8ff]'
                  : 'text-[#0095F6]'
              } pr-4 pl-2 text-sm font-semibold `}
              type="button"
              onClick={(e) => sendMessage(e)}
            >
              Send
            </button>
            {displayEmojiSelector ? (
              <div id="emojiSelector" className="absolute left-0 top-[-340px]">
                <EmojiSelector
                  setInputText={setInputText}
                  inputText={inputText}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

function ChatIcon({
  photoURL,
  chatName,
}: {
  photoURL: string;
  chatName: string;
}) {
  return (
    <div className="mt-auto mr-2 h-7 w-7">
      {photoURL === '' ? (
        <ProfilePicSVG height="24" width="24" strokeWidth="1.3" />
      ) : (
        <Link href={`/${chatName}`}>
          <picture>
            <img
              className="h-6 w-6 cursor-pointer select-none rounded-full object-cover"
              src={photoURL}
              alt="avatar"
            />
          </picture>
        </Link>
      )}
    </div>
  );
}

export default ChatRoom;
