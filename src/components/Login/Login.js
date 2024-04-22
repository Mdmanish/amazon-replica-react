import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Login.module.scss";
import logo from "../../assets/amazon-in-logo.png";
import { Link } from "react-router-dom";
import { authentication } from "../../services/actions";
import userReducer from "../../Store/Reducers/userReducer";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // const dispatch = useDispatch();

    const get_user = (accessToken) => {
        authentication("http://127.0.0.1:8000/get_user",{
            access_token: accessToken,
            token_type: "Bearer"
        }).then((response) => {
            console.log('response: ', response)
            sessionStorage.setItem('user', JSON.stringify(response))
            window.location.href = '/';
            // dispatch(userReducer(response))
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            setError("All fields are required");
            return;
        }
        authentication("http://127.0.0.1:8000/login", {
            username: username,
            password: password,
        }).then((response) => {
            console.log('response: ', response)
            sessionStorage.setItem('access_token', JSON.stringify(response.access_token))
            get_user(response.access_token)
        }).catch((error) => {
            console.log(error?.detail);
            setError(error?.detail);
        });
    };

    return (
        <>
        <div className={styles.logo}>
            <img src={logo} alt="Amazon logo" />
        </div>
        <div>
            {
                error && <p className={styles.error}>{error}</p>
            }
        </div>
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <h2>Sign In</h2>
                <div className={styles.inputField}>
                    <label>Email or mobile phone number</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles.inputField}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className={styles.forgotPassword}>Forgot Password?</p>
                <button
                    type="submit"
                    className={styles.submitButton}
                    onClick={handleSubmit}
                >
                    Continue
                </button>
                <p className={styles.terms}>By continuing, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.</p>
                
                <div className={styles.signUp}>
                    <p><span>New to Amazon?</span></p>
                    <Link to="/register" className={styles.signUpLink}>Create your Amazon account</Link>
                </div>

            </form>
            <div className={styles.otherTerms}>
                <p className={styles.terms}><a href="#">Conditions of Use</a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="#">Privacy Notice</a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="#">Help</a></p>
                <p className={styles.terms}>© 1996-2022, Amazon.com, Inc. or its affiliates</p>
            </div>
        </div>
        </>
    )
}

export default Login;
