import React, { useRef } from "react";
import BottomPopup from "../../popup";

const Giohang = ({ onClose, token }) => {
  const popupRef = useRef();
  const closeFast = () => {
    popupRef.current.closePopup();
  };
  return (
    <BottomPopup ref={popupRef} title="GIỎ HÀNG" onClose={onClose}>
      {!token ? (
        <div className="not-login">
          <div className="icon">
            <i className="fa-solid fa-frog"></i>
          </div>
          <div className="message">Bạn chưa đăng nhập!</div>
        </div>
      ) : (
        <div className="giohang">
          <div className="null">
            <div className="icon p-2">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <div className="message">Chưa có gì!</div>
          </div>
        </div>
      )}
    </BottomPopup>
  );
};

export default Giohang;
