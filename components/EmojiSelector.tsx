/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable react/no-array-index-key */
import {
  mostPopularEmojis,
  smileysPeopleEmojis,
  animalNatureEmojis,
  travelEmojis,
} from './util/emojiArray';

function EmojiSelector({
  setInputText,
  inputText,
}: {
  setInputText: any;
  inputText: string;
}) {
  function handleSelection(e: any) {
    console.log(e.target.id);
    setInputText(inputText.concat(e.target.id));
  }

  return (
    <div className="h-[320px] w-[330px] overflow-y-auto rounded-md bg-white p-3 pt-0 text-[#8E8E8E] shadow-[-2px_-2px_5px_0px_rgba(0,0,0,0.1)] dark:bg-[#131313] dark:shadow-[-2px_-2px_5px_0px_rgba(0,0,0,0.7)]">
      <h1 className="mt-2 mb-1 font-semibold">Most popular</h1>
      <div className="flex flex-wrap justify-between  ">
        {mostPopularEmojis.map((emoji, index) => (
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
        ))}
      </div>
      <h1 className="mt-2 mb-1 font-semibold">Smileys & people</h1>
      <div className="flex flex-wrap justify-between ">
        {smileysPeopleEmojis.map((emoji, index) => (
          <p
            id={emoji}
            className="text-[32px]"
            key={`smileysEmojis${index}`}
            onClick={(e) => handleSelection(e)}
            role="button"
            tabIndex={0}
          >
            {emoji}
          </p>
        ))}
      </div>
      <h1 className="mt-2 mb-1 font-semibold">Animals & nature</h1>
      <div className="flex flex-wrap justify-between ">
        {animalNatureEmojis.map((emoji, index) => (
          <p
            id={emoji}
            className="text-[32px]"
            key={`animalsEmojis${index}`}
            onClick={(e) => handleSelection(e)}
            role="button"
            tabIndex={0}
          >
            {emoji}
          </p>
        ))}
      </div>
      <h1 className="mt-2 mb-1 font-semibold">Travel & places</h1>
      <div className="flex flex-wrap justify-between ">
        {travelEmojis.map((emoji, index) => (
          <p
            id={emoji}
            className="text-[32px]"
            key={`travelEmojis${index}`}
            onClick={(e) => handleSelection(e)}
            role="button"
            tabIndex={0}
          >
            {emoji}
          </p>
        ))}
      </div>
    </div>
  );
}

export default EmojiSelector;
