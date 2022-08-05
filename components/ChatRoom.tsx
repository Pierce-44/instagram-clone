/* eslint-disable no-use-before-define */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  getFirestore,
  query,
  onSnapshot,
  collection,
  orderBy,
  limit,
} from 'firebase/firestore';
import TextareaAutosize from 'react-textarea-autosize';
import dataProps from './Context';
import EmojiSelector from './EmojiSelector';
import app from './util/firbaseConfig';

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
  const [displayEmojiSelector, setDisplayEmojiSelector] = React.useState(false);
  const [imgLoadStatus, setImgLoadStatus] = React.useState<boolean>(false);
  const [messages, setMessages] = React.useState<any>([]);
  const [photoURL, setPhotoURL] = React.useState('');
  const [chatName, setChatName] = React.useState('');
  const [inputText, setInputText] = React.useState('');
  const { darkMode } = React.useContext(dataProps);

  function handleUserPhotoURL() {
    if (userID === messages.slice(-1)[0]?.userOneID) {
      setPhotoURL(messages.slice(-1)[0]?.userTwoPhotoURL);
      setChatName(messages.slice(-1)[0]?.userTwoID);
    } else {
      setPhotoURL(messages.slice(-1)[0]?.userOnePhotoURL);
      setChatName(messages.slice(-1)[0]?.userOneID);
    }
  }

  function getChatRoomMessages() {
    const q = query(
      collection(db, chatRoomID),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    // eslint-disable-next-line no-unused-vars
    onSnapshot(q, (querySnapshot) => {
      setMessages([]);
      querySnapshot.forEach((document) => {
        setMessages((oldArray: any) => [...oldArray, document.data()]);
      });
    });
  }

  React.useEffect(() => {
    getChatRoomMessages();
  }, []);

  React.useEffect(() => {
    handleUserPhotoURL();
  }, [messages]);

  return (
    <div className="dark:text-slate-100">
      <div
        className={`${
          activeChat === activeChatId ? 'flex' : 'hidden'
        } absolute top-0 left-[350px] h-[60px] items-center gap-4 border-l border-stone-300 pl-10 dark:border-stone-700 `}
      >
        <img className="h-7 w-7 rounded-full" src={photoURL} alt="avatar" />
        <h1>{chatName}</h1>
      </div>
      <div
        className={`${
          activeChat === activeChatId
            ? 'bg-[#efefef] dark:bg-[#070707]'
            : 'hover:bg-[#f8f8f8] dark:hover:bg-[#131313]'
        } flex w-[350px] items-center px-5 py-2`}
      >
        <div className="mr-2 h-14 w-14">
          <div
            className={`${
              imgLoadStatus ? 'hidden' : 'flex items-center justify-center'
            } h-14 w-14 rounded-full bg-[#efefef] dark:bg-[#070707]`}
          />
          <img
            className={`${imgLoadStatus ? '' : 'hidden'} rounded-full`}
            src={photoURL}
            alt="avatar"
            onLoad={() => setImgLoadStatus(true)}
          />
        </div>
        <div
          className={`${
            chatName === '' ? '' : 'hidden'
          } h-5 w-[50%] rounded-md bg-[#efefef] dark:bg-[#070707]`}
        />
        <h1>{chatName}</h1>
      </div>
      <div
        className={`${
          activeChat === activeChatId ? 'flex' : 'hidden'
        } absolute bottom-0 top-[59px] left-[350px] w-[calc(100%-350px)] cursor-default flex-col justify-end  border-l border-t border-stone-300 dark:border-stone-700`}
      >
        <div className="flex cursor-default flex-col-reverse gap-5 overflow-y-auto p-5 px-5 py-2 dark:[color-scheme:dark]">
          {messages.map((message: any, index: number) => (
            <div
              key={`key${index}`}
              className={`${
                message.name === userID ? 'justify-end' : 'justify-start'
              } flex`}
            >
              {message.name === userID ? '' : <ChatIcon photoURL={photoURL} />}
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
        <div className="mx-5 mt-3 mb-5 flex justify-between rounded-full border border-stone-200 dark:border-stone-700 dark:bg-[#131313]">
          <button
            className="px-5"
            type="button"
            onClick={() => setDisplayEmojiSelector(!displayEmojiSelector)}
          >
            <div>
              <svg
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
          />
          <button
            className="pr-4 pl-2 text-sm font-semibold text-[#0095F6]"
            type="button"
          >
            Send
          </button>
        </div>
        <div
          className={`${
            displayEmojiSelector ? '' : 'hidden'
          } absolute left-5 bottom-24 shadow-2xl`}
        >
          <EmojiSelector setInputText={setInputText} inputText={inputText} />
        </div>
      </div>
    </div>
  );
}

function ChatIcon({ photoURL }: { photoURL: string }) {
  return (
    <div className="mt-auto mr-2 h-7 w-7">
      <img className="rounded-full" src={photoURL} alt="avatar" />
    </div>
  );
}

export default ChatRoom;
