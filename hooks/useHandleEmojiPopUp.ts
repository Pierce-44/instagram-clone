/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

interface Props {
  setDisplayEmojiSelector: React.Dispatch<React.SetStateAction<boolean>>;
}

function useHandleEmojiPopUp({ setDisplayEmojiSelector }: Props) {
  React.useEffect(() => {
    function emojiPopUpListener(e: any) {
      // if outside of emoji tab close
      if (e.target.id !== 'emoji') {
        setDisplayEmojiSelector(false);
      }
    }
    window.addEventListener('click', (e: any) => emojiPopUpListener(e));

    return window.removeEventListener('click', (e: any) =>
      emojiPopUpListener(e)
    );
  }, []);
}

export default useHandleEmojiPopUp;
