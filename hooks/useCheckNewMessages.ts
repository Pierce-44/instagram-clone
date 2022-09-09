import { useAtom } from 'jotai';
import React from 'react';
import atoms from '../util/atoms';

export default function useCheckNewMessages() {
  const [allChatRoomMessages] = useAtom(atoms.allChatRoomMessages);
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [, setNewMessage] = useAtom(atoms.newMessage);

  React.useEffect(() => {
    let check = false;
    userNotifications.chatRoomIds?.forEach((chatRoomIds: string) => {
      if (
        allChatRoomMessages[chatRoomIds]?.slice(-1)[0][
          `${userNotifications.username}NewMessage`
        ]
      ) {
        setNewMessage(true);
        check = true;
      }
    });
    if (!check) {
      setNewMessage(false);
    }
  }, [userNotifications, allChatRoomMessages, setNewMessage]);
}
