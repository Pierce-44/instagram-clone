/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function DarkModeButton() {
  const [darkMode, setDarkMode] = useAtom(atoms.darkMode);

  function handleDarkMode() {
    // changing from darkmode to lightmode
    if (darkMode) {
      localStorage.setItem('darkModeInstagram', 'false');
    }
    // changing from lightmode to darkmode
    else {
      localStorage.setItem('darkModeInstagram', 'true');
    }

    setDarkMode(!darkMode);
  }

  return (
    <button
      className="relative flex w-[50px] cursor-pointer items-center gap-2 rounded-xl  bg-[#0095f6] py-[2px] px-1 dark:bg-[#000000]"
      onClick={() => handleDarkMode()}
      type="button"
    >
      <div
        className={`${
          darkMode ? 'translate-x-6' : 'translate-x-0'
        } absolute h-[18px] w-[18px] rounded-full bg-[#ffffff] transition duration-200 ease-linear dark:bg-slate-100`}
      />
      <picture>
        <img className="h-4 w-4 select-none" src="/moon.png" alt="moon" />
      </picture>
      <picture>
        <img
          className="h-[18px] w-[18px] select-none"
          src="/sun.png"
          alt="sun"
        />
      </picture>
    </button>
  );
}

export default DarkModeButton;
