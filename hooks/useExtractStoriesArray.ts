import React from 'react';
import { useAtom } from 'jotai';
import atoms from '../util/atoms';

function useExtractStoriesArray() {
  const [stories] = useAtom(atoms.stories);
  const [followingArray] = useAtom(atoms.followingArray);

  const [, setStoriesArry] = useAtom(atoms.storiesArray);

  React.useEffect(() => {
    const arryStore: string[] = [];

    followingArray.forEach((name) => {
      if (!arryStore.includes(name) && stories[name]) {
        arryStore.push(name);
      }
    });

    setStoriesArry([...arryStore]);
  }, [followingArray, stories, setStoriesArry]);
}

export default useExtractStoriesArray;
