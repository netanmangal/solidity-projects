import { useState } from 'react';

import styles from '../styles/Home.module.css';
import detailStyles from '../styles/Details.module.css';

const GetData = () => {
    let [key, setKey] = useState("");
    let [value, setValue] = useState("");

    return (
        <div className={detailStyles.bigCard}>
            <h4>Welcome To PushBytes - GetData function!</h4>
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
                        placeholder="Key to search"
                        value={key}
                        onChange={(e) => {
                            setKey(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <h5>Value</h5>
                    <p>{value}</p>
                </div>
            </div>


            <div className={detailStyles.fotter}>
                <button className={styles.gradientButton} onClick={async () => {
                    const response = await ( await fetch(`http://localhost:3000/data/get?key=${key}`) ).json();
                    if (response.success) {
                        // fetching response toast

                        if (response.msg.data) {
                            setValue(JSON.stringify( response.msg.data ));                            
                        } else {
                            setValue("No value found");
                        }
                    } else {
                        // error toast
                    }
                }}>
                    Fetch me value.
                </button>
            </div>
        </div>
    );
}

export default GetData;