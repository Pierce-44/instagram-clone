import React from 'react';
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function ProfilePicSVG({ strokeWidth }: { strokeWidth: string }) {
  const [darkMode] = useAtom(atoms.darkMode);
  return (
    <svg
      id="avatarDropDown"
      aria-label="Profile"
      color={darkMode ? '#f1f5f9' : '#262626'}
      fill={darkMode ? '#f1f5f9' : '#262626'}
      // height={height}
      role="img"
      viewBox="0 0 24 24"
      // width={width}
    >
      <circle
        id="avatarDropDown"
        cx="12.004"
        cy="12.004"
        fill="none"
        r="10.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth={strokeWidth}
      />
      <path
        d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="12.006"
        cy="9.718"
        fill="none"
        r="4.109"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export default ProfilePicSVG;
