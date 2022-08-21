import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function ReturnArrow() {
  const [darkMode] = useAtom(atoms.darkMode);
  return (
    <div>
      <svg
        aria-label="Back"
        color={darkMode ? '#f1f5f9' : '#262626'}
        fill="#262626"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="2.909"
          x2="22.001"
          y1="12.004"
          y2="12.004"
        />
        <polyline
          fill="none"
          points="9.276 4.726 2.001 12.004 9.276 19.274"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export default ReturnArrow;
