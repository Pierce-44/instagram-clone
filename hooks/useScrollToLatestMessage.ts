import React from 'react';
import { postCommentTypes } from '../util/atoms';

interface Props {
  messages: postCommentTypes[];
  latestMessageRef: React.RefObject<HTMLDivElement>;
}

export default function useScrollToLatestMessage({
  messages,
  latestMessageRef,
}: Props) {
  React.useEffect(() => {
    function scrollToBottom() {
      if (latestMessageRef.current) {
        latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }

    scrollToBottom();
  }, [messages, latestMessageRef]);
}
