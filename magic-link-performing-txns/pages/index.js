import Head from 'next/head';
import { Magic } from 'magic-sdk';
import Web3 from 'web3';

import styles from '../styles/Home.module.css';
import Login from '../Components/Login';
import Loader from '../Components/Loader';
import UserDetails from '../Components/UserDetails';
import { useEffect, useState } from 'react';
import config from "../config.json";
import erc20Data from "../utils/artifacts/ERC20Token.json";

const Home = () => {
  const [state, setState] = useState({
    magic: null,
    loading: true,
    isLogin: false,
    email: "",
    userDetails: {},
    web3: null,
    erc20Contract: null
  });

  useEffect(() => {

    const init = async () => {
      const magic = new Magic(config.MAGIC_PUBLISHABLE_KEY, {
        network: config.NETWORK_CHAIN
      });
      const isLogin = await magic.user.isLoggedIn();

      let userDetails = {}, web3 = null, erc20Contract = null;
      if (isLogin) {
        userDetails = await magic.user.getMetadata();
        web3 = new Web3(magic.rpcProvider)
        erc20Contract = new web3.eth.Contract(erc20Data.abi, config.TOKEN_CONTRACT_ADDRESS)
      }

      await setState({
        ...state,
        magic: magic,
        loading: false,
        isLogin: isLogin,
        userDetails: userDetails,
        web3: web3,
        erc20Contract: erc20Contract
      });
    }

    init();

  }, []);

  return (
    <div className={styles.backgroundParent}>
      <Head>
        <title>Magic Link Demo</title>
      </Head>
      {
        state.loading ?
          <Loader /> :
          state.isLogin ?
            <UserDetails state={state} setState={setState} /> :
            <Login state={state} setState={setState} />
      }
    </div>
  );
}

export default Home;