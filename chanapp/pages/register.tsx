import React, { useEffect, useState } from "react";
import { useMutation } from "urql";
import styles from '../styles/Home.module.css'

interface registerProps {}

const REG_MUT = `mutation Mutation($login: String!, $password: String!) {
  createUser(login: $login, password: $password) {
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

const Register: React.FC<registerProps> = ({}) => {
    const [user, setUser] = useState({login: '', password: ''});
    const [,register] = useMutation(REG_MUT)
    return (
        <div className={styles.containerclass}>
  <form>
    <div>
      <h1>Register</h1>
      <p>Please fill in this form to create an account.</p>
      <hr className={styles.hrclass} />
      <label htmlFor="login"><b>Login</b></label>
      <input onChange={(event)=>{setUser({login: event.target.value, password: user.password})}} className={styles.inputclass} type="text" placeholder="Enter Login" name="login" required />
      <label htmlFor="email"><b>Email</b></label>
      <input className={styles.inputclass} type="text" placeholder="Enter Email" name="email" id="email" required />
      <label htmlFor="psw"><b>Password</b></label>
      <input onChange={(event)=>{setUser({login: user.login, password: event.target.value})}} className={styles.inputclass} type="password" placeholder="Enter Password" name="psw" id="psw" required />
      <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
      <input className={styles.inputclass} type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required />
      <hr className={styles.hrclass} />
      <p>By creating an account you agree to our <a className={styles.link} href="#">Terms &amp; Privacy</a>.</p>
      <button onClick={async ()=>{const response = await register({login: user.login, password: user.password}); if(response.data.createUser.errors != null){alert(JSON.stringify(response.data.createUser.errors[0].message))}}} type="submit" className={styles.registerbtn}>Register</button>
    </div>
    <div className={styles.signin}>
      <p>Already have an account? <a className={styles.link} href="/login">Sign in</a>.</p>
    </div>
  </form>
</div>
      );
    };

export default Register;
