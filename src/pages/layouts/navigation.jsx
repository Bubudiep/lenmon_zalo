import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation_bar = () => {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path, {
      replace: false,
      animate: false,
      direction: "backward",
    });
  };
  return (
    <>
      <div className="bottom-nav">
        <div className="nav-icon" onClick={() => handleNavigate("/")}>
          <div className="logo">
            <i className="fa-solid fa-house"></i>
          </div>
          <div className="name">Trang chủ</div>
        </div>
        <div className="nav-icon" onClick={() => handleNavigate("/test")}>
          <div className="logo">
            <i className="fa-solid fa-bell"></i>
          </div>
          <div className="name">Thông báo</div>
        </div>
        <div className="nav-icon" onClick={() => handleNavigate("/orders")}>
          <div className="logo">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="name">Giỏ hàng</div>
        </div>
        <div className="nav-icon" onClick={() => handleNavigate("/test")}>
          <div className="logo">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="name">Tài khoản</div>
        </div>
      </div>
    </>
  );
};

export default Navigation_bar;
