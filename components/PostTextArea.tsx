import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useAtom } from 'jotai';
import atoms, { postCommentTypes, postType } from '../util/atoms';
import EmojiSelector from './EmojiSelector';
import useHandleEmojiPopUp from '../hooks/useHandleEmojiPopUp';
import handleSendPostMessage from '../util/handleSendPostMessage';

interface Props {
  postInformation: postType;
  postUserDetails: postCommentTypes;
}

function PostTextArea({ postInformation, postUserDetails }: Props) {
  const [darkMode] = useAtom(atoms.darkMode);
  const [userDetails] = useAtom(atoms.userDetails);

  const [commentText, setCommentText] = React.useState('');
  const [displayEmojiSelector, setDisplayEmojiSelector] = React.useState(false);

  useHandleEmojiPopUp({ setDisplayEmojiSelector });

  return (
    <div className="relative flex justify-between border-t border-stone-200 pb-1 dark:border-stone-700">
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
            <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z" />
          </svg>
        </div>
      </button>
      <TextareaAutosize
        className="my-3 w-[80%] resize-none text-sm focus:outline-none dark:bg-[#1c1c1c]"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        maxRows={4}
        minRows={1}
        onKeyPress={(e: any) =>
          handleSendPostMessage({
            e,
            postInformation,
            postUserDetails,
            userDetails,
            commentText,
            setCommentText,
          })
        }
      />
      <button
        id="sendMessage"
        className={`${
          commentText === ''
            ? 'pointer-events-none text-[#9dd8ff]'
            : 'text-[#0095F6]'
        } pr-4 pl-2 text-sm font-semibold `}
        type="button"
        onClick={(e: any) =>
          handleSendPostMessage({
            e,
            postInformation,
            postUserDetails,
            userDetails,
            commentText,
            setCommentText,
          })
        }
      >
        Send
      </button>
      {displayEmojiSelector ? (
        <div id="emojiSelector" className="absolute left-0 top-[-340px]">
          <EmojiSelector
            setInputText={setCommentText}
            inputText={commentText}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default PostTextArea;
