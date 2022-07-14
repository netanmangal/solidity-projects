import styles from '../styles/Home.module.css';
import detailStyles from '../styles/Details.module.css';

const Login = ({state, setState}) => {

    return (
        <div className={styles.card}>
            <h4>Welcome To TheCard!</h4>
            <p className={detailStyles.subHeader}>Login:</p>

            <input
                type={"string"}
                className={styles.input}
                placeholder="Email"
                value={state.email}
                onChange={(e) => {
                    setState({
                        ...state,
                        email: e.target.value
                    });
                }}
            />

            <div className={detailStyles.fotter}>
                <button className={styles.gradientButton} onClick={() => {
                    console.log("Button pressed");
                }}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;