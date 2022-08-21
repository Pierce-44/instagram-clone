import { atom } from 'jotai';

type objectUnkown = {
  [key: string]: any;
};

type userDetailTypes = {
  [key: string]: any;
  displayName?: string;
  photoURL?: string;
};

type notificationTypes = {
  [key: string]: any;
  username?: string;
  userId?: string;
  postCount?: number;
  followerCount?: number;
  followingCount?: number;
};

const darkMode = atom(false);
const userStatus = atom(false);
const allChatRoomMessages = atom<objectUnkown>({});
const userDetails = atom<userDetailTypes>({});
const userNotifications = atom<notificationTypes>({});
const listeners = atom([]);
const loggingIn = atom(false);
const userPostsStatus = atom(false);
const userPosts = atom([]);

const profilePosts = atom((get) => get(userPosts));
const profileDetails = atom((get) => get(userDetails));
const profileNotifications = atom((get) => get(userNotifications));

const atoms = {
  darkMode,
  userStatus,
  allChatRoomMessages,
  userDetails,
  userNotifications,
  listeners,
  loggingIn,
  userPostsStatus,
  userPosts,
  profilePosts,
  profileDetails,
  profileNotifications,
};

export default atoms;
