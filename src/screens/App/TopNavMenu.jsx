import {Avatar, 
  //Button,
   Dropdown, Menu, Space} from 'antd';
import React from 'react';
import {UserOutlined} from '@ant-design/icons';
import {AiOutlineMenuFold, AiOutlinePoweroff} from 'react-icons/ai';
//import {GrNotification} from 'react-icons/gr';
import {BiHelpCircle, BiUser} from 'react-icons/bi';
import {BsCalendar2Check} from 'react-icons/bs';
import {MdOutlineMessage} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import {logOutReducer} from '../../@app/master/authSlice';
import {useNavigate} from 'react-router';

const TopNavMenu = ({collapsed, setCollapsed, TopTitle}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signOut = () => {
   // let params = {};
   // params = { emp_date: localStorage.getItem("emp_code") || "" };
    dispatch(logOutReducer());
    navigate('/login');
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
  const email = userData.data?.email;
  const emp_name = userData.data?.name;
  const image = userData.data?.image; 

 // const mails = (
    // <Menu>
      {/* <Menu.Item key="m1">
        <div style={{ paddingTop: "7px", paddingBottom: "10px" }}>
          <div style={{ fontWeight: 500, float: "left", paddingRight: "50px" }}>
            You have 7 unread mails
          </div>
          <Button
            style={{ float: "right" }}
            shape="round"
            size="small"
            type="primary"
            ghost>
            View All
          </Button>
        </div>
      </Menu.Item> */}
      // <Menu.Divider />
      {/* <Menu.Item key="m2">
        <div style={{ display: "flex", direction: "row" }} className="p-2">
          <Avatar
            size={22}
            color="#0d6efd"
            style={{ marginRight: "10px", marginTop: "10px" }}
          />
          <div>
            <div style={{fontWeight: 500}}>Marian Garner</div>
            <div>The meeting is cancelled</div>
          </div>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="m3">
        <div style={{ display: "flex", direction: "row" }} className="p-2">
          <Avatar
            size={22}
            color="#0d6efd"
            style={{ marginRight: "10px", marginTop: "10px" }}
          />
          <div>
            <div style={{fontWeight: 500}}>David Grey</div>
            <div>The meeting is cancelled</div>
          </div>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="m4">
        <div style={{ display: "flex", direction: "row" }} className="p-2">
          <Avatar
            size={22}
            color="#0d6efd"
            style={{ marginRight: "10px", marginTop: "10px" }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>Travis Jenkins</div>
            <div>The meeting is cancelled</div>
          </div>
        </div>
      </Menu.Item>
      <Menu.Divider />
    </Menu> */}
  // );

  const userProfile = (
    <Menu>
      <Menu.Item key="u1">
        <div style={{ textAlign: "center" }}>
          <Avatar
            size={35}
            color="#0d6efd"
            style={{
              marginRight: "10px",
              marginTop: "10px",
              marginBottom: "5px",
            }}
            src={image}
          />
          <div>{emp_name}</div>
          <div>{email}</div>
        </div>
      </Menu.Item>

      <Menu.Item key="u2">
        <div style={{ display: "flex", direction: "row" }}>
          <BiUser
            size={22}
            color="#0d6efd"
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>My Profile</div>
          </div>
        </div>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item key="u3">
        <div style={{ display: "flex", direction: "row" }}>
          <MdOutlineMessage
            size={22}
            color="#0d6efd"
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
          <div style={{ fontWeight: 500 }}>Messages</div>
        </div>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item key="u4">
        <div style={{ display: "flex", direction: "row" }}>
          <BsCalendar2Check
            size={22}
            color="#0d6efd"
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />

          <div style={{ fontWeight: 500 }}>Activity</div>
        </div>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item key="u5">
        <div style={{ display: "flex", direction: "row" }}>
          <BiHelpCircle
            size={22}
            color="#0d6efd"
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />

          <div style={{ fontWeight: 500 }}>FAQ</div>
        </div>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item key="u6">
        <div style={{ display: "flex", direction: "row" }}>
          <AiOutlinePoweroff
            size={22}
            color="#0d6efd"
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
          <div onClick={signOut} style={{ fontWeight: 500 }}>
            Sign Out
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{ backgroundColor: "#f5a60b" }}
      className="d-flex justify-content-between">
      <AiOutlineMenuFold
        size={22}
        onClick={() => setCollapsed(!collapsed)}
        className="mx-2 mt-4"
        style={{ cursor: "pointer" }}
      />
      <div className="d-flex align-items-center">
        <span className="fw-bold" style={{ fontSize: "20px", color: "white" }}>
          {TopTitle !== "" && TopTitle}
        </span>
      </div>
      <Menu
        style={{
          backgroundColor: "#f5a60b",
          float: "right",
          paddingRight: "10px",
        }}
        mode="horizontal">
        <Menu.Item className="top-nav user-icon" key="user">
          <Dropdown
            overlayStyle={{ paddingTop: "30px" }}
            placement="bottomRight"
            overlay={userProfile}
            trigger={["click"]}>
            <Space>
              <Avatar
                size={28}
                icon={<UserOutlined size={32} className="" />}
                className="mt-4"
                src={image}
              />
            </Space>
          </Dropdown>
        </Menu.Item>
        {/* <Menu.Item className="top-nav" key="notification">
          <Dropdown
            overlayStyle={{ paddingTop: "30px" }}
            placement="bottomRight"
            //overlay={mails}
            trigger={["click"]}>
            <Space>
              <GrNotification size={22} className="mt-4" />
            </Space>
          </Dropdown>
        </Menu.Item> */}
      </Menu>
    </div>
  );
};

export default TopNavMenu;
