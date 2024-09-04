import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const authNavigate = useNavigate();
  const [userName, setUserName] = useState();
  const [auth, setAuth] = useState();

  useEffect(() => {
    let storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser){
      setUserName(storedUser.name);
      setAuth(storedUser.auth);
    }
  }, []);

  const setToken = (name, token) => {
    setUserName(name);
    setAuth(token);
    localStorage.setItem("user", JSON.stringify({name: name, auth: token}));
  };

  const logOut = () => {
    setUserName(null);
    setAuth(null);
    localStorage.removeItem("user");
    authNavigate("login");
  };

  return (
    <AuthContext.Provider value={{ userName, auth, setToken, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
