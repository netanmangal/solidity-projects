import styles from '../styles/Home.module.css';
import detailStyles from '../styles/Details.module.css';

const UserDetails = ({state, setState}) => {

    let value = "ABC Value";

    return (
        <div className={detailStyles.bigCard}>
            <h4>Welcome To LoginScreen</h4>
            <button className={`${detailStyles.purpleButton}`} onClick={(e) => logoutHandler(e, state, setState)}>
                LogOut
            </button>
            <p className={detailStyles.subHeader}>Details:</p>

            <div className={detailStyles.detailsDiv}>
                <div>
                    <h5>Value</h5>
                    <p>{value}</p>
                </div>
                <div>
                    <h5>Value</h5>
                    <p>{value}</p>
                </div>
            </div>

            <input
                type={"string"}
                className={styles.input}
                placeholder="New value"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />

            <div className={detailStyles.fotter}>
                <button className={styles.gradientButton} onClick={() => {
                    console.log("Button pressed");
                }}>
                    Update
                </button>
                <button className={styles.gradientButton} onClick={() => {
                    console.log("Button pressed");
                }}>
                    Sign Out
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