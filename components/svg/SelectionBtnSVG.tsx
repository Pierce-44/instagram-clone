import React from 'react';
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function SelectionBtnSVG({ ticked }: { ticked: boolean }) {
  const [darkMode] = useAtom(atoms.darkMode);

  return (
    <svg
      aria-label="Toggle selection"
      className="mr-2 cursor-pointer"
      color={darkMode ? '#f1f5f9' : '#262626'}
      fill="#0095f6"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      {ticked ? (
        <path d="M12.001.504a11.5 11.5 0 1011.5 11.5 11.513 11.513 0 00-11.5-11.5zm5.706 9.21l-6.5 6.495a1 1 0 01-1.414-.001l-3.5-3.503a1 1 0 111.414-1.414l2.794 2.796L16.293 8.3a1 1 0 011.414 1.415z" />
      ) : (
        <circle
          cx="12.008"
          cy="12"
          fill="none"
          r="11.25"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      )}
    </svg>
  );
}

export default SelectionBtnSVG;
