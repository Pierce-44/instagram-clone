/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  mostPopularEmojis,
  smileysPeopleEmojis,
  animalNatureEmojis,
  travelEmojis,
} from '../util/emojiArray';

interface Props {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

function EmojiSelector({ inputText, setInputText }: Props) {
  function handleSelection(e: any) {
    setInputText(inputText.concat(e.target.id));
  }

  return (
    <div
      id="emojiSelector"
      className="h-[320px] w-[330px] overflow-y-auto rounded-md bg-white p-3 pt-0 text-[#8E8E8E] shadow-[-2px_-2px_10px_2px_rgba(0,0,0,0.1)] dark:bg-[#131313] dark:shadow-[-2px_-2px_5px_0px_rgba(0,0,0,0.7)]"
    >
      <h1 className="mt-2 mb-1 font-semibold">Most popular</h1>
      <div className="flex flex-wrap justify-between  ">
        {mostPopularEmojis.map((emoji, index) => (
          <div className="group" key={`mostPopEmojis${index}`}>
            <div className="group-hover:animate-bounce">
              <p
                id={emoji}
                className="text-[32px]"
                key={`mostPopEmojis${index}`}
                onClick={(e) => handleSelection(e)}
                role="button"
                tabIndex={0}
              >
                {emoji}
              </p>
            </div>
          </div>
        ))}
      </div>
      <h1 className="mt-2 mb-1 font-semibold">Smileys & people</h1>
      <div className="flex flex-wrap justify-between ">
        {smileysPeopleEmojis.map((emoji, index) => (
          <div className="group" key={`smileysEmojis${index}`}>
            <div className="group-hover:animate-bounce">
              <p
                id={emoji}
                className="text-[32px]"
                onClick={(e) => handleSelection(e)}
                role="button"
                tabIndex={0}
              >
                {emoji}
              </p>
            </div>
          </div>
        ))}
      </div>
      <h1 className="mt-2 mb-1 font-semibold">Animals & nature</h1>
      <div className="flex flex-wrap justify-between ">
        {animalNatureEmojis.map((emoji, index) => (
          <div className="group" key={`animalsEmojis${index}`}>
            <div className="group-hover:animate-bounce">
              <p
                id={emoji}
                className="text-[32px]"
                onClick={(e) => handleSelection(e)}
                role="button"
                tabIndex={0}
              >
                {emoji}
              </p>
            </div>
          </div>
        ))}
      </div>
      <h1 className="mt-2 mb-1 font-semibold">Travel & places</h1>
      <div className="flex flex-wrap justify-between ">
        {travelEmojis.map((emoji, index) => (
          <div className="group" key={`travelEmojis${index}`}>
            <div className="group-hover:animate-bounce">
              <p
                id={emoji}
                className="text-[32px]"
                onClick={(e) => handleSelection(e)}
                role="button"
                tabIndex={0}
              >
                {emoji}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmojiSelector;
