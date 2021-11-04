import React, { useEffect, useState } from "react";
import { useMutation } from "urql";
import styles from '../styles/Home.module.css'
import { useCookies } from 'react-cookie';

interface loginProps {}

const LOG_MUT = `mutation Mutation($login: String!, $password: String!) {
  login(login: $login, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      createdAt
      updatedAt
      login
      password
    }
  }
}`

const login: React.FC<loginProps> = ({}) => {
  const [cookies, setCookie] = useCookies(['name']);
    const [user, setUser] = useState({login: '', password: ''});
    const [,login] = useMutation(LOG_MUT)
    return (
        <div className={styles.containerclass}>
  <form>
    <div>
      <h1>Login</h1>
      <p>Please fill in this form to log in to your account.</p>
      <hr className={styles.hrclass} />
      <label htmlFor="login"><b>Login</b></label>
      <input onChange={(event)=>{setUser({login: event.target.value, password: user.password})}} className={styles.inputclass} type="text" placeholder="Enter Login" name="login" required />
      <label htmlFor="psw"><b>Password</b></label>
      <input onChange={(event)=>{setUser({login: user.login, password: event.target.value})}} className={styles.inputclass} type="password" placeholder="Enter Password" name="psw" id="psw" required />
      <hr className={styles.hrclass} />
      <button onClick={async ()=>{const response = await login({login: user.login, password: user.password}); if(response.data.login.errors != null){alert(JSON.stringify(response.data.login.errors[0].message))} else {setCookie('name', user.login, { path: '/' });}}} type="submit" className={styles.loginbtn}>Login</button>
    </div>
    <div className={styles.signin}>
      <p>Don't have an account? <a className={styles.link} href="/register">Sign up</a>.</p>
    </div>
  </form>
</div>
      );
    };

export default login;
