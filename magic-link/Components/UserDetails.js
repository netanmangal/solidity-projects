import styles from '../styles/Home.module.css';
import detailStyles from '../styles/Details.module.css';

const UserDetails = ({ state, setState }) => {
    return (
        <div className={detailStyles.bigCard}>
            <h4>Welcome To LoginScreen</h4>
            <p className={detailStyles.subHeader}>Details:</p>

            <div style={{"marginLeft": "50px"}}>
                <p><b>Email</b>: {state.userDetails.email}</p>
                <p><b>IsMfaEnabled</b>: {state.userDetails.isMfaEnabled}</p>
                <p><b>Issuer</b>: {state.userDetails.issuer}</p>
                <p><b>PhoneNumber</b>: {state.userDetails.phoneNumber}</p>
                <p><b>PublicAddress</b>: {state.userDetails.publicAddress}</p>
            </div>

            <div className={detailStyles.fotter}>
                {/* <button className={styles.gradientButton} onClick={() => {
                    console.log("Button pressed");
                }}>
                    Update
                </button> */}
                <button className={styles.gradientButton} onClick={(e) => logoutHandler(e, state, setState)}>
                    LogOut
                </button>
            </div>
        </div>
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

export default UserDetails;