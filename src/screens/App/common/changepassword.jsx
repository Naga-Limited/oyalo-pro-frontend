import React, { useEffect, useState } from "react";
import { Colors, Images } from "./Images";
import "./commonStyle.css";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { loginReducer, getBadgeCount } from "../../../@app/master/authSlice";
import { useNavigate } from "react-router";
import { notification } from "antd";
import Loader from "./Loader";

function Forgetpassword() {
  const navigator = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  // eslint-disable-next-line no-unused-vars
  const { statusget, loginStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginStatus) {
      navigator("/dashboard");
    }
  }, [loginStatus]);

  const handleSubmit = () => {
    let params = {};
    if (email === "admin@admin.com") {
      params = { email, Password: password, type: 1 };
    } else {
      params = { employee_code: email, Password: password, type: 2 };
    }
    dispatch(loginReducer({ data: { params }, api }));
  };

  return (
    <div
      className="row"
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        width: "100%",
        height: "100vh",
      }}>
      {contextHolder}
      <div
        className="col-12 col-lg-6 col-md-12 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#000" }}>
        <img
          src={Images.login_logo}
          style={{ objectFit: "cover" }}
          className="img-fluid"
          alt="img"
        />
      </div>
      <div
        className="col-12 col-lg-6 col-md-12 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: Colors.text_color }}>
        <div className="form-box">
          <p className="hd-login">Login</p>
          <input
            type="email"
            className="input-field-login"
            placeholder={email === "admin@admin.com" ? "Email" : "User Name"}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            className="input-field-login"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="d-flex flex-row justify-content-between mt-4 rmd-box">
            <div>
              <input type={"checkbox"} className="mx-1" />
              <span>Remember Me</span>
            </div>
            <div>Forget Password</div>
          </div>
          <button
            className="btn w-100 mt-4"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "500",
            }}
            onClick={handleSubmit}>
            {statusget && <Loader />} Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Forgetpassword;
