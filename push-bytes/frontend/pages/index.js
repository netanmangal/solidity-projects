import Head from 'next/head';

import styles from '../styles/Home.module.css';
import PushData from '../Components/PushData.js';
import GetData from '../Components/GetData.js';

const Home = () => {
  return (
    <div className={styles.backgroundParent}>
      <Head>
        <title>PushBytes - Arbitrum One</title>
      </Head>

      <div style={{margin: "20px"}}>
        Requirement: Backend should be up and running (which usually would not be the case); <br />
        Please visit <a style={{color: "blue"}} href="https://github.com/netanmangal/solidity-projects/tree/master/push-bytes">Link</a> for Code.
      </div>

      <GetData />
      <div style={{margin: "20px"}}></div>
      <PushData />
    </div>
  );
}

export default Home;