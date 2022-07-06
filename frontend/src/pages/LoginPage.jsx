import AuthLayout from "../layouts/AuthLayout";
import styles from "../styles/AuthLayout.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin, isLoggedIn } = useContext(AppContext) || {};
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(state);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);
  return (
    <AuthLayout>
      <div>
        <div
          style={{
            marginBottom: "48px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "350px", height: "48px" }}
          ></img>
        </div>
        <div className={styles.auth__card}>
          <div className={styles.auth__card__header}>
            <h3>Login Panel</h3>
          </div>
          <div className={styles.auth__card__body}>
            <form onSubmit={handleSubmit}>
              <div className={styles.auth__card__form__group}>
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.auth__card__form__group}>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  className={styles.auth__card__form__checkbox}
                ></input>
                <p className={styles.auth__card__remember__me__text}>
                  Keep me loged in
                </p>
              </div>
              <div className={styles.auth__card__form__group__submit}>
                <button type="submit">Login</button>
              </div>
            </form>
            <div className={styles.auth__card__forgot}>
              <Link to="/forgot">Forgot Password?</Link>
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    color: "#B5BBC2",
                    fontWeight: 400,
                    marginRight: "10px",
                  }}
                >
                  Don't have an account yet?
                </p>
                <Link to="/register">Create Here.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
