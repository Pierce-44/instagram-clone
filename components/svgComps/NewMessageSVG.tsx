import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function NewMessageSVG() {
  const [darkMode] = useAtom(atoms.darkMode);
  return (
    <svg
      aria-label="New message"
      color={darkMode ? '#f1f5f9' : '#262626'}
      className="h-5 w-5 pr-1 md:h-6 md:w-6 md:pr-0"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M12.202 3.203H5.25a3 3 0 00-3 3V18.75a3 3 0 003 3h12.547a3 3 0 003-3v-6.952"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 012.004 0l1.224 1.225a1.417 1.417 0 010 2.004z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="16.848"
        x2="20.076"
        y1="3.924"
        y2="7.153"
      />
    </svg>
  );
}

export default NewMessageSVG;
