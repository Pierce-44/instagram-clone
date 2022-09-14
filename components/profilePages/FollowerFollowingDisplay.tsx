import React from 'react';
import handleGetFollowersOrFollowings from '../../util/handleGetFollowersOrFollowings';
import FollowingFollowerDropDown from './FollowingFollowerDropDown';
import { followingFollowerInfo, notificationTypes } from '../../util/atoms';

interface Props {
  showFollowers: boolean;
  showFollowing: boolean;
  profileNotifications: notificationTypes;
  setShowFollowers: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFollowing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FollowerFollowingDisplay({
  showFollowers,
  showFollowing,
  profileNotifications,
  setShowFollowers,
  setShowFollowing,
}: Props) {
  const [followersInfo, setFollowersInfo] = React.useState<
    followingFollowerInfo[]
  >([]);
  const [followingInfo, setFollowingInfo] = React.useState<
    followingFollowerInfo[]
  >([]);

  return (
    <div className="flex gap-2 text-xs sm:justify-start sm:gap-7 sm:text-base">
      <p
        className="mx-auto flex flex-col items-center text-sm text-[#818181] sm:mx-auto sm:flex-row 
        sm:items-start sm:text-base sm:text-[#231f20] sm:dark:text-slate-100"
      >
        <b className="text-[#231f20] dark:text-slate-100 sm:pr-1">
          {profileNotifications.postCount}
        </b>{' '}
        posts
      </p>
      <button
        id="followingFollowerDropDown"
        className="relative mx-auto flex items-center sm:mx-0"
        type="button"
        onClick={() => {
          setShowFollowers(!showFollowers);
          setShowFollowing(false);
          handleGetFollowersOrFollowings({
            setArray: setFollowersInfo,
            userListArray: profileNotifications.followers!,
          });
        }}
      >
        <FollowingFollowerDropDown
          count={profileNotifications.followers!.length}
          dropDownName="followers"
          showDropDown={showFollowers}
          usersInfo={followersInfo}
        />
      </button>
      <button
        id="followingFollowerDropDown"
        className="relative mx-auto flex items-center sm:mx-0"
        type="button"
        onClick={() => {
          setShowFollowing(!showFollowing);
          setShowFollowers(false);
          handleGetFollowersOrFollowings({
            setArray: setFollowingInfo,
            userListArray: profileNotifications.following!,
          });
        }}
      >
        <FollowingFollowerDropDown
          count={profileNotifications.following!.length}
          dropDownName="following"
          showDropDown={showFollowing}
          usersInfo={followingInfo}
        />
      </button>
    </div>
  );
}
