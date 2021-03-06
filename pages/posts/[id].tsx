import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { articles } from '../../mocks';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const article = articles.find((x) => x.id === id);
  return (
    <Layout>
      <Head>
        <title>Post No. {id}</title>
      </Head>
      {article ? (
        <>
          <h1 className="title">{article.title}</h1>
          <h3>{article.subtitle}</h3>
          <p>{article.body}</p>
        </>
      ) : (
        <h1>4🤔4 Not Found</h1>
      )}
    </Layout>
  );
};

export default Post;
