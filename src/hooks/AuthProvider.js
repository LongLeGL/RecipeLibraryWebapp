import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const authNavigate = useNavigate();
  const [userName, setUserName] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    let storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser){
      setUserName(storedUser.email);
      setUser(storedUser);
    }
  }, []);

  const setToken = (token) => {
    setUserName(token.email);
    setUser(token);
    sessionStorage.setItem("user", JSON.stringify(token));
  };

  const logOut = () => {
    setUserName(null);
    setUser(null);
    sessionStorage.removeItem("user");
    authNavigate("/RecipeLibraryWebapp/login");
  };

  return (
    <AuthContext.Provider value={{ userName, user, setToken, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
