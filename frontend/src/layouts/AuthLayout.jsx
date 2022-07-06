import styles from "../styles/AuthLayout.module.css";

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.authLayout__container}>
      <div className={styles.authLayout__wrapper}>{children}</div>
    </div>
  );
};

export default AuthLayout;
