import React, { useEffect, useState } from "react";
import { useNavigate } from "zmp-ui";

const Order = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [isVisible, setIsVisible] = useState(false); // Trạng thái hiển thị popup
  const handleClose = () => {
    setIsVisible(true); // Bắt đầu fadeOut
    setTimeout(() => {
      navigate("/", {
        replace: false,
        animate: false,
        direction: "backward",
      });
    }, 200);
  };
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    const handlePopState = (event) => {
      event.preventDefault(); // Ngăn chặn hành động quay lại mặc định
      handleClose();
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  return (
    <div className="popup-bottom">
      <div
        className={`detectOut ${isVisible ? "fade-out" : "fade-in"}`}
        onClick={handleClose}
      ></div>
      <div className={`popup ${isVisible ? "slideOut" : "slideIn"}`}>
        <div className="popup-top-container">
          <div className="bar"></div>
          <div className="title">Giỏ hàng của bạn</div>
        </div>
      </div>
    </div>
  );
};

export default Order;
