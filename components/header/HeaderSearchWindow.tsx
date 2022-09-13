import Link from 'next/link';
import Image from 'next/future/image';
import { notificationTypes } from '../../util/atoms';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';
import SpinnerSVG from '../svgComps/SpinnerSVG';

function HeaderSearchWindow({
  loading,
  userDetails,
  searchName,
}: {
  loading: boolean;
  userDetails: notificationTypes[];
  searchName: string;
}) {
  return (
    <div
      id="headerSearchWindow"
      className="absolute left-[-55px] top-[49px] h-[375px] w-[375px] overflow-hidden rounded-md bg-white shadow-[-2px_-2px_10px_2px_rgba(0,0,0,0.1)] dark:bg-[#1c1c1c] dark:shadow-[-2px_-2px_5px_0px_rgba(0,0,0,0.7)]"
    >
      <div className="flex h-full items-center justify-center">
        {loading || searchName === '' ? (
          <div className="h-8 w-8 ">
            <SpinnerSVG />
          </div>
        ) : (
          <div className="h-full w-full overflow-y-scroll py-3">
            {userDetails.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center">
                <div className="">No user with this name was found</div>
              </div>
            ) : (
              userDetails.map((details, index) => (
                // item will not be deleted or updated so it is okay to use index as a key
                // eslint-disable-next-line react/no-array-index-key
                <Link href={`/${details.username}`} key={index}>
                  <div className="flex cursor-pointer items-center py-3 pl-5 hover:bg-[#f8f8f8] dark:hover:bg-[#131313]">
                    {' '}
                    {details.avatarURL ? (
                      <Image
                        className="h-11 w-11 rounded-full object-cover"
                        src={details.avatarURL}
                        alt="avatar"
                        width="44"
                        height="44"
                      />
                    ) : (
                      <div className="h-11 w-11">
                        <ProfilePicSVG strokeWidth="1" />
                      </div>
                    )}
                    <p className="ml-5">{details.username}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderSearchWindow;
