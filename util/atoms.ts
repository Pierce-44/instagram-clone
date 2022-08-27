import { User } from 'firebase/auth';
import { atom } from 'jotai';

type chatRoomMessagesTypes = {
  createdAt?: string;
  name?: string;
  text?: string;
};

type userDetailTypes = {
  displayName?: string;
  photoURL?: string;
};

type notificationTypes = {
  username?: string;
  userId?: string;
  postCount?: number;
  followers?: [];
  following?: string[];
  avatarURL?: string;
  likedPosts?: string[];
};

type storyTypes = {
  [index: string]: string;
};

type homePagePostTypes = {
  [index: string]: {};
};

type postImgHeightTypes = {
  [index: string]: string;
};

const darkMode = atom(false);
const userStatus = atom(false);
const allChatRoomMessages = atom<chatRoomMessagesTypes>({});
const userDetails = atom<userDetailTypes | User>({});
const userNotifications = atom<notificationTypes>({});
const listeners = atom<any[]>([]);
const loggingIn = atom(true);
const userPostsStatus = atom(false);
const userPosts = atom([]);
const homePagePosts = atom<homePagePostTypes>({});
const postImgHeight = atom<postImgHeightTypes>({});
const stories = atom<storyTypes>({});
const followingArray = atom<any[]>([]);
const homePogePostsFetched = atom(false);
const storiesArray = atom<string[]>([]);

// const profilePosts = atom((get) => get(userPosts));
// const profileDetails = atom((get) => get(userDetails));
// const profileNotifications = atom((get) => get(userNotifications));

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
  // profilePosts,
  // profileDetails,
  // profileNotifications,
  homePagePosts,
  postImgHeight,
  stories,
  followingArray,
  homePogePostsFetched,
  storiesArray,
};

export default atoms;
