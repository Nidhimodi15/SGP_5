/* eslint-disable react-refresh/only-export-components */
import { createContext, useState,useEffect } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {
      googleID: '',
      email: '',
      name: '',
      profileIMG: ''
    };
  });

  // Persist to localStorage whenever user changes
  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

 return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
