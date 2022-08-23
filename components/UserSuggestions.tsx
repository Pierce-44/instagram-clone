import { useAtom } from 'jotai';
import Link from 'next/link';
import atoms from '../util/atoms';

function UserSuggestions() {
  const [userDetails] = useAtom(atoms.userDetails);

  return (
    <div className="mt-6 max-w-[320px] flex-grow">
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href={`/${userDetails.displayName}`}>
            <picture>
              <img
                className="h-14 w-14 cursor-pointer rounded-full object-cover"
                src={userDetails.photoURL}
                alt="avatar"
              />
            </picture>
          </Link>
          <Link href={`/${userDetails.displayName}`}>
            <p className="ml-5 cursor-pointer text-sm font-semibold">
              {userDetails.displayName}
            </p>
          </Link>
        </div>
        <Link href={`/${userDetails.displayName}`}>
          <p className="cursor-pointer text-xs font-semibold text-[#0095f6]">
            Profile
          </p>
        </Link>
      </div>
    </div>
  );
}

export default UserSuggestions;
