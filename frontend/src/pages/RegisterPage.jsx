import AuthLayout from "../layouts/AuthLayout";
import styles from "../styles/AuthLayout.module.css";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { isLoggedIn, handleRegister } = useContext(AppContext) || {};
  const navigate = useNavigate();
  const [state, setState] = useState({
    phone: "",
    password: "",
    names: "",
    email: "",
    nationalId: "",
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
    handleRegister(state);
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
            <h3>Registration Panel</h3>
          </div>
          <div className={styles.auth__card__body}>
            <form onSubmit={handleSubmit}>
              <div className={styles.auth__card__form__group}>
                <input
                  type="text"
                  id="names"
                  placeholder="Full Names"
                  name="names"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.auth__card__form__group}>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.auth__card__form__group}>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone Number"
                  name="phone"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.auth__card__form__group}>
                <input
                  type="number"
                  id="nationalId"
                  placeholder="National Id"
                  name="nationalId"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.auth__card__form__group}>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.auth__card__form__group__submit}>
                <button type="submit">Register</button>
              </div>
            </form>
            <div className={styles.auth__card__forgot}>
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
                  Already have an account?
                </p>
                <Link to="/">Login here.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
