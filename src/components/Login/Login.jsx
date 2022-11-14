import React, { useState, useRef, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthUser from "../auth/AuthUser";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {

  const errRef = useRef();
  const emailRef = useRef();
  const { http, setToken } = AuthUser();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');


  useEffect(() => {
    emailRef.current.focus();
}, [])

useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
}, [email])

useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
}, [password])

useEffect(() => {
    setErrMsg('');
}, [email, password])


  const submitForm = () => {
    http.post('/login', { email: email, password:password })
      .then((res) => {
        setToken(res.data.user, res.data.access_token);
      })
      .catch((err) => {
        if(err.message === 'Network Error'){
          setErrMsg('Network Error');
        } else {
          if (!err?.response) {
            setErrMsg('No Server Response');
          }else {
              setErrMsg('Username or password false')
          }
          errRef.current.focus();
        }
      })
  }

  return (
    <div className='register'>
      <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className='col-sm-7 mt-4'>
          <div className='card p-4'>
            <div className="form-group">
            <label htmlFor="email">
                  Email:
                  <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
              </label>
              <input
                  className="form-control"
                  type="text"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
              />
              <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  email@gmail.com<br />
              </p>
            </div>
            <div className="form-group">
            <label htmlFor="password">
                  Password:
                  <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
              </label>
              <input
                  className="form-control"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
              />
              <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.<br />
                  Must include uppercase and lowercase letters, a number and a special character.<br />
                  Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>

            </div>
            <button type="button" disabled={!validEmail || !validPassword ? true : false} onClick={submitForm} className="btn btn-primary mt-4">Login</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
