import React, { useEffect, useState } from "react";
import { Colors, Images } from "./Images";
import "./commonStyle.css";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { ForgetpasswordReducer } from "../../../@app/master/authSlice";
import { useNavigate } from "react-router";
import { notification } from "antd";
import Loader from "./Loader";

function Forgetpassword() {
  const navigator = useNavigate();
  //   const [email, setemail] = useState("");
  //   const [password, setPassword] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  // eslint-disable-next-line no-unused-vars
  const { statusget, loginStatus, forgetpassword } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (loginStatus) {
      navigator("/dashboard");
    }
  }, [loginStatus]);

  useEffect(() => {   
    if (forgetpassword) {
      setEmployeeCode("");
    }
  }, [forgetpassword]);

  const handleSubmit = () => {
    let params = {};

    if (!employeeCode) {
      api.open({
        message: "Please enter employe code",
        type: "error",
      });
      return false;
    }

    params = { employee_code: employeeCode };

    dispatch(ForgetpasswordReducer({ data: { params }, api }));
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
          {/* <p
            className="hd-login"
            style={{ cursor: "pointer" }}
            onClick={() => navigator("/forgetpassword")}>
            Forget Password
          </p> */}

          <input
            type="text"
            className="input-field-login"
            placeholder="Employee Code"
            onChange={(e) => setEmployeeCode(e.target.value)}
            value={employeeCode}
          />
          {/* <input
            type="email"
            className="input-field-login"
            placeholder={"Email"}
            onChange={(e) => setemail(e.target.value)}
          /> */}

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
