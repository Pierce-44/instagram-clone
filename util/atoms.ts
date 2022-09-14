import { User } from 'firebase/auth';
import { atom } from 'jotai';

export interface chatRoomMessagesTypes {
  createdAt?: string;
  name?: string;
  text?: string;
  [ChatName: `${string}ChatName`]: string;
  [Avatar: `${string}Avatar`]: string;
  [NewMessage: `${string}NewMessage`]: string;
}

export interface userDetailTypes {
  displayName?: string;
  photoURL?: string;
}

export interface heartDetails {
  username?: string;
  postURL?: string;
  userPhoto?: string;
  text?: string;
  postId?: string;
}

export interface followingFollowerInfo {
  username: string;
  avatarURL: string;
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
  newHeart?: boolean;
  heartNotifications?: heartDetails[];
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

interface allChatRoomMessagesTypes {
  [index: string]: chatRoomMessagesTypes[];
}

const darkMode = atom(false);
const userStatus = atom(false);
const allChatRoomMessages = atom<allChatRoomMessagesTypes>({});
const userDetails = atom<userDetailTypes | User>({});
const userNotifications = atom<notificationTypes>({});
const listeners = atom<any[]>([]);
const loggingIn = atom(true);
const userPosts = atom<postType[]>([]);
const homePagePosts = atom<homePagePostTypes>({});
const stories = atom<storyTypes>({});
const followingArray = atom<string[]>([]);
const storiesArray = atom<string[]>([]);
const usersListArray = atom<string[]>([]);
const spotlightUsers = atom<notificationTypes[]>([]);
const storiesLoading = atom(true);
const postsLoading = atom(true);
const followingArrayStatus = atom(false);
const suggestionsLoading = atom(true);
const chatRoomLoading = atom(true);
const userPorfileLoading = atom(true);
const newMessage = atom(false);

const atoms = {
  darkMode,
  userStatus,
  allChatRoomMessages,
  userDetails,
  userNotifications,
  listeners,
  loggingIn,
  userPosts,
  homePagePosts,
  stories,
  followingArray,
  storiesArray,
  usersListArray,
  spotlightUsers,
  storiesLoading,
  postsLoading,
  suggestionsLoading,
  chatRoomLoading,
  userPorfileLoading,
  newMessage,
  followingArrayStatus,
};

export default atoms;
