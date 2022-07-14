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
                <button className={styles.gradientButton} onClick={(e) => loginHandler(e, state, setState)}>
                    Login
                </button>
            </div>
        </div>
    );
}

const loginHandler = async (e, state, setState) => {
    e.preventDefault();
    
    setState({
        ...state,
        loading: true
    });

    await state.magic.auth.loginWithMagicLink({email: state.email, showUI: true});

    setState({
        ...state,
        loading: false
    });
}

export default Login;