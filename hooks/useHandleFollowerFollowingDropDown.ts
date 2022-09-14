import React from 'react';

interface Props {
  setShowFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFollowers: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useHandleFollowerFollowingDropDown({
  setShowFollowing,
  setShowFollowers,
}: Props) {
  React.useEffect(() => {
    function dropDownListner(e: any) {
      // if outside of dropdown close dropdown
      if (e.target.id !== 'followingFollowerDropDown') {
        setShowFollowers(false);
        setShowFollowing(false);
      }
    }

    window.addEventListener('click', (e: any) => dropDownListner(e));

    return window.removeEventListener('click', (e: any) => dropDownListner(e));
  }, [setShowFollowers, setShowFollowing]);
}
