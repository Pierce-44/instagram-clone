/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import DarkModeButton from './DarkModeButton';

interface IDarkMode {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
}

function Header(props: IDarkMode) {
  return (
    <div className="flex h-[60px] items-center justify-center border-b border-stone-300 bg-white  align-middle dark:border-stone-700 dark:bg-[#1c1c1c]">
      <div className="w-[333px] pl-[5px]">
        <img
          src={props.darkMode ? '/instagramWhite.png' : '/instagramBlack.png'}
          alt="Instagram"
        />
      </div>
      <div>
        <h1>SEARCH</h1>
      </div>
      <div className="flex items-center pl-[100px]">
        <svg
          aria-label="Home"
          className="fill-[#262626] dark:fill-slate-100"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z" />
        </svg>
        <div className="ml-[22px]">
          <DarkModeButton
            darkMode={props.darkMode}
            setDarkMode={props.setDarkMode}
          />
        </div>
        <svg
          aria-label="Messenger"
          className="ml-[22px] fill-[#262626] dark:fill-slate-100"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z"
            fill="none"
            stroke={props.darkMode ? '#f1f5f9' : '#262626'}
            strokeMiterlimit="10"
            strokeWidth="1.739"
          />
          <path
            d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z"
            fillRule="evenodd"
          />
        </svg>
        <svg
          aria-label="New post"
          className="ml-[22px]"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
            fill="none"
            stroke={props.darkMode ? '#f1f5f9' : '#262626'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <line
            fill="none"
            stroke={props.darkMode ? '#f1f5f9' : '#262626'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="6.545"
            x2="17.455"
            y1="12.001"
            y2="12.001"
          />
          <line
            fill="none"
            stroke={props.darkMode ? '#f1f5f9' : '#262626'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="12.003"
            x2="12.003"
            y1="6.545"
            y2="17.455"
          />
        </svg>
        <svg
          aria-label="Activity Feed"
          className="ml-[22px] fill-[#262626] dark:fill-slate-100"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z" />
        </svg>
        <div>
          <img
            src="https://avatars.githubusercontent.com/u/96740762?v=4"
            alt="avatar"
            className="ml-[22px] h-[24px] w-[24px] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
