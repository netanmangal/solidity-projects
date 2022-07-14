import Head from 'next/head';
import { Magic } from 'magic-sdk';

import styles from '../styles/Home.module.css';
import Login from '../Components/Login';
import Loader from '../Components/Loader';
import UserDetails from '../Components/UserDetails';
import { useEffect, useState } from 'react';

const Home = () => {
  const [state, setState] = useState({
    magic: null,
    loading: true,
    isLogin: false,
    email: "",
    userDetails: {}
  });

  useEffect(() => {

    const init = async () => {
      const magic = new Magic('pk_live_5618E4ECEC07A6F7');
      const isLogin = await magic.user.isLoggedIn();
      await setState({
        ...state,
        magic: magic,
        loading: false,
        isLogin: isLogin
      });
    }

    init();

  }, []);

  return (
    <div className={styles.backgroundParent}>
      <Head>
        <title>Hi this is title</title>
      </Head>
      {
        state.loading ?
          <Loader /> :
          state.isLogin ?
            <UserDetails /> :
            <Login state={state} setState={setState} />
      }
    </div>
  );
}

export default Home;