import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Instagram</title>
      <meta name="description" content="Instagram Clone" />
      <link rel="icon" href="/instagram.png" />
    </Head>
    <div>
      <h1 className="text-6xl flex justify-center">Instagram</h1>
    </div>
  </div>
);

export default Home;
