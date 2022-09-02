/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

function HomeSVG({ page }: { page: string }) {
  const [darkMode] = useAtom(atoms.darkMode);

  return (
    <svg
      aria-label="Home"
      className="cursor-pointer"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
      fill={
        page === 'Home'
          ? darkMode
            ? '#f1f5f9'
            : '#262626'
          : darkMode
          ? '#262626'
          : 'white'
      }
    >
      <path
        strokeWidth={page === 'Home' ? '0' : '2'}
        stroke={
          page === 'Home'
            ? darkMode
              ? '#f1f5f9'
              : '#262626'
            : darkMode
            ? '#f1f5f9'
            : '#262626'
        }
        d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"
      />
    </svg>
  );
}

export default HomeSVG;
