import { useAtom } from 'jotai';
import Image from 'next/future/image';
import Link from 'next/link';
import atoms, { followingFollowerInfo } from '../../util/atoms';
import DropDownArrowSVG from '../svgComps/DropDownArrowSVG';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';
import SpinnerSVG from '../svgComps/SpinnerSVG';

interface Props {
  count: number;
  dropDownName: string;
  showDropDown: boolean;
  usersInfo: followingFollowerInfo[];
}

export default function FollowingFollowerDropDown({
  count,
  dropDownName,
  showDropDown,
  usersInfo,
}: Props) {
  const [darkMode] = useAtom(atoms.darkMode);

  return (
    <div id="followingFollowerDropDown">
      <div className="flex items-end sm:flex-col sm:items-center">
        <p
          id="followingFollowerDropDown"
          className="flex flex-col items-center text-sm text-[#818181] sm:flex-row sm:items-start sm:text-base sm:text-[#231f20] sm:dark:text-slate-100"
        >
          <b className="text-[#231f20] dark:text-slate-100 sm:pr-1">{count}</b>{' '}
          {dropDownName}
        </p>
        <div
          id="followingFollowerDropDown"
          className={`${
            showDropDown ? 'rotate-0' : '-rotate-90'
          } mb-1 ml-1  flex items-center justify-center`}
        >
          <DropDownArrowSVG />
        </div>
      </div>
      {showDropDown ? (
        <div
          className={`${
            dropDownName === 'followers' ? 'left-[-75px]' : 'left-[-185px]'
          } absolute top-12 z-50 w-[270px] cursor-default rounded-md  bg-white  shadow-[-2px_-2px_10px_2px_rgba(0,0,0,0.1)] dark:bg-[#131313] dark:shadow-[-2px_-2px_5px_2px_rgba(0,0,0,0.7)] sm:left-[-85px]`}
        >
          {usersInfo.length === 0 ? (
            <div className="flex h-[210px] items-center justify-center">
              <div className="h-5 w-5">
                <SpinnerSVG />
              </div>
            </div>
          ) : (
            <div
              className={`${
                darkMode ? 'scrollbarDark' : 'scrollbarLight'
              }  scrollbar flex h-[210px] flex-col gap-5 overflow-y-auto p-5`}
            >
              {usersInfo.map((userDetails) => (
                <div className="flex items-center" key={userDetails.username}>
                  <Link href={`/${userDetails.username}`}>
                    <a>
                      {userDetails.avatarURL.length !== 0 ? (
                        <Image
                          className="h-11 w-11 cursor-pointer select-none rounded-full bg-[#ebebeb] object-cover dark:bg-[#313131]"
                          src={userDetails.avatarURL}
                          alt="avatar"
                          width="44"
                          height="44"
                        />
                      ) : (
                        <div className="h-11 w-11">
                          <ProfilePicSVG strokeWidth="1.5" />
                        </div>
                      )}
                    </a>
                  </Link>
                  <Link href={`/${userDetails.username}`}>
                    <a>
                      <p className="pl-3 text-sm ">{userDetails.username}</p>
                    </a>
                  </Link>
                  <div className="ml-auto">
                    <Link href={`/${userDetails.username}`}>
                      <a>
                        <p className="cursor-pointer text-xs font-semibold text-[#0095f6]">
                          Profile
                        </p>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
