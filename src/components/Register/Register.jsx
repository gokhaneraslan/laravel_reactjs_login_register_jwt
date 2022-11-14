import React, { useState, useRef, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import AuthUser from "../auth/AuthUser";

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    const emailRef = useRef();
    const nameRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const { http } = AuthUser();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');


    useEffect(() => {
      nameRef.current.focus();
      emailRef.current.focus();
  }, [])

  useEffect(() => {
      setValidName(NAME_REGEX.test(name));
      setValidEmail(EMAIL_REGEX.test(email));
  }, [name, email])

  useEffect(() => {
      setValidPassword(PWD_REGEX.test(password));
      setValidMatch(password === matchPwd);
  }, [password, matchPwd])

  useEffect(() => {
      setErrMsg('');
  }, [name, email, password, matchPwd])

  
    const submitForm = async (e) => {
      e.preventDefault();
      // if button enabled with JS hack
      const v1 = NAME_REGEX.test(name);
      const v2 = EMAIL_REGEX.test(email);
      const v3 = PWD_REGEX.test(password);
      if (!v1 || !v2 || !v3) {
          setErrMsg("Invalid Entry");
          return;
      }
      await http.post('/register', { name:name, email: email, password:password})
        .then((response) => {
          if(response.status === 200){
            setName('');
            setEmail('');
            setPassword('');
            setMatchPwd('');
            navigate('/login')
          }
        })
        .catch((err) => {
          if(err.message === 'Network Error'){
            setErrMsg('Network Error');
          } else {
            if (!err?.response) {
              setErrMsg('No Server Response');
            }
            else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
          }
        })


    }

  return (
    <div className='register'>
      <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className='col-sm-6'>
          <div className='card p-4'>
            <div className="form-group">
              <label htmlFor="username">
                  Username:
                  <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
              </label>
              <input
                  className="form-control"
                  type="text"
                  id="username"
                  ref={nameRef}
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
              />
              <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.<br />
                  Must begin with a letter.<br />
                  Letters, numbers, underscores, hyphens allowed.
              </p>

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

              <label htmlFor="confirm_pwd">
                  Confirm Password:
                  <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
              </label>
              <input
                  className="form-control"
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
              />
              <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
              </p>

              <button style={{width:"10rem",marginLeft:"5rem", cursor:"pointer"}} className="btn btn-primary mt-4" disabled={!validName || !validEmail || !validPassword || !validMatch ? true : false} onClick={submitForm}>Sign Up</button>
              <p style={{display:"flex", flexDirection:"row", justifyContent:"center", paddingTop:"1rem"}}>
                Already registered?<br />
                <span className="line">
                  <a href="/login">Sign In</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
  </div>
  )
}

export default Register
