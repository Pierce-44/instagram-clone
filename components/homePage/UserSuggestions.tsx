import Image from 'next/future/image';
import { useAtom } from 'jotai';
import Link from 'next/link';
import atoms from '../../util/atoms';
import LoadingSuggestions from '../loadingComps/LoadingSuggestions';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';

function UserSuggestions() {
  const [userDetails] = useAtom(atoms.userDetails);
  const [spotlightUsers] = useAtom(atoms.spotlightUsers);
  const [suggestionsLoading, setSuggestionsLoading] = useAtom(
    atoms.suggestionsLoading
  );

  return (
    <div className="mt-6 hidden max-w-[320px] flex-grow lg:block">
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center">
          <Link href={`/${userDetails.displayName}`}>
            <a>
              {userDetails.photoURL ? (
                <Image
                  className="h-14 w-14 cursor-pointer select-none rounded-full object-cover"
                  src={userDetails.photoURL}
                  alt="avatar"
                  width="56"
                  height="56"
                />
              ) : (
                <div className="h-14 w-14">
                  <ProfilePicSVG strokeWidth="1" />
                </div>
              )}
            </a>
          </Link>
          <Link href={`/${userDetails.displayName}`}>
            <a>
              <p className="ml-5 cursor-pointer text-sm font-semibold">
                {userDetails.displayName}
              </p>
            </a>
          </Link>
        </div>
        <Link href={`/${userDetails.displayName}`}>
          <a>
            <p className="cursor-pointer text-xs font-semibold text-[#0095f6]">
              Your profile
            </p>
          </a>
        </Link>
      </div>
      <div className="pt-5">
        <div className="flex items-center justify-between pb-2">
          <p className="text-sm font-semibold text-[#818181]">User Spotlight</p>
          <Link href="/Explore">
            <a>
              <p className="cursor-pointer text-xs font-semibold">
                See all users
              </p>
            </a>
          </Link>
        </div>
        <div
          className={`${suggestionsLoading ? 'fixed opacity-0' : ''}`}
          onLoad={() => setSuggestionsLoading(false)}
        >
          {spotlightUsers.map((spotlightUserDetails) => (
            <div
              key={`${spotlightUserDetails.userId}Spotlight`}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-2">
                {spotlightUserDetails.avatarURL?.length !== 0 ? (
                  <Link href={`/${spotlightUserDetails.username}`}>
                    <a>
                      <Image
                        className="h-8 w-8 cursor-pointer select-none rounded-full object-cover"
                        src={spotlightUserDetails.avatarURL!}
                        alt="avatar"
                        width="32"
                        height="32"
                      />
                    </a>
                  </Link>
                ) : (
                  <Link href={`/${spotlightUserDetails.username}`}>
                    <a>
                      <div className="h-8 w-8">
                        <ProfilePicSVG strokeWidth="2" />
                      </div>
                      <picture>
                        <img
                          className={suggestionsLoading ? 'h-1 w-1' : 'hidden'}
                          src="/sun.png"
                          alt="sun"
                        />
                      </picture>
                    </a>
                  </Link>
                )}
                <div>
                  <Link href={`/${spotlightUserDetails.username}`}>
                    <a>
                      <p className="cursor-pointer text-xs font-semibold">
                        {spotlightUserDetails.username}
                      </p>
                    </a>
                  </Link>
                  <p className="text-xs text-[#818181]">
                    Followed by {spotlightUserDetails.followers!.length}{' '}
                    {spotlightUserDetails.followers!.length === 1
                      ? 'user'
                      : 'users'}
                  </p>
                </div>
              </div>
              <Link href={`/${spotlightUserDetails.username}`}>
                <a>
                  <p className="cursor-pointer text-xs font-semibold text-[#0095f6]">
                    Profile
                  </p>
                </a>
              </Link>
            </div>
          ))}
        </div>
        {suggestionsLoading ? <LoadingSuggestions /> : ''}
      </div>
    </div>
  );
}

export default UserSuggestions;
