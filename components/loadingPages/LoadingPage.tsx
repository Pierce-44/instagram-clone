import Head from 'next/head';
import Header from '../Header';

function LoadingPage({ checkingUserRoute }: { checkingUserRoute: boolean }) {
  return (
    <div
      className={
        checkingUserRoute
          ? 'flex h-screen w-full flex-col justify-start dark:bg-[#131313]'
          : 'flex h-screen w-full items-center justify-center dark:bg-[#131313]'
      }
    >
      <Head>
        <title>Profile • Instagram photos and videos</title>
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
          <img src="/instagramLoading.png" alt="loading" />
        </picture>
      </div>
    </div>
  );
}

export default LoadingPage;
