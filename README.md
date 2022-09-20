<div align="center">
  <img src="https://raw.githubusercontent.com/Pierce-44/instagram-clone/main/public/instagramLoading.png" height="60px"/>
</div>

# Instagram Clone
An Instagram clone app written in Typescript that utilises Next.js as a framework, allowing for static HTML to be generated server-side on build time resulting in better performance and SEO. Moreover, it has allowed for dynamic page routing to be used for the profile pages of all users. For this project Jotai was incorporated to manage the React state throughout the app. Firebase (BaaS) was used for the database (NoSQL), to incorporate user authentication, and to utilise Firestore real-time updates. Additionally, the TailwindCSS framework was used to help with CSS management and to reduce the CSS bundle size by removing all unused CSS when building for production.

View a live version of the app using the link below:

[`https://instagram-clone-mu-two.vercel.app/`](https://instagram-clone-mu-two.vercel.app/)

<br/>

## Built With:
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" title="Typescript" alt="Typescript" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" title="nextjs" alt="nextjs" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" title="React" alt="React" width="35" height="35"/>&nbsp;
  <img src="https://storage.googleapis.com/candycode/jotai/jotai-mascot.png" title="jotai" alt="jotai" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" title="Tailwind" alt="Tailwind" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" title="Firebase" alt="Firebase" width="35" height="35"/>&nbsp;
  <img src="https://i.pinimg.com/originals/17/dd/84/17dd84fe75c8ba1ca26aa18b3570b65b.png" title="vercel" alt="vercel"  height="35"/>&nbsp;
</div>

<br/>

## Follow and Unfollow Users
- Follower users to see their latest story and their most recent post.
- Unfollow users to stop receiving their latest updates.

![followUsers](https://user-images.githubusercontent.com/96740762/191067953-f8a4da95-28df-4883-8728-84b57d27a871.gif)

<br/>

## Uploade Profile Pictures
- Upload a profile picture, or choose to not use a profile picture.

![profilePic](https://user-images.githubusercontent.com/96740762/191061648-854d9ea0-3b3c-4d13-a6f1-f16c2bb9aa11.gif)

<br/>

## Create Posts
- Create post to fill out your user profile and to share your content with your followers.
- Other users can like your posts and leave comments for you to view.

![createPosts](https://user-images.githubusercontent.com/96740762/191060616-51036a66-e017-4c50-8f7b-f566cdd69a40.gif)

<br/>

## Chat Rooms and Notifications
- Create chat rooms with other users.
- Receive notifications when you receive new unread messages form other users.

![chatNoti](https://user-images.githubusercontent.com/96740762/191050552-5d0fb4d2-303b-4e20-9659-a2e690e754a9.gif)

<br/>

## Likes and Comment Notifications
- Receive notification updates when someone likes or comments on your posts.
- Like other users posts to let them know what you think.
- Leave messages on other users posts to tell them what you think about the post.

![heartNoti](https://user-images.githubusercontent.com/96740762/191052391-1cd46a84-cfba-4b19-a82c-1b8d3ba1f9cb.gif)

<br/>

## Stories
- Set a story to let your followers know what you have been up to recently.
- Once you view a story it will be displayed as viewed.

![stories](https://user-images.githubusercontent.com/96740762/191066573-183a3206-66de-4b24-87d5-2d25c8836aef.gif)

<br/>

## Search For Users
- Search for users by name (case sensitive).

![search](https://user-images.githubusercontent.com/96740762/191048630-87e7b47c-ca39-4c5c-a83c-092b3ca006a6.gif)

<br/>

## Check Other User Profiles
- View other users profile pages and see all their posts.

![userProfiles](https://user-images.githubusercontent.com/96740762/191056081-78dc0c10-2dbf-4961-b9ec-9e66a8a66d66.gif)

<br/>

## Use Dark Mode
- Use dark mode throughout the app if desired.
- Utilises local storage to keep track of your reference.

![darkMode](https://user-images.githubusercontent.com/96740762/191063795-4492109c-f258-4083-9d09-8f4a12f3c218.gif)

<br/>

## Explore Registered Users
- Explore all registered users.

![exploreUsers](https://user-images.githubusercontent.com/96740762/191064602-6c43d061-afc9-4974-92d9-e21834e36f36.gif)

<br/>


## Responsive Design
- Fully responsive design to allow the app to work on both computers, notepads, mobile phones, etc.

![responsive](https://user-images.githubusercontent.com/96740762/191266199-cc5856d5-31b0-4365-b905-8b6281f5a083.gif)

<br/>

## How to Install and Run the Project Locally:
#### - Please follow the following steps if you would like to install and run the porject locally on http://localhost:3000/:

1. Clone the repository to your local folder of choice
   ```sh
   git clone git@github.com:Pierce-44/netflix-clone.git
   ```
   
<br/>

2. Go to Firebase and follow the instructions for creating a project
   ```sh
   https://firebase.google.com/
   ```
   
<br/>   

3. Within your Firebase cloud storage create three folders named "posts", "profilePhotos" and "stories" (seen below):

   ![firebaseCloud](https://user-images.githubusercontent.com/96740762/191279127-bace5d47-a316-4636-88bc-9bc25b114bd6.png)
   
<br/>

4. Within your Firestore Database create two collections one named "userList" and the other "users" (seen below):

   ![firebaseDB](https://user-images.githubusercontent.com/96740762/191280085-712860a4-b81b-4a63-b684-8b32beada745.png)

<br/>

5. Within your Firebase project allow email and password sign-in method.

<br/>

6. Within `util/firbaseConfig.ts` replace the empty Firebase configuration with your Firebase configuration, which was assigned to your project when you created it and    can be found under your project settings on Firebase. It should resemble the following example:
    ```js
    // Your web app's Firebase configuration should resemble the following EXAMPLE:
    
    const firebaseConfig = {
      apiKey: "AIzaSyA97-R5P4bEwjV0efHt3hLs3bc32ns4shs",
      authDomain: "instagram-clone-ph.firebaseapp.com",
      projectId: "instagram-clone-ph",
      storageBucket: "instagram-clone-ph.appspot.com",
      messagingSenderId: "554003582327",
      appId: "1:554003582327:web:97667da84152c9ff7aa572"
    };
    ```
    
    <br/>

7. Install NPM packages
   ```sh
   npm install
   ```
   
    <br/>

8. Start the app on your localhost
   ```js
   npm run dev
   ```



