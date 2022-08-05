/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GetServerSideProps } from 'next';
import { getChatRoomIDs } from '../components/util/getChatRooms';
import ChatRoom from '../components/ChatRoom';
import dataProps from '../components/Context';
import SendMessage from '../components/SendMessage';
import Header from '../components/Header';
import getMessageCount from '../components/util/getHomePageInfo';

// eslint-disable-next-line no-unused-vars
export const getServerSideProps: GetServerSideProps = async (context) => {
  const count = await getMessageCount();
  const chatRoomIDs = await getChatRoomIDs();
  return {
    props: {
      count,
      chatRoomIDs,
    },
  };
};

function Inbox({ count, chatRoomIDs }: { count: number; chatRoomIDs: any }) {
  const auth = getAuth();
  const { darkMode } = React.useContext(dataProps);
  const [activeChat, setActiveChat] = React.useState('');
  const [displayEmojiSelector, setDisplayEmojiSelector] = React.useState(false);
  const [userStatus, setUserStatus] = React.useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserStatus(true);
    } else {
      Router.push('/Login');
    }
  });

  function closeEmojiSelectorOnClick(e: any) {
    if (e.target.dataset.emoji === 'emoji') {
      return;
    }
    setDisplayEmojiSelector(false);
  }

  if (!userStatus) {
    return (
      <div className="flex h-[100vh] w-full items-center justify-center">
        <img src="/instagramLoading.png" alt="loading" />
      </div>
    );
  }

  return (
    <div
      className=" h-screen bg-[#fafafa] dark:bg-[#131313] dark:text-slate-100"
      onClick={(e) => closeEmojiSelectorOnClick(e)}
    >
      <Head>
        <title>Instagram • Chats</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <Header count={count} />
      <div className="relative mx-auto mt-4 h-[calc(100%-90px)] max-w-[935px] border border-stone-300 bg-white dark:border-stone-700 dark:bg-[#1c1c1c]">
        <div className="flex h-[60px] w-[350px] items-center border-b border-stone-300 px-5 dark:border-stone-700">
          <h1 className="mx-auto">pierce_luke_</h1>
          <svg
            aria-label="New message"
            color={darkMode ? '#f1f5f9' : '#262626'}
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M12.202 3.203H5.25a3 3 0 00-3 3V18.75a3 3 0 003 3h12.547a3 3 0 003-3v-6.952"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 012.004 0l1.224 1.225a1.417 1.417 0 010 2.004z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="16.848"
              x2="20.076"
              y1="3.924"
              y2="7.153"
            />
          </svg>
        </div>
        <div className={`${activeChat === '' ? '' : 'hidden'}`}>
          <SendMessage />
        </div>
        <div className="h-[calc(100%-60px)] w-[350px] overflow-y-auto dark:[color-scheme:dark]">
          {chatRoomIDs.roomIDs.map((chatRoomId: any, index: number) => (
            <div
              key={`chatRoomKey${index}`}
              onClick={() => setActiveChat(`chatRoom${index}`)}
              role="button"
              tabIndex={0}
            >
              <ChatRoom
                chatRoomID={chatRoomId}
                userID="bob"
                activeChat={activeChat}
                activeChatId={`chatRoom${index}`}
                displayEmojiSelector={displayEmojiSelector}
                setDisplayEmojiSelector={setDisplayEmojiSelector}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inbox;
