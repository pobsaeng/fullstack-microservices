import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginFailed, logoutSuccess, setErrorMsg } from "../features/auths/authSlice";
import { fetchToken } from "../features/auths/authThunk";
import { InputField } from "./UIComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("myUser@gmail.com");
  const [password, setPassword] = useState("myPassword");
  const [loading, setLoading] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const isLoggedIn = useSelector((state) => state.auth.error);

  useEffect(() => {
    return () => {
      if(isLoggedIn) {
        console.log("[LoginForm] isLoggedIn = ", isLoggedIn);
        dispatch(setErrorMsg(''));
        dispatch(logoutSuccess({statusMsg: "Log out success!"}));
      }
      return
    };
  }, [dispatch, isLoggedIn]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    dispatch(setErrorMsg(''));
    if (!username || username.trim() === "") {
      dispatch(setErrorMsg("Username is required."));
      return;
    }

    if (!password || password.trim() === "") {
      dispatch(setErrorMsg("Password is required."));
      return;
    }

    setLoading(true);
    
    dispatch(fetchToken({username: username, password: password}))
      .unwrap()
      .then(response => {
        if(response.status_code === 200) {
          dispatch(loginSuccess(response));
          navigate("/pos");

        } else {
          dispatch(loginFailed(response));
          navigate("/login");
        }
        
      })
      .catch(error => {
        console.error('Error fetching token:', error);
      });

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Sign In</h3>
              {error && <div className="alert alert-danger">{error}</div>}

              <InputField label="Username" 
                id="name" 
                value={username} 
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)} 
                divMarginButtom="mb-3"
                labelClassName="form-label"
                divButtonClassName=""
                required={true}/>

              <InputField label="Password" 
                id="password" 
                value={password} 
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)} 
                divMarginButtom="mb-5"
                labelClassName="form-label"
                divButtonClassName=""
                required={true}/>

              <button
                onClick={handleSignIn}
                className="btn btn-primary w-100"
                disabled={loading}
              >
                <FontAwesomeIcon icon={faUser} style={{ fontSize: '25px' }} /> {loading ? "pending..." : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
