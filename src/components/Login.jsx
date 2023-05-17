import React, { useContext, useState } from "react";
import { Context } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/constant";
import { fetchUsers } from "../api/Api";

const Login = () => {
  const {
    setLoading,
    setIsLoggedIn,
    users,
    setCurrentUser,
    setSelectedUser,
    setUsers,
  } = useContext(Context);
  const [register, setRegister] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const loginToAccount = async () => {
    await fetchUsers().then(
      (data) => {
        if (emailAddress.trim() !== "" && password.trim() !== "") {
          var list = [];
          data.forEach((user) => {
            if (
              user["Email"] === emailAddress &&
              user["Password"] === password
            ) {
              setCurrentUser(user);
              setSelectedUser(user);
              setIsLoggedIn(true);

              navigate("/");
            } else {
              list.push(user);
            }
          });
          setUsers(list);
          list = [];
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const registerUser = async () => {
    if (emailAddress.trim() !== "" && password.trim() !== "") {
      if (emailAddress.trim() !== "" && password.trim() !== "") {
        let user = {
          UserId: 0,
          Name: userName !== "" ? userName : "Unknown",
          Email: emailAddress,
          Password: password,
          DpUrl: "none",
          LastMessage: "none",
          TimeStamp: "none",
        };
        try {
          await axios.post(`${BASE_URL}Users`, user).then((res) => {
            setRegister(false);
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return !register ? (
    <div
      className="w-100 justify-content-center d-flex align-items-center bgImg"
      style={{ height: "100vh" }}
    >
      <div className="cardBg col-md-3 shadow text-black p-5">
        <h1 className="fw-bold text-center mb-5">User Login</h1>
        <div>
          <label htmlFor="emailId" className="form-label">
            Enter Email
          </label>
          <input
            type="email"
            id="emailId"
            className="form-control"
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="passId" className="form-label">
            Enter Password
          </label>
          <input
            type="password"
            id="passId"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <label className="text-primary w-100 text-end">Forgot password?</label>
        <div className="d-flex justify-content-center mt-4">
          <button
            type="submit"
            className="btn btn-primary fw-bold"
            onClick={loginToAccount}
          >
            Login
          </button>
        </div>
        <center>
          <button
            className="btn btn-link mt-4"
            onClick={() => {
              setRegister(true);
            }}
          >
            New User ? Register
          </button>
        </center>
      </div>
    </div>
  ) : (
    <div
      className="w-100 justify-content-center d-flex align-items-center bgImg"
      style={{ height: "100vh" }}
    >
      <div className="cardBg col-md-3 shadow text-black p-5">
        <h1 className="fw-bold text-center mb-5">User Register</h1>
        <div>
          <label htmlFor="userNameId" className="form-label">
            Enter Username
          </label>
          <input
            type="text"
            id="userNameId"
            className="form-control"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="my-2">
          <label htmlFor="emailId" className="form-label">
            Enter Email
          </label>
          <input
            type="email"
            id="emailId"
            className="form-control"
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="passId" className="form-label">
            Enter Password
          </label>
          <input
            type="password"
            id="passId"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button
            type="submit"
            className="btn btn-primary fw-bold"
            onClick={() => registerUser()}
          >
            Register
          </button>
        </div>
        <center>
          <button
            className="btn btn-link mt-4"
            onClick={() => {
              setRegister(false);
            }}
          >
            Already A User ? Login
          </button>
        </center>
      </div>
    </div>
  );
};
export default Login;
