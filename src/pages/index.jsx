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
import Today_recommend from "./tools/today-res";
import Nearly_restaurant from "./tools/nearly-res";
import Noibat_tuan from "./tools/noibat-tuan";
import Moidang from "./tools/moidang";
import New_list from "./tools/new_list";

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
          <Today_recommend />
          <Nearly_restaurant />
          <Noibat_tuan />
          <Moidang />
          <New_list />
        </div>
        <Navigation_bar />
        <Outlet />
      </div>
    </>
  );
};

export default HomePage;
