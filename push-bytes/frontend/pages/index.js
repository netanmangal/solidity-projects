import Head from 'next/head';

import styles from '../styles/Home.module.css';
import Card1 from '../Components/Card1';

const Home = () => {
  return (
    <div className={styles.backgroundParent}>
      <Head>
        <title>Hi this is title</title>
      </Head>
      <p>Hi</p>
      <Card1 />
    </div>
  );
}

export default Home;