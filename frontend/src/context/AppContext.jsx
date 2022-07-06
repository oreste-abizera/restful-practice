import axios from "axios";
import url from "../helpers/url";
import { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// create a new context file for the app
const AppContext = createContext();

const getUserFromSessionStorage = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const syncUserToSessionStorage = (user) => {
  if (user) {
    sessionStorage.setItem("user", JSON.stringify(user));
  } else {
    sessionStorage.removeItem("user");
  }
};

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    user: getUserFromSessionStorage(),
    isLoggedIn: getUserFromSessionStorage() !== null,
    isLoading: false,
    error: null,
  });

  const handleLogin = async ({ email, password }) => {
    try {
      let response = await axios.post(url + "/auth/login", {
        email,
        password,
      });
      if (response.data.success) {
        let user = {
          info: response.data.data,
          token: response.data.token,
        };
        setState({
          ...state,
          user,
          isLoggedIn: true,
        });
        syncUserToSessionStorage(user);
        toast.success("Login successful");
      }
    } catch (error) {
      console.log(error);
      handleError(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Something went wrong"
      );
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleRegister = async ({
    phone,
    password,
    names,
    email,
    nationalId,
  }) => {
    try {
      let response = await axios.post(url + "/auth/register", {
        password,
        names,
        email,
        phone,
        nationalId,
      });
      if (response.data.success) {
        toast.success("Registration successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      handleError(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Something went wrong"
      );
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleLogout = () => {
    setState({
      ...state,
      user: {},
      isLoggedIn: false,
    });
    syncUserToSessionStorage(null);
  };

  const handleError = (error) => {
    setState({
      ...state,
      error,
    });
  };

  const handleLoading = (isLoading) => {
    setState({
      ...state,
      isLoading,
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleLogin,
        handleRegister,
        handleLogout,
        handleError,
        handleLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
