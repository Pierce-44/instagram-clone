import { useAtom } from 'jotai';
import atoms from '../../util/atoms';

export default function DropDownArrowSVG() {
  const [darkMode] = useAtom(atoms.darkMode);
  return (
    <svg
      id="followingFollowerDropDown"
      aria-label="Down Chevron Icon"
      color={darkMode ? 'white' : '#262626'}
      fill={darkMode ? 'white' : '#262626'}
      height="12"
      role="img"
      viewBox="0 0 24 24"
      width="12"
    >
      <path
        id="followingFollowerDropDown"
        d="M12 17.502a1 1 0 01-.707-.293l-9-9.004a1 1 0 011.414-1.414L12 15.087l8.293-8.296a1 1 0 011.414 1.414l-9 9.004a1 1 0 01-.707.293z"
      />
    </svg>
  );
}
