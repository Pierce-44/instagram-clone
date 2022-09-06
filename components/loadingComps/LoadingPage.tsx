import Head from 'next/head';
import Header from '../header/Header';

function LoadingPage({ checkingUserRoute }: { checkingUserRoute: boolean }) {
  return (
    <div
      className={`${
        checkingUserRoute
          ? 'flex-col justify-start overflow-y-scroll'
          : 'items-center justify-center'
      } flex h-screen w-full dark:bg-[#131313]  dark:[color-scheme:dark]`}
    >
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      {checkingUserRoute ? <Header page="Profile" /> : ''}
      <div
        className={
          checkingUserRoute
            ? 'flex h-full w-full items-center justify-center dark:bg-[#131313]'
            : ''
        }
      >
        <picture>
          <img
            className="h-6 w-auto sm:h-auto"
            src="/instagramLoading.png"
            alt="loading"
          />
        </picture>
      </div>
    </div>
  );
}

export default LoadingPage;
