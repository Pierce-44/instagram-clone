import React from 'react';
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function CloseBtnSVG({
  lightColor,
  darkColor,
  heightWidth,
}: {
  lightColor: string;
  darkColor: string;
  heightWidth: string;
}) {
  const [darkMode] = useAtom(atoms.darkMode);
  return (
    <svg
      id="close"
      aria-label="Close"
      color={darkMode ? darkColor : lightColor}
      height={heightWidth}
      role="img"
      viewBox="0 0 24 24"
      width={heightWidth}
    >
      <polyline
        id="close"
        fill="none"
        points="20.643 3.357 12 12 3.353 20.647"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <line
        id="close"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        x1="20.649"
        x2="3.354"
        y1="20.649"
        y2="3.354"
      />
    </svg>
  );
}

export default CloseBtnSVG;
