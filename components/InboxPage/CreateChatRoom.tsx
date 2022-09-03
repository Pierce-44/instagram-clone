/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import { useAtom } from 'jotai';
import SearchBtnSVG from '../svgComps/SearchBtnSVG';
import CloseBtnSVG from '../svgComps/CloseBtnSVG';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';
import SelectionBtnSVG from '../svgComps/SelectionBtnSVG';
import atoms, { notificationTypes } from '../../util/atoms';
import handleCheckChatRoomExists from '../../util/handleCheckChatRoomExists';
import handleCreateChatRoom from '../../util/handleCreateChatRoom';

interface Props {
  setCreateChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateChatRoom({ setCreateChatRoom }: Props) {
  const [userNotifications] = useAtom(atoms.userNotifications);
  const [search, setSearch] = React.useState('');
  const [error, setError] = React.useState('');
  const [searchedUser, setSearchedUser] = React.useState(false);
  const [searchedUserData, setSearchedUserData] =
    React.useState<notificationTypes>({});
  const [ticked, setTicked] = React.useState(false);
  const [imgLoadStatus, setImgLoadStatus] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="fixed top-0 left-0 z-50 flex h-[100vh] w-full items-center justify-center bg-[#0000008f] dark:bg-[#000000d7]">
      <div className="w-[400px] rounded-xl bg-white dark:border dark:border-stone-300 dark:bg-[#000000]">
        <div
          className={
            loading
              ? 'hidden'
              : 'flex items-center justify-between border-b border-stone-300 p-3 dark:border-stone-700'
          }
        >
          <button onClick={() => setCreateChatRoom(false)} type="button">
            <CloseBtnSVG
              lightColor="#262626"
              darkColor="#f1f5f9"
              heightWidth="20"
            />
          </button>
          <p className="font-bold">New message</p>
          <button
            className={`${ticked ? 'text-[#0095f6]' : 'pointer-events-none'}`}
            type="button"
            onClick={() =>
              handleCreateChatRoom({
                userNotifications,
                searchedUserData,
                setError,
                setLoading,
                setSearchedUser,
                setCreateChatRoom,
              })
            }
          >
            Create
          </button>
        </div>
        <div className="mb-5 flex items-center justify-between border-b border-stone-300 py-5 dark:border-stone-700">
          <form
            action=""
            onSubmit={(e) =>
              handleCheckChatRoomExists({
                e,
                search,
                setError,
                setSearchedUser,
                setSearchedUserData,
                userNotifications,
              })
            }
          >
            <label className=" pl-3 text-lg" htmlFor="searchForUser">
              To:
              <input
                className="ml-5 text-sm focus:outline-none dark:bg-[#131313]"
                type="text"
                id="searchForUser"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </form>
          <div className="mr-5">
            <SearchBtnSVG heightWidth="20" />
          </div>
        </div>
        <div>
          {searchedUser ? (
            <div className="mb-3 p-3">
              <p className="pb-3 font-bold">Result:</p>
              <div className="flex items-center justify-start">
                <div className="flex h-14 w-14 items-center justify-center">
                  <div
                    className={`${
                      imgLoadStatus ? 'hidden' : ''
                    } h-14 w-14 rounded-full bg-[#efefef] dark:bg-[#070707]`}
                  >
                    <ProfilePicSVG height="56" width="56" strokeWidth="1.5" />
                  </div>
                  <picture>
                    <img
                      className={`${
                        imgLoadStatus ? '' : 'hidden'
                      } h-14 w-14 rounded-full`}
                      src={searchedUserData?.avatarURL}
                      alt="avatar"
                      onLoad={() => setImgLoadStatus(true)}
                    />
                  </picture>
                </div>
                <p className="mr-auto ml-3">{searchedUserData?.username}</p>
                <button onClick={() => setTicked(!ticked)} type="button">
                  <SelectionBtnSVG ticked={ticked} />
                </button>
              </div>
            </div>
          ) : (
            <p className="p-3 font-bold text-red-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateChatRoom;
