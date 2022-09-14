/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import TextareaAutosize from 'react-textarea-autosize';
import { useAtom } from 'jotai';
import EmojiSelector from '../EmojiSelector';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';
import atoms from '../../util/atoms';
import useHandleEmojiPopUp from '../../hooks/useHandleEmojiPopUp';
import sendChatRoomMessage from '../../util/handleSendChatRoomMessage';

interface Props {
  chatRoomID: string;
  userID: string;
  activeChat: string;
  activeChatId: string;
}

function ChatRoom({ chatRoomID, userID, activeChat, activeChatId }: Props) {
  const [darkMode] = useAtom(atoms.darkMode);
  const [allChatRoomMessages] = useAtom(atoms.allChatRoomMessages);

  const [inputText, setInputText] = React.useState('');
  const [displayEmojiSelector, setDisplayEmojiSelector] = React.useState(false);

  const messages = allChatRoomMessages[chatRoomID]?.slice(0, -1);
  const chatName =
    allChatRoomMessages[chatRoomID]?.slice(-1)[0][`${userID}ChatName`];
  const avatarURL =
    allChatRoomMessages[chatRoomID]?.slice(-1)[0][`${chatName}Avatar`];
  const newMessage =
    allChatRoomMessages[chatRoomID]?.slice(-1)[0][`${userID}NewMessage`];

  useHandleEmojiPopUp({ setDisplayEmojiSelector });

  return (
    <div className="dark:text-slate-100">
      <div
        className={`${
          activeChat === activeChatId ? 'flex' : 'hidden'
        } absolute left-[130px] top-0 h-[60px] cursor-default items-center gap-2 border-l border-stone-300 pl-2 dark:border-stone-700 md:left-[350px] md:gap-4 md:pl-10`}
      >
        {avatarURL === '' || !avatarURL ? (
          <div className="h-7 w-7">
            <ProfilePicSVG strokeWidth="1.5" />
            <picture>
              <img
                // unfortuanetly this image is needed to force map loading state to be triggered
                className="h-0 w-0 opacity-0"
                src="/instagramLoading.png"
                alt="avatar"
              />
            </picture>
          </div>
        ) : (
          <Link href={`/${chatName}`}>
            <a>
              <Image
                className="h-7 w-7 cursor-pointer select-none rounded-full object-cover"
                src={avatarURL}
                alt="avatar"
                width="28"
                height="28"
              />
            </a>
          </Link>
        )}
        <Link href={`/${chatName}`}>
          <a>
            <h1 className="cursor-pointer">{chatName}</h1>
          </a>
        </Link>
      </div>
      <div
        className={`${
          activeChat === activeChatId
            ? 'bg-[#efefef] dark:bg-[#070707]'
            : 'hover:bg-[#f8f8f8] dark:hover:bg-[#131313]'
        } md: flex w-full items-center px-1 py-2 md:px-5`}
      >
        <div className="mr-2 flex  items-center justify-center md:h-14 md:w-14">
          {avatarURL === '' || !avatarURL ? (
            <div className="h-6 w-6 rounded-full md:h-14 md:w-14">
              <ProfilePicSVG strokeWidth="1" />
            </div>
          ) : (
            <Image
              className="h-6 w-6 select-none rounded-full bg-[#ebebeb] object-cover dark:bg-[#313131] md:h-14 md:w-14"
              src={avatarURL}
              alt="avatar"
              width="56"
              height="56"
              priority
            />
          )}
        </div>
        <h1 className="text-xs md:text-base">{chatName}</h1>
        {newMessage ? (
          <div className="ml-auto h-2 w-2 rounded-full bg-[#0095f6]" />
        ) : (
          ''
        )}
      </div>
      {activeChat === activeChatId ? (
        <div className="absolute bottom-0 top-[59px] left-[130px] flex w-[calc(100%-130px)] cursor-default flex-col justify-end border-l border-t  border-stone-300 dark:border-stone-700 md:left-[350px] md:w-[calc(100%-350px)]">
          <div className="flex cursor-default flex-col-reverse gap-5 overflow-y-auto px-1 py-2 dark:[color-scheme:dark] md:px-5">
            {messages.map((message, index) => (
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
                  } max-w-[80%] rounded-[30px] p-2 text-xs  md:max-w-[50%] md:p-4 md:text-sm`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>
          <div className="relative mx-1 mt-3 mb-5 flex justify-between rounded-full border border-stone-200 dark:border-stone-700 dark:bg-[#131313] md:mx-5">
            <button
              className="px-2 md:px-5"
              type="button"
              onClick={() => setDisplayEmojiSelector(!displayEmojiSelector)}
            >
              <div>
                <svg
                  id="emoji"
                  aria-label="Emoji"
                  fill={darkMode ? '#a9a9a9' : '#262626'}
                  className="h-4 w-4 md:h-6 md:w-6"
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
              onKeyPress={(e: any) =>
                sendChatRoomMessage({
                  e,
                  chatRoomID,
                  inputText,
                  userID,
                  setInputText,
                  username: chatName,
                })
              }
            />
            <button
              id="sendMessage"
              className={`${
                inputText === ''
                  ? 'pointer-events-none text-[#9dd8ff]'
                  : 'text-[#0095F6]'
              } pr-2 text-xs font-semibold md:pl-2 md:pr-4 md:text-sm `}
              type="button"
              onClick={(e: any) =>
                sendChatRoomMessage({
                  e,
                  chatRoomID,
                  inputText,
                  userID,
                  setInputText,
                  username: chatName,
                })
              }
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
    <div className="mt-auto h-7 w-7 md:mr-2">
      {photoURL === '' ? (
        <div className="h-6 w-6">
          <ProfilePicSVG strokeWidth="1.3" />
        </div>
      ) : (
        <Link href={`/${chatName}`}>
          <a>
            <Image
              className="h-6 w-6 cursor-pointer select-none rounded-full object-cover"
              src={photoURL}
              alt="avatar"
              height="24"
              width="24"
            />
          </a>
        </Link>
      )}
    </div>
  );
}

export default ChatRoom;
