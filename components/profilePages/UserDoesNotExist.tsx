import Head from 'next/head';
import Header from '../header/Header';

export default function UserDoesNotExist({
  search,
}: {
  search: string | string[] | undefined;
}) {
  return (
    <div className="h-[100vh] w-full overflow-y-scroll dark:bg-[#131313] dark:text-slate-100">
      <Head>
        <title>Profile • Instagram photos and videos</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <Header page="Profile" />
      <div className="items-top flex h-full w-full justify-center">
        <p className="mt-10 text-center text-xl font-semibold">{`Sorry this user ${search} was not found.`}</p>
      </div>
    </div>
  );
}
