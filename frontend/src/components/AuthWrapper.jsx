import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AuthWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // const { user, setUser } = useContext(UserDataContext)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }

    axios
      .post(
        `http://localhost:3000/api/v1/user/getprofile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then((response) => {
        if (response.status === 200) {
          // setUser(response.data)
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/signin");
      });
  }, [token, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
