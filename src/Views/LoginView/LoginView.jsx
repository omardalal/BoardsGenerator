import React, { useState } from "react";
import { styles } from "./styles.ts";
import { TextInput, Button, Loading } from "@carbon/react";
import PropTypes from "prop-types";
import {
  addUserToFirestore,
  createUser,
  sendResetEmail,
  signInUser,
} from "../../Utilities/AuthenticationUtils";
import { AuthErrorCodes } from "firebase/auth";

const LoginView = (props) => {
  const { isLogin, setSelectedTab } = props;

  const initialFormData = { email: "", password: "" };

  const [formData, setFormData] = useState(initialFormData);
  const [inForgotPassView, setInForgotPassView] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = async () => {
    if (!formData.email || (!inForgotPassView && !formData.password)) {
      setShowError(true);
      return;
    }

    setIsLoading(true);

    if (inForgotPassView) {
      try {
        await sendResetEmail(formData.email);
        setErrorMsg("Email sent!");
        setIsSuccess(true);
      } catch (err) {
        console.error("Failed to login, Error: " + err);
        if (err.code === AuthErrorCodes.INVALID_EMAIL) {
          setIsSuccess(false);
          setErrorMsg("No user exists with this email!");
        }
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (isLogin) {
      try {
        await signInUser(formData.email, formData.password);
        setSelectedTab(1);
      } catch (err) {
        console.error("Failed to login, Error: " + err);
        if (err.code === AuthErrorCodes.INVALID_EMAIL) {
          setIsSuccess(false);
          setErrorMsg("No user exists with this email!");
          return;
        }
        if (err.code === AuthErrorCodes.INVALID_PASSWORD) {
          setIsSuccess(false);
          setErrorMsg("Wrong password!");
        }
      } finally {
        setIsLoading(false);
      }
      return;
    }

    try {
      await createUser(formData.email, formData.password);
    } catch (err) {
      setIsSuccess(false);
      setErrorMsg("Something went wrong!");
      console.error("Failed to sign up, Error: " + err);
    } finally {
      setIsLoading(false);
    }

    try {
      await addUserToFirestore(formData.email);
      setSelectedTab(1);
    } catch (err) {
      setIsSuccess(false);
      setErrorMsg("Something went wrong!");
      console.error("Failed to add user to FireStore, Error: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={styles.inputBox}
      className={"defaultBoxShadowBlack"}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          validateInputs();
          event.preventDefault();
          return false;
        }
      }}
    >
      {isLoading && <Loading />}
      <div style={styles.formContainer}>
        <h3 style={styles.formTitle}>{isLogin ? "Log in" : "Sign up"}</h3>
        <h5 style={styles.errorLbl(isSuccess)}>{errorMsg}</h5>
        <div style={styles.fieldsCol}>
          <TextInput
            invalid={showError && !formData?.email}
            invalidText={"This field is required!"}
            data-modal-primary-focus
            labelText={"Email"}
            placeholder={"Email"}
            onChange={(evt) => {
              setFormData({ ...formData, email: evt.target?.value });
            }}
            light
            style={styles.titleInput}
          />
          <div style={styles.sepV} />
          {!inForgotPassView && (
            <TextInput.PasswordInput
              invalid={showError && !formData?.password}
              invalidText={"This field is required!"}
              data-modal-primary-focus
              labelText={"Password"}
              placeholder={"Password"}
              onChange={(evt) => {
                setFormData({ ...formData, password: evt.target?.value });
              }}
              light
              style={styles.titleInput}
            />
          )}
        </div>
        {isLogin && (
          <p
            style={styles.forgotPassword}
            onClick={() => {
              setInForgotPassView((forgotPass) => !forgotPass);
              setShowError(false);
              setErrorMsg("");
            }}
          >
            {inForgotPassView ? "back" : "Forgot your password?"}
          </p>
        )}
      </div>
      <Button
        style={styles.genBtn}
        onClick={() => {
          validateInputs();
        }}
      >
        {inForgotPassView ? "Send reset email" : isLogin ? "Log in" : "Sign up"}
      </Button>
    </div>
  );
};

LoginView.propTypes = {
  isLogin: PropTypes.bool,
  setSelectedTab: PropTypes.func,
};

export default LoginView;
