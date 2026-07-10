import { createSlice } from '@reduxjs/toolkit';
import apis from '../../api/stateAPI';
import axios from "axios";

const loginStato = localStorage.getItem("loginStatus") == "true";
const authSlice = createSlice( {
  name: 'auth',
  initialState: {
    statusget: false,
    loginStatus: loginStato,
    forgetpassword: false,
    userData: [],
    type: 1,
    error: '',
    badgeCount: { Master: {}, 'Sub Master': {}, Audit: {} }
  },
  reducers: {
    loginReq: ( state ) => {
      state.statusget = true;
      state.error = '';
    },
    loginFun( state, action ) {
      state.statusget = false;
      state.loginStatus = true;
      state.userData = action.payload;
      state.error = '';
    },
    loginError( state, action ) {
      state.statusget = false;
      state.error = action.payload;
    },
    logOutReq( state ) {
      state.loginStatus = false;
      state.error = '';
    },
    settype( state, action ) {
      state.type = action.payload;
    },
    setBadgeCount( state, action ) {
      state.badgeCount = action.payload;
    },
    forgetReq: (state) => {
      state.forgetpassword = true;
    },
  },
});

export const AuthAction = authSlice.actions;
export default authSlice.reducer;

export const getBadgeCount = () => async ( dispatch ) => {
  dispatch( authSlice.actions.setBadgeCount() );
  return apis.getBadgeCount().then( ( { data } ) => {
    dispatch( authSlice.actions.setBadgeCount( data ) );
    return data;
  } );
};

export const loginReducer =
  ({ data, api }) =>
  async (dispatch) => {
    dispatch(authSlice.actions.loginReq());
    const val = data.params;
    return apis
      .loginApi(val)
      .then(({ data }) => {
        dispatch(authSlice.actions.settype(val.type));
        localStorage.setItem("type", val.type);      
        if (data.statusText === "login success") {
          localStorage.setItem("loginStatus", true);
          localStorage.setItem("emp_code", data?.data?.employee_code);
          if (val.type === 1) {
            let currentdate = new Date();
            let datetime =
              currentdate.getDate() +
              "/" +
              (currentdate.getMonth() + 1) +
              "/" +
              currentdate.getFullYear() +
              " " +
              currentdate.getHours() +
              ":" +
              currentdate.getMinutes() +
              ":" +
              currentdate.getSeconds();
            localStorage.setItem("datetime", datetime);

            dispatch(authSlice.actions.loginFun(data));
            localStorage.setItem("userData", data);
            localStorage.setItem("employee_code", val.employee_code);
            localStorage.setItem("userData", JSON.stringify(data));

            //localStorage.setItem("employee_code", val.employee_code);
            //localStorage.setItem("Password", val.Password);
          } else {
            let currentdate = new Date();
            let datetime =
              currentdate.getDate() +
              "/" +
              (currentdate.getMonth() + 1) +
              "/" +
              currentdate.getFullYear() +
              " " +
              currentdate.getHours() +
              ":" +
              currentdate.getMinutes() +
              ":" +
              currentdate.getSeconds();
            localStorage.setItem("datetime", datetime);
            //localStorage.setItem("emp_code", data?.data?.employee_code);
            // localStorage.setItem("userData", data);
            //localStorage.setItem("employee_code", val.employee_code);
            //localStorage.setItem("Password", val.Password);
            const screen = data?.data?.employee_mapping?.module_Screen ?? [];
            if (screen.length > 0) {
              dispatch(authSlice.actions.loginFun(data));
              localStorage.setItem("userData", JSON.stringify(data));
            } else {
              dispatch(authSlice.actions.loginError("This user not allowed"));
              api.open({ message: "This user not allowed", type: "error" });
            }
          }
          dispatch(getBadgeCount());
          return data;
        } else {
          dispatch(authSlice.actions.loginError(data.message));
          api.open({ message: data.message, type: "error" });
        }
      })
      .catch(() => {
        dispatch(authSlice.actions.loginError("Login Failed"));
      });
  };

export const ForgetpasswordReducer =
  ({ data, api }) =>
  async (dispatch) => {
    const val = data.params;
    return apis
      .forgetpasswordApi(val)
      .then(({ data }) => {
        if (data?.status == 200) {
          api.open({
            message: "Forget Password link send your entered Employee ID",
            type: "success",
          });
          dispatch(authSlice.actions.forgetReq(data));
        } else {
          api.open({
            message: data?.message,
            type: "error",
          });
        }
        return data;
      })
      .catch((err) => {
         dispatch(err,authSlice.actions.loginError("Login Failed"));
      });
  };

export const logOutReducer = (val) => async (dispatch) => {
  const code = val?.emp_date;

  if (code) {
    let data = new FormData();
    data.append("employee_code", code);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_BASE_URL}logs-outs`,
      headers: {
        Cookie: "laravel_session=TklhWNkURX7B3Bc62h111EFPIv7KAUeUzp5G8C0T",
      },
      data: data,
    };

    axios
      .request(config)
      .then(() => {
        //localStorage.setItem("Password", false);
      })
      .catch(() => {
        dispatch(authSlice.actions.loginError("Login Failed"));
      });
  }
  dispatch(authSlice.actions.logOutReq());
  localStorage.setItem("loginStatus", false);
  // localStorage.setItem("employee_code", false);
  // localStorage.setItem("Password", false);
  localStorage.setItem("emp_code", "undefined");
  localStorage.setItem("userData", null);
};

export const loginCheckReducer = () => async (dispatch) => {
  const code = localStorage.getItem("emp_code") || null;

  if (code !== "undefined") {
    let data = new FormData();
    data.append("employee_code", code);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_BASE_URL}chck_time`,
      headers: {
        Cookie: "laravel_session=TklhWNkURX7B3Bc62h111EFPIv7KAUeUzp5G8C0T",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        let result = response.data;
        if (result.status != 200) {
          dispatch(authSlice.actions.logOutReq());
          localStorage.setItem("loginStatus", false);
          localStorage.setItem("emp_code", "undefined");
          localStorage.setItem("userData", null);
          //localStorage.setItem("Password", false);
        }
      })
      .catch(() => {
        dispatch(authSlice.actions.loginError("Login Failed"));
      });
  }

 };

// export default BuySlice;
