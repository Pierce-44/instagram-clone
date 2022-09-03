/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

export default function useHandleAvatarDropDown(
  setAvatarDropDown: React.Dispatch<React.SetStateAction<boolean>>
) {
  React.useEffect(() => {
    function dropDownListner(e: any) {
      // if outside of dropdown close dropdown
      if (e.target.id !== 'avatarDropDown') {
        setAvatarDropDown(false);
      }
    }

    window.addEventListener('click', (e: any) => dropDownListner(e));

    return window.removeEventListener('click', (e: any) => dropDownListner(e));
  }, []);
}
