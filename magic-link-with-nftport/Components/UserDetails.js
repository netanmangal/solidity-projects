import { useState } from 'react';
import FormData from "form-data";
import axios from 'axios';

import styles from '../styles/Home.module.css';
import detailStyles from '../styles/Details.module.css';
import config from "../config.json";

const UserDetails = ({ state, setState }) => {

    const [localState, setLocalState] = useState({
        nftName: "",
        nftDescription: "",
        nftChain: "polygon",
        nftFilePath: "",
        response: null
    });

    return (
        <>
            <div className={detailStyles.bigCard} style={{ marginBottom: "30px" }}>
                <h4>Welcome To LoginScreen</h4>
                <p className={detailStyles.subHeader}>Details:</p>

                <div style={{ "marginLeft": "50px" }}>
                    <p><b>Email</b>: {state.userDetails.email}</p>
                    <p><b>IsMfaEnabled</b>: {state.userDetails.isMfaEnabled}</p>
                    <p><b>Issuer</b>: {state.userDetails.issuer}</p>
                    <p><b>PhoneNumber</b>: {state.userDetails.phoneNumber}</p>
                    <p><b>PublicAddress</b>: {state.userDetails.publicAddress}</p>
                </div>

                <div className={detailStyles.fotter}>
                    <button className={styles.gradientButton} onClick={(e) => logoutHandler(e, state, setState)}>
                        LogOut
                    </button>
                </div>
            </div>

            <div className={detailStyles.bigCard}>
                <p className={detailStyles.subHeader}>Mint NFT:</p>
                <input
                    type={"string"}
                    className={styles.input}
                    placeholder="NFT Name"
                    value={localState.nftName}
                    onChange={(e) => {
                        setLocalState({ ...localState, nftName: e.target.value });
                    }}
                />
                <input
                    type={"string"}
                    className={styles.input}
                    placeholder="Description"
                    value={localState.nftDescription}
                    onChange={(e) => {
                        console.log(localState);
                        setLocalState({ ...localState, nftDescription: e.target.value });
                    }}
                />
                <select
                    className={styles.input}
                    placeholder="Select Chain"
                    value={localState.nftChain}
                    onChange={(e) => {
                        setLocalState({ ...localState, nftChain: e.target.value });
                    }}
                >
                    <option value="polygon">Polygon</option>
                    <option value="rinkeby">Rinkeby</option>
                </select>
                <input
                    className={styles.input}
                    type={"file"}
                    onChange={(e) => {
                        setLocalState({ ...localState, nftFilePath: e.target.files[0] })
                    }}
                ></input>
                <p>NFT will be minted to your addresss : {state.userDetails.publicAddress}</p>

                {
                    localState.response ? 
                    JSON.stringify(localState.response) : 
                    null
                }

                <button className={styles.gradientButton} onClick={(e) => {
                    console.log(e.target.files)
                    mintHandler(e, state, setState, localState, setLocalState)
                }}>
                    Mint
                </button>
            </div>
        </>
    );
}

const logoutHandler = async (e, state, setState) => {
    setState({
        ...state,
        loading: true
    });

    await state.magic.user.logout();

    setState({
        ...state,
        loading: false
    });

    window.location.reload();
}

const mintHandler = async (e, state, setState, localState, setLocalState) => {
    setState({
        ...state,
        loading: true
    });

    let formData = new FormData();
    formData.append("file", localState.nftFilePath);

    const response = await axios.post("https://api.nftport.xyz/v0/mints/easy/files?" + new URLSearchParams({
        chain: localState.nftChain,
        name: localState.nftName,
        description: localState.nftDescription,
        mint_to_address: state.userDetails.publicAddress
    }), formData, {
        headers: {
            "Content-Type": localState.nftFilePath.type,
            "Authorization": config.NFTPORT_API_KEY
        },
    });

    await setLocalState({
        ...localState,
        response: response.data
    })

    setState({
        ...state,
        loading: false
    });

    window.location.reload();
}

export default UserDetails;