import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout';
import * as hnapi from '../../lib/hn-api';
import { Item } from '../../types/hn-item';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const post = await hnapi.get(Number(id));
  return {
    props: {
      // props for your component
      post,
    },
  };
};

type PostPros = { post: Item };
const Post: React.FC<PostPros> = ({ post }) => {
  if (!post) return <div>failed to load</div>;

  const { id, title, type, score, text } = post;

  return (
    <Layout>
      <Head>
        <title>Post No. {id}</title>
      </Head>
      <h1 className="title">{title}</h1>
      <h3>{type}</h3>
      <p>Score: {score}</p>
      <main>{text}</main>
    </Layout>
  );
};

export default Post;
