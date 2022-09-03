import { User } from 'firebase/auth';
import { atom } from 'jotai';

export interface chatRoomMessagesTypes {
  createdAt?: string;
  name?: string;
  text?: string;
}

export interface userDetailTypes {
  displayName?: string;
  photoURL?: string;
}

export interface notificationTypes {
  avatarURL?: string;
  chatRoomIds?: string[];
  followers?: string[];
  following?: string[];
  likedPosts?: string[];
  messageCount?: number;
  postCount?: number;
  story?: string;
  storyViews?: string[];
  userId?: string;
  username?: string;
  usernameQuery?: string[];
}

interface storyTypes {
  [index: string]: string;
}

export interface postCommentTypes {
  avatarURL: string;
  createdAt: string;
  text: string;
  username: string;
}

export interface postType {
  comments: postCommentTypes[];
  createdAt: any;
  imgURL: string;
  likeCount: number;
  likes: string[];
  postID: string;
}

export interface userPostsInfoType {
  createdAt: any;
  postListArray: string[];
}

interface homePagePostTypes {
  [index: string]: postType;
}

interface postImgHeightTypes {
  [index: string]: number;
}

interface chatRoomInfoTypes {
  [index: string]: string;
}

interface allChatRoomMessagesTypes {
  [index: string]: chatRoomInfoTypes[];
}

const darkMode = atom(false);
const userStatus = atom(false);
const allChatRoomMessages = atom<allChatRoomMessagesTypes>({});
const userDetails = atom<userDetailTypes | User>({});
const userNotifications = atom<notificationTypes>({});
const listeners = atom<any[]>([]);
const loggingIn = atom(true);
const userPostsStatus = atom(false);
const userPosts = atom<postType[]>([]);
const homePagePosts = atom<homePagePostTypes>({});
const postImgHeight = atom<postImgHeightTypes>({});
const stories = atom<storyTypes>({});
const followingArray = atom<string[]>([]);
const homePogePostsFetched = atom(false);
const storiesArray = atom<string[]>([]);
const usersListArray = atom<string[]>([]);
const spotlightUsers = atom<notificationTypes[]>([]);

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
  homePagePosts,
  postImgHeight,
  stories,
  followingArray,
  homePogePostsFetched,
  storiesArray,
  usersListArray,
  spotlightUsers,
};

export default atoms;
