import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation_bar = ({ setTab }) => {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    setTab(path);
  };
  return (
    <>
      <div className="bottom-nav">
        <div className="nav-icon" onClick={() => handleNavigate("checkout")}>
          <div className="logo">
            <i className="fa-solid fa-paper-plane"></i>
          </div>
          <div className="name">Đơn hàng</div>
        </div>
        <div className="nav-icon" onClick={() => handleNavigate("cart")}>
          <div className="logo">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="name">Giỏ hàng</div>
        </div>
        <div className="nav-icon" onClick={() => handleNavigate("alert")}>
          <div className="logo">
            <i className="fa-solid fa-bell"></i>
          </div>
          <div className="name">Thông báo</div>
        </div>
        <div className="nav-icon" onClick={() => handleNavigate("user")}>
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
