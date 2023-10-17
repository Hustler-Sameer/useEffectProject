import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailReducerFn = (state, action) => {
  return { 
    value: '', 
    isValid: false 
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState, dispatchEmail] = useReducer(emailReducerFn,)

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    // we are setting form in valid state here using useState and again below we are doing that hence we can 
    // we can use useEffect hook to execute the same logic again and again on change in dependencies


    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };
  useEffect(() => {


    const identifier = setTimeout(() => {
      console.log("Checking form validity")
      setFormIsValid(
         //enteredEmail.includes('@') && enteredPassword.trim().length > 6
         emailState.isValid && enteredPassword.trim().length > 6 
      );
      // doing this is called as de-bouncing
      console.log('set time out executes')


    }, 500)
    return () => {
      clearTimeout(identifier);
      console.log("CLEANUP")
    }  // this is called cleanup function as this cleans up useEffect before re-execution
  }, [setFormIsValid, emailState.value, enteredPassword])

  // now this useEffect is running again and again wheneever there is any changes
  // changes in the dependencies injected  

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);


    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
    // used useEffect in place of this logic
  };

  const validateEmailHandler = () => {
   // setEmailIsValid(enteredEmail.includes('@'));
   setEmailIsValid(emailState.isValid)
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
