/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

export default function useHandleHeartDropDown(
  setShowHeartNotifications: React.Dispatch<React.SetStateAction<boolean>>
) {
  React.useEffect(() => {
    function heartDropDownListner(e: any) {
      // if outside of dropdown close dropdown
      if (e.target.id === 'close') {
        setShowHeartNotifications(false);
      }
    }

    window.addEventListener('click', (e: any) => heartDropDownListner(e));

    return window.removeEventListener('click', (e: any) =>
      heartDropDownListner(e)
    );
  }, []);
}
