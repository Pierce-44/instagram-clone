/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import Head from 'next/head';
import React from 'react';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import ChatRoom from '../components/InboxPage/ChatRoom';
import CreateChatRoom from '../components/InboxPage/CreateChatRoom';
import SendMessage from '../components/InboxPage/SendMessage';
import LoadingPage from '../components/loadingComps/LoadingPage';
import NewMessageSVG from '../components/svgComps/NewMessageSVG';
import Header from '../components/header/Header';
import atoms from '../util/atoms';

const Inbox: NextPage = () => {
  const [userStatus] = useAtom(atoms.userStatus);
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [activeChat, setActiveChat] = React.useState('');
  const [createChatRoom, setCreateChatRoom] = React.useState(false);

  if (!userStatus) {
    return <LoadingPage checkingUserRoute={false} />;
  }

  return (
    <div className="h-screen cursor-default overflow-y-scroll bg-[#fafafa] text-[#231f20] dark:bg-[#131313] dark:text-slate-100 dark:[color-scheme:dark]">
      <Head>
        <title>Instagram • Chats</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <Header page="Inbox" />
      {createChatRoom ? (
        <CreateChatRoom setCreateChatRoom={setCreateChatRoom} />
      ) : (
        <div />
      )}
      <div className="relative mx-auto mt-4 h-[calc(100%-90px)] max-w-[935px] border border-stone-300 bg-white dark:border-stone-700 dark:bg-[#1c1c1c]">
        <div className="flex h-[60px] w-[350px] items-center border-b border-stone-300 px-5 dark:border-stone-700">
          <h1 className="mx-auto">{userDetails.displayName}</h1>
          <button
            onClick={() => setCreateChatRoom(!createChatRoom)}
            type="button"
          >
            <NewMessageSVG />
          </button>
        </div>
        {activeChat === '' ? (
          <SendMessage setCreateChatRoom={setCreateChatRoom} />
        ) : (
          <div />
        )}

        <div className="h-[calc(100%-60px)] w-[350px] overflow-y-auto overflow-x-hidden dark:[color-scheme:dark]">
          {userNotifications.chatRoomIds ? (
            userNotifications.chatRoomIds.map((chatRoomId, index) => (
              <div
                key={`chatRoomKey${index}`}
                onClick={() => setActiveChat(`chatRoom${index}`)}
                role="button"
                tabIndex={0}
              >
                <ChatRoom
                  chatRoomID={chatRoomId}
                  userID={userDetails.displayName!}
                  activeChat={activeChat}
                  activeChatId={`chatRoom${index}`}
                />
              </div>
            ))
          ) : (
            <div className="flex h-[calc(100%-60px)] w-[350px] items-center justify-center">
              <picture>
                <img
                  className="h-12 w-12"
                  src="/instagramLoading.png"
                  alt="loading"
                />
              </picture>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
