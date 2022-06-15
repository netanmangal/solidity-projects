import { useState } from 'react';

import styles from '../styles/Home.module.css';
import detailStyles from '../styles/Details.module.css';

const PushData = () => {
    let [key, setKey] = useState("");
    let [value, setValue] = useState("");
    let [msg, setMsg] = useState("");

    return (
        <div className={detailStyles.bigCard}>
            <h4>Welcome To PushBytes - PushData function!</h4>
            <button className={`${detailStyles.purpleButton}`} onClick={() => {
                setKey("");
                setValue("");
            }}>
                Reset Values
            </button>
            <p className={detailStyles.subHeader}>Details:</p>


            <div className={detailStyles.detailsDiv}>
                <div>
                    <h5>Key</h5>
                    <input
                        type={"string"}
                        className={styles.input}
                        placeholder="Key"
                        value={key}
                        onChange={(e) => {
                            setKey(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <h5>Value</h5>
                    <input
                        type={"string"}
                        className={styles.input}
                        placeholder="Value (JSON)"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                    />
                </div>
            </div>

            {
                msg ? msg : null
            }

            <div className={detailStyles.fotter}>
                <button className={styles.gradientButton} onClick={async () => {
                    const response = await (await fetch(`http://localhost:3000/data/push`, {
                        method: "POST",
                        body: JSON.stringify({ key, value: value }),
                        headers: { 'Content-Type': 'application/json' },
                        mode: "cors"
                    })).json()

                    if (response.success) {
                        // posting data toast

                        if (response.msg) {
                            setMsg(JSON.stringify(response.msg.data));
                        } else {
                            setMsg("No response after request");
                        }
                    } else {
                        // error toast
                    }
                }}>
                    Post key-value pair
                </button>
            </div>
        </div>
    );
}

export default PushData;