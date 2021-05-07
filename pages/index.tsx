import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import Layout, { siteTitle } from '../components/layout';
import * as hnapi from '../lib/hn-api';
import { getSortedPostsData } from '../lib/posts';
import { articles } from '../mocks';
import utilStyles from '../styles/utils.module.css';

const fetcher = (type: hnapi.FeedType) => hnapi.getAll(type, 10);

export const getStaticProps: GetStaticProps = async (context) => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       // props for your component
//     },
//   };
// };

type HomeProps = {
  allPostsData: ReturnType<typeof getSortedPostsData>;
};
export default function Home({ allPostsData }: HomeProps) {
  const { data, error } = useSWR('top', fetcher);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog (static props)</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>HN Feed (client-render)</h2>
        <ul className={utilStyles.list}>
          {error && <div>failed to load</div>}
          {!data && <div>loading...</div>}
          <div className="grid">
            {data &&
              data.map(({ id, title, time, url }) => {
                return (
                  <Link key={id} href={`/hn/${id}`}>
                    <a className="card">
                      <h3>{title} &rarr;</h3>
                      <p>{time}</p>
                      <a href={`${url}`}>External link</a>
                    </a>
                  </Link>
                );
              })}
          </div>
        </ul>
      </section>
      <div className={`container ${utilStyles.padding1px}`}>
        <main>
          <h1 className="title">
            Read{' '}
            <Link href="/posts/first-post">
              <a>first post!</a>
            </Link>
          </h1>
          <h2>Article List</h2>
          {/* <p className="description">
            Get started by editing <code>pages/index.js</code>
          </p> */}
          <div className="grid">
            {articles.map((article, i) => {
              return (
                <Link key={i} href={`/posts/${article.id}`}>
                  <a className="card">
                    <h3>{article.title} &rarr;</h3>
                    <p>{article.subtitle}</p>
                  </a>
                </Link>
              );
            })}
          </div>
        </main>

        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/logo.png" alt="Monrif Logo" className="logo" />
          </a>
        </footer>
      </div>
    </Layout>
  );
}
