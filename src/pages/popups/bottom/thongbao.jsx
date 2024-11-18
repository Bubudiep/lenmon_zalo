import React, { useRef, useState } from "react";
import BottomPopup from "../../popup";

const Thongbao = ({ onClose, token }) => {
  const popupRef = useRef();
  const closeFast = () => {
    popupRef.current.closePopup();
  };
  return (
    <BottomPopup ref={popupRef} title="THÔNG BÁO" onClose={onClose}>
      {!token ? (
        <div className="not-login">
          <div className="icon">
            <i className="fa-solid fa-frog"></i>
          </div>
          <div className="message">Bạn chưa đăng nhập!</div>
        </div>
      ) : (
        <div className="thong-bao">
          <div className="giohang">
            <div className="null">
              <div className="icon p-2">
                <i className="fa-regular fa-bell"></i>
              </div>
              <div className="message">Cũng chưa có gì!</div>
            </div>
          </div>
        </div>
      )}
    </BottomPopup>
  );
};

export default Thongbao;
