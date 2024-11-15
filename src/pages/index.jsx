import React, { Suspense, useEffect, useState } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import UserCard from "../components/user-card";
import { Outlet, Link } from "react-router-dom";
import Topcontainer from "./layouts/topcontainer";
import Navigation_bar from "./layouts/navigation";
import Home_catalog from "./layouts/catalog";
import Home_slider from "./layouts/slider";
import User_wellcome from "./layouts/user_wellcome";
import { authorize, getSetting, getUserInfo } from "zmp-sdk";

const HomePage = () => {
  const [user, setUser] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleStart = () => {
    setLoading(true);
    getSetting({
      success: (setting) => {
        console.log(setting.authSetting);
        if (
          setting.authSetting["scope.userInfo"] &&
          setting.authSetting["scope.userPhonenumber"]
        ) {
          if (
            setting.authSetting["scope.userInfo"] == true &&
            setting.authSetting["scope.userPhonenumber"] == true
          ) {
            setIsLogin(true);
            console.log("Đã cấp quyền");
          } else {
            console.log("Chưa cấp quyền");
            setIsLogin(false);
          }
        } else {
          console.log("Không có config");
        }
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };
  useEffect(() => {
    handleStart();
    getUserInfo({
      success: (data) => {
        const { userInfo } = data;
        setUser(userInfo);
      },
      fail: (error) => {
        console.log(error);
      },
    });
  }, []);
  return (
    <>
      <div className="app-container">
        <Topcontainer />
        <User_wellcome
          user={user}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setShowLogin={setShowLogin}
        />
        <Home_slider />
        <Home_catalog />
        {showLogin && "Yêu cầu đăng nhập!"}
        <div className="body-main">
          <div className="section">
            <h3>
              <i className="fa-regular fa-star"></i> Hôm nay ăn gì?
            </h3>
            <div className="list">
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
            </div>
          </div>
          <div className="section">
            <h3>
              <i className="fa-solid fa-store"></i>Các cửa tiệm gần bạn
            </h3>
            <div className="grid">
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
            </div>
          </div>
          <div className="section">
            <h3>
              <i className="fa-solid fa-fire-flame-curved"></i> Nổi bật nhất
              trong tuần
            </h3>
            <div className="grid">
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
            </div>
          </div>
          <div className="section">
            <h3>
              <i className="fa-solid fa-champagne-glasses"></i> Các món mới đăng
            </h3>
            <div className="grid">
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
            </div>
          </div>
          <div className="section">
            <h3>
              <i className="fa-solid fa-scroll"></i> Đi dạo
            </h3>
            <div className="grid">
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
            </div>
          </div>
        </div>
        <Navigation_bar />
        <Outlet />
      </div>
    </>
  );
};

export default HomePage;
