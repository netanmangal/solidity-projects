import styles from '../styles/Home.module.css';
import detailStyles from '../styles/Details.module.css';
import { useEffect, useState } from 'react';

const UserDetails = ({ state, setState }) => {

    const [localState, setLocalState] = useState({
        userBalance: 0,
        toAddr: "",
        amount: ""
    });

    useEffect(() => {

        const init = async () => {
            const userBalance = await state.erc20Contract.methods.balanceOf(state.userDetails.publicAddress).call();
            await setLocalState({
                ...localState,
                userBalance: userBalance
            });
        }

        init();

    }, []);

    return (
        <>
            <div className={detailStyles.bigCard} style={{ marginBottom: "30px" }}>
                <h4>Welcome To LoginScreen</h4>
                <p className={detailStyles.subHeader}>Details:</p>

                <button className={detailStyles.purpleButton} onClick={(e) => logoutHandler(e, state, setState)}>
                    LogOut
                </button>

                <div style={{ "marginLeft": "50px" }}>
                    <p><b>Email</b>: {state.userDetails.email}</p>
                    <p><b>IsMfaEnabled</b>: {state.userDetails.isMfaEnabled}</p>
                    <p><b>Issuer</b>: {state.userDetails.issuer}</p>
                    <p><b>PhoneNumber</b>: {state.userDetails.phoneNumber}</p>
                    <p><b>PublicAddress</b>: {state.userDetails.publicAddress}</p>
                    <p><b>Token Address</b>: {state.erc20Contract.options.address}</p>
                    <p><b>User Balance</b>: {localState.userBalance}</p>
                </div>
            </div>

            <div className={detailStyles.bigCard}>
                <p className={detailStyles.subHeader}>Transfer tokens:</p>
                <input
                    type={"string"}
                    className={styles.input}
                    placeholder="To Address"
                    value={localState.toAddr}
                    onChange={(e) => {
                        setLocalState({ ...localState, toAddr: e.target.value });
                    }}
                />
                <input
                    type={"string"}
                    className={styles.input}
                    placeholder="Amount (in WETH)"
                    value={localState.amount}
                    onChange={(e) => {
                        setLocalState({ ...localState, amount: e.target.value });
                    }}
                />
                <button className={styles.gradientButton} onClick={(e) => transferHandler(e, state, setState, localState)}>
                    Transfer
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

const transferHandler = async (e, state, setState, localState) => {
    setState({
        ...state,
        loading: true
    });

    await state.erc20Contract.methods.transfer(localState.toAddr, localState.amount).send({
        from: state.userDetails.publicAddress
    });

    setState({
        ...state,
        loading: false
    });

    window.location.reload();
}

export default UserDetails;